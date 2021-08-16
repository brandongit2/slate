import clsx from "clsx"
import {FC} from "react"

type ButtonProps = {
  disabled?: boolean
  outlined?: boolean
  className?: string
}

const Button: FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & ButtonProps
> = ({disabled = false, outlined = false, className, ...props}) => {
  return (
    <button
      className={clsx(`button`, disabled && `button-disabled`, outlined && `button-outlined`, className)}
      disabled={disabled}
      {...props}
    />
  )
}

export default Button
