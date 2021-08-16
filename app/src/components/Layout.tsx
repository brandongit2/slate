import React, {FC, ReactNode, useEffect, useState} from "react"
import {useRelayEnvironment} from "react-relay"
import {fetchQuery} from "relay-runtime"

import Modal from "#components/modal/Modal"
import ModalContext from "#components/modal/ModalContext"
import Navbar from "#components/Navbar"
import UserContext, {UserContextType} from "#contexts/UserContext"
import {UserQuery as UserQueryType} from "#queries/__generated__/UserQuery.graphql"
import {UserQuery} from "#queries/User"

const Layout: FC = ({children}) => {
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
      <ModalContext.Provider value={{setIsModalVisible, setModalContents}}>
        <style jsx global>{`
          span {
            margin-bottom: -0.2em;
          }
        `}</style>
        <div className="min-h-screen grid" style={{gridTemplateRows: `max-content 1fr`}}>
          <Navbar className="sticky t-0 l-0" />
          <main>{children}</main>
          {isModalVisible && <Modal>{modalContents}</Modal>}
        </div>
      </ModalContext.Provider>
    </UserContext.Provider>
  )
}

export default Layout
