import {css} from "@emotion/react"
import clsx from "clsx"
import React, {CSSProperties, InputHTMLAttributes, forwardRef} from "react"

import {getTailwindConfig} from "#utils/getTailwindConfig"

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
  const {theme} = getTailwindConfig()

  return (
    <fieldset className="flex flex-col items-start w-full" style={style}>
      <label
        css={css`
          ${required
            ? `&::after {
              content: "";
              display: block;
              width: 4px;
              height: 4px;
              border-radius: 2px;
              background: ${theme.colors!.red[`700`]};
              position: absolute;
              top: 1px;
              left: calc(100% + 3px);
            }`
            : ``}
        `}
        className={clsx(`text-sm font-bold relative transition-colors duration-300`, error && `text-red-700`)}
      >
        {label}
      </label>
      <input
        className={clsx(
          `border-2 border-black rounded-none w-full px-2 py-1 transition-colors duration-300 focus-visible:outline-none`,
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
