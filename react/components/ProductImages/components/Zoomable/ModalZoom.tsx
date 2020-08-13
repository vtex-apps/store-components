import React from 'react'
import { ModalTrigger, Modal } from 'vtex.modal-layout'

interface Props {
  children: React.ReactNode
  ModalZoomElement: typeof Modal
}

function ModalZoom(props: Props) {
  const { children, ModalZoomElement } = props

  return (
    <ModalTrigger>
      {children}
      <ModalZoomElement />
    </ModalTrigger>
  )
}

export default ModalZoom
