import React, { useState, createContext, useContext } from 'react'

export const ModalContext = {
  useModalDispatch: jest.fn(),
}

interface TriggerProps {
  children: React.ReactNode
}

interface ModalContextMockState {
  open: boolean
  toggleOpen?: () => void
}

const ModalContextMock = createContext<ModalContextMockState>({ open: false })

export function ModalTrigger(props: TriggerProps) {
  const { children } = props
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope, jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div data-testid="modal-trigger" onClick={handleClick} role="button">
      <ModalContextMock.Provider value={{ open, toggleOpen: handleClick }}>
        {children}
      </ModalContextMock.Provider>
    </div>
  )
}

interface ModalProps {
  children: React.ReactNode
}

export function Modal(props: ModalProps) {
  const { children } = props
  const { open } = useContext(ModalContextMock)

  if (!open) {
    return null
  }

  return <div data-testid="modal-container">{children}</div>
}
