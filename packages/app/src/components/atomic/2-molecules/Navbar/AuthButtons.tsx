import React, {FC, useContext} from "react"
import {useMutation} from "react-relay"

import SignInForm from "@app/src/components/forms/sign-in/SignInForm"
import SignUpForm from "@app/src/components/forms/sign-up/SignUpForm"
import ModalContext from "@app/src/components/modal/ModalContext"
import UserContext from "@app/src/components/UserContext"
import {UserSignOutMutation as UserSignOutMutationType} from "@app/src/queries/__generated__/UserSignOutMutation.graphql"
import {UserSignOutMutation} from "@app/src/queries/User"

import Button from "../../1-atoms/Button"
import LoadingShine from "../../1-atoms/LoadingShine"

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

  const [commitSignOut] = useMutation<UserSignOutMutationType>(UserSignOutMutation)

  function signOut() {
    commitSignOut({
      variables: {},
      onCompleted() {
        setUser({isSignedIn: false})
      },
    })
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
