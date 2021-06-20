import {NextPage} from "next"
import Head from "next/head"
import React, {Suspense, useEffect} from "react"
import {useQueryLoader} from "react-relay"

import SubjectList from "@app/components/page-specific/index/SubjectList"
import {UserQuery, UserQueryType} from "@app/queries/User"

const Index: NextPage = () => {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<UserQueryType>(UserQuery)

  useEffect(() => {
    loadQuery({userId: `1`})

    return disposeQuery
  }, [loadQuery, disposeQuery])

  console.log(queryRef)
  return (
    <div>
      <Head>
        <title>Slate: Learn by doing.</title>
      </Head>
      <div className="fixed top-0 right-0">
        <button />
        <button />
        <p>You are logged out.</p>
      </div>
      <div className="absolute top-1/2 transform -translate-x-1/2 ml-16 grid gap-y-8">
        <img src="logotype-dark.svg" className="h-8" />
        <div>
          <p className="text-4xl">learn by doing.</p>
          <p className="text-xl">mathematics, science, and more with interactive demos and virtual labs.</p>
        </div>
        <div>
          <Suspense fallback={<p>Loading...</p>}>{queryRef && <SubjectList queryRef={queryRef} />}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default Index

export async function getStaticProps() {
  let root = await (await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/content/root`)).json()
  let subjects = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_LOCATION}/content/children/${root.uuid}?hyphenate={"name":1,"description":1}`,
    )
  ).json()

  return {
    props: {
      subjects,
    },
  }
}
