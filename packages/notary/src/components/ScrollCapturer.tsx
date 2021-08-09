import React, {FC, useEffect, useRef} from "react"

export type ScrollCaptureObject = {pos: number; vel: number}

type Props = {
  onScroll: (info: ScrollCaptureObject) => void
}

const ScrollCapturer: FC<
  Omit<React.DetailedHTMLProps<React.HTMLProps<HTMLDivElement>, HTMLDivElement>, `ref` | `onScroll`> & Props
> = ({children, style, onScroll: callback, ...props}) => {
  const divRef = useRef<HTMLDivElement>(null)

  const prevScrollTop = useRef(0)
  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const onScroll = (evt: Event) => {
      callback({
        pos: div.scrollTop,
        vel: div.scrollTop - prevScrollTop.current,
      })
      prevScrollTop.current = div.scrollTop
    }

    div.addEventListener(`scroll`, onScroll)

    return () => {
      div.removeEventListener(`scroll`, onScroll)
    }
  }, [callback])

  return (
    <div {...props} style={{height: `100%`, overflow: `auto`, ...style}} ref={divRef}>
      {children}
    </div>
  )
}

export default ScrollCapturer
