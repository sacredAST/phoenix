/**
 * @generated SignedSource<<82d022f76dc64afbe2f7d704d01430bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ModelProvider = "ANTHROPIC" | "AZURE_OPENAI" | "DEEPSEEK" | "GOOGLE" | "OPENAI";
import { FragmentRefs } from "relay-runtime";
export type PromptLLM__main$data = {
  readonly model: string;
  readonly provider: ModelProvider;
  readonly " $fragmentType": "PromptLLM__main";
};
export type PromptLLM__main$key = {
  readonly " $data"?: PromptLLM__main$data;
  readonly " $fragmentSpreads": FragmentRefs<"PromptLLM__main">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PromptLLM__main",
  "selections": [
    {
      "alias": "model",
      "args": null,
      "kind": "ScalarField",
      "name": "modelName",
      "storageKey": null
    },
    {
      "alias": "provider",
      "args": null,
      "kind": "ScalarField",
      "name": "modelProvider",
      "storageKey": null
    }
  ],
  "type": "PromptVersion",
  "abstractKey": null
};

(node as any).hash = "acc90da43126218472d2fc19cd8d0512";

export default node;
