import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

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
      return this.props.intl.messages[id] && this.props.intl.formatMessage({ id })
    }

    render() {
      const {
        list,
        titleId,
        alignRight,
        horizontal,
        ...otherProps
      } = this.props

      if (!list || list.length === 0) return null

      const listContainerClasses = classNames('vtex-footer__list-container', {
        'vtex-footer__list-container--right-aligned': alignRight,
        'vtex-footer__list-container--horizontal': horizontal,
      })

      const listClasses = classNames(
        'vtex-footer__list flex flex-column flex-wrap pa0 mb0',
        {
          'vtex-footer__list--horizontal': horizontal,
        }
      )

      const listItemClasses = classNames('vtex-footer__list-item', {
        'vtex-footer__list-item--horizontal': horizontal,
      })

      return (
        <div className={listContainerClasses}>
          <span className="vtex-footer__list-title f6 ttu ma0 db">
            {titleId && this.formatMessage(titleId)}
          </span>
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
