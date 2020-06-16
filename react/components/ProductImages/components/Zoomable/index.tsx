import React, { FC, ReactElement } from 'react'
import { Modal } from 'vtex.modal-layout'
import { useDevice } from 'vtex.device-detector'

import ZoomInPlace from './ZoomInPlace'
import ModalZoom from './ModalZoom'

export enum ZoomMode {
  InPlaceClick = 'in-place-click',
  InPlaceHover = 'in-place-hover',
  Disabled = 'disabled',
  OpenModal = 'open-modal',
}

interface Props {
  mode?: ZoomMode
  zoomContent?: ReactElement
  factor?: number
  ModalZoomElement?: typeof Modal
}

const Zoomable: FC<Props> = ({
  children,
  factor = 2,
  zoomContent,
  ModalZoomElement,
  mode = ZoomMode.InPlaceClick,
}) => {
  const { isMobile } = useDevice()

  if (isMobile && mode !== ZoomMode.Disabled) {
    // TODO: Good enough for now, but needs to be a gallery in the future.
    // Preferably photoswipe.com
    return (
      <ZoomInPlace type="click" factor={factor} zoomContent={zoomContent}>
        {children}
      </ZoomInPlace>
    )
  }

  switch (mode) {
    case ZoomMode.InPlaceHover:
      return (
        <ZoomInPlace type="hover" factor={factor} zoomContent={zoomContent}>
          {children}
        </ZoomInPlace>
      )
    case ZoomMode.InPlaceClick:
      return (
        <ZoomInPlace type="click" factor={factor} zoomContent={zoomContent}>
          {children}
        </ZoomInPlace>
      )
    case ZoomMode.OpenModal: {
      if (ModalZoomElement) {
        return (
          <ModalZoom ModalZoomElement={ModalZoomElement}>{children}</ModalZoom>
        )
      }
    }
    // eslint-disable-next-line no-fallthrough
    case ZoomMode.Disabled:
    default:
      return <>{children}</>
  }
}

export default Zoomable
