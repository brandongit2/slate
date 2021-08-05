import React, {FC} from "react"

import Navbar from "#components/3-organisms/Navbar"
import RootLayout from "#components/layouts/RootLayout"

const LandingPageLayout: FC = ({children}) => {
  return (
    <RootLayout>
      <div className="min-h-screen grid bg-sepia" style={{gridTemplateRows: `0px 1fr`}}>
        <Navbar noLogo />
        <main>{children}</main>
      </div>
    </RootLayout>
  )
}

export default LandingPageLayout
