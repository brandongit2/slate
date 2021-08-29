import * as yup from "yup"

import type {SignInMutationVariables} from "#components/forms/sign-in/SignInForm.generated"
import type {YupSchemaShape} from "#utils/YupSchemaShape"

export const signInFormSchema = yup.object().shape<YupSchemaShape<SignInMutationVariables>>({
  email: yup.string().email(`Hmm, that email doesn't look right.`).required(`Please enter your email.`),
  password: yup.string().required(`Please enter your password.`),
})
