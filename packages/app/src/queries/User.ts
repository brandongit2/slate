import {graphql} from "react-relay"

export const UserQuery = graphql`
  query UserQuery($userId: String!) {
    user(id: $userId) {
      id
      name
    }
  }
`

export type UserQueryType = {
  variables: {userId: string}
  response: {
    user: {
      id: string
      name: string
    }
  }
}
