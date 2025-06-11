/**
 * @generated SignedSource<<b12513030340d2998f367bacd6eae677>>
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
export type ProjectPageHeaderQuery$variables = {
  id: string;
  timeRange?: TimeRange | null;
};
export type ProjectPageHeaderQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ProjectPageHeader_stats">;
  };
};
export type ProjectPageHeaderQuery = {
  response: ProjectPageHeaderQuery$data;
  variables: ProjectPageHeaderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "timeRange"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "kind": "Variable",
  "name": "timeRange",
  "variableName": "timeRange"
},
v4 = [
  (v3/*: any*/)
],
v5 = [
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectPageHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProjectPageHeader_stats"
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProjectPageHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "traceCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountTotal",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "tokenCountPrompt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
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
                  (v3/*: any*/)
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
                  (v3/*: any*/)
                ],
                "kind": "ScalarField",
                "name": "latencyMsQuantile",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "userCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "countOfConversation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "messageCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "avgMonthlyActiveUsers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "MonthlyActiverUser",
                "kind": "LinkedField",
                "name": "monthlyActiveUsers",
                "plural": true,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "MessagesOverMonth",
                "kind": "LinkedField",
                "name": "messagesOverMonths",
                "plural": true,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "avgDailyActiveUsers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
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
    "cacheID": "20fa1363922a673c2cde20fe17c8244f",
    "id": null,
    "metadata": {},
    "name": "ProjectPageHeaderQuery",
    "operationKind": "query",
    "text": "query ProjectPageHeaderQuery(\n  $timeRange: TimeRange\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ProjectPageHeader_stats\n    id\n  }\n}\n\nfragment ProjectPageHeader_stats on Project {\n  traceCount(timeRange: $timeRange)\n  tokenCountTotal(timeRange: $timeRange)\n  tokenCountPrompt(timeRange: $timeRange)\n  tokenCountCompletion(timeRange: $timeRange)\n  latencyMsP50: latencyMsQuantile(probability: 0.5, timeRange: $timeRange)\n  latencyMsP99: latencyMsQuantile(probability: 0.99, timeRange: $timeRange)\n  userCount(timeRange: $timeRange)\n  countOfConversation(timeRange: $timeRange)\n  messageCount(timeRange: $timeRange)\n  avgMonthlyActiveUsers(timeRange: $timeRange)\n  monthlyActiveUsers(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  messagesOverMonths(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  avgDailyActiveUsers(timeRange: $timeRange)\n  avgMessagesPerConversation(timeRange: $timeRange)\n  spanAnnotationNames\n  documentEvaluationNames\n  id\n}\n"
  }
};
})();

(node as any).hash = "7a703c4d637447dcdd289fcc7e7ed875";

export default node;
