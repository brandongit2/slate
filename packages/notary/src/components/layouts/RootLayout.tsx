import Head from "next/head"
import React, {FC, ReactNode, useEffect, useState} from "react"
import {useRelayEnvironment} from "react-relay"
import {fetchQuery} from "relay-runtime"

import UserContext, {UserContextType} from "#contexts/UserContext"
import {UserQuery as UserQueryType} from "#queries/__generated__/UserQuery.graphql"
import {UserQuery} from "#queries/User"

type Props = {
  title: string
} & React.DetailedHTMLProps<React.HTMLProps<HTMLDivElement>, HTMLDivElement>

const RootLayout: FC<Props> = ({children, title, ...props}) => {
  const [user, setUser] = useState<UserContextType>({isSignedIn: null})

  const environment = useRelayEnvironment()
  useEffect(() => {
    fetchQuery<UserQueryType>(environment, UserQuery, {}).subscribe({
      error: () => {
        setUser({isSignedIn: false})
      },
      next: ({user}: {user: any}) => {
        setUser({isSignedIn: true, ...user})
      },
    })
  }, [environment])

  // Modal logic
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContents, setModalContents] = useState<ReactNode>()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserContext.Provider value={{user, setUser}}>
        <div className="h-screen grid place-items-stretch">
          <div {...props}>{children}</div>
        </div>
      </UserContext.Provider>
    </>
  )
}

export default RootLayout
