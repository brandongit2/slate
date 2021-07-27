import React, {FC, useContext} from "react"

import CloseIcon from "#assets/icons/close.svg"
import {useTw} from "#utils/twind"
import ModalContext from "./ModalContext"

const CloseButton: FC = () => {
  const tw = useTw()
  const {setIsModalVisible} = useContext(ModalContext)

  function handleClick() {
    setIsModalVisible(false)
  }

  return (
    <button className={tw`absolute top-6 right-6`} type="button" onClick={handleClick}>
      <CloseIcon className={tw`h-6`} />
    </button>
  )
}

export default CloseButton
