import React from "react"
import {RelayEnvironmentProvider} from "react-relay"

import type {AppProps} from "next/app"

import environment from "#relay/environment"
import "../styles.css"

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <RelayEnvironmentProvider environment={environment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </>
  )
}

export default MyApp
