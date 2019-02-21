import React, { PureComponent } from 'react'
import { bool, string, oneOf } from 'prop-types'
import classNames from 'classnames'
import { withRuntimeContext } from 'vtex.render-runtime'

import CallToAction from './CallToAction'
import { textPositionTypes, textAlignmentTypes, callToActionModeTypes } from './SchemaTypes'

import styles from './infoCard.css'

const justifyTokens = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
}

const alignTokens = {
  left: 'tl',
  center: 'tc',
  right: 'tr'
}

const itemsTokens = {
  left: 'items-start',
  center: 'items-center',
  right: 'items-end'
}

const flexOrderTokens = {
  left: 'flex-row',
  right: 'flex-row-reverse'
}

const defaultValues = {
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  textAlignment: textPositionTypes.TEXT_ALIGNMENT_LEFT.value,
}

const getEnumValues = enumObject => Object.values(enumObject).map(({ value }) => value)
const getEnumNames = enumObject => Object.values(enumObject).map(({ name }) => name)

class InfoCard extends PureComponent {
  static propTypes = {
    isFullModeStyle: bool,
    textPosition: oneOf(getEnumValues(textPositionTypes)),
    headline: string,
    subline: string,
    callToActionMode: oneOf(getEnumValues(callToActionModeTypes)),
    callToActionText: string,
    callToActionUrl: string,
    imageUrl: string,
    mobileImageUrl: string,
    textAlignment: oneOf(getEnumValues(textAlignmentTypes)),
  };

  static defaultProps = {
    // isFullModeStyle: true,
    // textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
    // headline: 'Enjoy pure water throughout your home',
    // subline: 'Your family relies on clean water to stay healthy. Choose from a high-quality selection of water softeners and filtration systems to remove water contaminants and hardness in your home. Take control with a water system designed around your unique needs.',
    // callToActionMode: 'button',
    // callToActionText: 'Shop Water Filtration',
    // callToActionUrl: 's/under-sink-filtration',
    // // imageUrl: 'https://ecowaterqa.vteximg.com.br/arquivos/ids/155513',
    // imageUrl: 'https://www.atribunamt.com.br/wp-content/uploads/2018/12/Palmeiras-campeao-brasileiro-1024x576.jpg',
    // mobileImageUrl: 'https://ecowaterqa.vteximg.com.br/arquivos/ids/155513',
    // textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,

    isFullModeStyle: false,
    textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
    headline: null,
    subline: null,
    callToActionMode: callToActionModeTypes.CALL_ACTION_BUTTON.value,
    callToActionText: '',
    callToActionUrl: '',
    imageUrl: '',
    mobileImageUrl: null,
    textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
  }

  static schema = {
    title: 'editor.hero-header.title',
    description: 'editor.hero-header.description',
    type: 'object',
    properties: {
      isFullModeStyle: {
        title: 'editor.hero-header.isFullMode.title',
        description: 'editor.hero-header.isFullMode.description',
        type: 'boolean',
        default: false,
      },
      textPosition: {
        title: 'editor.hero-header.textPosition.title',
        description: 'editor.hero-header.textPosition.description',
        type: 'string',
        enum: getEnumValues(textPositionTypes),
        enumNames: getEnumNames(textPositionTypes),
        default: textPositionTypes.TEXT_POSITION_LEFT.value,
      },
      headline: {
        title: 'editor.hero-header.headline.title',
        description: 'editor.hero-header.headline.description',
        type: 'string',
        default: null,
      },
      subline: {
        title: 'editor.hero-header.subline.title',
        description: 'editor.hero-header.subline.description',
        type: 'string',
        default: null,
      },
      callToActionMode: {
        title: 'editor.hero-header.callToActionMode.title',
        description: 'editor.hero-header.callToActionMode.description',
        type: 'string',
        enum: getEnumValues(callToActionModeTypes),
        enumNames: getEnumNames(callToActionModeTypes),
        default: callToActionModeTypes.CALL_ACTION_BUTTON.value
      },
      callToActionText: {
        title: 'editor.hero-header.callToActionText.title',
        description: 'editor.hero-header.callToActionText.description',
        type: 'string',
        default: '',
      },
      callToActionUrl: {
        title: 'editor.hero-header.callToActionUrl.title',
        description: 'editor.hero-header.callToActionUrl.description',
        type: 'string',
        default: '',
      },
      imageUrl: {
        title: 'editor.hero-header.imageUrl.title',
        description: 'editor.hero-header.imageUrl.description',
        type: 'string',
        default: '',
      },
      mobileImageUrl: {
        title: 'editor.hero-header.mobileImageUrl.title',
        description: 'editor.hero-header.mobileImageUrl.description',
        type: 'string',
        default: null,
      },
      textAlignment: {
        title: 'editor.hero-header.textAlignment.title',
        description: 'editor.hero-header.textAlignment.description',
        type: 'string',
        default: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
        enum: getEnumValues(textAlignmentTypes),
        enumNames: getEnumNames(textAlignmentTypes),
      },
    },
  }

  getImageUrl = () => {
    const { runtime, imageUrl, mobileImageUrl } = this.props
    return !!mobileImageUrl && runtime.hints.mobile ? mobileImageUrl : imageUrl
  }

  render() {
    const {
      isFullModeStyle,
      headline,
      subline,
      callToActionMode,
      callToActionText,
      callToActionUrl,
      textPosition,
      textAlignment,
    } = this.props

    const paddingClass = textPosition === 'left' ? 'pr4-ns' : 'pl4-ns'
    
    const alignToken = alignTokens[textAlignment] || alignTokens[defaultValues.textAlignment]
    const itemsToken = itemsTokens[textAlignment] || itemsTokens[defaultValues.textAlignment]
    const justifyToken = justifyTokens[textPosition] || justifyTokens[defaultValues.textPosition]
    const flexOrderToken = flexOrderTokens[textPosition] || flexOrderTokens[defaultValues.textPosition]

    const containerStyle = isFullModeStyle ? { backgroundImage: `url(${this.getImageUrl()})` } : {}

    const containerClasses = classNames(`${styles.infoCardContainer} items-center`, {
      [`flex-ns ${flexOrderToken} bg-base ph2-ns pb2 justify-between`]: !isFullModeStyle,
      [`bg-center cover bb b--muted-4 flex ${justifyToken}`]: isFullModeStyle,
    })

    const textContainerClasses = classNames(`${styles.infoCardTextContainer} flex flex-column`, {
      [`w-50-ns ph3-s ${itemsToken} ${paddingClass}`]: !isFullModeStyle,
      [`ml8-ns mh4-s w-40-ns ${itemsToken}`]: isFullModeStyle,
    })

    return (
      <div className={containerClasses} style={containerStyle}>
        <div className={textContainerClasses}>
          {headline && <h1 className={`${styles.infoCardHeadline} t-heading-2 mt6 ${alignToken}`}>{headline}</h1>}
          {subline && <p className={`${styles.infoCardSubline} t-body mt6 c-on-base ${alignToken}`}>{subline}</p>}
          <CallToAction mode={callToActionMode} text={callToActionText} url={callToActionUrl} />
        </div>
        {!isFullModeStyle && <img className="w-50-ns" src={this.getImageUrl()} style={{ objectFit: 'cover' }}/>}
      </div>
    )
  }
}

export default withRuntimeContext(InfoCard)
