import * as yup from "yup"

import {UserSignInMutationVariables} from "@app/src/queries/__generated__/UserSignInMutation.graphql"
import {YupSchemaShape} from "@app/src/utils/YupSchemaShape"

export const signInFormSchema = yup.object().shape<YupSchemaShape<UserSignInMutationVariables>>({
  email: yup.string().email(`Hmm, that email doesn't look right.`).required(`Please enter your email.`),
  password: yup.string().required(`Please enter your password.`),
})
