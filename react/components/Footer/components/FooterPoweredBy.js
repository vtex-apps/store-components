import React, { PureComponent } from 'react'
import { RenderContextConsumer } from 'render'

import VTEXIcon from './../images/VTEX-BW.svg'

class FooterPoweredBy extends PureComponent {
  static displayName = 'FooterPoweredBy'

  render() {
    return (
      <RenderContextConsumer>
        {context => {
          const { account } = context
          if(account.indexOf('gc_') >= 0 || account.indexOf('gc-') >= 0) {
            return <strong>GC</strong>
          }
          return <img className="vtex-footer__vtexlogo-form-item" src={VTEXIcon} />
        }}
      </RenderContextConsumer>
    )
  }
}

export default FooterPoweredBy
