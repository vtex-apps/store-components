import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const render = ({ className, children, ...props }, ref) => {
  const classes = classNames('ph3 ph5-m ph8-l ph9-xl mw9 center', className)

  return (
    <section {...props} className={classes} ref={ref}>
      {children}
    </section>
  )
}

render.displayName = 'Container'

const Container = React.forwardRef(render)

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Container
