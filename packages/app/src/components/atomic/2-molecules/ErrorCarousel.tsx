import React, {FC} from "react"
import colors from "tailwindcss/colors"

import ChevronDown from "@app/public/icons/chevron-down.svg"
import ChevronUp from "@app/public/icons/chevron-up.svg"

type Props = {
  errors: string[]
  currentError: number
  setCurrentError: React.Dispatch<React.SetStateAction<number>>
}

const ErrorCarousel: FC<Props> = ({errors, currentError, setCurrentError}) => {
  function errorUp() {
    if (currentError === 0) return
    setCurrentError((currentError) => currentError - 1)
  }

  function errorDown() {
    if (currentError === Object.values(errors).length - 1) return
    setCurrentError((currentError) => currentError + 1)
  }

  if (errors.length <= 1) return null
  return (
    <div className="grid justify-items-center" style={{gridTemplateRows: `12px auto 12px`}}>
      {currentError !== 0 ? (
        <button type="button" onClick={errorUp}>
          <ChevronUp fill={colors.red[`700`]} className="h-2" />
        </button>
      ) : (
        <div />
      )}
      <span className="text-xs select-none -mt-0.5 -mb-1">
        {currentError + 1}/{Object.values(errors).length}
      </span>
      {currentError !== Object.values(errors).length ? (
        <button type="button" onClick={errorDown}>
          <ChevronDown fill={colors.red[`700`]} className="h-2" />
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}

export default ErrorCarousel
