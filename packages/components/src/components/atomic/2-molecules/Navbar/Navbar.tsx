import classNames from "classnames"
import React, {ComponentType, FC} from "react"

import {useTw} from "#utils/twind"

type Props = {
  className: string
  logo: ComponentType<{className: string}>
}

export const Navbar: FC<Props> = ({className, logo, children}) => {
  const tw = useTw()

  const Logo = logo

  return (
    <nav className={classNames(tw`flex justify-between px-12 py-6 h-20 items-center`, className)}>
      <Logo className={tw`h-8`} />
      <div className={tw`flex gap-4 items-center`}>{children}</div>
    </nav>
  )
}
