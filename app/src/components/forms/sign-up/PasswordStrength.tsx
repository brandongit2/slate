import {css} from "@emotion/react"
import chroma from "chroma-js"
import React from "react"
import zxcvbn from "zxcvbn"

import type {FC} from "react"

type Props = {
  password: string
}

const PasswordStrength: FC<Props> = ({password}) => {
  const pwScore = zxcvbn(password || ``).score
  const pwColor = chroma.scale([`#F84258`, `#50E128`]).mode(`lch`).correctLightness().domain([0, 4])(pwScore).hex()

  return (
    <progress
      css={css`
        &::-webkit-progress-bar {
          background: #d4d4d4;
        }

        &::-webkit-progress-value {
          background: ${pwColor};
          transition: all 0.4s;
        }
      `}
      max={4}
      value={pwScore}
      className="w-full h-1"
    />
  )
}

export default PasswordStrength
