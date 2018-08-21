import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import Accordion from './Accordion'
import FooterLinkList, { FooterLinkItem } from './FooterLinkList'

class FooterLinksMatrix extends Component {
  static propTypes = {
    titles: PropTypes.string,
    links: PropTypes.array,
    intl: intlShape.isRequired,
  }

  formatMessage(id) {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    const { titles, links } = this.props

    return (
      <div className="vtex-footer__matrix-container pb4">
        {titles.map((title, index) => (
          <Fragment>
            <div className="vtex-footer__matrix-link-item dn-s flex-ns">
              <FooterLinkList titleId={title} list={links[index]} />
            </div>
            <div className="vtex-footer__matrix-link-item--small dn-ns db-s w-100 ph2 pv3">
              <Accordion title={title}>
                {links[index].map(link => (
                  <div className="vtex-footer__accordion-link-item pt1">
                    <FooterLinkItem {...link} />
                  </div>
                ))}
              </Accordion>
            </div>
          </Fragment>
        ))}
      </div>
    )
  }
}

export default injectIntl(FooterLinksMatrix)
