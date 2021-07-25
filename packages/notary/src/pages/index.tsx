import {NextPage} from "next"
import Head from "next/head"
import React from "react"

import Layout from "$components/Layout"

const Index: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Notary</title>
      </Head>
      <div className="h-full p-12 grid gap-y-8 content-center">
        <div>
          <h1 className="text-5xl font-black">learn by doing.</h1>
          <span className="text-xl font-black">
            mathematics, science, and more with interactive demos and virtual labs.
          </span>
        </div>
      </div>
    </Layout>
  )
}

export default Index
