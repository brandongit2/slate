import React, {FC} from "react"

import Navbar from "#components/3-organisms/Navbar"
import DivNoScrollbar from "#components/DivNoScrollbar"
import RootLayout from "#components/layouts/RootLayout"

type Props = {
  title: string
}

const LandingPageLayout: FC<Props> = ({children, title}) => {
  return (
    <RootLayout title={title}>
      <DivNoScrollbar className="min-h-screen grid bg-sepia" style={{gridTemplateRows: `0px 1fr`}}>
        <Navbar noLogo />
        <main>{children}</main>
      </DivNoScrollbar>
    </RootLayout>
  )
}

export default LandingPageLayout
