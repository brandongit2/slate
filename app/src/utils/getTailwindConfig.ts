import resolveConfig from "tailwindcss/resolveConfig"

import type {TailwindConfig} from "tailwindcss/tailwind-config"

import tailwindConfig from "../../tailwind.config"

export function getTailwindConfig() {
  // @ts-ignore
  const config = resolveConfig(tailwindConfig) as TailwindConfig & typeof tailwindConfig

  return config
}
