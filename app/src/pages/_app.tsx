import React from "react"
import {QueryClient, QueryClientProvider} from "react-query"

import type {AppProps} from "next/app"

import "../styles.css"

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <div id="modals"></div>
    </QueryClientProvider>
  )
}

export default MyApp
