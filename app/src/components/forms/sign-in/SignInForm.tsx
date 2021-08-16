import {yupResolver} from "@hookform/resolvers/yup"
import React, {FC, useContext, useState} from "react"
import {useForm} from "react-hook-form"
import {useMutation} from "react-relay"

import Button from "#components/Button"
import ErrorCarousel from "#components/ErrorCarousel"
import CloseButton from "#components/modal/CloseButton"
import ModalContext from "#components/modal/ModalContext"
import Spinner from "#components/Spinner"
import TextInput from "#components/TextInput"
import UserContext from "#contexts/UserContext"
import {
  UserSignInMutation as UserSignInMutationType,
  UserSignInMutationVariables,
} from "#queries/__generated__/UserSignInMutation.graphql"
import {UserSignInMutation} from "#queries/User"
import {signInFormSchema} from "./signInFormSchema"

const SignInForm: FC = () => {
  const [currentError, setCurrentError] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const [commitSignIn, isInFlight] = useMutation<UserSignInMutationType>(UserSignInMutation)

  const {
    register,
    handleSubmit,
    formState: {errors: formErrors},
  } = useForm<UserSignInMutationVariables>({
    resolver: yupResolver(signInFormSchema),
  })

  const {setUser} = useContext(UserContext)
  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const {setIsModalVisible} = useContext(ModalContext)
  const onSubmit = handleSubmit((data) => {
    commitSignIn({
      variables: data,
      onCompleted(response) {
        setUser({isSignedIn: true, ...response.signInLocal})
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

  return (
    <div className="page">
      <CloseButton />
      <h1>Sign in</h1>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid gap-y-2 justify-items-start w-72"
        style={{gridTemplateRows: `repeat(3, auto)`}}
      >
        <TextInput
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={formErrors.email?.message}
          {...register(`email`)}
        />
        <TextInput
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          error={formErrors.password?.message}
          {...register(`password`)}
        />
        <div className="flex gap-6 items-center">
          <Button className="mt-2">Submit</Button>
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
    </div>
  )
}

export default SignInForm
