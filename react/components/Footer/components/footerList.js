import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export default function footerList(WrappedComponent) {
  class FooterList extends Component {
    static displayName = `FooterList(${getDisplayName(WrappedComponent)})`

    static propTypes = {
      titleId: PropTypes.string,
      list: PropTypes.array,
      intl: intlShape.isRequired,
      alignRight: PropTypes.bool,
      horizontal: PropTypes.bool,
    }

    static defaultProps = {
      alignRight: false,
      horizontal: false,
    }

    formatMessage(id) {
      return this.props.intl.formatMessage({ id })
    }

    render() {
      const { list, titleId, alignRight, horizontal, ...otherProps } = this.props

      if (!list || list.length === 0) return null

      const listContainerClasses = classNames('vtex-footer__list-container', {
        'vtex-footer__list-container--right-aligned': alignRight,
        'vtex-footer__list-container--horizontal': horizontal,
      })

      const listClasses = classNames('vtex-footer__list', {
        'vtex-footer__list--horizontal': horizontal,
      })

      const listItemClasses = classNames('vtex-footer__list-item', {
        'vtex-footer__list-item--horizontal': horizontal,
      })

      return (
        <div className={listContainerClasses}>
          {titleId && <h4 className="vtex-footer__list-title">
            {this.formatMessage(titleId)}
          </h4>}
          <ul className={listClasses}>
            {list.map((item, index) => (
              <li key={index} className={listItemClasses}>
                <WrappedComponent {...otherProps} {...item} />
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return injectIntl(FooterList)
}
