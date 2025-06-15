// src/graphql/ProjectPage.graphql.ts
import { graphql } from 'react-relay';

export const PROJECT_PAGE_QUERY = graphql`
  query ProjectPageQuery($id: ID!, $timeRange: TimeRange!) {
    project: node(id: $id) {
      ...ProjectPageHeader_stats
      ...StreamToggle_data
    }
  }
`;


export const PROJECT_PAGE_HEADER_STATS = graphql`
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
        monthlyActiveUsers(timeRange: $timeRange) {timestamp value}
        messagesOverMonths(timeRange: $timeRange) {timestamp value}
        avgDailyActiveUsers(timeRange: $timeRange)
        avgMessagesPerConversation(timeRange: $timeRange)
        spanAnnotationNames
        documentEvaluationNames
      }
    `;

export const STREAM_TOGGLE_DATA = graphql`
      fragment StreamToggle_data on Project
      @refetchable(queryName: "StreamToggleRefetchQuery") {
        streamingLastUpdatedAt
      }
    `;
