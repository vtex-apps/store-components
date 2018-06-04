import React, { Component } from 'react'
import Card from '@vtex/styleguide/lib/Card'
import EmailVerification from './components/EmailVerification'
import LoginOptions from './components/LoginOptions'
import { injectIntl } from 'react-intl'

import './global.css'

const GO_BACK = 'login.go-back'

const CONSTANTS = [
  {
    page: 'login-options',
    titleLable: 'login-options.title',
    options: ['login-options.email-verification'],
  },
  {
    goBack: GO_BACK,
    send: 'login.send',
  },
]

/** Canonical login that calls a mutation to retrieve the authentication token*/
class Login extends Component {
  state = {
    step: 0,
  }

  handleOptionSelect = (index) => {
    this.setState({ step: index })
  }

  render() {
    let render

    switch (this.state.step) {
      case 1:
        render = (<EmailVerification {...CONSTANTS[1]} onOptionSelect={this.handleOptionSelect} />)
        break
      default:
        render = (<LoginOptions {...CONSTANTS[0]} onOptionSelect={this.handleOptionSelect} />)
        break
    }

    return (
      <Card className="vtex-login">
        <div className="mw-90">{render}</div>
      </Card>
    )
  }
}

export default injectIntl(Login)
