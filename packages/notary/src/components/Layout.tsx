import React, {FC, ReactNode, useEffect, useState} from "react"
import {useRelayEnvironment} from "react-relay"
import {fetchQuery} from "relay-runtime"
import {Navbar, useTw} from "slate-components"

import NotaryLogo from "#public/notary-logo.svg"
import {UserQuery as UserQueryType} from "#queries/__generated__/UserQuery.graphql"
import {UserQuery} from "#queries/User"
import UserContext, {UserContextType} from "./UserContext"

const Layout: FC = ({children}) => {
  const tw = useTw()
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

  return (
    <UserContext.Provider value={{user, setUser}}>
      <style jsx global>{`
        span {
          margin-bottom: -0.2em;
        }
      `}</style>
      <div className={tw`min-h-screen grid`} style={{gridTemplateRows: `max-content 1fr`}}>
        <Navbar logo={NotaryLogo} className={tw`sticky top-0 left-0`} />
        <main>{children}</main>
      </div>
    </UserContext.Provider>
  )
}

export default Layout
