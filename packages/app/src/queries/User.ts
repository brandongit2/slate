import {graphql} from "react-relay"

export const UserQuery = graphql`
  query UserQuery($userId: String!) {
    user(id: $userId) {
      id
      name
    }
  }
`
