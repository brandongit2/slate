import React, {FC, createContext, useContext} from "react"
import {TW, tw} from "twind"

const SlateComponents = createContext<TW>(tw)

export const SlateThemeProvider: FC<{tw: TW}> = ({tw, children}) => {
  return <SlateComponents.Provider value={tw}>{children}</SlateComponents.Provider>
}

export function useTw() {
  const tw = useContext(SlateComponents)
  return tw
}
