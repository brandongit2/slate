import classNames from "classnames"
import React, {FC, useContext} from "react"

import LogoType from "@app/public/slate-logo.svg"

import SignInForm from "../../forms/SignInForm"
import SignUpForm from "../../forms/SignUpForm"
import ModalContext from "../../modal/ModalContext"
import Button from "../1-atoms/Button"

type Props = {
  className: string
}

const Navbar: FC<Props> = ({className}) => {
  const {setIsModalVisible, setModalContents} = useContext(ModalContext)

  function showSignInModal() {
    setModalContents(<SignInForm />)
    setIsModalVisible(true)
  }

  function showSignUpModal() {
    setModalContents(<SignUpForm />)
    setIsModalVisible(true)
  }

  return (
    <nav className={classNames(`flex justify-between px-12 py-6`, className)}>
      <LogoType className="h-8" />
      <div className="flex gap-2">
        <Button onClick={showSignInModal}>Sign in</Button>
        <Button onClick={showSignUpModal}>Sign up</Button>
      </div>
    </nav>
  )
}

export default Navbar
