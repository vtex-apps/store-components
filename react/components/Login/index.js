import React, { Component } from 'react'
import Card from '@vtex/styleguide/lib/Card'
import EmailVerification from './components/EmailVerification'
import LoginOptions from './components/LoginOptions'
import CodeConfirmation from './components/CodeConfirmation'
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
    next: 2,
    previous: 0,
  },
  {
    goBack: GO_BACK,
    send: 'login.send',
    titleLable: 'login-email-code.title',
    previous: 1,
  },
]

/** Canonical login that calls a mutation to retrieve the authentication token*/
class Login extends Component {
  state = {
    step: 0,
    email: '',
    code: '',
    authtoken: '',
  }

  handleUpdateState = (state) => {
    this.setState(state)
  }

  render() {
    const { email, code, authtoken } = this.state
    let render

    switch (this.state.step) {
      case 1:
        render = (<EmailVerification {...CONSTANTS[1]} email={email} authtoken={authtoken} onStateChange={this.handleUpdateState} />)
        break
      case 2:
        render = (<CodeConfirmation {...CONSTANTS[2]} email={email} code={code} authtoken={authtoken} onStateChange={this.handleUpdateState} />)
        break
      default:
        render = (<LoginOptions {...CONSTANTS[0]} onStateChange={this.handleUpdateState} />)
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
