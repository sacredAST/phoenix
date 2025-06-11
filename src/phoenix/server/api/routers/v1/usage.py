import gzip
import zlib
import json
import pandas as pd
from typing import Any, Literal, Optional

from fastapi import APIRouter, Path, Header, HTTPException, Query
from google.protobuf.json_format import MessageToJson
from google.protobuf.message import DecodeError
from opentelemetry.proto.collector.trace.v1.trace_service_pb2 import (
    ExportTraceServiceRequest,
    ExportTraceServiceResponse,
)
from pydantic import Field, BaseModel
from datetime import datetime
from sqlalchemy import insert, select
from starlette.concurrency import run_in_threadpool
from starlette.datastructures import State
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.status import (
    HTTP_404_NOT_FOUND,
    HTTP_415_UNSUPPORTED_MEDIA_TYPE,
    HTTP_422_UNPROCESSABLE_ENTITY,
)
from strawberry.relay import GlobalID

from phoenix.db import models
from phoenix.db.insertion.helpers import as_kv
from phoenix.db.insertion.types import Precursors
from phoenix.server.bearer_auth import PhoenixUser
from phoenix.server.dml_event import TraceAnnotationInsertEvent
from phoenix.trace.otel import decode_otlp_span
from phoenix.utilities.project import get_project_name

from .models import V1RoutesBaseModel
from .utils import RequestBody, ResponseBody, add_errors_to_responses

class MessageInfoSchema(BaseModel):
    user_id: str
    message_id: str
    conversation_id: int
    timestamp: datetime

router = APIRouter(tags=["usages"])

@router.post(
    "/projects/{project_id}/usages_user_info",
    operation_id="Insert user informations",
    summary="insert user info",
    responses=add_errors_to_responses(
        [
            HTTP_404_NOT_FOUND,
            HTTP_422_UNPROCESSABLE_ENTITY,
        ]
    ),
)
async def insert_user_info(
    request: Request,
    project_id: str = Path(
        description=(
            "The project identifier: either project ID or project name. If using a project name, "
            "it cannot contain slash (/), question mark (?), or pound sign (#) characters."
        )
    ),
) -> JSONResponse:
    
    body = await request.body()
    body_data = body.decode('utf-8')
    json_data = json.loads(body_data)

    user_info_df = pd.read_json(json_data, orient="records")
    user_info_df['last_login'] = pd.to_datetime(user_info_df['last_login'])

    async with request.app.state.db() as session:
        for index, row in user_info_df.iterrows():
            new_user_info = models.UserInfo(
                project_id=project_id,
                user_id = row['user_id'],
                name = row['name'],
                email = row['email'],
                last_login = row['last_login']
            )
            session.add(new_user_info)

    return JSONResponse("{}")

@router.get(
    "/projects/{project_id}/usages_user_info",
    operation_id="Get user informations",
    summary="get user info",
    responses=add_errors_to_responses(
        [
            HTTP_404_NOT_FOUND,
            HTTP_422_UNPROCESSABLE_ENTITY,
        ]
    ),
)
async def get_user_info(
    request: Request,
    project_id: str = Path(
        description=(
            "The project identifier: either project ID or project name. If using a project name, "
            "it cannot contain slash (/), question mark (?), or pound sign (#) characters."
        )
    ),
    limit: int = Query(default=100, gt=0, le=1000, description="Maximum number of user informations!"),
) -> JSONResponse:
    async with request.app.state.db() as session:
        stmt = (
            select(models.UserInfo)
            .where(
                models.UserInfo.project_id == project_id,
            )
            .limit(limit)
        )
        result = await session.execute(stmt)
    user_info_rows = result.scalars().all()

    user_info_list = [
        {
            "user_id": user_info.user_id,
            "name": user_info.name,
            "email": user_info.email,
            "last_login": user_info.last_login.isoformat(),
            "project_id": user_info.project_id
        }
        for user_info in user_info_rows
    ]

    return JSONResponse(content=user_info_list)

