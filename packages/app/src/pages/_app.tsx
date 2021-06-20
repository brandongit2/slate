import React from "react"
import {RelayEnvironmentProvider} from "react-relay"

import environment from "@app/relay/environment"
import type {AppProps} from "next/app"

function MyApp({Component, pageProps}: AppProps) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  )
}

export default MyApp
