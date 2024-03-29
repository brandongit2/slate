import React, {useEffect} from "react"

import type {FC} from "react"

import ChevronDown from "#public/icons/chevron-down.svg"
import ChevronUp from "#public/icons/chevron-up.svg"
import {getTailwindConfig} from "#utils/getTailwindConfig"

export type ErrorCarouselProps = {
  errors: string[]
  currentError: number
  setCurrentError: React.Dispatch<React.SetStateAction<number>>
}

const ErrorCarousel: FC<ErrorCarouselProps> = ({errors, currentError, setCurrentError}) => {
  const {theme} = getTailwindConfig()

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
              <ChevronUp fill={theme.colors!.red[`700`]} className="h-2" />
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs select-none -mt-0.5 -mb-1">
            {currentError + 1}/{errors.length}
          </span>
          {currentError !== errors.length - 1 ? (
            <button type="button" onClick={errorDown}>
              <ChevronDown fill={theme.colors!.red[`700`]} className="h-2" />
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
