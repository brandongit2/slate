import chroma from "chroma-js"
import React, {FC} from "react"
import styled from "styled-components"
import zxcvbn from "zxcvbn"

const StrengthBar = styled.progress`
  &::-webkit-progress-bar {
    background: #d4d4d4;
  }

  &::-webkit-progress-value {
    background: ${({color}) => color};
    transition: all 0.4s;
  }
`

type Props = {
  password: string
}

const PasswordStrength: FC<Props> = ({password}) => {
  const pwScore = zxcvbn(password || ``).score
  const pwColor = chroma.scale([`#F84258`, `#50E128`]).mode(`lch`).correctLightness().domain([0, 4])(pwScore).hex()

  return <StrengthBar max={4} value={pwScore} color={pwColor} className="w-full h-1" />
}

export default PasswordStrength
