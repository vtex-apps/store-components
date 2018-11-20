import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function SpecificationRow({ name, values, classes }) {

  return (
    <tr className={classNames('vtex-product-specifications__table-row', classes.row)}>
      <th className={classNames('vtex-product-specifications__specification-name', classes.thName)}>
        {name}
      </th>
      <td className={classNames('vtex-product-specifications__specification-values', classes.tdValue)}>
        {values}
      </td>
    </tr>
  )
}

SpecificationRow.defaultProps = {
  classes: {
    row: null,
    thName: null,
    tdValue: null
  }
}

SpecificationRow.propTypes = {
  classes: PropTypes.shape({
    row: PropTypes.string,
    thName: PropTypes.string,
    tdValue: PropTypes.string
  }),
  name: PropTypes.node,
  values: PropTypes.node,
}
