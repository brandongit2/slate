import classNames from "classnames"
import React, {FC} from "react"

import LogoType from "@app/public/slate-logo.svg"

import AuthButtons from "./AuthButtons"

type Props = {
  className: string
}

const Navbar: FC<Props> = ({className}) => {
  return (
    <nav className={classNames(`flex justify-between px-12 py-6`, className)}>
      <LogoType className="h-8" />
      <div className="flex gap-4 items-center">
        <AuthButtons />
      </div>
    </nav>
  )
}

export default Navbar
