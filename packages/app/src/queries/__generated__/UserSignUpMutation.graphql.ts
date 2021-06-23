/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserSignUpMutationVariables = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
export type UserSignUpMutationResponse = {
    readonly signUp: {
        readonly id: unknown;
        readonly firstName: string;
        readonly lastName: string;
        readonly email: string;
    };
};
export type UserSignUpMutation = {
    readonly response: UserSignUpMutationResponse;
    readonly variables: UserSignUpMutationVariables;
};



/*
mutation UserSignUpMutation(
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
) {
  signUp(signUpInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
    id
    firstName
    lastName
    email
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "email"
    } as any, v1 = {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "firstName"
    } as any, v2 = {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "lastName"
    } as any, v3 = {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "password"
    } as any, v4 = [
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
                            "name": "firstName",
                            "variableName": "firstName"
                        },
                        {
                            "kind": "Variable",
                            "name": "lastName",
                            "variableName": "lastName"
                        },
                        {
                            "kind": "Variable",
                            "name": "password",
                            "variableName": "password"
                        }
                    ],
                    "kind": "ObjectValue",
                    "name": "signUpInput"
                }
            ],
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "signUp",
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
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/),
                (v2 /*: any*/),
                (v3 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "UserSignUpMutation",
            "selections": (v4 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v1 /*: any*/),
                (v2 /*: any*/),
                (v0 /*: any*/),
                (v3 /*: any*/)
            ],
            "kind": "Operation",
            "name": "UserSignUpMutation",
            "selections": (v4 /*: any*/)
        },
        "params": {
            "cacheID": "955b2bb188fef073c045566b2cea3ed4",
            "id": null,
            "metadata": {},
            "name": "UserSignUpMutation",
            "operationKind": "mutation",
            "text": "mutation UserSignUpMutation(\n  $firstName: String!\n  $lastName: String!\n  $email: String!\n  $password: String!\n) {\n  signUp(signUpInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'd91c6c5605c66445d5ab1e0863d8b429';
export default node;
