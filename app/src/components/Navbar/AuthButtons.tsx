import React, {useContext} from "react"

import type {FC} from "react"

import Button from "#components/Button"
import SignInForm from "#components/forms/sign-in/SignInForm"
import SignUpForm from "#components/forms/sign-up/SignUpForm"
import LoadingShine from "#components/LoadingShine"
import ModalContext from "#components/modal/ModalContext"
import {useSignOutMutation} from "#components/Navbar/AuthButtons.generated"
import UserContext from "#contexts/UserContext"

const AuthButtons: FC = () => {
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

  const {mutate: commitSignOut} = useSignOutMutation()

  function signOut() {
    commitSignOut(
      {},
      {
        onSuccess: () => {
          setUser({isSignedIn: false})
        },
      },
    )
  }

  if (user.isSignedIn === null) {
    return <LoadingShine className="h-10 w-20" />
  } else if (user.isSignedIn) {
    return (
      <>
        <span>
          Hi, <b>{user.firstName}</b>!
        </span>
        <Button outlined onClick={signOut}>
          Sign out
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Button onClick={showSignInModal}>Sign in</Button>
        <Button onClick={showSignUpModal}>Sign up</Button>
      </>
    )
  }
}

export default AuthButtons
