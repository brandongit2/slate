import React, {FC, createContext, useContext} from "react"
import {Configuration, setup, tw} from "twind"

const SlateComponents = createContext<Configuration>({})

export const SlateThemeProvider: FC<{config?: Configuration}> = ({config, children}) => {
  return <SlateComponents.Provider value={config || {}}>{children}</SlateComponents.Provider>
}

export function useSlateTheme() {
  const context = useContext(SlateComponents)
  return context
}

export function useTw() {
  setup(useSlateTheme())

  return tw
}
