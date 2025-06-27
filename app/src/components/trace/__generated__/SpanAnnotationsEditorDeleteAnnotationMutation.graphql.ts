/**
 * @generated SignedSource<<9c81f6914d024b9d429efd7ec267b41e>>
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
export type SpanAnnotationsEditorDeleteAnnotationMutation$variables = {
  annotationIds: ReadonlyArray<string>;
  departments?: ReadonlyArray<string> | null;
  projectId: string;
  spanId: string;
  timeRange: TimeRange;
};
export type SpanAnnotationsEditorDeleteAnnotationMutation$data = {
  readonly deleteSpanAnnotations: {
    readonly query: {
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"AnnotationSummaryGroup" | "SpanAnnotationsEditor_spanAnnotations" | "SpanAsideAnnotationList_span" | "SpanFeedback_annotations" | "TraceHeaderRootSpanAnnotationsFragment">;
      };
      readonly project: {
        readonly " $fragmentSpreads": FragmentRefs<"ProjectPageHeader_stats">;
      };
    };
  };
};
export type SpanAnnotationsEditorDeleteAnnotationMutation = {
  response: SpanAnnotationsEditorDeleteAnnotationMutation$data;
  variables: SpanAnnotationsEditorDeleteAnnotationMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "annotationIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "departments"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "projectId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "spanId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "timeRange"
},
v5 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "annotationIds",
        "variableName": "annotationIds"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "projectId"
  }
],
v7 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "spanId"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "kind": "Variable",
  "name": "timeRange",
  "variableName": "timeRange"
},
v11 = [
  (v10/*: any*/)
],
v12 = [
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
v13 = [
  {
    "kind": "Variable",
    "name": "departments",
    "variableName": "departments"
  },
  (v10/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "count",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rate",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "score",
  "storageKey": null
},
v19 = {
  "kind": "InlineFragment",
  "selections": [
    (v9/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annotatorKind",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "explanation",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SpanAnnotationsEditorDeleteAnnotationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "SpanAnnotationMutationPayload",
        "kind": "LinkedField",
        "name": "deleteSpanAnnotations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Query",
            "kind": "LinkedField",
            "name": "query",
            "plural": false,
            "selections": [
              {
                "alias": "project",
                "args": (v6/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ProjectPageHeader_stats"
                      }
                    ],
                    "type": "Project",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "AnnotationSummaryGroup"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "TraceHeaderRootSpanAnnotationsFragment"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SpanAnnotationsEditor_spanAnnotations"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SpanAsideAnnotationList_span"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SpanFeedback_annotations"
                      }
                    ],
                    "type": "Span",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "SpanAnnotationsEditorDeleteAnnotationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "SpanAnnotationMutationPayload",
        "kind": "LinkedField",
        "name": "deleteSpanAnnotations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Query",
            "kind": "LinkedField",
            "name": "query",
            "plural": false,
            "selections": [
              {
                "alias": "project",
                "args": (v6/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "traceCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "tokenCountTotal",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "tokenCountPrompt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
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
                          (v10/*: any*/)
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
                          (v10/*: any*/)
                        ],
                        "kind": "ScalarField",
                        "name": "latencyMsQuantile",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "userCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "countOfConversation",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "messageCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "avgMonthlyActiveUsers",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "concreteType": "MonthlyActiverUser",
                        "kind": "LinkedField",
                        "name": "monthlyActiveUsers",
                        "plural": true,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "concreteType": "MessagesOverMonth",
                        "kind": "LinkedField",
                        "name": "messagesOverMonths",
                        "plural": true,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "avgDailyActiveUsers",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
                        "kind": "ScalarField",
                        "name": "avgMessagesPerConversation",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v13/*: any*/),
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
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v13/*: any*/),
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
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v13/*: any*/),
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
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v13/*: any*/),
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
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v13/*: any*/),
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
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v11/*: any*/),
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
                      }
                    ],
                    "type": "Project",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Project",
                        "kind": "LinkedField",
                        "name": "project",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AnnotationConfigConnection",
                            "kind": "LinkedField",
                            "name": "annotationConfigs",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AnnotationConfigEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "annotationType",
                                            "storageKey": null
                                          }
                                        ],
                                        "type": "AnnotationConfigBase",
                                        "abstractKey": "__isAnnotationConfigBase"
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v9/*: any*/),
                                          (v16/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "optimizationDirection",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CategoricalAnnotationValue",
                                            "kind": "LinkedField",
                                            "name": "values",
                                            "plural": true,
                                            "selections": [
                                              (v17/*: any*/),
                                              (v18/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "type": "CategoricalAnnotationConfig",
                                        "abstractKey": null
                                      },
                                      (v19/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "configs",
                                "args": null,
                                "concreteType": "AnnotationConfigEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": "config",
                                    "args": null,
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      (v19/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v16/*: any*/)
                                        ],
                                        "type": "AnnotationConfigBase",
                                        "abstractKey": "__isAnnotationConfigBase"
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SpanAnnotation",
                        "kind": "LinkedField",
                        "name": "spanAnnotations",
                        "plural": true,
                        "selections": [
                          (v9/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "username",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "profilePictureUrl",
                                "storageKey": null
                              },
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v22/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "metadata",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "identifier",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "source",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "updatedAt",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AnnotationSummary",
                        "kind": "LinkedField",
                        "name": "spanAnnotationSummaries",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "LabelFraction",
                            "kind": "LinkedField",
                            "name": "labelFractions",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "fraction",
                                "storageKey": null
                              },
                              (v17/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "meanScore",
                            "storageKey": null
                          },
                          (v16/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "filteredSpanAnnotations",
                        "args": [
                          {
                            "fields": [
                              {
                                "kind": "Literal",
                                "name": "exclude",
                                "value": {
                                  "names": [
                                    "note"
                                  ]
                                }
                              },
                              {
                                "fields": [
                                  {
                                    "kind": "Literal",
                                    "name": "userIds",
                                    "value": null
                                  }
                                ],
                                "kind": "ObjectValue",
                                "name": "include"
                              }
                            ],
                            "kind": "ObjectValue",
                            "name": "filter"
                          }
                        ],
                        "concreteType": "SpanAnnotation",
                        "kind": "LinkedField",
                        "name": "spanAnnotations",
                        "plural": true,
                        "selections": [
                          (v9/*: any*/),
                          (v16/*: any*/),
                          (v20/*: any*/),
                          (v18/*: any*/),
                          (v17/*: any*/),
                          (v22/*: any*/),
                          (v21/*: any*/)
                        ],
                        "storageKey": "spanAnnotations(filter:{\"exclude\":{\"names\":[\"note\"]},\"include\":{\"userIds\":null}})"
                      }
                    ],
                    "type": "Span",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2cbbfe17201c7e552bd187eef833e541",
    "id": null,
    "metadata": {},
    "name": "SpanAnnotationsEditorDeleteAnnotationMutation",
    "operationKind": "mutation",
    "text": "mutation SpanAnnotationsEditorDeleteAnnotationMutation(\n  $spanId: ID!\n  $annotationIds: [ID!]!\n  $timeRange: TimeRange!\n  $projectId: ID!\n  $departments: [String!]\n) {\n  deleteSpanAnnotations(input: {annotationIds: $annotationIds}) {\n    query {\n      project: node(id: $projectId) {\n        __typename\n        ... on Project {\n          ...ProjectPageHeader_stats\n        }\n        id\n      }\n      node(id: $spanId) {\n        __typename\n        ... on Span {\n          ...AnnotationSummaryGroup\n          ...TraceHeaderRootSpanAnnotationsFragment\n          ...SpanAnnotationsEditor_spanAnnotations\n          ...SpanAsideAnnotationList_span\n          ...SpanFeedback_annotations\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment AnnotationSummaryGroup on Span {\n  project {\n    id\n    annotationConfigs {\n      edges {\n        node {\n          __typename\n          ... on AnnotationConfigBase {\n            __isAnnotationConfigBase: __typename\n            annotationType\n          }\n          ... on CategoricalAnnotationConfig {\n            id\n            name\n            optimizationDirection\n            values {\n              label\n              score\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n  spanAnnotations {\n    id\n    name\n    label\n    score\n    annotatorKind\n    createdAt\n    user {\n      username\n      profilePictureUrl\n      id\n    }\n  }\n  spanAnnotationSummaries {\n    labelFractions {\n      fraction\n      label\n    }\n    meanScore\n    name\n  }\n}\n\nfragment ProjectPageHeader_stats on Project {\n  traceCount(timeRange: $timeRange)\n  tokenCountTotal(timeRange: $timeRange)\n  tokenCountPrompt(timeRange: $timeRange)\n  tokenCountCompletion(timeRange: $timeRange)\n  latencyMsP50: latencyMsQuantile(probability: 0.5, timeRange: $timeRange)\n  latencyMsP99: latencyMsQuantile(probability: 0.99, timeRange: $timeRange)\n  userCount(timeRange: $timeRange)\n  countOfConversation(timeRange: $timeRange)\n  messageCount(timeRange: $timeRange)\n  avgMonthlyActiveUsers(timeRange: $timeRange)\n  monthlyActiveUsers(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  messagesOverMonths(timeRange: $timeRange) {\n    timestamp\n    value\n  }\n  avgDailyActiveUsers(timeRange: $timeRange)\n  avgMessagesPerConversation(timeRange: $timeRange)\n  usageBySellers(timeRange: $timeRange, departments: $departments) {\n    type\n    count\n  }\n  sellersByWorkRegion(timeRange: $timeRange, departments: $departments) {\n    region\n    count\n  }\n  conversationsByChatMode(timeRange: $timeRange, departments: $departments) {\n    mode\n    rate\n  }\n  conversationsByLanguage(timeRange: $timeRange, departments: $departments) {\n    language\n    rate\n  }\n  responseRatingByUsers(timeRange: $timeRange, departments: $departments) {\n    user\n    rate\n  }\n  departmentList(timeRange: $timeRange)\n  spanAnnotationNames\n  documentEvaluationNames\n  id\n}\n\nfragment SpanAnnotationsEditor_spanAnnotations on Span {\n  id\n  filteredSpanAnnotations: spanAnnotations(filter: {exclude: {names: [\"note\"]}, include: {}}) {\n    id\n    name\n    annotatorKind\n    score\n    label\n    explanation\n    createdAt\n  }\n}\n\nfragment SpanAsideAnnotationList_span on Span {\n  project {\n    id\n    annotationConfigs {\n      configs: edges {\n        config: node {\n          __typename\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on AnnotationConfigBase {\n            __isAnnotationConfigBase: __typename\n            name\n          }\n        }\n      }\n    }\n  }\n  spanAnnotations {\n    id\n  }\n  ...AnnotationSummaryGroup\n}\n\nfragment SpanFeedback_annotations on Span {\n  id\n  spanAnnotations {\n    id\n    name\n    label\n    score\n    explanation\n    metadata\n    annotatorKind\n    identifier\n    source\n    createdAt\n    updatedAt\n    user {\n      id\n      username\n      profilePictureUrl\n    }\n  }\n}\n\nfragment TraceHeaderRootSpanAnnotationsFragment on Span {\n  ...AnnotationSummaryGroup\n}\n"
  }
};
})();

(node as any).hash = "fec908d7cf5d90a32460eb62b2d2b645";

export default node;
