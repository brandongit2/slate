/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserSignInMutationVariables = {
    email: string;
    password: string;
};
export type UserSignInMutationResponse = {
    readonly signIn: {
        readonly id: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly email: string;
    };
};
export type UserSignInMutation = {
    readonly response: UserSignInMutationResponse;
    readonly variables: UserSignInMutationVariables;
};



/*
mutation UserSignInMutation(
  $email: String!
  $password: String!
) {
  signIn(signInInput: {email: $email, password: $password}) {
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
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "email"
        } as any,
        {
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "password"
        } as any
    ], v1 = [
        {
            "alias": null,
            "args": [
                {
                    "fields": [
                        {
                            "kind": "Variable",
                            "name": "email",
                            "variableName": "email"
                        },
                        {
                            "kind": "Variable",
                            "name": "password",
                            "variableName": "password"
                        }
                    ],
                    "kind": "ObjectValue",
                    "name": "signInInput"
                }
            ],
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "signIn",
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
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "UserSignInMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "UserSignInMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "11b810e5f751ed2e9bf500ee30bc3d93",
            "id": null,
            "metadata": {},
            "name": "UserSignInMutation",
            "operationKind": "mutation",
            "text": "mutation UserSignInMutation(\n  $email: String!\n  $password: String!\n) {\n  signIn(signInInput: {email: $email, password: $password}) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '2fc2f06e752916c247509f1a1f2b02a0';
export default node;
