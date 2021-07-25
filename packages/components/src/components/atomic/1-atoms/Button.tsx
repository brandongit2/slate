import classNames from "classnames"
import React, {FC} from "react"

type Props = {
  disabled?: boolean
  outlined?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({disabled, outlined, className, children, ...props}) => {
  return (
    <button
      className={classNames(
        className,
        `px-4 py-2 rounded-none font-bold text-sm transition duration-300`,
        disabled && `filter contrast-25 cursor-default`,
        outlined ? `border-black border-2` : `bg-black text-white`,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
