import {ReactNode, createContext} from "react"

const ModalContext = createContext({
  setModalContents(contents: ReactNode) {},
  setIsModalVisible(state: boolean) {},
})

export default ModalContext
