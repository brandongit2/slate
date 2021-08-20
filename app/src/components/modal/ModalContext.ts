import {createContext} from "react"

import type {ReactNode} from "react"

const ModalContext = createContext({
  setModalContents(contents: ReactNode) {},
  setIsModalVisible(state: boolean) {},
})

export default ModalContext
