import * as yup from "yup"
import zxcvbn from "zxcvbn"

import type {SignUpMutationVariables} from "#components/forms/sign-up/SignUpForm.generated"
import type {YupSchemaShape} from "#utils/YupSchemaShape"

export const signUpFormSchema = yup.object().shape<YupSchemaShape<SignUpMutationVariables>>({
  firstName: yup.string().required(`Please enter your first name.`),
  lastName: yup.string().required(`Please enter your last name.`),
  email: yup.string().email(`Hmm, that email doesn't look right.`).required(`Please enter your email.`),
  password: yup
    .string()
    .required(`Please enter a password.`)
    .test(`strength`, `Please enter a stronger password.`, (value) => {
      return zxcvbn(value || ``).score > 3
    }),
})
