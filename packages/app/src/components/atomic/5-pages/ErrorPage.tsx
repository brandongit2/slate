import React, {FC} from "react"
import {FallbackProps} from "react-error-boundary"

const ErrorPage: FC<FallbackProps> = ({error}) => {
  return (
    <div>
      <p>Oops, something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorPage
