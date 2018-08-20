import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

export default class Accordion extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
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
            {title}
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
