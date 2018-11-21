import React from 'react'
import PropTypes from 'prop-types'

export default function SpecificationRow({ name, values }) {
  return (
    <tr className="vtex-product-specifications__table-row">
      <th className="vtex-product-specifications__specification-name dtc-ns tr-ns ttu t-body c-muted-1 w-25-ns pt2 pb2-ns ph6 br-ns b--muted-3 db-s tl-s pb0-s w-auto-s bn-s">
        {name}
      </th>
      <td className="vtex-product-specifications__specification-values dtc-ns pv2 ph6 c-muted-2 db-s">
        {values}
      </td>
    </tr>
  )
}

SpecificationRow.propTypes = {
  name: PropTypes.node,
  values: PropTypes.node,
}
