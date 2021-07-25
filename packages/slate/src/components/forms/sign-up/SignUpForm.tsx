import {yupResolver} from "@hookform/resolvers/yup"
import React, {FC, useContext, useState} from "react"
import {useForm} from "react-hook-form"
import {useMutation} from "react-relay"

import {
  UserSignUpMutation as UserSignUpMutationType,
  UserSignUpMutationVariables,
} from "$queries/__generated__/UserSignUpMutation.graphql"
import {UserSignUpMutation} from "$queries/User"

import Button from "../../atomic/1-atoms/Button"
import H1 from "../../atomic/1-atoms/H1"
import Spinner from "../../atomic/1-atoms/Spinner"
import TextInput from "../../atomic/1-atoms/TextInput"
import ErrorCarousel from "../../atomic/2-molecules/ErrorCarousel"
import Page from "../../atomic/4-templates/Page"
import CloseButton from "../../modal/CloseButton"
import ModalContext from "../../modal/ModalContext"
import UserContext from "../../UserContext"
import PasswordStrength from "./PasswordStrength"
import {signUpFormSchema} from "./signUpFormSchema"

const SignUpForm: FC = () => {
  const [currentError, setCurrentError] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const [commitSignUp, isInFlight] = useMutation<UserSignUpMutationType>(UserSignUpMutation)

  const {
    register,
    handleSubmit,
    formState: {errors: formErrors},
    watch,
  } = useForm<UserSignUpMutationVariables>({
    resolver: yupResolver(signUpFormSchema),
  })

  const {setUser} = useContext(UserContext)
  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const {setIsModalVisible} = useContext(ModalContext)
  const onSubmit = handleSubmit((data) => {
    commitSignUp({
      variables: data,
      onCompleted(response) {
        setUser({isSignedIn: true, ...response.signUp})
        setIsModalVisible(false)
      },
      onError(err: any) {
        if (!err.source) {
          console.error(err)
          return
        }
        setSubmitErrors(err.source.errors.map((err: any) => err.message))
      },
    })
    setSubmitted(true)
  })

  const password = watch(`password`)

  const formGrid = `
    "a b" auto
    "c c" auto
    "d d" auto / 1fr 1fr
  `

  return (
    <Page>
      <CloseButton />
      <H1>Sign up</H1>
      <form onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-2 w-128" style={{gridTemplate: formGrid}}>
        <TextInput
          label="First name"
          autoComplete="given-name"
          required
          error={formErrors.firstName?.message}
          activeError={Object.keys(formErrors)[currentError] === `firstName`}
          style={{gridArea: `a`}}
          {...register(`firstName`)}
        />
        <TextInput
          label="Last name"
          autoComplete="family-name"
          required
          error={formErrors.lastName?.message}
          activeError={Object.keys(formErrors)[currentError] === `lastName`}
          style={{gridArea: `b`}}
          {...register(`lastName`)}
        />
        <TextInput
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={formErrors.email?.message}
          activeError={Object.keys(formErrors)[currentError] === `email`}
          style={{gridArea: `c`}}
          {...register(`email`)}
        />
        <div style={{gridArea: `d`}}>
          <TextInput
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            error={formErrors.password?.message}
            activeError={Object.keys(formErrors)[currentError] === `password`}
            {...register(`password`)}
          />
          <PasswordStrength password={password} />
        </div>
        <div className="col-span-2 flex gap-6 items-center">
          <Button disabled={!!Object.values(formErrors).length}>Submit</Button>
          <div className="flex-grow">
            {(() => {
              if (submitted) {
                if (isInFlight) {
                  return <Spinner />
                } else if (submitErrors.length) {
                  return (
                    <ErrorCarousel
                      errors={submitErrors}
                      currentError={currentError}
                      setCurrentError={setCurrentError}
                    />
                  )
                }
              } else {
                return (
                  <ErrorCarousel
                    errors={Object.values(formErrors).map((error) => error.message!)}
                    currentError={currentError}
                    setCurrentError={setCurrentError}
                  />
                )
              }
            })()}
          </div>
        </div>
      </form>
    </Page>
  )
}

export default SignUpForm
