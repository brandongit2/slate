import React, {FC} from "react"

import RootLayout from "#components/layouts/RootLayout"
import Navbar from "#components/Navbar"

type Props = {
  title: string
}

const MainLayout: FC<Props> = ({children, title}) => {
  return (
    <RootLayout title={title}>
      <div className="min-h-screen grid bg-sepia gap-6 px-12 py-6" style={{gridTemplateRows: `max-content 1fr`}}>
        <Navbar className="sticky top-0 left-0" />
        <main>{children}</main>
      </div>
    </RootLayout>
  )
}

export default MainLayout
