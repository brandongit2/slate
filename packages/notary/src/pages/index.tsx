import {NextPage} from "next"
import Head from "next/head"
import React from "react"
import {H1, H4, useTw} from "slate-components"

import Layout from "#components/Layout"

const Index: NextPage = () => {
  const tw = useTw()

  return (
    <Layout>
      <Head>
        <title>Notary</title>
      </Head>
      <div className={tw`h-full p-12 grid gap-y-8 content-center`}>
        <div>
          <H1>note-taking at the speed of light.</H1>
          <H4>
            notary streamlines the note-taking process, allowing you to make professionally formatted documents without
            even thinking about it.
          </H4>
        </div>
      </div>
    </Layout>
  )
}

export default Index
