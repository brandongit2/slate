import React, {FC} from "react"

import LogoType from "@app/public/slate-logo.svg"

import Button from "../atoms/Button"

const Navbar: FC = () => {
  return (
    <nav className="flex justify-between px-12 py-6">
      <LogoType className="h-8" />
      <div className="flex gap-2">
        <Button>Sign in</Button>
        <Button>Sign up</Button>
      </div>
    </nav>
  )
}

export default Navbar
