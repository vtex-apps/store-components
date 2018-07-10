import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

/**
 * Footer component that appears in the bottom of every page.
 * Can be configured by the pages editor.
 */
export default class Footer extends Component {
  static displayName = 'Footer'

  static propTypes = {
    socialNetworks: objectLikeLinkArray,
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

  static schema = {
    title: 'editor.footer.title',
    description: 'editor.footer.description',
    type: 'object',
    properties: {
      logo: {
        type: 'string',
        title: 'editor.footer.logoUrl.title',
      },
      showPaymentFormsInColor: {
        type: 'boolean',
        title: 'editor.footer.showPaymentFormsInColor.title',
        default: false,
        isLayout: true,
      },
      showSocialNetworksInColor: {
        type: 'boolean',
        title: 'editor.footer.showSocialNetworksInColor.title',
        default: false,
        isLayout: true,
      },
      socialNetworks: {
        title: 'editor.footer.socialNetworks',
        type: 'array',
        minItems: 1,
        maxItems: 4,
        items: {
          title: 'editor.footer.socialNetworks.title',
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
        },
      },
      sectionLinks: {
        title: 'editor.footer.link',
        type: 'array',
        minItems: 1,
        maxItems: 10,
        items: {
          title: 'editor.footer.link.title',
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
        },
      },
      badges: {
        title: 'editor.footer.badge',
        type: 'array',
        items: {
          title: 'editor.footer.badge.title',
          type: 'object',
          properties: {
            image: {
              type: 'string',
              title: 'editor.footer.badge.image.title',
            },
          },
        },
      },
      moreInformationLinks: {
        title: 'editor.footer.moreInformationLink',
        type: 'array',
        items: {
          title: 'editor.footer.moreInformationLink.title',
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
        },
      },
      paymentForms: {
        title: 'editor.footer.paymentForms',
        type: 'array',
        minItems: 1,
        maxItems: 3,
        items: {
          title: 'editor.footer.paymentForms.title',
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
        },
      },
    },
  }

  render() {
    const {
      showPaymentFormsInColor,
      showSocialNetworksInColor,
      logo,
      sectionLinks,
      socialNetworks,
      paymentForms,
      badges,
    } = this.props

    return (
      <footer className="vtex-footer">
        <div className="vtex-footer__container">
          <FooterLinkList titleId="section-links" list={sectionLinks} />
          <FooterSocialNetworkList
            titleId="social-networks"
            list={socialNetworks}
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

