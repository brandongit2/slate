import React, {FC} from "react"
import {useRelayEnvironment} from "react-relay"
import {createOperationDescriptor, getRequest} from "relay-runtime"

import {UserQuery} from "@app/src/queries/User"

import Navbar from "./Navbar"

const Layout: FC = ({children}) => {
  const request = getRequest(UserQuery)
  const operation = createOperationDescriptor(request, {})

  const environment = useRelayEnvironment()
  environment.execute({operation}).subscribe({
    error() {},
  })

  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
