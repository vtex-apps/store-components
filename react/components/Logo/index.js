import React from 'react'
import { Link, useRuntime } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Placeholder from './Placeholder'

import styles from './styles.css'

/**
 * Wraps element with link, if exists
 */
const wrapWithLink = (href, element) =>
  href ? <Link to={href}>{element}</Link> : element

/**
 * Logo of the store
 */
const Logo = ({ href, isMobile, url, width, height, title }) => {
  const { account } = useRuntime()

  const logoClassNames = classNames('store-logo', styles.logoContainer, {
    [styles.sizeDesktop]: !isMobile,
    [styles.sizeMobile]: isMobile,
  })

  const logo = (
    <span className={`${logoClassNames} pv4 ph6`}>
      {url ? (
        <img
          src={url.replace(/{{account}}/g, account)}
          width={width}
          height={height}
          alt={title}
        />
      ) : (
          <Placeholder width={width} height={height} title={title} />
        )}
    </span>
  )

  return wrapWithLink(href, logo)
}

Logo.propTypes = {
  /** URL of the logo */
  url: PropTypes.string,
  /** Title to be displayed as alt text */
  title: PropTypes.string.isRequired,
  /** Logo's width */
  width: PropTypes.number,
  /** Logo's height */
  height: PropTypes.number,
}

export default Logo
