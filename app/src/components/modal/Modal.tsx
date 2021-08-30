import React, {useContext} from "react"
import {createPortal} from "react-dom"

import type {FC} from "react"

import CloseIcon from "#public/icons/close.svg"

const Modal: FC = ({children}) => {
  const {setIsModalVisible} = useContext(ModalContext)

  function handleClick() {
    setIsModalVisible(false)
  }

  return createPortal(
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50" onClick={handleClick} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6">
        <button className="absolute top-6 right-6" type="button" onClick={handleClick}>
          <CloseIcon className="h-6" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById(`modals`)!,
  )
}

export default Modal
