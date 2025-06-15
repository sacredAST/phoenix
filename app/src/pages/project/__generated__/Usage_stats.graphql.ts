/**
 * @generated SignedSource<<de3d95199d8e0a89e6b6fd467d8de172>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Usage_stats$data = {
  readonly avgDailyActiveUsers: number;
  readonly avgMessagesPerConversation: number;
  readonly avgMonthlyActiveUsers: number;
  readonly countOfConversation: number;
  readonly messageCount: number;
  readonly messagesOverMonths: ReadonlyArray<{
    readonly timestamp: string;
    readonly value: number;
  }>;
  readonly monthlyActiveUsers: ReadonlyArray<{
    readonly timestamp: string;
    readonly value: number;
  }>;
  readonly userCount: number;
  readonly " $fragmentType": "Usage_stats";
};
export type Usage_stats$key = {
  readonly " $data"?: Usage_stats$data;
  readonly " $fragmentSpreads": FragmentRefs<"Usage_stats">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "timeRange",
    "variableName": "timeRange"
  }
],
v1 = [
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
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "timeRange"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Usage_stats",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "userCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "countOfConversation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "messageCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "avgMonthlyActiveUsers",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "MonthlyActiverUser",
      "kind": "LinkedField",
      "name": "monthlyActiveUsers",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "MessagesOverMonth",
      "kind": "LinkedField",
      "name": "messagesOverMonths",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "avgDailyActiveUsers",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "avgMessagesPerConversation",
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};
})();

(node as any).hash = "4894576a77d299f6333e36e680dae879";

export default node;
