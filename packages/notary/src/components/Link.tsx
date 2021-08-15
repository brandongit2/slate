import {LinkProps, default as NextLink} from "next/link"
import {FC} from "react"

type Props = {
  disabled?: boolean
}

const Link: FC<Props & LinkProps> = ({children, disabled = false, ...props}) => {
  if (disabled) {
    return <>{children}</>
  } else {
    return (
      <NextLink {...props}>
        <a>{children}</a>
      </NextLink>
    )
  }
}

export default Link
