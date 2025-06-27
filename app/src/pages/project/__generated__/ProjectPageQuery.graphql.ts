/**
 * @generated SignedSource<<34cfa681176caaa51c1ac255e877a55b>>
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
  departments?: ReadonlyArray<string> | null;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "departments"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "timeRange"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v4 = {
  "kind": "Variable",
  "name": "timeRange",
  "variableName": "timeRange"
},
v5 = [
  (v4/*: any*/)
],
v6 = [
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
],
v7 = [
  {
    "kind": "Variable",
    "name": "departments",
    "variableName": "departments"
  },
  (v4/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "count",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectPageQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v3/*: any*/),
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProjectPageQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v3/*: any*/),
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
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "traceCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountTotal",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountPrompt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
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
                  (v4/*: any*/)
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
                  (v4/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "latencyMsQuantile",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "userCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "countOfConversation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "messageCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "avgMonthlyActiveUsers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "MonthlyActiverUser",
                "kind": "LinkedField",
                "name": "monthlyActiveUsers",
                "plural": true,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "MessagesOverMonth",
                "kind": "LinkedField",
                "name": "messagesOverMonths",
                "plural": true,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "avgDailyActiveUsers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "avgMessagesPerConversation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "UsageBySeller",
                "kind": "LinkedField",
                "name": "usageBySellers",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "SellerByWorkRegion",
                "kind": "LinkedField",
                "name": "sellersByWorkRegion",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "region",
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "ConversationByChatMode",
                "kind": "LinkedField",
                "name": "conversationsByChatMode",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mode",
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "ConversationByLanguage",
                "kind": "LinkedField",
                "name": "conversationsByLanguage",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "language",
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "ResponseRatingByUser",
                "kind": "LinkedField",
                "name": "responseRatingByUsers",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "user",
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "kind": "ScalarField",
                "name": "departmentList",
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
    "cacheID": "4cd8072ad0ca1418cafe12a1b13a1240",
    "id": null,
    "metadata": {},
    "name": "ProjectPageQuery",
    "operationKind": "query",
    "text": "query ProjectPageQuery(\n  $id: ID!\n  $timeRange: TimeRange!\n  $departments: [String!]\n) {\n  project: node(id: $id) {\n    __typename\n    ...ProjectPageHeader_stats\n    ...StreamToggle_data\n    id\n  }\n}\n\nfragment ProjectPageHeader_stats on Project {\n  traceCount(timeRange: $timeRange)\n  tokenCountTotal(timeRange: $timeRange)\n  tokenCountPrompt(timeRange: $timeRange)\n  tokenCountCompletion(timeRange: $timeRange)\n  latencyMsP50: latencyMsQuantile(probability: 0.5, timeRange: $timeRange)\n  latencyMsP99: latencyMsQuantile(probability: 0.99, timeRange: $timeRange)\n  userCount(timeRange: $timeRange)\n  countOfConversation(timeRange: $timeRange)\n  messageCount(timeRange: $timeRange)\n  avgMonthlyActiveUsers(timeRange: $timeRange)\n  monthlyActiveUsers(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  messagesOverMonths(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  avgDailyActiveUsers(timeRange: $timeRange)\n  avgMessagesPerConversation(timeRange: $timeRange)\n  usageBySellers(timeRange: $timeRange, departments: $departments) {\n    type\n    count\n  }\n  sellersByWorkRegion(timeRange: $timeRange, departments: $departments) {\n    region\n    count\n  }\n  conversationsByChatMode(timeRange: $timeRange, departments: $departments) {\n    mode\n    rate\n  }\n  conversationsByLanguage(timeRange: $timeRange, departments: $departments) {\n    language\n    rate\n  }\n  responseRatingByUsers(timeRange: $timeRange, departments: $departments) {\n    user\n    rate\n  }\n  departmentList(timeRange: $timeRange)\n  spanAnnotationNames\n  documentEvaluationNames\n  id\n}\n\nfragment StreamToggle_data on Project {\n  streamingLastUpdatedAt\n  id\n}\n"
  }
};
})();

(node as any).hash = "3fd3446010f1c00811bd623b8c878521";

export default node;
