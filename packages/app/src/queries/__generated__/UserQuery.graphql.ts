/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserQueryVariables = {
    userId: string;
};
export type UserQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly name: string;
    };
};
export type UserQuery = {
    readonly response: UserQueryResponse;
    readonly variables: UserQueryVariables;
};



/*
query UserQuery(
  $userId: String!
) {
  user(id: $userId) {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        {
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "userId"
        } as any
    ], v1 = [
        {
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "userId"
                }
            ],
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "UserQuery",
            "selections": (v1 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "UserQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "83807056a2049be9934a8099abdd840d",
            "id": null,
            "metadata": {},
            "name": "UserQuery",
            "operationKind": "query",
            "text": "query UserQuery(\n  $userId: String!\n) {\n  user(id: $userId) {\n    id\n    name\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'd7d8f6202b6e0a018ca7daa7e8fd94c0';
export default node;
