import resolveConfig from "tailwindcss/resolveConfig"
import {TailwindConfig} from "tailwindcss/tailwind-config"

import tailwindConfig from "../../tailwind.config"

export default function getTailwindConfig() {
  // @ts-ignore
  const config = resolveConfig(tailwindConfig) as TailwindConfig & typeof tailwindConfig

  return config
}
