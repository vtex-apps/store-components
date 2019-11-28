import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container']

const render = ({ className, cssHandles, children, ...props }, ref) => {
  const classes = classNames(
    cssHandles.container,
    'ph3 ph5-m ph2-xl mw9 center',
    className
  )

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

export default withCssHandles(CSS_HANDLES, {
  migrationFrom: 'vtex.store-components@3.x'
})(Container)
