/**
 * @generated SignedSource<<45ee70b062656803edb096d42d285945>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TimeRange = {
  end?: string | null;
  start?: string | null;
};
export type ProjectPageQuery$variables = {
  id: string;
  timeRange: TimeRange;
};
export type ProjectPageQuery$data = {
  readonly project: {
    readonly " $fragmentSpreads": FragmentRefs<"ProjectPageHeader_stats" | "StreamToggle_data">;
  };
};
export type ProjectPageQuery = {
  response: ProjectPageQuery$data;
  variables: ProjectPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "timeRange"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "timeRange",
  "variableName": "timeRange"
},
v3 = [
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "timestamp",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectPageQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProjectPageHeader_stats"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StreamToggle_data"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProjectPageQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "traceCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountTotal",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountPrompt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountCompletion",
                "storageKey": null
              },
              {
                "alias": "latencyMsP50",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "probability",
                    "value": 0.5
                  },
                  (v2/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "latencyMsQuantile",
                "storageKey": null
              },
              {
                "alias": "latencyMsP99",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "probability",
                    "value": 0.99
                  },
                  (v2/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "latencyMsQuantile",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "userCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "countOfConversation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "messageCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "avgMonthlyActiveUsers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "MonthlyActiverUser",
                "kind": "LinkedField",
                "name": "monthlyActiveUsers",
                "plural": true,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "MessagesOverMonth",
                "kind": "LinkedField",
                "name": "messagesOverMonths",
                "plural": true,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "avgDailyActiveUsers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "kind": "ScalarField",
                "name": "avgMessagesPerConversation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "spanAnnotationNames",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "documentEvaluationNames",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "streamingLastUpdatedAt",
                "storageKey": null
              }
            ],
            "type": "Project",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "364ccd1f9202459cff9602016a0779db",
    "id": null,
    "metadata": {},
    "name": "ProjectPageQuery",
    "operationKind": "query",
    "text": "query ProjectPageQuery(\n  $id: ID!\n  $timeRange: TimeRange!\n) {\n  project: node(id: $id) {\n    __typename\n    ...ProjectPageHeader_stats\n    ...StreamToggle_data\n    id\n  }\n}\n\nfragment ProjectPageHeader_stats on Project {\n  traceCount(timeRange: $timeRange)\n  tokenCountTotal(timeRange: $timeRange)\n  tokenCountPrompt(timeRange: $timeRange)\n  tokenCountCompletion(timeRange: $timeRange)\n  latencyMsP50: latencyMsQuantile(probability: 0.5, timeRange: $timeRange)\n  latencyMsP99: latencyMsQuantile(probability: 0.99, timeRange: $timeRange)\n  userCount(timeRange: $timeRange)\n  countOfConversation(timeRange: $timeRange)\n  messageCount(timeRange: $timeRange)\n  avgMonthlyActiveUsers(timeRange: $timeRange)\n  monthlyActiveUsers(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  messagesOverMonths(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  avgDailyActiveUsers(timeRange: $timeRange)\n  avgMessagesPerConversation(timeRange: $timeRange)\n  spanAnnotationNames\n  documentEvaluationNames\n  id\n}\n\nfragment StreamToggle_data on Project {\n  streamingLastUpdatedAt\n  id\n}\n"
  }
};
})();

(node as any).hash = "f940b0d4a1ccd3cfc8bb67f22cd7ccc2";

export default node;
