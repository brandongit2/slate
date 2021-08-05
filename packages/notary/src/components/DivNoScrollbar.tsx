import {FC} from "react"

const DivNoScrollbar: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>
}

export default DivNoScrollbar
