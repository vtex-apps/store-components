import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import FooterLinkList from './FooterLinkList'

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
      <div className="vtex-footer__matrix-container">
        {titles.map((title, index) => (
          <div className="vtex-footer__matrix-link-item">
            <FooterLinkList titleId={title} list={links[index]} />
          </div>
        ))}
      </div>
    )
  }
}

export default injectIntl(FooterLinksMatrix)
