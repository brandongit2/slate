import classNames from "classnames"
import React, {FC} from "react"

import {useTw} from "#utils/twind"

type Props = {
  disabled?: boolean
  outlined?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({disabled, outlined, className, children, ...props}) => {
  const tw = useTw()

  return (
    <button
      className={classNames(
        className,
        tw`px-4 py-2 rounded-none font-bold text-sm transition duration-300`,
        disabled && tw`filter contrast-25 cursor-default`,
        outlined ? tw`border-black border-2` : tw`bg-black text-white`,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