@router.post(
    "/projects/{project_id}/usages_message_info",
    operation_id="Insert message informations",
    summary="insert message info",
    responses=add_errors_to_responses(
        [
            HTTP_404_NOT_FOUND,
            HTTP_422_UNPROCESSABLE_ENTITY,
        ]
    ),
)
async def insert_message_info(
    request: Request,
    project_id: str = Path(
        description=(
            "The project identifier: either project ID or project name. If using a project name, "
            "it cannot contain slash (/), question mark (?), or pound sign (#) characters."
        )
    ),
) -> JSONResponse:
    
    body = await request.body()
    body_data = body.decode('utf-8')
    json_data = json.loads(body_data)

    message_info_df = pd.read_json(json_data, orient="records")
    message_info_df['timestamp'] = pd.to_datetime(message_info_df['timestamp'])

    async with request.app.state.db() as session:
        for index, row in message_info_df.iterrows():
            print(f"{row['user_id']} | {row['message_id']} | {row['conversation_id']} | {row['timestamp']}")
            new_message_info = models.MessageInfo(
                project_id=project_id,
                user_id=row['user_id'],
                message_id=row['message_id'],
                conversation_id=str(row['conversation_id']),
                timestamp=row['timestamp']
            )
            session.add(new_message_info)

    return JSONResponse("{}")

@router.get(
    "/projects/{project_id}/usages_message_info",
    operation_id="Get message informations",
    summary="get message info",
    responses=add_errors_to_responses(
        [
            HTTP_404_NOT_FOUND,
            HTTP_422_UNPROCESSABLE_ENTITY,
        ]
    ),
)
async def get_message_info(
    request: Request,
    project_id: str = Path(
        description=(
            "The project identifier: either project ID or project name. If using a project name, "
            "it cannot contain slash (/), question mark (?), or pound sign (#) characters."
        )
    ),
    limit: int = Query(default=100, gt=0, le=1000, description="Maximum number of user informations!"),
) -> JSONResponse:
    async with request.app.state.db() as session:
        stmt = (
            select(models.MessageInfo)
            .where(
                models.MessageInfo.project_id == project_id,
            )
            .limit(limit)
        )
        result = await session.execute(stmt)
    message_info_rows = result.scalars().all()

    message_info_list = [
        {
            "user_id": message_info.user_id,
            "message_id": message_info.message_id,
            "conversation_id": message_info.conversation_id,
            "timestamp": message_info.timestamp.isoformat(),
        }
        for message_info in message_info_rows
    ]

    return JSONResponse(content=message_info_list)

@router.post(
    "/projects/{project_id}/usages_conversation_info",
    operation_id="Insert conversation informations",
    summary="insert conversation info",
    responses=add_errors_to_responses(
        [
            HTTP_404_NOT_FOUND,
            HTTP_422_UNPROCESSABLE_ENTITY,
        ]
    ),
)


async def insert_conversation_info(
    request: Request,
    project_id: str = Path(
        description=(
            "The project identifier: either project ID or project name. If using a project name, "
            "it cannot contain slash (/), question mark (?), or pound sign (#) characters."
        )
    ),
) -> JSONResponse:
    
    body = await request.body()
    body_data = body.decode('utf-8')
    json_data = json.loads(body_data)

    conversation_info_df = pd.read_json(json_data, orient="records")
    conversation_info_df['last_interaction'] = pd.to_datetime(conversation_info_df['last_interaction'])

    async with request.app.state.db() as session:
        for index, row in conversation_info_df.iterrows():
            print(f"{row['user_id']} | {row['conversation_id']} | {row['last_interaction']}")
            new_conversation_info = models.ConversationInfo(
                project_id=project_id,
                user_id=row['user_id'],
                conversation_id=str(row['conversation_id']),
                last_interaction=row['last_interaction']
            )
            session.add(new_conversation_info)

    return JSONResponse("{}")

@router.get(
    "/projects/{project_id}/usages_conversation_info",
    operation_id="Get conversation informations",
    summary="get conversation info",
    responses=add_errors_to_responses(
        [
            HTTP_404_NOT_FOUND,
            HTTP_422_UNPROCESSABLE_ENTITY,
        ]
    ),
)
async def get_conversation_info(
    request: Request,
    project_id: str = Path(
        description=(
            "The project identifier: either project ID or project name. If using a project name, "
            "it cannot contain slash (/), question mark (?), or pound sign (#) characters."
        )
    ),
    limit: int = Query(default=100, gt=0, le=1000, description="Maximum number of user informations!"),
) -> JSONResponse:
    async with request.app.state.db() as session:
        stmt = (
            select(models.ConversationInfo)
            .where(
                models.ConversationInfo.project_id == project_id,
            )
            .limit(limit)
        )
        result = await session.execute(stmt)
    conversation_info_rows = result.scalars().all()

    conversation_info_list = [
        {
            "user_id": conversation_info.user_id,
            "conversation_id": conversation_info.conversation_id,
            "last_interaction": conversation_info.last_interaction.isoformat(),
        }
        for conversation_info in conversation_info_rows
    ]

    return JSONResponse(content=conversation_info_list)


