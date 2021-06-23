import React, {FC, useEffect} from "react"
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
    if (currentError === errors.length - 1) return
    setCurrentError((currentError) => currentError + 1)
  }

  useEffect(() => {
    if (errors.length > 0 && currentError > errors.length - 1) setCurrentError(errors.length - 1)
  })

  return (
    <div className="flex justify-between gap-x-6 items-center text-red-700">
      <span className="h-8 overflow-visible grid items-center">{errors[currentError]}</span>
      {errors.length > 1 && (
        <div className="grid justify-items-center" style={{gridTemplateRows: `12px auto 12px`}}>
          {currentError !== 0 ? (
            <button type="button" onClick={errorUp}>
              <ChevronUp fill={colors.red[`700`]} className="h-2" />
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs select-none -mt-0.5 -mb-1">
            {currentError + 1}/{errors.length}
          </span>
          {currentError !== errors.length - 1 ? (
            <button type="button" onClick={errorDown}>
              <ChevronDown fill={colors.red[`700`]} className="h-2" />
            </button>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  )
}

export default ErrorCarousel
