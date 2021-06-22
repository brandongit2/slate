import {yupResolver} from "@hookform/resolvers/yup"
import chroma from "chroma-js"
import React, {FC, useState} from "react"
import {useForm} from "react-hook-form"
import styled from "styled-components"
import colors from "tailwindcss/colors"
import * as yup from "yup"
import zxcvbn from "zxcvbn"

import ChevronDown from "@app/public/icons/chevron-down.svg"
import ChevronUp from "@app/public/icons/chevron-up.svg"

import Button from "../atomic/1-atoms/Button"
import H1 from "../atomic/1-atoms/H1"
import Span from "../atomic/1-atoms/Span"
import TextInput from "../atomic/1-atoms/TextInput"
import Page from "../atomic/4-templates/Page"
import CloseButton from "../modal/CloseButton"

const PasswordStrength = styled.progress`
  &::-webkit-progress-bar {
    background: #d4d4d4;
  }

  &::-webkit-progress-value {
    background: ${({color}) => color};
    transition: all 0.4s;
  }
`

const SignUpForm: FC = () => {
  const schema = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const [currentError, setCurrentError] = useState(0)

  function errorUp() {
    if (currentError === 0) return
    setCurrentError((currentError) => currentError - 1)
  }

  function errorDown() {
    if (currentError === Object.values(errors).length - 1) return
    setCurrentError((currentError) => currentError + 1)
  }

  const password = watch(`password`)
  const pwScore = zxcvbn(password || ``).score
  const pwColor = chroma.scale([`#F84258`, `#50E128`]).mode(`lch`).correctLightness().domain([0, 4])(pwScore).hex()

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
          error={errors.firstName?.message}
          activeError={Object.keys(errors)[currentError] === `firstName`}
          style={{gridArea: `a`}}
          {...register(`firstName`)}
        />
        <TextInput
          label="Last name"
          autoComplete="family-name"
          required
          error={errors.lastName?.message}
          activeError={Object.keys(errors)[currentError] === `lastName`}
          style={{gridArea: `b`}}
          {...register(`lastName`)}
        />
        <TextInput
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email?.message}
          activeError={Object.keys(errors)[currentError] === `email`}
          style={{gridArea: `c`}}
          {...register(`email`)}
        />
        <div style={{gridArea: `d`}}>
          <TextInput
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            error={errors.password?.message}
            activeError={Object.keys(errors)[currentError] === `password`}
            {...register(`password`)}
          />
          <PasswordStrength max={4} value={pwScore} color={pwColor} className="w-full h-1" />
        </div>
        <div className="col-span-2 flex gap-6 items-center">
          <Button disabled={!!Object.values(errors).length}>Submit</Button>
          <div className="flex-grow flex justify-between items-center text-red-700">
            <span>{Object.values(errors)[currentError]?.message}</span>
            {Object.values(errors).length > 1 ? (
              <div className="grid justify-items-center" style={{gridTemplateRows: `12px auto 12px`}}>
                {currentError !== 0 ? (
                  <button type="button" onClick={errorUp}>
                    <ChevronUp fill={colors.red[`700`]} className="h-2.5" />
                  </button>
                ) : (
                  <div />
                )}
                <Span className="text-xs select-none">
                  {currentError + 1}/{Object.values(errors).length}
                </Span>
                {currentError !== Object.values(errors).length ? (
                  <button type="button" onClick={errorDown}>
                    <ChevronDown fill={colors.red[`700`]} className="h-2.5" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </Page>
  )
}

export default SignUpForm
