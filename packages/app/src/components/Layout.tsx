import React, {FC, ReactNode, useState} from "react"
import {useRelayEnvironment} from "react-relay"
import {createOperationDescriptor, getRequest} from "relay-runtime"

import {UserQuery} from "@app/src/queries/User"

import Navbar from "./atomic/2-molecules/Navbar"
import Modal from "./modal/Modal"
import ModalContext from "./modal/ModalContext"

const Layout: FC = ({children}) => {
  // Attempt get user and keep it in the Relay environment
  const request = getRequest(UserQuery)
  const operation = createOperationDescriptor(request, {})

  const environment = useRelayEnvironment()
  environment.execute({operation}).subscribe({
    error() {},
  })

  // Modal logic
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContents, setModalContents] = useState<ReactNode>()

  return (
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
  )
}

export default Layout
