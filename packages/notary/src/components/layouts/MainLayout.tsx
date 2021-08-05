import React, {FC} from "react"

import Navbar from "#components/3-organisms/Navbar"
import RootLayout from "#components/layouts/RootLayout"

type Props = {
  title: string
}

const MainLayout: FC<Props> = ({children, title}) => {
  return (
    <RootLayout title={title}>
      <div className="min-h-screen grid bg-sepia" style={{gridTemplateRows: `max-content 1fr`}}>
        <Navbar className="sticky top-0 left-0" />
        <main className="p-12">{children}</main>
      </div>
    </RootLayout>
  )
}

export default MainLayout
