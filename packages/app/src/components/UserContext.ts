import {createContext} from "react"

export type UserContextType = {
  isSignedIn: boolean
  id?: string
  firstName?: string
  lastName?: string
  email?: string
}

const UserContext = createContext<{user: UserContextType; setUser: (user: UserContextType) => void}>({
  user: {isSignedIn: false},
  setUser: () => {},
})

export default UserContext
