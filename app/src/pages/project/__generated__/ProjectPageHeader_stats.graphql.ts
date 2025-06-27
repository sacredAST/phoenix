/**
 * @generated SignedSource<<aa2c9119b6e21efdacabafc267b181c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProjectPageHeader_stats$data = {
  readonly avgDailyActiveUsers: number;
  readonly avgMessagesPerConversation: number;
  readonly avgMonthlyActiveUsers: number;
  readonly conversationsByChatMode: ReadonlyArray<{
    readonly mode: string;
    readonly rate: number;
  }>;
  readonly conversationsByLanguage: ReadonlyArray<{
    readonly language: string;
    readonly rate: number;
  }>;
  readonly countOfConversation: number;
  readonly departmentList: Array<string>;
  readonly documentEvaluationNames: ReadonlyArray<string>;
  readonly id: string;
  readonly latencyMsP50: number | null;
  readonly latencyMsP99: number | null;
  readonly messageCount: number;
  readonly messagesOverMonths: ReadonlyArray<{
    readonly timestamp: string;
    readonly value: number;
  }>;
  readonly monthlyActiveUsers: ReadonlyArray<{
    readonly timestamp: string;
    readonly value: number;
  }>;
  readonly responseRatingByUsers: ReadonlyArray<{
    readonly rate: number;
    readonly user: string;
  }>;
  readonly sellersByWorkRegion: ReadonlyArray<{
    readonly count: number;
    readonly region: string;
  }>;
  readonly spanAnnotationNames: ReadonlyArray<string>;
  readonly tokenCountCompletion: number;
  readonly tokenCountPrompt: number;
  readonly tokenCountTotal: number;
  readonly traceCount: number;
  readonly usageBySellers: ReadonlyArray<{
    readonly count: number;
    readonly type: string;
  }>;
  readonly userCount: number;
  readonly " $fragmentType": "ProjectPageHeader_stats";
};
export type ProjectPageHeader_stats$key = {
  readonly " $data"?: ProjectPageHeader_stats$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProjectPageHeader_stats">;
};

import ProjectPageHeaderQuery_graphql from './ProjectPageHeaderQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "timeRange",
  "variableName": "timeRange"
},
v1 = [
  (v0/*: any*/)
],
v2 = [
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
v3 = [
  {
    "kind": "Variable",
    "name": "departments",
    "variableName": "departments"
  },
  (v0/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "count",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rate",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "departments"
    },
    {
      "kind": "RootArgument",
      "name": "timeRange"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": ProjectPageHeaderQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "ProjectPageHeader_stats",
  "selections": [
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "traceCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "tokenCountTotal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "tokenCountPrompt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
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
        (v0/*: any*/)
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
        (v0/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "latencyMsQuantile",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "userCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "countOfConversation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "messageCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "avgMonthlyActiveUsers",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "MonthlyActiverUser",
      "kind": "LinkedField",
      "name": "monthlyActiveUsers",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "MessagesOverMonth",
      "kind": "LinkedField",
      "name": "messagesOverMonths",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "avgDailyActiveUsers",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "avgMessagesPerConversation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v3/*: any*/),
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
        (v4/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v3/*: any*/),
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
        (v4/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v3/*: any*/),
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
        (v5/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v3/*: any*/),
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
        (v5/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v3/*: any*/),
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
        (v5/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
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
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};
})();

(node as any).hash = "f323b714fb1f58fe4f95a68ccf79c978";

export default node;
