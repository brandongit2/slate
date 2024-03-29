import React from "react"

import type {FC} from "react"

import {getTailwindConfig} from "#utils/getTailwindConfig"

const Spinner: FC = () => {
  const {theme} = getTailwindConfig()

  return (
    <svg viewBox="0 0 100 100" className="w-6 h-6 animate-spin">
      <mask id="mask" x={0} y={0} width={100} height={100}>
        <circle cx={50} cy={50} r={50} fill="white" />
        <circle cx={50} cy={50} r={36} fill="black" />
      </mask>
      <foreignObject x={0} y={0} width={100} height={100} mask="url(#mask)">
        <div
          className="w-full h-full"
          style={{
            background: `conic-gradient(from 0deg, black 0%, black 70%, ${theme.colors!.gray[`300`]} 71%, ${
              theme.colors!.gray[`300`]
            } 99%)`,
          }}
        />
      </foreignObject>
    </svg>
  )
}

export default Spinner
