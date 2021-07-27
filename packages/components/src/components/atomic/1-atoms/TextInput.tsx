import classNames from "classnames"
import React, {CSSProperties, InputHTMLAttributes, forwardRef} from "react"
import styled from "styled-components"
import colors from "tailwindcss/colors"

import {useTw} from "#utils/twind"

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

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  {label, required = false, error, activeError, style, ...props},
  ref,
) {
  const tw = useTw()

  return (
    <fieldset className={tw`flex flex-col items-start w-full`} style={style}>
      <Label
        className={classNames(tw`text-sm font-bold relative transition-colors duration-300`, error && tw`text-red-700`)}
        required={required}
      >
        {label}
      </Label>
      <input
        className={classNames(
          tw`border-2 border-black rounded-none w-full px-2 py-1 transition-colors duration-300 focus-visible:outline-none`,
          error && tw`border-red-700`,
          activeError && error && tw`bg-red-100`,
        )}
        required={required}
        {...props}
        ref={ref}
      />
    </fieldset>
  )
})
