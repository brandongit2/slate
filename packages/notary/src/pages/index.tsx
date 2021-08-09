import {css, keyframes} from "@emotion/react"
import {NextPage} from "next"
import React from "react"

import RootLayout from "#components/layouts/RootLayout"
import ScrollCapturer, {ScrollCaptureObject} from "#components/ScrollCapturer"
import Chevron from "#public/icons/chevron.svg"
import NotaryLogo from "#public/notary-logo.svg"
import {getTailwindConfig} from "#utils/getTailwindConfig"

const Index: NextPage = () => {
  const {theme} = getTailwindConfig()

  const bounce = keyframes`
    from, to {
      transform: translateY(-10px);
    }

    50% {
      transform: translateY(10px);
    }
  `

  function onScroll({pos, vel}: ScrollCaptureObject) {
    console.log({pos, vel})
  }

  return (
    <RootLayout title="Notary: Light-speed notes." className="h-full">
      <ScrollCapturer className="relative bg-sepia" onScroll={onScroll}>
        <div className="h-screen">
          <div className="h-2/3 grid place-content-center justify-items-center section">
            <div className="border-2 border-black">
              <NotaryLogo className="h-16" />
            </div>
            <h1>Note-taking at the speed of light.</h1>
            <h2 className="max-w-2xl text-2xl text-center">
              <em className="rounded -mx-1 px-1" style={{backgroundColor: `rgba(0, 255, 100, 0.2)`}}>
                Notary
              </em>
              {` `}
              streamlines the note-taking process, allowing you to make professionally formatted documents without even
              thinking about it.
            </h2>
          </div>
          <div className="h-screen w-full">
            <div
              className="max-w-4xl w-full h-full mx-auto bg-cream rounded-lg"
              style={{boxShadow: `0px 20px 60px -10px rgba(0, 0, 0, 0.5)`}}
            >
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-y-4">
                <span className="font-header font-semibold text-2xl">Scroll down to get started</span>
                <div className="scale-y-90">
                  <Chevron
                    className="h-6"
                    css={css`
                      animation: ${bounce} 3s infinite;
                    `}
                    fill={theme.colors.black}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollCapturer>
    </RootLayout>
  )
}

export default Index
