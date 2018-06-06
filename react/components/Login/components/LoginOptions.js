import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from '../utils'
import Button from '@vtex/styleguide/lib/Button'

/** LoginOptions tab component. Displays a list of login options */
class LoginOptions extends Component {
  render() {
    const { onStateChange, titleLable, options, intl } = this.props

    let step = -1
    return (
      <div>
        <h3 className="fw5 ttu br2 tc fw4 v-mid relative pv3 ph5 f6 rebel-pink">
          {translate(titleLable, intl)}
        </h3>
        <ul className="vtex-login-options__list">
          {options.map(el => {
            step++
            return (
              <li className="mb5" key={`login-option-array-${step}`}>
                <Button
                  primary
                  onClick={() => onStateChange({ step: step + 1 })}
                  block
                >
                  {translate(el, intl)}
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

LoginOptions.propTypes = {
  /** Intl object*/
  intl: intlShape,
  /** Function to change de active tab */
  onStateChange: PropTypes.func.isRequired,
  /** Title that will be shown on top */
  titleLable: PropTypes.string.isRequired,
  /** List of options to be displayed */
  options: PropTypes.arrayOf(PropTypes.string),
}

export default injectIntl(LoginOptions)
