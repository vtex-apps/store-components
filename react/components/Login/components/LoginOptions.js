import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from '../utils'
import Button from '@vtex/styleguide/lib/Button'

class LoginOptions extends Component {
  render() {
    const { onOptionSelect, titleLable, options, intl } = this.props

    let i = -1
    return (
      <div>
        <h3 className="fw5 ttu br2 fw4 v-mid relative pv3 ph5 f6 rebel-pink" >{translate(titleLable, intl)}</h3>
        <ul className="vtex-login-options__list">
          {options.map((el) => {
            i++
            return (<li className="mb5" key={`array=${i}`}><Button primary onClick={() => onOptionSelect(i + 1)} block>{translate(el, intl)}</Button></li>)
          })}
        </ul>
      </div >
    )
  }
}

LoginOptions.propTypes = {
  intl: intlShape,
  onOptionSelect: PropTypes.func.isRequired,
  titleLable: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
}

export default injectIntl(LoginOptions)
