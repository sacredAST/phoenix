from collections import defaultdict
from datetime import datetime, timezone
from typing import Any, Literal, Optional

from cachetools import LFUCache, TTLCache
from sqlalchemy import Select, func, select, cast, DateTime
from sqlalchemy.orm import aliased
from strawberry.dataloader import AbstractCache, DataLoader
from typing_extensions import TypeAlias, assert_never

from phoenix.db import models
from phoenix.server.api.dataloaders.cache import TwoTierCache
from phoenix.server.api.input_types.TimeRange import TimeRange
from phoenix.server.types import DbSessionFactory
from phoenix.trace.dsl import SpanFilter

Kind: TypeAlias = Literal["user_info", "message_info", "conversation_info"]
ProjectRowId: TypeAlias = int
TimeInterval: TypeAlias = tuple[Optional[datetime], Optional[datetime]]

Key: TypeAlias = tuple[Kind, ProjectRowId, TimeInterval, Optional[list[str]]]
Result: TypeAlias = Optional[list[models.UserInfo] | list[models.MessageInfo] | list[models.ConversationInfo]]

class UsageFieldsDataLoader(DataLoader[Key, Result]):
    def __init__(self, db: DbSessionFactory) -> None:
        super().__init__(load_fn=self._load_fn)
        self._db = db

    async def _load_fn(self, keys: Key) -> list[Result]:
        kind, project_id, time_range, departments = keys
        async with self._db() as session:
            stmt = select(models.Project).where(models.Project.id == project_id)
            project = await session.execute(stmt)
            project = project.scalars().first()
            project_name = project.name
            stmt = _get_stmt(
                kind=kind,
                project_name=project_name,
                departments=departments,
                time_range=time_range,
            )
            result = await session.execute(stmt)
        rows = result.scalars().all()
        return rows

# def _get_stmt(
#     kind: str,
#     project_name: str,
#     time_range: Optional[TimeInterval] = None
# ) -> Select[Any]:
#     if kind == "user_info":
#         stmt = select(models.UserInfo).where(
#                 models.UserInfo.project_id == project_name,
#             )
#         time_column = models.UserInfo.last_login
#     elif kind == "message_info":
#         stmt = select(models.MessageInfo).where(
#                 models.MessageInfo.project_id == project_name,
#         )
#         time_column = models.MessageInfo.timestamp
#     elif kind == "conversation_info":
#         stmt = select(models.ConversationInfo).where(
#                 models.ConversationInfo.project_id == project_name,
#         )
#         time_column = models.ConversationInfo.last_interaction

#     if time_range is not None:
#         start_time = time_range.start
#         end_time = time_range.end
#         if start_time:
#             stmt = stmt.where(start_time <= time_column)
#         if end_time:
#             stmt = stmt.where(time_column < end_time)
#     return stmt

def _get_stmt(
    kind: str,
    project_name: str,
    time_range: Optional[TimeInterval] = None,
    departments: Optional[list[str]] = None,
) -> Select[Any]:
    if kind == "user_info":
        stmt = select(models.UserInfo).where(
            models.UserInfo.project_id == project_name,
        )
        time_column = models.UserInfo.last_login
        if departments:
            stmt = stmt.where(models.UserInfo.department.in_(departments))

    elif kind == "message_info":
        User = aliased(models.UserInfo)
        stmt = (
            select(models.MessageInfo)
            .join(User, User.user_id == models.MessageInfo.user_id)
            .where(models.MessageInfo.project_id == project_name)
        )
        time_column = models.MessageInfo.timestamp
        if departments:
            stmt = stmt.where(User.department.in_(departments))

    elif kind == "conversation_info":
        User = aliased(models.UserInfo)
        stmt = (
            select(models.ConversationInfo)
            .join(User, User.user_id == models.ConversationInfo.user_id)
            .where(models.ConversationInfo.project_id == project_name)
        )
        time_column = models.ConversationInfo.last_interaction
        if departments:
            stmt = stmt.where(User.department.in_(departments))

    if time_range is not None:
        start_time = time_range.start
        end_time = time_range.end
        if start_time:
            stmt = stmt.where(start_time <= time_column)
        if end_time:
            stmt = stmt.where(time_column < end_time)

    return stmt