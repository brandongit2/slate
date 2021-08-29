import {css, keyframes} from "@emotion/react"
import clsx from "clsx"
import React from "react"

import type {FC} from "react"

import {gradientEase} from "#utils/gradientEase"

const shine = keyframes`
  from {
    background-position: 400% top;
  }

  to {
    background-position: 0% top;
  }
`

export type LoadingShineProps = {
  className?: string
}

const LoadingShine: FC<LoadingShineProps> = ({className}) => {
  return (
    <div
      className={clsx(`bg-gray-300`, className)}
      css={css`
        animation: ${shine} 8s linear infinite;
        background-image: ${gradientEase(`easeInOutSine`, [`#ccc`, `#eee`, `#ccc`], [0.3, 0.5, 0.7], `70deg`)};
        background-size: 800% 100%;
      `}
    />
  )
}

export default LoadingShine
