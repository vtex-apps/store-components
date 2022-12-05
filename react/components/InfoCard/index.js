import classNames from 'classnames'
import PropTypes, { bool, string, oneOf } from 'prop-types'
import React, { memo, useEffect } from 'react'
import { values } from 'ramda'
import { injectIntl } from 'react-intl'
import { useLazyQuery } from 'react-apollo'
import { useExperimentalLazyImagesContext } from 'vtex.render-runtime'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'
import RichText from 'vtex.rich-text/index'
import { useDevice } from 'vtex.device-detector'
import { useRenderSession } from 'vtex.session-client'

import CallToAction from './CallToAction'
import LinkWrapper from './LinkWrapper'
import {
  textPositionTypes,
  textAlignmentTypes,
  callToActionModeTypes,
  textPostionValues,
  textAlignmentValues,
  textModeTypes,
} from './SchemaTypes'
import { SanitizedHTML } from '../SanitizedHTML'
import { usePosition } from '../../hooks/usePosition'
import GET_IMAGE_PROTOCOL_IMAGES from './graphql/getImgUrl.gql'

const ALLOWED_TAGS = ['p', 'span', 'a', 'div', 'br']
const ALLOWED_ATTRS = {
  a: ['class', 'href', 'title', 'target'],
  span: ['class'],
  p: ['class'],
  div: ['class'],
}

const justifyTokens = {
  [textPostionValues.LEFT]: 'justify-start',
  [textPostionValues.CENTER]: 'justify-center',
  [textPostionValues.RIGHT]: 'justify-end',
}

const alignTokens = {
  [textAlignmentValues.LEFT]: 'tl',
  [textAlignmentValues.CENTER]: 'tc',
  [textAlignmentValues.RIGHT]: 'tr',
}

const itemsTokens = {
  [textAlignmentValues.LEFT]: 'items-start',
  [textAlignmentValues.CENTER]: 'items-center',
  [textAlignmentValues.RIGHT]: 'items-end',
}

const flexOrderTokens = {
  [textPostionValues.LEFT]: 'flex-row',
  [textPostionValues.RIGHT]: 'flex-row-reverse',
}

const defaultValues = {
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
}

const getEnumValues = enumObject => values(enumObject).map(({ value }) => value)
const getEnumNames = enumObject => values(enumObject).map(({ name }) => name)

const safelyGetToken = (tokenMap, valueWanted, propName) =>
  tokenMap[valueWanted] || defaultValues[propName]

const getImageUrl = (isMobile, imageUrl, mobileImageUrl) =>
  !!mobileImageUrl && isMobile ? mobileImageUrl : imageUrl

const CSS_HANDLES = [
  'infoCardImageLinkWrapper',
  'infoCardContainer',
  'infoCardTextContainer',
  'infoCardHeadline',
  'infoCardSubhead',
  'infoCardImageContainer',
  'infoCardImage',
]

