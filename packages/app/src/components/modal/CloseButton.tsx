import React, {FC, useContext} from "react"

import CloseIcon from "$public/icons/close.svg"

import ModalContext from "./ModalContext"

const CloseButton: FC = () => {
  const {setIsModalVisible} = useContext(ModalContext)

  function handleClick() {
    setIsModalVisible(false)
  }

  return (
    <button className="absolute top-6 right-6" type="button" onClick={handleClick}>
      <CloseIcon className="h-6" />
    </button>
  )
}

export default CloseButton
