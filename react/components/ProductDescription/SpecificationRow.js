import React from 'react'
import PropTypes from 'prop-types'

export default function SpecificationRow({ name, values, classes }) {

  return (
    <tr className={classes.row}>
      <th className={classes.thName}>
        {name}
      </th>
      <td className={classes.tdValue}>
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
