import clsx from "clsx"
import {FC} from "react"

import NotaryLogo from "#public/notary-logo.svg"

type Props = {
  noLogo?: boolean
  className?: string
}

const Navbar: FC<Props> = ({className, noLogo = false}) => {
  return <div className={clsx(`px-12 py-6 w-full`, className)}>{!noLogo && <NotaryLogo className="h-14" />}</div>
}

export default Navbar
