import PropTypes from 'prop-types'
import classNames from 'classnames'
import { indexBy, prop } from 'ramda'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'

import SocialButton from './components/SocialButton'
import { SOCIAL_ENUM } from './constants/social'

class Share extends Component {
  static propTypes = {
    /** Social Networks configuration */
    social: PropTypes.object,
    /** Share buttons options */
    options: PropTypes.shape({
      /** Share buttons size in pixels */
      size: PropTypes.number,
    }),
    /** Share URL title */
    title: PropTypes.string,
    /** Indcates if the component should render the Content Loader */
    loading: PropTypes.bool,
    /** Component and content loader styles */
    styles: PropTypes.object,
    /** CSS classes to be applied in the elements of the component */
    classes: PropTypes.shape({
      root: PropTypes.string,
      loader: PropTypes.shape({
        container: PropTypes.string,
        contentLoader: PropTypes.string
      }),
      social: PropTypes.shape({
        button: PropTypes.string,
        icon: PropTypes.string
      })
    })
  }

  static Loader = (loaderProps = {}) => {
    const {
      'vtex-share__button--loader': button,
      'vtex-share__button--loader-1': button1,
      'vtex-share__button--loader-2': button2,
      'vtex-share__button--loader-3': button3,
      classes
    } = loaderProps
    const loaderStyles = {
      r: '1em',
      height: '2em',
      cy: '1em',
      ...button,
    }

    return (
      <div className={classes && classNames('vtex-share vtex-share-loader', classes.container)}>
        <ContentLoader
          className={classes && classes.contentLoader}
          style={{
            width: '100%',
            height: '100%',
          }}
          height="100%"
          width="100%"
          {...loaderProps}>
          <circle
            cx="1em"
            {...loaderStyles}
            {...button1}
          />
          <circle
            cx="3.5em"
            {...loaderStyles}
            {...button2}
          />
          <circle
            cx="6em"
            {...loaderStyles}
            {...button3}
          />
        </ContentLoader>
      </div>
    )
  }

  static defaultProps = {
    social: {
      Facebook: true,
      Twitter: true,
      WhatsApp: true,
    },
    options: {},
    classes: {
      root: null,
      loader: {
        container: null,
        contentLoader: null
      },
      social: {
        button: null,
        icon: null,
      }
    }
  }

  static schema = {
    title: 'editor.share.title',
    description: 'editor.share.description',
    type: 'object',
    properties: {
      social: {
        title: 'editor.share.social.title',
        type: 'object',
        properties: {
          ...indexBy(
            prop('title'),
            SOCIAL_ENUM.map(socialNetwork => ({
              type: 'boolean',
              title: socialNetwork,
              default: Share.defaultProps.social[socialNetwork],
            }))
          ),
        },
      },
    },
  }

  render() {
    const {
      social,
      title,
      loading,
      options: { size },
    } = this.props

    const classes = {
      ...Share.defaultProps.classes,
      ...this.props.classes
    }

    if (loading) {
      return <Share.Loader classes={classes.loader} {...this.props.styles} />
    }

    return (
      <div className={classNames('vtex-share', classes.root)}>
        {Object.keys(social).map(
          (socialNetwork, index) =>
            social[socialNetwork] && (
              <SocialButton
                key={index}
                url={window.location && window.location.href}
                message={title}
                classes={classes.social}
                socialEnum={socialNetwork}
                size={size}
              />
            )
        )}
      </div>
    )
  }
}

export default Share
