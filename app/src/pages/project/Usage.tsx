import { ReactNode, startTransition, Suspense, useEffect, useMemo } from "react";
import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { css } from "@emotion/react";

import { HelpTooltip, TooltipTrigger, TriggerWrap } from "@arizeai/components";
import {
  ConnectedLastNTimeRangePicker,
  ErrorBoundary,
  Flex,
  Loading,
  Text,
  TextErrorBoundaryFallback,
  View,
} from "@phoenix/components";
import { LatencyText } from "@phoenix/components/trace/LatencyText";
import { StreamStateProvider, useStreamState } from "@phoenix/contexts/StreamStateContext";
import { formatInt, intFormatter } from "@phoenix/utils/numberFormatUtils";

import { UsagePage_stats$key } from "./__generated__/UsagePage_stats.graphql";
import { UsagePageQuery } from "./__generated__/UsagePageQuery.graphql";
import { AnnotationSummary } from "./AnnotationSummary";
import { DocumentEvaluationSummary } from "./DocumentEvaluationSummary";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import { useTimeRange } from "@phoenix/components/datetime";
import { ProjectPageHeader_stats$key } from "./__generated__/ProjectPageHeader_stats.graphql";
import { useParams } from "react-router";
import { useProjectStats } from "./ProjectPageHeader";
import { useProjectPageData } from "./ProjectPage";

export function Usage() {
  const { projectId } = useParams();
  const { timeRange } = useTimeRange();
  return(
    <Suspense fallback={<Loading />}>
        <UsagePageHeader
          projectId={projectId as string}
          timeRange={timeRange}
        />
    </Suspense>
  )
}

export function UsagePage(props: {
  project: ProjectPageHeader_stats$key;
}) {

  const [data, refetch] = useProjectStats(props.project);

  // return (<div>123</div>)

  useEffect(() => {
    startTransition(() => {
      refetch({}, { fetchPolicy: "store-and-network" });
    });
  }, [refetch]);

  const {
    userCount,
    countOfConversation,
    messageCount,
    avgMonthlyActiveUsers,
    avgDailyActiveUsers,
    avgMessagesPerConversation,
    monthlyActiveUsers,
    messagesOverMonths,
  } = data;

  return (
    <View paddingStart="size-200" paddingEnd="size-200" paddingTop="size-600" paddingBottom="size-50" flex="none">
      <Flex direction="column" justifyContent="space-evenly" alignItems="end">
        <ConnectedLastNTimeRangePicker />
      </Flex>
      <Flex direction="column" justifyContent="space-evenly" alignItems="center" gap="size-1000">
        {/* Top Metrics */}
        <Flex direction="row" gap="size-400" alignItems="center" marginBottom={10}>
          <MetricBlock label="User Count" value={userCount} />
          <MetricBlock label="Count of Conversation" value={countOfConversation} />
          <MetricBlock label="Message Count" value={messageCount} />
          <MetricBlock label="Avg Monthly Active Users" value={avgMonthlyActiveUsers} />
          <MetricBlock label="Avg Daily Active Users" value={avgDailyActiveUsers} />
          <MetricBlock label="Avg Messages per Conversation" value={avgMessagesPerConversation} />
        </Flex>

        {/* Line Charts */}
        <Flex direction="row" alignItems="center">
          <LineChart width={600} height={400} data={monthlyActiveUsers}>
            <XAxis dataKey="timestamp" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
          <LineChart width={600} height={400} data={messagesOverMonths}>
            <XAxis dataKey="timestamp" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </Flex>
      </Flex>
    </View>
  );
}

export function UsagePageHeader({
  projectId,
  timeRange,
}: {
  projectId: string;
  timeRange: OpenTimeRange;
}) {

  const timeRangeVariable = useMemo(() => {
    return {
      start: timeRange?.start?.toISOString(),
      end: timeRange?.end?.toISOString(),
    };
  }, [timeRange]);

  const data = useProjectPageData(projectId, timeRange);
  
  return (
    <StreamStateProvider>
      <UsagePage
        project={data.project}
      />
    </StreamStateProvider>)
}

// Simple metric display
function MetricBlock({ label, value }: { label: string; value: number }) {
  return (
    <Flex direction="column" flex="none" alignItems="center">
      <Text elementType="h2" size="XL">{intFormatter(value)}</Text>
      <Text css={css`text-align: center;`} size="XS" color="text-700" maxWidth={150}>{label}</Text>
    </Flex>
  );
}