const InfoCard = ({
  isFullModeStyle,
  headline,
  subhead,
  callToActionMode,
  callToActionText,
  callToActionUrl,
  callToActionLinkTarget,
  textPosition,
  textAlignment,
  imageUrl,
  mobileImageUrl,
  imageActionUrl,
  intl,
  htmlId,
  textMode,
  linkTarget,
  imageProtocolId,
}) => {
  const { isMobile: mobile } = useDevice()
  const { lazyLoad } = useExperimentalLazyImagesContext()

  const { handles } = useCssHandles(CSS_HANDLES)
  const paddingClass =
    textPosition === textPostionValues.LEFT ? 'pr4-ns' : 'pl4-ns'

  // We ignore textAlignment tokens when full image mode
  const alignToken = isFullModeStyle
    ? safelyGetToken(alignTokens, textPosition, 'textPosition')
    : safelyGetToken(alignTokens, textAlignment, 'textAlignment')

  const itemsToken = isFullModeStyle
    ? safelyGetToken(itemsTokens, textPosition, 'textPosition')
    : safelyGetToken(itemsTokens, textAlignment, 'textAlignment')

  const justifyToken = safelyGetToken(
    justifyTokens,
    textPosition,
    'textPosition'
  )

  const flexOrderToken = safelyGetToken(
    flexOrderTokens,
    textPosition,
    'textPosition'
  )

  let finalImageUrl = getImageUrl(
    mobile,
    formatIOMessage({ id: imageUrl, intl }),
    formatIOMessage({ id: mobileImageUrl, intl })
  )

  let imageHref = formatIOMessage({ id: imageActionUrl, intl })
  let actionHref = formatIOMessage({ id: callToActionUrl, intl })
  // Start Image Protocol
  const { session } = useRenderSession()
  const { latitude, longitude, error: positionError } = usePosition()

  const [getPersonalizedImages, { data: imageData }] = useLazyQuery(
    GET_IMAGE_PROTOCOL_IMAGES,
    {
      ssr: false,
    }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (session && imageProtocolId && positionError !== undefined) {
      getPersonalizedImages({
        variables: {
          userId: session?.namespaces?.profile?.id?.value,
          imageProtocolId,
          latitude,
          longitude,
        },
      })
    }
  }, [positionError, session, imageProtocolId])

  if (imageData?.getImage && imageData.getImage.url !== null && imageData.getImage.urlMobile !== null) {
    console.info('get image: ', imageData.getImage)
    imageHref = formatIOMessage({ id: imageData.getImage.hrefImg, intl })
    actionHref = formatIOMessage({ id: imageData.getImage.hrefImg, intl })
    if (mobile) {
      finalImageUrl = formatIOMessage({
        id: imageData.getImage.urlMobile,
        intl,
      })
    } else {
      finalImageUrl = formatIOMessage({ id: imageData.getImage.url, intl })
    }
  }
  // End Image Protocol

  const containerStyle = isFullModeStyle
    ? {
        /* If lazyloaded, the background image comes from the `data-bg` attribute
         * below. Otherwise, sets it here as background-image */
        ...(!lazyLoad && { backgroundImage: `url(${finalImageUrl})` }),
        backgroundSize: 'cover',
      }
    : {}

  const containerAttributes =
    isFullModeStyle && lazyLoad ? { 'data-bg': finalImageUrl } : {}

  const containerClasses = classNames(
    `${handles.infoCardContainer} items-center`,
    {
      [`flex-ns ${flexOrderToken} bg-base ph2-ns pb2 justify-between`]:
        !isFullModeStyle,
      [`bg-center bb b--muted-4 flex ${justifyToken}`]: isFullModeStyle,
      lazyload: lazyLoad,
    }
  )

  const linkWrapperClasses = `${handles.infoCardImageLinkWrapper} no-underline`

  const textContainerClasses = classNames(
    `${handles.infoCardTextContainer} flex flex-column mw-100`,
    {
      [`w-50-ns ph3-s ${itemsToken} ${paddingClass}`]: !isFullModeStyle,
      [`mh8-ns mh4-s w-40-ns ${itemsToken}`]: isFullModeStyle,
    }
  )

  const headlineClasses = `${handles.infoCardHeadline} t-heading-2 mt6 ${alignToken} c-on-base mw-100`

  const subheadClasses = `${handles.infoCardSubhead} t-body mt6 c-on-base ${alignToken} mw-100`

  return (
    <LinkWrapper
      imageActionUrl={imageHref}
      extraCondition={!isFullModeStyle}
      linkProps={{ className: linkWrapperClasses, target: linkTarget }}
    >
      <div
        className={containerClasses}
        style={containerStyle}
        data-testid="container"
        id={htmlId}
        {...containerAttributes}
      >
        <div className={textContainerClasses}>
          {headline &&
            (textMode === 'html' ? (
              <div className={headlineClasses}>
                <SanitizedHTML
                  content={formatIOMessage({ id: headline, intl })}
                  allowedTags={ALLOWED_TAGS}
                  allowedAttributes={ALLOWED_ATTRS}
                />
              </div>
            ) : (
              <RichText className={headlineClasses} text={headline} />
            ))}
          {subhead &&
            (textMode === 'html' ? (
              <div className={subheadClasses}>
                <SanitizedHTML
                  content={formatIOMessage({ id: subhead, intl })}
                  allowedTags={ALLOWED_TAGS}
                  allowedAttributes={ALLOWED_ATTRS}
                />
              </div>
            ) : (
              <RichText className={subheadClasses} text={subhead} />
            ))}
          <CallToAction
            mode={callToActionMode}
            text={formatIOMessage({ id: callToActionText, intl })}
            url={actionHref}
            linkTarget={callToActionLinkTarget}
          />
        </div>
        {!isFullModeStyle && (
          <div className={`${handles.infoCardImageContainer} w-50-ns`}>
            <LinkWrapper
              imageActionUrl={imageHref}
              linkProps={{ target: linkTarget }}
            >
              <img
                className={handles.infoCardImage}
                src={finalImageUrl}
                style={{ objectFit: 'cover' }}
                alt={formatIOMessage({ id: callToActionText, intl })}
                data-testid="half-image"
              />
            </LinkWrapper>
          </div>
        )}
      </div>
    </LinkWrapper>
  )
}

