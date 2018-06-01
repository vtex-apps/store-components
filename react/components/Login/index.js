import React, { Component } from 'react'
import Card from '@vtex/styleguide/lib/Card'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { injectIntl, intlShape } from 'react-intl'

import './global.css'

/** Canonical login that calls a mutation to retrieve the authentication token*/
class Login extends Component {
  translate(id) {
    const { intl } = this.props

    return intl.formatMessage({ id: `${id}` })
  }

  render() {
    return (
      <Card className="vtex-login">
        <div className="mw-90">
          <div className="mb5">
            <Input
              placeholder="Login"
            />
          </div>
          <div className="mb5">
            <Input type="password" placeholder={this.translate('password')} />
          </div>
          <div className="mb5">
            <Button variation="primary" block>Login</Button>
          </div>
        </div>
      </Card>
    )
  }
}

Login.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(Login)
