import React, {useEffect} from "react"
import {RelayEnvironmentProvider} from "react-relay"

import type {AppProps} from "next/app"

import environment from "#relay/environment"
import "../styles.css"

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    function setPageDims() {
      // `100vh`/`100vw` gives the dimensions of the full browser viewport, including browser chrome on mobile and
      // scrollbars. To counteract this, we use our own custom properties, `--full-width` and `--full-height`. By
      // default, these are set to `100vw` and `100vh` as a fallback as the page loads. Once this component loads, we
      // set it to the width/height we actually want.
      document.body.style.setProperty(`--full-height`, `${document.documentElement.clientHeight}px`)
      document.body.style.setProperty(`--full-width`, `${document.documentElement.clientWidth}px`)
    }
    setPageDims()

    window.addEventListener(`resize`, setPageDims)

    return () => {
      window.removeEventListener(`resize`, setPageDims)
    }
  })

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  )
}

export default MyApp
