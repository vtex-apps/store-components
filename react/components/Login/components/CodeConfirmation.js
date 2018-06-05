import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'

import signInMutation from '../mutations/signInMutation.gql'

import { translate } from '../utils'

/** CodeConfirmation tab component. Receive the code from an input and call the signIn mutation */
class CodeConfirmation extends Component {
    handleInputChange = (event) => {
      this.props.onStateChange({ code: event.target.value })
    }

    handleOnSubimit = () => {
      const { signInMutation, email, code, onStateChange, authtoken } = this.props

      if (code !== '') {
        signInMutation({ variables: { fields: { email: email, code: code, authToken: authtoken } } }).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    }

    render() {
      const { goBack, send, intl, onStateChange, titleLable, previous, code } = this.props

      return (
        <div>
          <h3 className="fw5 ttu br2 fw4 v-mid relative pv3 ph5 f6 rebel-pink" >{translate(titleLable, intl)}</h3>
              <Input value={code} onChange={this.handleInputChange} />
          <div className="bt mt5 min-h-2 b--light-gray">
            <div className="fl mt4">
              <Button onClick={() => onStateChange({ step: previous })}>{translate(goBack, intl)}</Button>
            </div>
            <div className="fr mt4"><Button onClick={() => this.handleOnSubimit()}>{translate(send, intl)}</Button>
            </div>
          </div>
        </div>
      )
    }
}

CodeConfirmation.propTypes = {
  /** Authtoken set on state */
  authtoken: PropTypes.string.isRequired,
  /** Email set on state */
  email: PropTypes.string.isRequired,
  /** Previous step */
  previous: PropTypes.number.isRequired,
  /** Code set on state */
  code: PropTypes.string.isRequired,
  /** Title that will be shown on top */
  titleLable: PropTypes.string.isRequired,
  /** Locales go back string id */
  goBack: PropTypes.string.isRequired,
  /** Locales send string id */
  send: PropTypes.string.isRequired,
  /** Function to change de active tab */
  onStateChange: PropTypes.func.isRequired,
  /** Graphql property to call a mutation */
  signInMutation: PropTypes.func.isRequired,
  /** Intl object*/
  intl: intlShape,
}

export default injectIntl(graphql(signInMutation, { name: 'signInMutation' })(CodeConfirmation))

