import clsx from "clsx"
import React, {FC} from "react"

import LogoType from "#public/slate-logo.svg"
import AuthButtons from "./AuthButtons"

type Props = {
  className: string
}

const Navbar: FC<Props> = ({className}) => {
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
