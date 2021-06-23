import {graphql} from "react-relay"

export const UserQuery = graphql`
  query UserQuery {
    user {
      id
      firstName
      lastName
      email
    }
  }
`

export const UserSignInMutation = graphql`
  mutation UserSignInMutation($email: String!, $password: String!) {
    signIn(signInInput: {email: $email, password: $password}) {
      id
      firstName
      lastName
      email
    }
  }
`

export const UserSignUpMutation = graphql`
  mutation UserSignUpMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(signUpInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
      id
      firstName
      lastName
      email
    }
  }
`
