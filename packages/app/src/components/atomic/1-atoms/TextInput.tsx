import classNames from "classnames"
import React, {CSSProperties, InputHTMLAttributes, forwardRef} from "react"
import styled from "styled-components"
import colors from "tailwindcss/colors"

const Label = styled.label<{required: boolean}>`
  ${({required}) =>
    required
      ? `
        &::after {
          content: "";
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: ${colors.red[`700`]};
          position: absolute;
          top: 1px;
          left: calc(100% + 3px);
        }
      `
      : ``}
`

type Props = {
  label: string
  required?: boolean
  error?: string
  activeError?: boolean
  style?: CSSProperties
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  {label, required = false, error, activeError, style, ...props},
  ref,
) {
  return (
    <fieldset className="flex flex-col items-start w-full" style={style}>
      <Label
        className={classNames(`text-sm font-bold relative transition-colors duration-300`, error && `text-red-700`)}
        required={required}
      >
        {label}
      </Label>
      <input
        className={classNames(
          `border-2 border-black rounded-none w-full px-2 py-1 transition-colors duration-300`,
          error && `border-red-700`,
          activeError && error && `bg-red-100`,
        )}
        required={required}
        {...props}
        ref={ref}
      />
    </fieldset>
  )
})

export default TextInput
