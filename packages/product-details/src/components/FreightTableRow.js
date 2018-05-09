import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const FreightTableRow = ({ name, eta, value }) => {
  const etaClassName = classNames('vtex-freight-table__cell', {
    'vtex-freight-table__cell--center': eta === undefined,
  })

  const valueClassName = classNames('vtex-freight-table__cell', {
    'vtex-freight-table__cell--center': value === undefined || value === 0,
  })

  return (
    <tr key={name}>
      <td className="vtex-freight-table__cell">
        <label>
          <input
            className="vtex-freight-table__radio-input"
            name="freight-option"
            type="radio"
            value={name}
          />

          {name}
        </label>
      </td>
      <td className={etaClassName}>
        {eta !== undefined ? `até ${eta} dias` : '-'}
      </td>
      <td className={valueClassName}>
        {value !== undefined ? (value === 0 ? 'Grátis' : `R$ ${value}`) : '-'}
      </td>
    </tr>
  )
}

FreightTableRow.propTypes = {
  name: PropTypes.string,
  eta: PropTypes.number,
  value: PropTypes.number,
}

export default FreightTableRow

