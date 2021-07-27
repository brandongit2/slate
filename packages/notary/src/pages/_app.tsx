import Head from "next/head"
import React from "react"
import {RelayEnvironmentProvider} from "react-relay"
import {SlateThemeProvider} from "slate-components"
import {tw} from "twind"

import type {AppProps} from "next/app"

import environment from "#relay/environment"

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SlateThemeProvider tw={tw}>
        <RelayEnvironmentProvider environment={environment}>
          <Component {...pageProps} />
        </RelayEnvironmentProvider>
      </SlateThemeProvider>
    </>
  )
}

export default MyApp
