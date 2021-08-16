import {createContext} from "react"

export type UserContextType = {
  isSignedIn: boolean | null
  id?: string
  firstName?: string
  lastName?: string
  email?: string
}

const UserContext = createContext<{user: UserContextType; setUser: (user: UserContextType) => void}>({
  user: {isSignedIn: null},
  setUser: () => {},
})

export default UserContext
