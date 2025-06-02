import { ReactNode, startTransition, useEffect } from "react";
import { graphql, useRefetchableFragment } from "react-relay";
import { css } from "@emotion/react";

import { HelpTooltip, TooltipTrigger, TriggerWrap } from "@arizeai/components";

import {
  ErrorBoundary,
  Flex,
  Text,
  TextErrorBoundaryFallback,
  View,
} from "@phoenix/components";
import { LatencyText } from "@phoenix/components/trace/LatencyText";
import { useStreamState } from "@phoenix/contexts/StreamStateContext";
import { formatInt, intFormatter } from "@phoenix/utils/numberFormatUtils";

import { ProjectPageHeader_stats$key } from "./__generated__/ProjectPageHeader_stats.graphql";
import { ProjectPageHeaderQuery } from "./__generated__/ProjectPageHeaderQuery.graphql";
import { AnnotationSummary } from "./AnnotationSummary";
import { DocumentEvaluationSummary } from "./DocumentEvaluationSummary";

export function ProjectPageHeader(props: {
  project: ProjectPageHeader_stats$key;
  /**
   * the extra component displayed on the right side of the header
   */
  extra: ReactNode;
}) {
  const { extra } = props;
  const { fetchKey } = useStreamState();
  const [data, refetch] = useRefetchableFragment<
    ProjectPageHeaderQuery,
    ProjectPageHeader_stats$key
  >(
    graphql`
      fragment ProjectPageHeader_stats on Project
      @refetchable(queryName: "ProjectPageHeaderQuery") {
        traceCount(timeRange: $timeRange)
        tokenCountTotal(timeRange: $timeRange)
        tokenCountPrompt(timeRange: $timeRange)
        tokenCountCompletion(timeRange: $timeRange)
        latencyMsP50: latencyMsQuantile(
          probability: 0.50
          timeRange: $timeRange
        )
        latencyMsP99: latencyMsQuantile(
          probability: 0.99
          timeRange: $timeRange
        )
        userCount(timeRange: $timeRange)
        countOfConversation(timeRange: $timeRange)
        messageCount(timeRange: $timeRange)
        avgMonthlyActiveUsers(timeRange: $timeRange)
        avgDailyActiveUsers(timeRange: $timeRange)
        avgMessagesPerConversation(timeRange: $timeRange)
        spanAnnotationNames
        documentEvaluationNames
      }
    `,
    props.project
  );

  // Refetch the count of traces if the fetchKey changes
  useEffect(() => {
    startTransition(() => {
      refetch({}, { fetchPolicy: "store-and-network" });
    });
  }, [fetchKey, refetch]);

  const latencyMsP50 = data?.latencyMsP50;
  const latencyMsP99 = data?.latencyMsP99;
  const tokenCountTotal = data?.tokenCountTotal;
  const tokenCountPrompt = data?.tokenCountPrompt;
  const tokenCountCompletion = data?.tokenCountCompletion;
  const userCount = data?.userCount;
  const countOfConversation = data?.countOfConversation;
  const messageCount = data?.messageCount;
  const avgMonthlyActiveUsers = data?.avgMonthlyActiveUsers;
  const avgDailyActiveUsers = data?.avgDailyActiveUsers;
  const avgMessagesPerConversation = data?.avgMessagesPerConversation;
  const spanAnnotationNames = data?.spanAnnotationNames?.filter(
    (name) => name !== "note"
  );
  const documentEvaluationNames = data?.documentEvaluationNames;

  return (
    <View
      paddingStart="size-200"
      paddingEnd="size-200"
      paddingTop="size-200"
      paddingBottom="size-50"
      flex="none"
    >
      <Flex direction="column" justifyContent="space-between" alignItems="center">
        <Flex direction="row" gap="size-400" alignItems="center" marginBottom={10}>
          <Flex direction="column" flex="none" alignItems="center">
            <Text elementType="h2" size="XL">{intFormatter(userCount)}</Text>
            <Text css={css`
                text-align: center;
              `} size="XS" color="text-700"  maxWidth={150}
            >
              User Count
            </Text>
          </Flex>
          <Flex direction="column" flex="none" alignItems="center">
            <Text elementType="h2" size="XL">{intFormatter(countOfConversation)}</Text>
            <Text css={css`
                text-align: center;
              `} size="XS" color="text-700"  maxWidth={150}
            >
              Count of conversation
            </Text>
          </Flex>
          <Flex direction="column" flex="none" alignItems="center">
            <Text elementType="h2" size="XL">{intFormatter(messageCount)}</Text>
            <Text css={css`
                text-align: center;
              `} size="XS" color="text-700"  maxWidth={150}
            >
              Message Count
            </Text>
          </Flex>
          <Flex direction="column" flex="none" alignItems="center">
            <Text elementType="h2" size="XL">{intFormatter(avgMonthlyActiveUsers)}</Text>
            <Text css={css`
                text-align: center;
              `} size="XS" color="text-700"  maxWidth={150}
            >
              Average Monthly Active Users
            </Text>
          </Flex>
          <Flex direction="column" flex="none" alignItems="center">
            <Text elementType="h2" size="XL">{intFormatter(avgDailyActiveUsers)}</Text>
            <Text css={css`
                text-align: center;
              `} size="XS" color="text-700"  maxWidth={150}
            >
              Average Daily Active Users
            </Text>
          </Flex>
          <Flex direction="column" flex="none" alignItems="center">
            <Text elementType="h2" size="XL">{intFormatter(avgMessagesPerConversation)}</Text>
            <Text css={css`
                text-align: center;
              `} size="XS" color="text-700"  maxWidth={150}
            >
              Average Messages per Conversation
            </Text>
          </Flex>
        </Flex>
        <Flex direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <div
            css={css`
              overflow-x: auto;
              overflow-y: hidden;
              flex: 1 1 auto;
              background-image: linear-gradient(
                  to right,
                  var(--ac-global-color-grey-75),
                  var(--ac-global-color-grey-75)
                ),
                linear-gradient(
                  to right,
                  var(--ac-global-color-grey-75),
                  var(--ac-global-color-grey-75)
                ),
                linear-gradient(
                  to right,
                  rgba(var(--ac-global-color-grey-300-rgb), 0.9),
                  rgba(var(--ac-global-color-grey-300-rgb), 0)
                ),
                linear-gradient(
                  to left,
                  rgba(var(--ac-global-color-grey-300-rgb), 0.9),
                  rgba(var(--ac-global-color-grey-300-rgb), 0)
                );
              background-repeat: no-repeat;
              background-size:
                32px 100%,
                32px 100%,
                32px 100%,
                32px 100%;
              background-position:
                left center,
                right center,
                left center,
                right center;
              background-attachment: local, local, scroll, scroll;
            `}
          >
            <Flex direction="row" gap="size-400" alignItems="center">
              <Flex direction="column" flex="none">
                <Text elementType="h3" size="S" color="text-700">
                  Total Traces
                </Text>
                <Text size="L">{intFormatter(data?.traceCount)}</Text>
              </Flex>
              <Flex direction="column" flex="none">
                <Text elementType="h3" size="S" color="text-700">
                  Total Tokens
                </Text>
                <TooltipTrigger delay={0} placement="bottom">
                  <TriggerWrap>
                    <Text size="L">{intFormatter(tokenCountTotal)}</Text>
                  </TriggerWrap>
                  <HelpTooltip>
                    <View width="size-2400">
                      <Flex direction="column">
                        <Flex justifyContent="space-between">
                          <Text>Prompt Tokens</Text>
                          <Text>
                            {typeof tokenCountPrompt === "number"
                              ? formatInt(tokenCountPrompt)
                              : "--"}
                          </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text>Completion Tokens</Text>
                          <Text>
                            {typeof tokenCountCompletion === "number"
                              ? formatInt(tokenCountCompletion)
                              : "--"}
                          </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text>Total Tokens</Text>
                          <Text>
                            {typeof tokenCountTotal === "number"
                              ? formatInt(tokenCountTotal)
                              : "--"}
                          </Text>
                        </Flex>
                      </Flex>
                    </View>
                  </HelpTooltip>
                </TooltipTrigger>
              </Flex>
              <Flex direction="column" flex="none">
                <Text elementType="h3" size="S" color="text-700">
                  Latency P50
                </Text>
                {latencyMsP50 != null ? (
                  <LatencyText latencyMs={latencyMsP50} size="L" />
                ) : (
                  <Text size="L">--</Text>
                )}
              </Flex>
              <Flex direction="column" flex="none">
                <Text elementType="h3" size="S" color="text-700">
                  Latency P99
                </Text>

                {latencyMsP99 != null ? (
                  <LatencyText latencyMs={latencyMsP99} size="L" />
                ) : (
                  <Text size="L">--</Text>
                )}
              </Flex>
              {spanAnnotationNames.map((name) => (
                <ErrorBoundary key={name} fallback={TextErrorBoundaryFallback}>
                  <AnnotationSummary key={name} annotationName={name} />
                </ErrorBoundary>
              ))}
              {documentEvaluationNames.map((name) => (
                <DocumentEvaluationSummary
                  key={`document-${name}`}
                  evaluationName={name}
                />
              ))}
            </Flex>
          </div>
          <View flex="none" paddingStart="size-100">
            {extra}
          </View>
        </Flex>
      </Flex>
    </View>
  );
}
