import {NextPage} from "next"
import Head from "next/head"
import React, {Suspense} from "react"

import SubjectList from "@app/src/components/page-specific/index/SubjectList"

import Layout from "../components/molecules/Layout"

const Index: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Slate: Learn by doing.</title>
      </Head>
      <div className="absolute top-1/2 transform -translate-y-1/2 ml-12 grid gap-y-8">
        <div>
          <h1 className="text-5xl font-black">learn by doing.</h1>
          <span className="text-xl font-black">
            mathematics, science, and more with interactive demos and virtual labs.
          </span>
        </div>
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            <SubjectList />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default Index
