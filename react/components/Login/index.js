import React, { Component } from 'react'
import Button from '@vtex/styleguide/lib/Button'

import LoginOptions from './components/LoginOptions'
import EmailVerification from './components/EmailVerification'
import CodeConfirmation from './components/CodeConfirmation'
import ProfileIcon from './images/ProfileIcon'

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
    const {
      isMouseOnButton,
      isMouseOnContent,
      email,
      code,
      authtoken,
    } = this.state

    let render
    switch (this.state.step) {
      case 1:
        render = (
          <EmailVerification
            {...CONSTANTS[1]}
            email={email}
            authtoken={authtoken}
            onStateChange={this.handleUpdateState}
          />
        )
        break
      case 2:
        render = (
          <CodeConfirmation
            {...CONSTANTS[2]}
            email={email}
            code={code}
            authtoken={authtoken}
            onStateChange={this.handleUpdateState}
          />
        )
        break
      default:
        render = (
          <LoginOptions
            {...CONSTANTS[0]}
            onStateChange={this.handleUpdateState}
          />
        )
        break
    }

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

            <div className="shadow-3 mt3flex flex-column relative">
              <div className="bg-white">
                <div className="vtex-login__content pa4 overflow-auto">
                  {render}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
