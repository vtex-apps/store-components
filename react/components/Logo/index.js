import React from 'react'
import { Link, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as Amp from 'react-amphtml'
import { defineMessages } from 'react-intl'

import Placeholder from './Placeholder'

import styles from './styles.css'

const CSS_HANDLES = ['logoLink', 'logoImage', 'logoContainer']

const messages = defineMessages({
  editorLogoTitle: {
    id: 'admin/editor.logo.title',
    from: 'vtex.admin-messages'
  },
  editorLogoDescription: {
    id: 'admin/editor.logo.description',
    from: 'vtex.admin-messages'
  },
  editorLogoHrefTitle: {
    id: 'admin/editor.logo.href.title',
    from: 'vtex.admin-messages'
  },
  editorLogoHrefDescription: {
    id: 'admin/editor.logo.href.description',
    from: 'vtex.admin-messages'
  },
  editorLogoUrlTitle: {
    id: 'admin/editor.logo.url.title',
    from: 'vtex.admin-messages'
  },
  editorLogoUrlDescription: {
    id: 'admin/editor.logo.url.description',
    from: 'vtex.admin-messages'
  },
  editorLogoWidthTitle: {
    id: 'admin/editor.logo.width.title',
    from: 'vtex.admin-messages'
  },
  editorLogoWidthDescription: {
    id: 'admin/editor.logo.width.description',
    from: 'vtex.admin-messages'
  },
  editorLogoHeightTitle: {
    id: 'admin/editor.logo.height.title',
    from: 'vtex.admin-messages'
  },
  editorLogoHeightDescription: {
    id: 'admin/editor.logo.height.description',
    from: 'vtex.admin-messages'
  },
  editorLogoTitleTitle: {
    id: 'admin/editor.logo.title.title',
    from: 'vtex.admin-messages'
  },
  editorLogoTitleDescription: {
    id: 'admin/editor.logo.title.description',
    from: 'vtex.admin-messages'
  },
  editorLogoMobilewidthTitle: {
    id: 'admin/editor.logo.mobileWidth.title',
    from: 'vtex.admin-messages'
  },
  editorLogoMobilewidthDescription: {
    id: 'admin/editor.logo.mobileWidth.description',
    from: 'vtex.admin-messages'
  },
  editorLogoMobileheightTitle: {
    id: 'admin/editor.logo.mobileHeight.title',
    from: 'vtex.admin-messages'
  },
  editorLogoMobileheightDescription: {
    id: 'admin/editor.logo.mobileHeight.description',
    from: 'vtex.admin-messages'
  }
})

/**
 * Logo of the store
 */
const Logo = ({
  url,
  href,
  width,
  height,
  title,
  mobileWidth,
  mobileHeight,
}) => {
  const {
    amp,
    account,
    hints: { mobile },
  } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)
  const logoClassNames = classNames('store-logo', handles.logoContainer, {
    [styles.sizeDesktop]: !mobile,
    [styles.sizeMobile]: mobile,
  })

  const imgWidth = mobile && mobileWidth ? mobileWidth : width
  const imgHeight = mobile && mobileHeight ? mobileHeight : height

  const imageUrl = url && url.replace(/{{account}}/g, account)

  let image = null

  if (amp && url) {
    image = (
      <Amp.AmpImg
        specName="default"
        width={imgWidth}
        height={imgHeight}
        alt={title}
        src={imageUrl}
        className={handles.logoImage}
      />
    )
  } else if (url) {
    image = (
      <img
        src={imageUrl}
        width={imgWidth}
        height={imgHeight}
        alt={title}
        className={handles.logoImage}
      />
    )
  }

  const logo = (
    <span className={`${logoClassNames} pv4 ph6`}>
      {url ? (
        image
      ) : (
        <Placeholder width={width} height={height} title={title} />
      )}
    </span>
  )

  return href ? (
    <Link to={href} className={handles.logoLink}>
      {logo}
    </Link>
  ) : (
    logo
  )
}

Logo.propTypes = {
  /** URL of the logo */
  url: PropTypes.string,
  /** Title to be displayed as alt text */
  title: PropTypes.string.isRequired,
  /** Logo's width */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Logo's height */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Logo.schema = {
  title: messages.editorLogoTitle.id,
  description: messages.editorLogoDescription.id,
  type: 'object',
  properties: {
    href: {
      title: messages.editorLogoHrefTitle.id,
      description: messages.editorLogoHrefDescription.id,
      type: 'string'
    },
    url: {
      title: messages.editorLogoUrlTitle.id,
      description: messages.editorLogoUrlDescription.id,
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader'
      }
    },
    width: {
      title: messages.editorLogoWidthTitle.id,
      description: messages.editorLogoWidthDescription.id,
      type: 'number',
      isLayout: true
    },
    height: {
      title: messages.editorLogoHeightTitle.id,
      description: messages.editorLogoHeightDescription.id,
      type: 'number',
      isLayout: true
    },
    title: {
      title: messages.editorLogoTitleTitle.id,
      description: messages.editorLogoTitleDescription.id,
      type: 'string'
    },
    mobileWidth: {
      title: messages.editorLogoMobilewidthTitle.id,
      description: messages.editorLogoMobilewidthDescription.id,
      type: 'number',
      isLayout: true
    },
    mobileHeight: {
      title: messages.editorLogoMobileheightTitle.id,
      description: messages.editorLogoMobileheightDescription.id,
      type: 'number',
      isLayout: true
    }
  }
}

export default Logo
