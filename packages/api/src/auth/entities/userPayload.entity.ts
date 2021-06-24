/**
 * The payload that is stored in our JWT auth tokens.
 */
export class UserPayload {
  sub!: string

  firstName!: string

  lastName!: string

  email!: string
}
