import classNames from "classnames"
import React, {ComponentProps} from "react"

export function injectClasses<C extends keyof JSX.IntrinsicElements>(Component: C, ...classes: string[]) {
  return function WrappedComponent(props: ComponentProps<C>): JSX.Element {
    // @ts-ignore
    return <Component {...props} className={classNames(...classes, props.className)} />
  }
}
