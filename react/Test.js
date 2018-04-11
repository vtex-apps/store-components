import React from 'react'
import BuyButton from './BuyButton'

class Test extends React.Component {
  hancleClick() {
    console.log('called')
  }
  render() {
    return (
      <BuyButton
        orderFormId="6d500aae2a1c4a3e9a2fa8f5a718b982"
        afterClick={this.hancleClick}
        quantity={2}
        salesChannel="1"
        seller="1"
        skuId="1"
      />
    )
  }
}

export default Test
