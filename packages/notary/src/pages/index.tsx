import {NextPage} from "next"
import React from "react"

import RootLayout from "#components/layouts/RootLayout"
import Link from "#components/Link"
import NotaryLogo from "#public/notary-logo.svg"

const Index: NextPage = () => {
  return (
    <RootLayout
      title="Notary: Light-speed notes."
      className="h-full grid place-content-center justify-items-center section"
    >
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

      <div>
        <Link href="/doc">Create a document</Link>
      </div>
    </RootLayout>
  )
}

export default Index
