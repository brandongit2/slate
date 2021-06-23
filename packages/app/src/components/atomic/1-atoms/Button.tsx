import classNames from "classnames"
import React, {FC} from "react"

type Props = {
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = ({disabled, className, children, ...props}) => {
  return (
    <button
      className={classNames(
        className,
        `bg-black px-4 py-2 rounded-none text-white font-bold text-sm transition duration-300`,
        disabled && `filter contrast-25 cursor-default`,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
