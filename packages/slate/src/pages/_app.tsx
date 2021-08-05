import React from "react"
import {RelayEnvironmentProvider} from "react-relay"
import "tailwindcss/tailwind.css"

import type {AppProps} from "next/app"

import environment from "#relay/environment"

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
