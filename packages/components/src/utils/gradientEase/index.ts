import chroma from "chroma-js"

import {EasingFunctions, ease} from "./easingFunctions"

/**
 * Generate a CSS `linear-gradient()` with specified easing.
 * @param easingFunction The easing function to use. Please refer to the type definition for more.
 * @param colors         An array of CSS colors to be used in the gradient.
 * @param [positions]    An array of positions (specified as numbers from 0-1), corresponding to each color. `colors` and `positions` must have the same length.
 * @param [angle]        A CSS angle to be used for the gradient.
 */
export function gradientEase(easingFunction: EasingFunctions, colors: string[], positions?: number[], angle?: string) {
  if (positions && colors.length !== positions.length)
    throw new Error(`\`colors.length\` and \`positions.length\` don't match.`)

  if (!positions)
    positions = Array(colors.length)
      .fill(null)
      .map((_, i) => i / colors.length)

  let gradientString = `linear-gradient(`
  if (angle) gradientString += `${angle},`

  let acc = positions[0]
  for (let i = 0; i < colors.length - 1; i++) {
    const scale = chroma.scale([colors[i], colors[i + 1]])
    const range = positions[i + 1] - positions[i]

    let func
    if (easingFunction === `linear`) {
      func = `linear`
    } else {
      func = `easeInOut${easingFunction.replace(/^ease(In)?(Out)?/, ``)}`
      if (!/In/.test(easingFunction) && i === 0) func = func.replace(`In`, ``)
      if (!/Out/.test(easingFunction) && i === colors.length - 2) func = func.replace(`Out`, ``)
    }

    for (let j = 0; j <= 10; j++) {
      gradientString += `${scale(ease(func as EasingFunctions, j / 10))} ${(acc + (j / 10) * range) * 100}%,`
    }

    acc += range
  }
  gradientString = gradientString.slice(0, -1)
  gradientString += `)`

  return gradientString
}
