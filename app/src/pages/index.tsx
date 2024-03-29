import Head from "next/head"
import React from "react"

import type {NextPage} from "next"

import Layout from "#components/Layout"
import SubjectList from "#components/page-specific/index/SubjectList"

const Index: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Slate: Learn by doing.</title>
      </Head>
      <div className="h-full p-12 grid gap-y-8 content-center">
        <div>
          <h1 className="text-5xl font-black">learn by doing.</h1>
          <span className="text-xl font-black">
            mathematics, science, and more with interactive demos and virtual labs.
          </span>
        </div>
        <div>
          <SubjectList />
        </div>
      </div>
    </Layout>
  )
}

export default Index
