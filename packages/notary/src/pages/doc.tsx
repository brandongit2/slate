import {NextPage} from "next"

import MainLayout from "#components/layouts/MainLayout"

const Doc: NextPage = () => {
  return (
    <MainLayout title="Document">
      <div className="max-w-4xl w-full mx-auto rounded-lg bg-black bg-opacity-10 p-6">hello world</div>
    </MainLayout>
  )
}

export default Doc
