import React, {FC} from "react"

import Navbar from "#components/3-organisms/Navbar"
import RootLayout from "#components/layouts/RootLayout"

const MainLayout: FC = ({children}) => {
  return (
    <RootLayout>
      <div className="min-h-screen grid bg-sepia" style={{gridTemplateRows: `max-content 1fr`}}>
        <Navbar className="sticky top-0 left-0" />
        <main className="p-12">{children}</main>
      </div>
    </RootLayout>
  )
}

export default MainLayout
