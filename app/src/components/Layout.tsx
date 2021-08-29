import React, {useState} from "react"

import type {FC, ReactNode} from "react"

import {useUserQuery} from "#components/Layout.generated"
import Modal from "#components/modal/Modal"
import ModalContext from "#components/modal/ModalContext"
import Navbar from "#components/Navbar"
import type {UserContextType} from "#contexts/UserContext"
import UserContext from "#contexts/UserContext"

const Layout: FC = ({children}) => {
  const [user, setUser] = useState<UserContextType>({isSignedIn: null})

  try {
    useUserQuery(
      {},
      {
        onSuccess: ({user}) => {
          setUser({isSignedIn: true, ...user})
        },
        onError: () => {
          setUser({isSignedIn: false})
        },
        retry: false,
        useErrorBoundary: true,
      },
    )
  } catch (err) {
    console.log(err)
  }

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
