/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserQueryVariables = {};
export type UserQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly firstName: string;
        readonly lastName: string;
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
    firstName
    lastName
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
                    "name": "firstName",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastName",
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
            "cacheID": "dc895ce2002d7c2077acce4421581e5d",
            "id": null,
            "metadata": {},
            "name": "UserQuery",
            "operationKind": "query",
            "text": "query UserQuery {\n  user {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '34f5d74032ae4bfb51ec27af5932fc82';
export default node;
