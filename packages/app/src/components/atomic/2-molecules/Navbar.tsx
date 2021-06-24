import classNames from "classnames"
import React, {FC, useContext} from "react"
import {useMutation} from "react-relay"

import LogoType from "@app/public/slate-logo.svg"
import {UserSignOutMutation as UserSignOutMutationType} from "@app/src/queries/__generated__/UserSignOutMutation.graphql"
import {UserSignOutMutation} from "@app/src/queries/User"

import SignInForm from "../../forms/sign-in/SignInForm"
import SignUpForm from "../../forms/sign-up/SignUpForm"
import ModalContext from "../../modal/ModalContext"
import UserContext from "../../UserContext"
import Button from "../1-atoms/Button"

type Props = {
  className: string
}

const Navbar: FC<Props> = ({className}) => {
  const {user, setUser} = useContext(UserContext)

  const {setIsModalVisible, setModalContents} = useContext(ModalContext)

  function showSignInModal() {
    setModalContents(<SignInForm />)
    setIsModalVisible(true)
  }

  function showSignUpModal() {
    setModalContents(<SignUpForm />)
    setIsModalVisible(true)
  }

  const [commitSignOut] = useMutation<UserSignOutMutationType>(UserSignOutMutation)

  function signOut() {
    commitSignOut({
      variables: {},
      onCompleted() {
        setUser({isSignedIn: false})
      },
    })
  }

  return (
    <nav className={classNames(`flex justify-between px-12 py-6`, className)}>
      <LogoType className="h-8" />
      <div className="flex gap-4 items-center">
        {user.isSignedIn ? (
          <>
            <span>
              Hi, <b>{user.firstName}</b>!
            </span>
            <Button outlined onClick={signOut}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button onClick={showSignInModal}>Sign in</Button>
            <Button onClick={showSignUpModal}>Sign up</Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
