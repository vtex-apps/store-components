import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const Container = ({ className, children }, ref) => {
  const classes = classNames('ph3 ph5-m ph8-l ph9-xl', className)

  return (
    <section className={classes} ref={ref}>
      {children}
    </section>
  )
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default React.forwardRef(Container)
