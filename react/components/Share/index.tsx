import classNames from 'classnames'
import { indexBy, prop } from 'ramda'
import React, { Component } from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-content-loader` if i... Remove this comment to see the full error message
import ContentLoader from 'react-content-loader'
import { FormattedMessage } from 'react-intl'

import SocialButton from './components/SocialButton'
import { SOCIAL_LIST } from './constants/social'
import styles from './styles.css'

type OwnProps = {
  social?: any
  options?: {
    size?: number
  }
  title?: string
  loading?: boolean
  styles?: any
  className?: string
  shareLabelClass?: string
  socialButtonClass?: string
  buttonsContainerClass?: string
  socialIconClass?: string
  loaderContainerClass?: string
  contentLoaderClass?: string
  imageUrl?: string
}

type Props = OwnProps & typeof Share.defaultProps

class Share extends Component<Props> {
  static Loader = (loaderProps = {}) => {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'vtex-share__button--loader' does not exi... Remove this comment to see the full error message
      'vtex-share__button--loader': button,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'vtex-share__button--loader-1' does not e... Remove this comment to see the full error message
      'vtex-share__button--loader-1': button1,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'vtex-share__button--loader-2' does not e... Remove this comment to see the full error message
      'vtex-share__button--loader-2': button2,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'vtex-share__button--loader-3' does not e... Remove this comment to see the full error message
      'vtex-share__button--loader-3': button3,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerClass' does not exist on type '... Remove this comment to see the full error message
      containerClass,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentLoaderClass' does not exist on ty... Remove this comment to see the full error message
      contentLoaderClass,
      ...rest
    } = loaderProps

    const loaderStyles = {
      r: '1em',
      height: '2em',
      cy: '1em',
      ...button,
    }

    return (
      <div
        className={classNames(
          styles.shareContainer,
          styles.shareLoader,
          containerClass
        )}
      >
        <ContentLoader
          className={contentLoaderClass}
          style={{
            width: '100%',
            height: '100%',
          }}
          height="100"
          width="100"
          {...rest}
        >
          <circle cx="1em" {...loaderStyles} {...button1} />
          <circle cx="3.5em" {...loaderStyles} {...button2} />
          <circle cx="6em" {...loaderStyles} {...button3} />
        </ContentLoader>
      </div>
    )
  }

  static defaultProps = {
    social: {
      Facebook: true,
      Twitter: true,
      WhatsApp: true,
      Pinterest: true,
    },
    options: {},
    className: 'flex flex-row flex-wrap w-100',
    shareLabelClass: 'pv2 pr3 t-small',
    buttonsContainerClass: 'flex flex-row',
  }

  static schema = {
    title: 'admin/editor.share.title',
    description: 'admin/editor.share.description',
    type: 'object',
    properties: {
      social: {
        title: 'admin/editor.share.social.title',
        type: 'object',
        properties: {
          ...indexBy(
            prop('title'),
            SOCIAL_LIST.map(socialNetwork => ({
              type: 'boolean',
              title: socialNetwork,
              // @ts-expect-error ts-migrate(7053) FIXME: No index signature with a parameter of type 'strin... Remove this comment to see the full error message
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
      className,
      shareLabelClass,
      buttonsContainerClass,
      socialButtonClass,
      socialIconClass,
      loaderContainerClass,
      contentLoaderClass,
      imageUrl,
    } = this.props

    if (loading) {
      return (
        <Share.Loader
          containerClass={loaderContainerClass}
          contentLoaderClass={contentLoaderClass}
          {...this.props.styles}
        />
      )
    }

    return (
      <div className={classNames(styles.shareContainer, className)}>
        <div className={classNames(styles.shareLabel, shareLabelClass)}>
          <FormattedMessage id="store/store-components.share.label" />
        </div>
        <div className={classNames(styles.shareButtons, buttonsContainerClass)}>
          {Object.keys(social).map(
            (socialNetwork, index) =>
              social[socialNetwork] && (
                <SocialButton
                  key={index}
                  imageUrl={imageUrl}
                  url={window.location && window.location.href}
                  message={title}
                  iconClass={socialIconClass}
                  buttonClass={socialButtonClass}
                  socialEnum={socialNetwork}
                  size={size}
                />
              )
          )}
        </div>
      </div>
    )
  }
}

export default Share
