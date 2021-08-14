import React, {FC, useEffect, useRef} from "react"

import mergeRefs from "#utils/mergeRefs"

export type ScrollCaptureObject = {pos: number; vel: number}

type Props = {
  onScroll: (scrollHistory: ScrollCaptureObject[]) => void
  ref?: React.MutableRefObject<HTMLDivElement>
}

const ScrollCapturer: FC<Omit<React.AllHTMLAttributes<HTMLDivElement>, `ref` | `onScroll`> & Props> = ({
  children,
  style,
  onScroll: callback,
  ref: parentRef,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  const prevScrollTop = useRef(0)
  const scrollHistory = useRef<ScrollCaptureObject[]>([])
  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const onScroll = (evt: Event) => {
      const scrollInfo = {
        pos: div.scrollTop,
        vel: div.scrollTop - prevScrollTop.current,
      }
      scrollHistory.current.push(scrollInfo)
      callback(scrollHistory.current)
      prevScrollTop.current = div.scrollTop
    }

    div.addEventListener(`scroll`, onScroll)

    return () => {
      div.removeEventListener(`scroll`, onScroll)
    }
  }, [callback])

  return (
    <div {...props} style={{height: `100%`, overflow: `auto`, ...style}} ref={mergeRefs(divRef, parentRef)}>
      {children}
    </div>
  )
}

export default ScrollCapturer
