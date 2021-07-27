import classNames from "classnames"
import React, {ComponentProps} from "react"

import type {TW} from "twind"

import {useTw} from "#utils/twind"

export function injectTwClasses<C extends keyof JSX.IntrinsicElements>(Component: C, twClasses: (tw: TW) => string) {
  return function WrappedComponent(props: ComponentProps<C>): JSX.Element {
    const tw = useTw()

    // @ts-ignore
    return <Component {...props} className={classNames(twClasses(tw), props.className)} />
  }
}
