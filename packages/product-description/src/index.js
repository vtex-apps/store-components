import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import VTEXClasses from './CustomClasses'

export class ProductDescription extends PureComponent {
  render() {
    return (
      <div className={`${VTEXClasses.PRODUCT_DESCRIPTION} ma2`}>
        <div className="f4 b ttu mb3">
          Descrição do Produto
        </div>
        { this.props.children }
      </div>
    )
  }
}

ProductDescription.propTypes = {
  /** Children component which contains the product description */
  children: PropTypes.node.isRequired,
}

ProductDescription.defaultProps = {
  children: {},
}