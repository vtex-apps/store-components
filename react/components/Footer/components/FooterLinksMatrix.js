import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import Accordion from './Accordion'
import FooterLinkList, { FooterLinkItem } from './FooterLinkList'

class FooterLinksMatrix extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.objectOf({
        title: PropTypes.string.isRequired,
        links: PropTypes.objectOf({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      })
    ),
    intl: intlShape.isRequired,
  }

  formatMessage(id) {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    const { links } = this.props

    return (
      links && (
        <div className="vtex-footer__matrix-container vtex-footer__links-matrix-container">
          {links.map((linkItem, index) => (
            <Fragment key={`links-container-${index}`}>
              <div className="vtex-footer__matrix-item vtex-footer__link-matrix-item dn-s flex-ns">
                <FooterLinkList
                  titleId={linkItem.title}
                  list={linkItem.links}
                />
              </div>
              <div className="vtex-footer__matrix-item--small vtex-footer__link-matrix-item--small dn-ns db-s w-100 ph2 pv3">
                <Accordion title={linkItem.title}>
                  {linkItem.links.map(link => (
                    <div
                      key={`links-${index}`}
                      className="vtex-footer__accordion-item vtex-footer__link-accordion-item pt1">
                      <FooterLinkItem {...link} />
                    </div>
                  ))}
                </Accordion>
              </div>
            </Fragment>
          ))}
        </div>
      )
    )
  }
}

export default injectIntl(FooterLinksMatrix)
