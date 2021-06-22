/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserQueryVariables = {};
export type UserQueryResponse = {
    readonly user: {
        readonly id: unknown;
        readonly name: string;
        readonly email: string;
    };
};
export type UserQuery = {
    readonly response: UserQueryResponse;
    readonly variables: UserQueryVariables;
};



/*
query UserQuery {
  user {
    id
    name
    email
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
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
                    "name": "id",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "UserQuery",
            "selections": (v0 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "UserQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "cacheID": "bb966146da58b5dc002394bb4f6737c1",
            "id": null,
            "metadata": {},
            "name": "UserQuery",
            "operationKind": "query",
            "text": "query UserQuery {\n  user {\n    id\n    name\n    email\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '9e4b51dd1a685c120c08508e0797fef8';
export default node;
