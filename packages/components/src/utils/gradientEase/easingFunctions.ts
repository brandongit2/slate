type Polynomial = `Quad` | `Cubic` | `Quart` | `Quint` | `Sine` | `Expo` | `Circ`
export type EasingFunctions = `linear` | `easeIn${Polynomial}` | `easeOut${Polynomial}` | `easeInOut${Polynomial}`

export function ease(easingFunction: EasingFunctions, t: number) {
  switch (easingFunction) {
    // Linear
    case `linear`:
      return t

    // Quad
    case `easeInQuad`:
      return t * t
    case `easeOutQuad`:
      return -t * (t - 2)
    case `easeInOutQuad`:
      if ((t /= 1 / 2) < 1) {
        return (t * t) / 2
      } else {
        return -(--t * (t - 2) - 1) / 2
      }

    // Cubic
    case `easeInCubic`:
      return t * t * t
    case `easeOutCubic`:
      return (t = t - 1) * t * t + 1
    case `easeInOutCubic`:
      if ((t /= 1 / 2) < 1) {
        return (t * t * t) / 2
      } else {
        return ((t -= 2) * t * t + 2) / 2
      }

    // Quart
    case `easeInQuart`:
      return t * t * t * t
    case `easeOutQuart`:
      return -(t = t - 1) * t * t * t + 1
    case `easeInOutQuart`:
      if ((t /= 1 / 2) < 1) {
        return (t * t * t * t) / 2
      } else {
        return -((t -= 2) * t * t * t - 2) / 2
      }

    // Quint
    case `easeInQuint`:
      return t * t * t * t * t
    case `easeOutQuint`:
      return (t = t - 1) * t * t * t * t + 1
    case `easeInOutQuint`:
      if ((t /= 1 / 2) < 1) {
        return (t * t * t * t * t) / 2
      } else {
        return ((t -= 2) * t * t * t * t + 2) / 2
      }

    // Sine
    case `easeInSine`:
      return -Math.cos(t * (Math.PI / 2)) + 1
    case `easeOutSine`:
      return Math.sin(t * (Math.PI / 2))
    case `easeInOutSine`:
      return -(Math.cos(Math.PI * t) - 1) / 2

    // Circ
    case `easeInCirc`:
      return -(Math.sqrt(1 - t * t) - 1)
    case `easeOutCirc`:
      return Math.sqrt(1 - (t = t - 1) * t)
    case `easeInOutCirc`:
      if ((t /= 1 / 2) < 1) {
        return -(Math.sqrt(1 - t * t) - 1) / 2
      } else {
        return (Math.sqrt(1 - (t -= 2) * t) + 1) / 2
      }

    // Expo
    case `easeInExpo`:
      return t === 0 ? 0 : Math.pow(2, 10 * (t - 1))
    case `easeOutExpo`:
      return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1
    case `easeInOutExpo`:
      if (t === 0 || t === 1) return t
      if ((t /= 1 / 2) < 1) {
        return Math.pow(2, 10 * (t - 1)) / 2
      } else {
        return (-Math.pow(2, -10 * --t) + 2) / 2
      }
  }
}
