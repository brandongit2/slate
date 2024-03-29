import {yupResolver} from "@hookform/resolvers/yup"
import React, {useContext, useState} from "react"
import {useForm} from "react-hook-form"

import type {FC} from "react"

import Button from "#components/Button"
import ErrorCarousel from "#components/ErrorCarousel"
import type {SignUpMutationVariables} from "#components/forms/sign-up/SignUpForm.generated"
import {useSignUpMutation} from "#components/forms/sign-up/SignUpForm.generated"
import CloseButton from "#components/modal/CloseButton"
import ModalContext from "#components/modal/ModalContext"
import Spinner from "#components/Spinner"
import TextInput from "#components/TextInput"
import UserContext from "#contexts/UserContext"
import PasswordStrength from "./PasswordStrength"
import {signUpFormSchema} from "./signUpFormSchema"

const SignUpForm: FC = () => {
  const [currentError, setCurrentError] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const {mutate: commitSignUp, isLoading} = useSignUpMutation()

  const {
    register,
    handleSubmit,
    formState: {errors: formErrors},
    watch,
  } = useForm<SignUpMutationVariables>({
    resolver: yupResolver(signUpFormSchema),
  })

  const {setUser} = useContext(UserContext)
  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const {setIsModalVisible} = useContext(ModalContext)
  const onSubmit = handleSubmit((data) => {
    commitSignUp(data, {
      onSuccess: (response) => {
        setUser({isSignedIn: true, ...response.signUp})
        setIsModalVisible(false)
      },
      onError: (err: any) => {
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
    <div className="page">
      <CloseButton />
      <h1>Sign up</h1>
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
                if (isLoading) {
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
    </div>
  )
}

export default SignUpForm