const MemoizedInfoCard = memo(injectIntl(InfoCard))

MemoizedInfoCard.propTypes = {
  blockClass: string,
  isFullModeStyle: bool,
  textPosition: oneOf(getEnumValues(textPositionTypes)),
  headline: string,
  subhead: string,
  callToActionMode: oneOf(getEnumValues(callToActionModeTypes)),
  callToActionText: string,
  callToActionUrl: string,
  imageUrl: string,
  mobileImageUrl: string,
  textAlignment: oneOf(getEnumValues(textAlignmentTypes)),
  imageActionUrl: string,
  intl: PropTypes.object,
  htmlId: string,
  textMode: oneOf(getEnumValues(textModeTypes)),
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
  linkTarget: oneOf(['_self', '_blank', '_parent', '_top']),
  callToActionLinkTarget: oneOf(['_self', '_blank', '_parent', '_top']),
  imageProtocolId: string,
}

MemoizedInfoCard.defaultProps = {
  isFullModeStyle: false,
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  headline: '',
  subhead: '',
  callToActionMode: callToActionModeTypes.CALL_ACTION_BUTTON.value,
  callToActionText: '',
  callToActionUrl: '',
  imageUrl: '',
  mobileImageUrl: '',
  textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
  textMode: textModeTypes.TEXT_MODE_HTML.value,
  linkTarget: '_self',
  callToActionLinkTarget: '_self',
  imageProtocolId: '',
}

MemoizedInfoCard.schema = {
  title: 'admin/editor.info-card.title',
  description: 'admin/editor.info-card.description',
  type: 'object',
  properties: {
    isFullModeStyle: {
      title: 'admin/editor.info-card.isFullModeStyle.title',
      description: 'admin/editor.info-card.isFullModeStyle.description',
      type: 'boolean',
      default: false,
      isLayout: true,
    },
    textPosition: {
      title: 'admin/editor.info-card.textPosition.title',
      description: 'admin/editor.info-card.textPosition.description',
      type: 'string',
      enum: getEnumValues(textPositionTypes),
      enumNames: getEnumNames(textPositionTypes),
      default: textPositionTypes.TEXT_POSITION_LEFT.value,
      isLayout: true,
    },
    callToActionMode: {
      title: 'admin/editor.info-card.callToActionMode.title',
      description: 'admin/editor.info-card.callToActionMode.description',
      type: 'string',
      enum: getEnumValues(callToActionModeTypes),
      enumNames: getEnumNames(callToActionModeTypes),
      default: callToActionModeTypes.CALL_ACTION_BUTTON.value,
      isLayout: true,
    },
    textAlignment: {
      title: 'admin/editor.info-card.textAlignment.title',
      description: 'admin/editor.info-card.textAlignment.description',
      type: 'string',
      default: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
      enum: getEnumValues(textAlignmentTypes),
      enumNames: getEnumNames(textAlignmentTypes),
      isLayout: true,
    },
    textMode: {
      title: 'admin/editor.info-card.textMode.title',
      description: 'admin/editor.info-card.textMode.description',
      type: 'string',
      default: textModeTypes.TEXT_MODE_HTML.value,
      enum: getEnumValues(textModeTypes),
      enumNames: getEnumNames(textModeTypes),
      isLayout: true,
    },
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
    imageProtocolId: {
      title: 'admin/editor.info-card.imageProtocolId.title',
      description: 'admin/editor.info-card.imageProtocolId.description',
      type: 'string',
      isLayout: true,
    },
  },
}

export default MemoizedInfoCard
