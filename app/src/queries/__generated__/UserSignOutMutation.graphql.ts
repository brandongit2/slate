/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserSignOutMutationVariables = {};
export type UserSignOutMutationResponse = {
    readonly signOut: {
        readonly id: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly email: string;
    };
};
export type UserSignOutMutation = {
    readonly response: UserSignOutMutationResponse;
    readonly variables: UserSignOutMutationVariables;
};



/*
mutation UserSignOutMutation {
  signOut {
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
            "name": "signOut",
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
            "name": "UserSignOutMutation",
            "selections": (v0 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "UserSignOutMutation",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "cacheID": "f26d4284009e227a8c1cbde6f6bb5e75",
            "id": null,
            "metadata": {},
            "name": "UserSignOutMutation",
            "operationKind": "mutation",
            "text": "mutation UserSignOutMutation {\n  signOut {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '409b96755096da8d3594cab4ac88ab86';
export default node;
