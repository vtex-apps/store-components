import React from 'react'
import { useProduct } from 'vtex.product-context'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { indexBy, prop } from 'ramda'

import SocialButton from './components/Share/SocialButton'
import { SOCIAL_LIST } from './components/Share/social'
import styles from './components/Share/styles.css'
import Loader from './components/Share/Loader'

const defaultSocialProp = {
  Facebook: true,
  Twitter: true,
  WhatsApp: true,
  Pinterest: true,
}

interface Props {
  /** Social Networks configuration */
  social?: {
    Facebook: boolean
    Twitter: boolean
    WhatsApp: boolean
    Pinterest: boolean
  }
  /** Share buttons options */
  options?: {
    /** Share buttons size in pixels */
    size?: number
  }
  /** Share URL title */
  title?: string
  /** Indcates if the component should render the Content Loader */
  loading?: boolean
  /** Component and content loader styles */
  styles?: any
  /** Classes to be applied to root element  */
  className?: string
  /** Classes to be applied to Share label */
  shareLabelClass?: string
  /** Classes to be applied to social button */
  socialButtonClass?: string
  /** Classes to be applied to container of the buttons */
  buttonsContainerClass?: string
  /** Classes to be applied to icon of the button */
  socialIconClass?: string
  /** Classes to be applied to the Content Loader container */
  loaderContainerClass?: string
  /** Classes to be applied to the Content Loader */
  contentLoaderClass?: string
  /** Image url for share in social medias */
  imageUrl?: string
}

type ContextProps = Pick<
  Props,
  | 'title'
  | 'loading'
  | 'className'
  | 'shareLabelClass'
  | 'buttonsContainerClass'
  | 'imageUrl'
>

function ShareWrapper({
  social = defaultSocialProp,
  title,
  loading,
  options = {},
  className,
  shareLabelClass,
  buttonsContainerClass,
  socialButtonClass,
  socialIconClass,
  loaderContainerClass,
  contentLoaderClass,
  imageUrl,
}: Props) {
  const intl = useIntl()
  const valuesFromContext = useProduct()
  const { account } = useRuntime()

  const contextVariableProps = (): ContextProps => {
    if (!valuesFromContext || Object.keys(valuesFromContext).length === 0) {
      return {
        title,
        loading,
        className: className ?? 'flex flex-row flex-wrap w-100',
        shareLabelClass: shareLabelClass ?? 'pv2 pr3 t-small',
        buttonsContainerClass: buttonsContainerClass ?? 'flex flex-row',
        imageUrl,
      }
    }

    const { selectedItem, product } = valuesFromContext

    const localTitle = intl.formatMessage(
      { id: 'store/share.title' },
      {
        product: product?.productName,
        sku: selectedItem?.name,
        store: account,
      }
    )

    return {
      title: title ?? localTitle,
      loading: loading != null ? loading : !selectedItem?.name,
      className: className ?? 'db',
      shareLabelClass: shareLabelClass ?? 'c-muted-2 t-small mb3',
      buttonsContainerClass: buttonsContainerClass ?? 'flex flex-row',
      imageUrl: imageUrl ?? product?.items?.[0]?.images?.[0]?.imageUrl,
    }
  }

  const props = contextVariableProps()

  if (props.loading) {
    return (
      <Loader
        containerClass={loaderContainerClass}
        contentLoaderClass={contentLoaderClass}
        {...styles}
      />
    )
  }

  return (
    <div className={`${styles.shareContainer} ${className ?? ''}`}>
      <div className={`${styles.shareLabel} ${shareLabelClass ?? ''}`}>
        <FormattedMessage id="store/store-components.share.label" />
      </div>
      <div className={`${styles.shareButtons} ${buttonsContainerClass ?? ''}`}>
        {Object.keys(social).map((socialNetwork: string) => {
          if (!SOCIAL_LIST.includes(socialNetwork)) {
            return null
          }

          return (
            <SocialButton
              key={socialNetwork}
              imageUrl={imageUrl}
              url={window?.location?.href}
              message={props.title}
              iconClass={socialIconClass}
              buttonClass={socialButtonClass}
              socialEnum={socialNetwork}
              size={options?.size ?? undefined}
            />
          )
        })}
      </div>
    </div>
  )
}

ShareWrapper.schema = {
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
            default: defaultSocialProp,
          }))
        ),
      },
    },
  },
}

export default ShareWrapper
