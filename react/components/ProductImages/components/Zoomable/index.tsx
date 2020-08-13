import React, { FC, ReactElement } from 'react'
import { Modal } from 'vtex.modal-layout'
import { useDevice } from 'vtex.device-detector'

import ZoomInPlace from './ZoomInPlace'
import ModalZoom from './ModalZoom'

export type ZoomMode =
  | 'in-place-click'
  | 'in-place-hover'
  | 'disabled'
  | 'open-modal'

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
  mode = 'in-place-click',
}) => {
  const { isMobile } = useDevice()

  if (isMobile && mode !== 'disabled' && mode !== 'open-modal') {
    // TODO: Good enough for now, but needs to be a gallery in the future.
    // Preferably photoswipe.com
    return (
      <ZoomInPlace type="click" factor={factor} zoomContent={zoomContent}>
        {children}
      </ZoomInPlace>
    )
  }

  switch (mode) {
    case 'in-place-hover':
      return (
        <ZoomInPlace type="hover" factor={factor} zoomContent={zoomContent}>
          {children}
        </ZoomInPlace>
      )

    case 'in-place-click':
      return (
        <ZoomInPlace type="click" factor={factor} zoomContent={zoomContent}>
          {children}
        </ZoomInPlace>
      )

    case 'open-modal': {
      if (ModalZoomElement) {
        return (
          <ModalZoom ModalZoomElement={ModalZoomElement}>{children}</ModalZoom>
        )
      }
    }
    // falls through

    case 'disabled':
    // falls through

    default:
      return <>{children}</>
  }
}

export default Zoomable
