import React from 'react'
import type { PropsWithChildren, ForwardedRef } from 'react'

import styles from './Container.css'

type Props = PropsWithChildren<{
  className?: string
}>

function InnerContainer(
  { className, children, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <section
      {...props}
      className={`${styles.container} ph3 ph5-m ph2-xl mw9 center ${
        className ?? ''
      }`}
      ref={ref}
    >
      {children}
    </section>
  )
}

InnerContainer.displayName = 'Container'

/**
 * Renders a container to wrap elements in the middle of the viewport.
 */
const Container = React.forwardRef<HTMLDivElement, Props>(InnerContainer)

export default Container
