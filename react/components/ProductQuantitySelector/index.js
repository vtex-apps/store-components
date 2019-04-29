import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { NumericStepper } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

const ProductQuantitySelector = ({ warningQuantityThreshold, ...props }) => {
  const valuesFromContext = React.useContext(ProductContext)

  const numericStepperProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      const { onChange, availableQuantity, selectedQuantity } = props

      return {
        availableQuantity,
        selectedQuantity,
        onChange: useCallback(e => onChange(e.value), []),
      }
    }

    const { selectedItem, selectedQuantity, onChangeQuantity } = valuesFromContext
    return {
      availableQuantity: path(['sellers', 0, 'commertialOffer', 'AvailableQuantity'], selectedItem),
      selectedQuantity,
      onChange: useCallback(e => onChangeQuantity(e.value), []),
    }
  }

  const { availableQuantity, onChange, selectedQuantity } = numericStepperProps()
  const showAvailable = availableQuantity <= warningQuantityThreshold

  if (availableQuantity < 1) return null

  return (
    <div className={'flex flex-column mb4'}>
      <div className="mb3 c-muted-2 t-body">
        <FormattedMessage id="product-details.quantity" />
      </div>
      <NumericStepper
        size="small"
        value={selectedQuantity}
        minValue={1}
        maxValue={availableQuantity ? availableQuantity : undefined}
        onChange={onChange}
      />
      {showAvailable && 
        <div className={'mv4 c-muted-2 t-small'}>
          <FormattedMessage id="product-details.quantity-available" values={{ availableQuantity }} />
        </div>}
    </div>
  )
}

ProductQuantitySelector.defaultProps = {
  warningQuantityThreshold: 0,
  onChange: () => {},
}

ProductQuantitySelector.propTypes = {
  selectedQuantity: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number,
  onChange: PropTypes.func,
  warningQuantityThreshold: PropTypes.number.isRequired
}

ProductQuantitySelector.schema = {
  title: 'admin/editor.product-quantity-selector.title',
  description: 'admin/editor.product-quantity-selector.description',
  type: 'object',
  properties: {
    warningQuantityThreshold: {
      title: 'admin/editor.product-quantity-selector.warningQuantityThreshold.title',
      description: 'admin/editor.product-quantity-selector.warningQuantityThreshold.title',
      type: 'number',
      default: 0,
    },
  },
}

export default ProductQuantitySelector