class TraceAnnotationResult(V1RoutesBaseModel):
    label: Optional[str] = Field(default=None, description="The label assigned by the annotation")
    score: Optional[float] = Field(default=None, description="The score assigned by the annotation")
    explanation: Optional[str] = Field(
        default=None, description="Explanation of the annotation result"
    )


class TraceAnnotation(V1RoutesBaseModel):
    trace_id: str = Field(description="OpenTelemetry Trace ID (hex format w/o 0x prefix)")
    name: str = Field(description="The name of the annotation")
    annotator_kind: Literal["LLM", "HUMAN"] = Field(
        description="The kind of annotator used for the annotation"
    )
    result: Optional[TraceAnnotationResult] = Field(
        default=None, description="The result of the annotation"
    )
    metadata: Optional[dict[str, Any]] = Field(
        default=None, description="Metadata for the annotation"
    )
    identifier: str = Field(
        default="",
        description=(
            "The identifier of the annotation. "
            "If provided, the annotation will be updated if it already exists."
        ),
    )

    def as_precursor(self, *, user_id: Optional[int] = None) -> Precursors.TraceAnnotation:
        return Precursors.TraceAnnotation(
            self.trace_id,
            models.TraceAnnotation(
                name=self.name,
                annotator_kind=self.annotator_kind,
                score=self.result.score if self.result else None,
                label=self.result.label if self.result else None,
                explanation=self.result.explanation if self.result else None,
                metadata_=self.metadata or {},
                identifier=self.identifier,
                source="APP",
                user_id=user_id,
            ),
        )


class AnnotateTracesRequestBody(RequestBody[list[TraceAnnotation]]):
    data: list[TraceAnnotation] = Field(description="The trace annotations to be upserted")


class InsertedTraceAnnotation(V1RoutesBaseModel):
    id: str = Field(description="The ID of the inserted trace annotation")


class AnnotateTracesResponseBody(ResponseBody[list[InsertedTraceAnnotation]]):
    pass


@router.post(
    "/trace_annotations",
    operation_id="annotateTraces",
    summary="Create trace annotations",
    responses=add_errors_to_responses(
        [{"status_code": HTTP_404_NOT_FOUND, "description": "Trace not found"}]
    ),
    include_in_schema=False,
)
async def annotate_traces(
    request: Request,
    request_body: AnnotateTracesRequestBody,
    sync: bool = Query(default=True, description="If true, fulfill request synchronously."),
) -> AnnotateTracesResponseBody:
    if not request_body.data:
        return AnnotateTracesResponseBody(data=[])

    user_id: Optional[int] = None
    if request.app.state.authentication_enabled and isinstance(request.user, PhoenixUser):
        user_id = int(request.user.identity)

    precursors = [d.as_precursor(user_id=user_id) for d in request_body.data]
    if not sync:
        await request.state.enqueue(*precursors)
        return AnnotateTracesResponseBody(data=[])

    trace_ids = {p.trace_id for p in precursors}
    async with request.app.state.db() as session:
        existing_traces = {
            trace.trace_id: trace.id
            async for trace in await session.stream_scalars(
                select(models.Trace).filter(models.Trace.trace_id.in_(trace_ids))
            )
        }

        missing_trace_ids = trace_ids - set(existing_traces.keys())
        if missing_trace_ids:
            raise HTTPException(
                detail=f"Traces with IDs {', '.join(missing_trace_ids)} do not exist.",
                status_code=HTTP_404_NOT_FOUND,
            )
        inserted_ids = []
        for p in precursors:
            values = dict(as_kv(p.as_insertable(existing_traces[p.trace_id]).row))
            trace_annotation_id = await session.scalar(
                insert(models.TraceAnnotation).values(**values).returning(models.TraceAnnotation.id)
            )
            inserted_ids.append(trace_annotation_id)
    request.state.event_queue.put(TraceAnnotationInsertEvent(tuple(inserted_ids)))
    return AnnotateTracesResponseBody(
        data=[
            InsertedTraceAnnotation(id=str(GlobalID("TraceAnnotation", str(id_))))
            for id_ in inserted_ids
        ]
    )


async def _add_spans(req: ExportTraceServiceRequest, state: State) -> None:
    for resource_spans in req.resource_spans:
        project_name = get_project_name(resource_spans.resource.attributes)
        for scope_span in resource_spans.scope_spans:
            for otlp_span in scope_span.spans:
                span = await run_in_threadpool(decode_otlp_span, otlp_span)
                await state.queue_span_for_bulk_insert(span, project_name)
