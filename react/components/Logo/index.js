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
const Logo = ({ href, url, width, height, title, mobileWidth, mobileHeight }) => {
  const { account, hints: { mobile } } = useRuntime()

  const logoClassNames = classNames('store-logo', styles.logoContainer, {
    [styles.sizeDesktop]: !mobile,
    [styles.sizeMobile]: mobile,
  })

  const imgWidth = mobile && mobileWidth ? mobileWidth : width
  const imgHeight = mobile && mobileHeight ? mobileHeight : height

  const logo = (
    <span className={`${logoClassNames} pv4 ph6`}>
      {url ? (
        <img
          src={url.replace(/{{account}}/g, account)}
          width={imgWidth}
          height={imgHeight}
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

Logo.schema = {
  title: 'admin/editor.logo.title',
  description: 'admin/editor.logo.description',
  type: 'object',
  properties: {
    href: {
      title: 'admin/editor.logo.href.title',
      description: 'admin/editor.logo.href.description',
      type: 'string',
    },
    url: {
      title: 'admin/editor.logo.url.title',
      description: 'admin/editor.logo.url.description',
      type: 'string',
    },
    width: {
      title: 'admin/editor.logo.width.title',
      description: 'admin/editor.logo.width.description',
      type: 'number',
      isLayout: true,
    },
    height: {
      title: 'admin/editor.logo.height.title',
      description: 'admin/editor.logo.height.description',
      type: 'number',
      isLayout: true,
    },
    title: {
      title: 'admin/editor.logo.title.title',
      description: 'admin/editor.logo.title.description',
      type: 'string',
    },
    mobileWidth: {
      title: 'admin/editor.logo.mobileWidth.title',
      description: 'admin/editor.logo.mobileWidth.description',
      type: 'number',
      isLayout: true,
    },
    mobileHeight: {
      title: 'admin/editor.logo.mobileHeight.title',
      description: 'admin/editor.logo.mobileHeight.description',
      type: 'number',
      isLayout: true,
    },
  }
}

export default Logo
