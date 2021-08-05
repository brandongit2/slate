import React, {FC, useContext} from "react"
import {useMutation} from "react-relay"

import {LoadingShine} from "#components/1-atoms/LoadingShine"
import UserContext from "#contexts/UserContext"
import {UserSignOutMutation as UserSignOutMutationType} from "#queries/__generated__/UserSignOutMutation.graphql"
import {UserSignOutMutation} from "#queries/User"

const AuthButtons: FC = () => {
  const {user, setUser} = useContext(UserContext)

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
        <button onClick={signOut}>Sign out</button>
      </>
    )
  } else {
    return <></>
  }
}

export default AuthButtons
