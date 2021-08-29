import clsx from "clsx"
import React from "react"

import type {FC} from "react"

import LogoType from "#public/slate-logo.svg"
import AuthButtons from "./AuthButtons"

export type NavbarProps = {
  className: string
}

const Navbar: FC<NavbarProps> = ({className}) => {
  return (
    <nav className={clsx(`flex justify-between px-12 py-6 h-20 items-center`, className)}>
      <LogoType className="h-8" />
      <div className="flex gap-4 items-center">
        <AuthButtons />
      </div>
    </nav>
  )
}

export default Navbar
