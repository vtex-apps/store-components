import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { indexBy, prop, map, range, values } from 'ramda'

import FooterLinkList from './components/FooterLinkList'
import FooterBadgeList from './components/FooterBadgeList'
import FooterPaymentFormList from './components/FooterPaymentFormList'
import FooterSocialNetworkList from './components/FooterSocialNetworkList'
import {
  objectLikeLinkArray,
  objectLikeBadgeArray,
  objectLikePaymentFormArray,
} from './propTypes'

import VTEXIcon from './images/VTEX-BW.svg'

import './global.css'

const linkSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      title: 'editor.footer.link.url.title',
    },
    title: {
      type: 'string',
      title: 'editor.footer.link.title.title',
    },
  },
}

const badgeSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
      title: 'editor.footer.badge.image.title',
    },
  },
}

const socialNetworkSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      title: 'editor.footer.socialNetworks.url.title',
    },
    socialNetwork: {
      title: 'editor.footer.socialNetworks.title',
      type: 'string',
      default: 'Facebook',
      enum: [
        'Facebook',
        'Twitter',
        'Instagram',
        'Youtube',
      ],
    },
  },
}

const paymentFormSchema = {
  type: 'object',
  properties: {
    paymentType: {
      title: 'editor.footer.paymentForm.paymentType.title',
      type: 'string',
      default: 'MasterCard',
      enum: [
        'MasterCard',
        'Visa',
        'Diners Club',
      ],
    },
  },
}

/**
 * Footer component that appears in the bottom of every page.
 * Can be configured by the pages editor.
 */
export default class Footer extends Component {
  static displayName = 'Footer'

  static propTypes = {
    socialNetworkLinks: objectLikeLinkArray,
    sectionLinks: objectLikeLinkArray,
    moreInformationLinks: objectLikeLinkArray,
    badges: objectLikeBadgeArray,
    paymentForms: objectLikePaymentFormArray,
    showPaymentFormsInColor: PropTypes.bool,
    showSocialNetworksInColor: PropTypes.bool,
    logo: PropTypes.string,
  }

  static defaultProps = {
    showPaymentFormsInColor: false,
    showSocialNetworksInColor: false,
  }

  static getSchema = ({
    numberOfSocialNetworks,
    numberOfSectionLinks,
    numberOfMoreInformationLinks,
    numberOfBadges,
    numberOfPaymentForms,
  }) => {
    const generateDynamicSchema = (
      schema,
      quantity,
      propName,
      prefix,
      title,
      itemTitle,
    ) =>
      quantity && {
        [propName]: {
          title,
          type: 'object',
          properties: {
            ...indexBy(
              prop('key'),
              map(
                index => ({
                  ...schema,
                  key: `${prefix}${index}`,
                  title: { id: itemTitle, values: { id: index + 1 } },
                }),
                range(0, quantity)
              )
            ),
          },
        },
      }

    const socialNetworksSchema = generateDynamicSchema(
      socialNetworkSchema,
      numberOfSocialNetworks,
      'socialNetworkLinks',
      'socialNetworks',
      'editor.footer.socialNetworks',
      'editor.footer.socialNetworks.socialNetwork.title'
    )

    const sectionLinksSchema = generateDynamicSchema(
      linkSchema,
      numberOfSectionLinks,
      'sectionLinks',
      'link',
      'editor.footer.link',
      'editor.footer.link.title'
    )

    const moreInformationLinksSchema = generateDynamicSchema(
      linkSchema,
      numberOfMoreInformationLinks,
      'moreInformationLinks',
      'moreInformationLink',
      'editor.footer.moreInformationLink',
      'editor.footer.moreInformationLink.title'
    )

    const badgesSchema = generateDynamicSchema(
      badgeSchema,
      numberOfBadges,
      'badges',
      'badge',
      'editor.footer.badge',
      'editor.footer.badge.title'
    )

    const paymentFormsSchema = generateDynamicSchema(
      paymentFormSchema,
      numberOfPaymentForms,
      'paymentForms',
      'paymentForm',
      'editor.footer.paymentForms',
      'editor.footer.paymentForm.title'
    )

    return {
      title: 'editor.footer.title',
      description: 'editor.footer.description',
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          title: 'editor.footer.logoUrl.title',
        },
        numberOfSocialNetworks: {
          type: 'number',
          title: 'editor.footer.numberOfSocialNetworks.title',
          minimum: 0,
          maximum: 10,
          default: 0,
          widget: {
            'ui:widget': 'range',
          },
        },
        numberOfSectionLinks: {
          type: 'number',
          title: 'editor.footer.numberOfSectionLinks.title',
          minimum: 0,
          maximum: 10,
          default: 0,
          widget: {
            'ui:widget': 'range',
          },
        },
        numberOfMoreInformationLinks: {
          type: 'number',
          title: 'editor.footer.numberOfMoreInformationLinks.title',
          minimum: 0,
          maximum: 10,
          default: 0,
          widget: {
            'ui:widget': 'range',
          },
        },
        numberOfBadges: {
          type: 'number',
          title: 'editor.footer.numberOfBadges.title',
          minimum: 0,
          maximum: 10,
          default: 0,
          widget: {
            'ui:widget': 'range',
          },
        },
        numberOfPaymentForms: {
          type: 'number',
          title: 'editor.footer.numberOfPaymentForms.title',
          minimum: 0,
          maximum: 10,
          default: 0,
          widget: {
            'ui:widget': 'range',
          },
        },
        showPaymentFormsInColor: {
          type: 'boolean',
          title: 'editor.footer.showPaymentFormsInColor.title',
          default: false,
        },
        showSocialNetworksInColor: {
          type: 'boolean',
          title: 'editor.footer.showSocialNetworksInColor.title',
          default: false,
        },
        ...socialNetworksSchema,
        ...sectionLinksSchema,
        ...moreInformationLinksSchema,
        ...badgesSchema,
        ...paymentFormsSchema,
      },
    }
  }

  render() {
    const { showPaymentFormsInColor, showSocialNetworksInColor, logo } = this.props
    const socialNetworkLinks = values(this.props.socialNetworkLinks)
    const sectionLinks = values(this.props.sectionLinks)
    const paymentForms = values(this.props.paymentForms)
    const badges = values(this.props.badges)

    return (
      <footer className="vtex-footer">
        <div className="vtex-footer__container">
          <FooterLinkList titleId="section-links" list={sectionLinks} />
          <FooterSocialNetworkList
            titleId="social-networks"
            list={socialNetworkLinks}
            horizontal
            alignRight
            showInColor={showSocialNetworksInColor}
          />
        </div>
        <div className="vtex-footer__container vtex-footer__container--white">
          <FooterPaymentFormList
            titleId="payment-form"
            list={paymentForms}
            horizontal
            showInColor={showPaymentFormsInColor}
          />
        </div>
        <div className="vtex-footer__container">
          <FooterBadgeList list={badges} />
          <div className="vtex-footer__badge-list vtex-footer__list-container--right-aligned">
            <span className="vtex-footer__badge"><img className="vtex-footer__logo-image" src={logo} /></span>
            <span className="vtex-footer__badge"><img className="vtex-footer__vtexlogo-form-item" src={VTEXIcon} /></span>
          </div>
        </div>
      </footer>
    )
  }
}

