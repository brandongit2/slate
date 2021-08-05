import React, {FC, ReactNode, useEffect, useState} from "react"
import {useRelayEnvironment} from "react-relay"
import {fetchQuery} from "relay-runtime"

import UserContext, {UserContextType} from "#contexts/UserContext"
import {UserQuery as UserQueryType} from "#queries/__generated__/UserQuery.graphql"
import {UserQuery} from "#queries/User"

const RootLayout: FC = ({children}) => {
  const [user, setUser] = useState<UserContextType>({isSignedIn: null})

  const environment = useRelayEnvironment()
  useEffect(() => {
    fetchQuery<UserQueryType>(environment, UserQuery, {}).subscribe({
      error: () => {
        setUser({isSignedIn: false})
      },
      next: ({user}) => {
        setUser({isSignedIn: true, ...user})
      },
    })
  }, [environment])

  // Modal logic
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContents, setModalContents] = useState<ReactNode>()

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export default RootLayout
