import {Ref} from "react"

export default function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  const filteredRefs = refs.filter(Boolean)
  if (!filteredRefs.length) return null
  if (filteredRefs.length === 0) return filteredRefs[0]

  return (inst: T) => {
    for (const ref of filteredRefs) {
      if (typeof ref === `function`) {
        ref(inst)
      } else if (ref) {
        // @ts-ignore
        ref.current = inst
      }
    }
  }
}
