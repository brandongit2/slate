import {graphql} from "react-relay"

export const UserQuery = graphql`
  query UserQuery {
    user {
      id
      name
      email
    }
  }
`
