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

import './global.css'

const linkSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      title: 'Link URL',
    },
    title: {
      type: 'string',
      title: 'Link Title',
    },
  },
}

const badgeSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
      title: 'Badge Image URL',
    },
  },
}

const socialNetworkSchema = {
  type: 'object',
  title: 'Social Network',
  properties: {
    url: {
      type: 'string',
      title: 'Social Network URL',
    },
    socialNetwork: {
      title: 'Social Network',
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
  title: 'Payment Form',
  properties: {
    paymentType: {
      title: 'Payment Type',
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
    showPaymentFormsInColor: PropTypes.bool.isRequired,
    showSocialNetworksInColor: PropTypes.bool.isRequired,
    logo: PropTypes.string.isRequired,
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
      title = prefix
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
                  title: `${title} ${index + 1}`,
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
      'Social Network'
    )

    const sectionLinksSchema = generateDynamicSchema(
      linkSchema,
      numberOfSectionLinks,
      'sectionLinks',
      'link'
    )

    const moreInformationLinksSchema = generateDynamicSchema(
      linkSchema,
      numberOfMoreInformationLinks,
      'moreInformationLinks',
      'moreInformationLink',
      'More Information Link'
    )

    const badgesSchema = generateDynamicSchema(
      badgeSchema,
      numberOfBadges,
      'badges',
      'badge'
    )

    const paymentFormsSchema = generateDynamicSchema(
      paymentFormSchema,
      numberOfPaymentForms,
      'paymentForms',
      'paymentForm',
      'Payment Form'
    )

    return {
      title: 'Footer',
      description: 'A footer that appears in the bottom of your store',
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          title: 'Logo URL',
        },
        numberOfSocialNetworks: {
          type: 'number',
          title: 'Number of social networks links',
          minimum: 0,
        },
        numberOfSectionLinks: {
          type: 'number',
          title: 'Number of section links',
          minimum: 0,
        },
        numberOfMoreInformationLinks: {
          type: 'number',
          title: 'Number of more information links',
          minimum: 0,
        },
        numberOfBadges: {
          type: 'number',
          title: 'Number of badges to be displayed',
          minimum: 0,
        },
        numberOfPaymentForms: {
          type: 'number',
          title: 'Number of payment forms available',
          minimum: 0,
        },
        showPaymentFormsInColor: {
          type: 'boolean',
          title: 'Show the payment forms icons in color',
          default: false,
        },
        showSocialNetworksInColor: {
          type: 'boolean',
          title: 'Show the social networks icons in color',
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
        <div className="vtex-footer__container vtex-footer__container--white vtex-footer__container--compact">
          <FooterPaymentFormList
            titleId="payment-form"
            list={paymentForms}
            horizontal
            showInColor={showPaymentFormsInColor}
          />
        </div>
        <div className="vtex-footer__container vtex-footer__container--compact">
          <FooterBadgeList list={badges} />
          <div className="vtex-footer__badge-list vtex-footer__list-container--right-aligned">
            <span className="vtex-footer__badge"><img className="vtex-footer__logo-image" src={logo} /></span>
            <span className="vtex-footer__badge">Powered by VTEX&copy;</span>
          </div>
        </div>
      </footer>
    )
  }
}

