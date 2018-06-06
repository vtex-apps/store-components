import React, { Component } from 'react'
import Button from '@vtex/styleguide/lib/Button'

import LoginOptions from './components/LoginOptions'
import EmailVerification from './components/EmailVerification'
import CodeConfirmation from './components/CodeConfirmation'
import ProfileIcon from './images/ProfileIcon'

import './global.css'

const GO_BACK = 'login.go-back'
const STEPS = [
  // eslint-disable-next-line
  (state, func) => {
    return (
      <LoginOptions
        page="login-options"
        titleLable="login-options.title"
        options={['login-options.email-verification']}
        onStateChange={func}
      />
    )
  },
  // eslint-disable-next-line
  (state, func) => {
    return (
      <EmailVerification
        goBack={GO_BACK}
        send="login.send"
        next={2}
        previous={0}
        email={state.email}
        authtoken={state.authtoken}
        onStateChange={func}
      />
    )
  },
  // eslint-disable-next-line
  (state, func) => {
    return (
      <CodeConfirmation
        goBack={GO_BACK}
        confirm="login.confirm"
        titleLable="login-email-code.title"
        previous={1}
        email={state.email}
        code={state.code}
        authtoken={state.authtoken}
        onStateChange={func}
      />
    )
  },
]

/** Canonical login that calls a mutation to retrieve the authentication token */
export default class Login extends Component {
  state = {
    isMouseOnButton: false,
    isMouseOnContent: false,
    step: 0,
    email: '',
    code: '',
    authtoken: '',
  }

  handleUpdateState = state => {
    this.setState(state)
  }

  render() {
    const { isMouseOnButton, isMouseOnContent, step } = this.state

    const render = STEPS[step](this.state, this.handleUpdateState)

    return (
      <div className="relative fr">
        <Button
          icon
          onClick={this.handleClickButton}
          onMouseEnter={() => this.handleUpdateState({ isMouseOnButton: true })}
          onMouseLeave={() =>
            this.handleUpdateState({ isMouseOnButton: false })
          }
        >
          <ProfileIcon />
        </Button>
        {(isMouseOnContent || isMouseOnButton) && (
          <div
            className="vtex-login__box absolute right-0 z-max flex flex-colunm"
            onMouseLeave={() =>
              this.handleUpdateState({ isMouseOnContent: false })
            }
            onMouseEnter={() =>
              this.handleUpdateState({ isMouseOnContent: true })
            }
          >
            <div className="vtex-login__arrow-up absolute top-0 right-0 shadow-3" />

            <div className="shadow-3 mt3">
              <div className="vtex-login__content pa4 flex items-center justify-center relative bg-white">
                {render}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
