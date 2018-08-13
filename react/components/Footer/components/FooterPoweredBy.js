import React, { PureComponent } from 'react'

import VTEXIcon from './../images/VTEX-BW.svg'

class FooterPoweredBy extends PureComponent {
  static displayName = 'FooterPoweredBy'
  static contextTypes = {
    account: PropTypes.func,
  }

  render() {
    const { account } = this.context
    if(account.indexOf('gc_') >= 0 || account.indexOf('gc-') >= 0) {
      return <strong>GC</strong>
    }
    return <img className="vtex-footer__vtexlogo-form-item" src={VTEXIcon} />
  }
}

export default FooterPoweredBy
