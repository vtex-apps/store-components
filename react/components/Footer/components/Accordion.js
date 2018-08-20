import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import { injectIntl, intlShape } from 'react-intl'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

class Accordion extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    intl: intlShape.isRequired,
  }

  state = {
    open: false,
  }

  render() {
    const { children, title } = this.props
    const { open } = this.state

    return (
      <div className="vtex-footer__accordion">
        <div
          className="pointer mb4"
          onClick={() => {
            this.setState({ open: !open })
          }}>
          <div className="f4">
            {title && (
              <h4 className="vtex-footer__accordion-title">
                {this.props.intl.formatMessage({ id: title })}
              </h4>
            )}
            <span className="vtex-footer__accordion-icon fr">
              {open ? <IconCaretUp /> : <IconCaretDown />}
            </span>
          </div>
        </div>

        <div style={{ overflowY: 'auto' }}>
          <Collapse isOpened={open}>{children}</Collapse>
        </div>
      </div>
    )
  }
}

export default injectIntl(Accordion)
