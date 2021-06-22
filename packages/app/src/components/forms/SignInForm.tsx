import React, {FC} from "react"

import Button from "../atomic/1-atoms/Button"
import H1 from "../atomic/1-atoms/H1"
import TextInput from "../atomic/1-atoms/TextInput"
import Page from "../atomic/4-templates/Page"
import CloseButton from "../modal/CloseButton"

const SignInForm: FC = () => {
  return (
    <Page>
      <CloseButton />
      <H1>Sign in</H1>
      <form className="grid gap-y-2 justify-items-start w-72" style={{gridTemplateRows: `repeat(3, auto)`}}>
        <TextInput label="Email" type="email" autoComplete="email" />
        <TextInput label="Password" type="password" autoComplete="current-password" />
        <Button className="mt-2">Submit</Button>
      </form>
    </Page>
  )
}

export default SignInForm
