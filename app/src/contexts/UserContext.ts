import {createContext} from "react"

export type UserContextType =
  | {
      isSignedIn: true
      id: string
      firstName: string
      lastName: string
      email: string
    }
  | {isSignedIn: false | null}

const UserContext = createContext<{user: UserContextType; setUser: (user: UserContextType) => void}>({
  user: {isSignedIn: null},
  setUser: () => {},
})

export default UserContext
