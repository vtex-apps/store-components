import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { NumericStepper } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

const ProductQuantitySelector = ({ warningQuantityThreshold, ...props }) => {
  const valuesFromContext = React.useContext(ProductContext)

  const isContextEmpty = !valuesFromContext || isEmpty(valuesFromContext)

  const onChangeCallback = isContextEmpty
    ? props.onChange
    : valuesFromContext.onChangeQuantity

  const onChange = useCallback(
    e => {
      onChangeCallback(e.value)
    },
    [onChangeCallback]
  )

  const availableQuantity = isContextEmpty
    ? props.availableQuantity
    : path(
        ['selectedItem', 'sellers', 0, 'commertialOffer', 'AvailableQuantity'],
        valuesFromContext
      )

  const selectedQuantity = isContextEmpty
    ? props.selectedQuantity
    : valuesFromContext.selectedQuantity

  const showAvailable = availableQuantity <= warningQuantityThreshold

  if (availableQuantity < 1) return null

  return (
    <div className={'flex flex-column mb4'}>
      <div className="mb3 c-muted-2 t-body">
        <FormattedMessage id="store/product-details.quantity" />
      </div>
      <NumericStepper
        size="small"
        value={selectedQuantity}
        minValue={1}
        maxValue={availableQuantity ? availableQuantity : undefined}
        onChange={onChange}
      />
      {showAvailable && (
        <div className={'mv4 c-muted-2 t-small'}>
          <FormattedMessage
            id="store/product-details.quantity-available"
            values={{ availableQuantity }}
          />
        </div>
      )}
    </div>
  )
}

ProductQuantitySelector.defaultProps = {
  warningQuantityThreshold: 0,
  onChange: () => {},
}

ProductQuantitySelector.propTypes = {
  selectedQuantity: PropTypes.number,
  availableQuantity: PropTypes.number,
  onChange: PropTypes.func,
  warningQuantityThreshold: PropTypes.number.isRequired,
}

ProductQuantitySelector.schema = {
  title: 'admin/editor.product-quantity-selector.title',
  description: 'admin/editor.product-quantity-selector.description',
  type: 'object',
  properties: {
    warningQuantityThreshold: {
      title:
        'admin/editor.product-quantity-selector.warningQuantityThreshold.title',
      description:
        'admin/editor.product-quantity-selector.warningQuantityThreshold.title',
      type: 'number',
      default: 0,
    },
  },
}

export default ProductQuantitySelector
