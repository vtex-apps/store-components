import React from 'react'
import { Dropdown } from 'vtex.styleguide'
import { injectIntl, defineMessages, IntlShape } from 'react-intl'

import styles from '../styles.css'
import { DisplayOption } from '../types'

interface VariationSelectModeProps {
  intl: IntlShape
  selectedItem: string | null
  displayOptions: DisplayOption[]
}

interface IsDisableParams {
  disabled: boolean,
  impossible: boolean,
  available: boolean
}

const messages = defineMessages({
  selectPlaceholder: {
    id: 'store/sku-selector.select.placeholder',
    defaultMessage: '',
  },
})

function isDisabled({ disabled, impossible, available }: IsDisableParams) {
  if (disabled) {
    if (impossible) return true
    if (!impossible && !available) return true
  }

  return false
}

function SelectVariationMode(props: VariationSelectModeProps) {
  const { intl, selectedItem, displayOptions } = props

  const options = displayOptions.map(op => ({
    label: op.label,
    value: op.label,
    disabled: isDisabled({disabled: op.disabled, impossible: op.impossible, available: op.available}),
  }))

  const handleClick = (_: React.MouseEvent, value: string) => {
    const reducedOptions = displayOptions.reduce<Record<string, DisplayOption>>(
      (acc, cur) => {
        acc[cur.label] = cur

        return acc
      },
      {}
    )

    return reducedOptions[value].onSelectItem()
  }

  return (
    <div className={styles.skuSelectorSelectContainer}>
      <Dropdown
        options={options}
        value={selectedItem}
        onChange={handleClick}
        placeholder={intl.formatMessage(messages.selectPlaceholder)}
      />
    </div>
  )
}

export default injectIntl(SelectVariationMode)
