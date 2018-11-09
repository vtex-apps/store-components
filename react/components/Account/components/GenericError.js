import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const GenericError = ({ errorId, onDismiss, intl }) => {
  return (
    <div className="mb5">
      <Alert type="error" onClose={onDismiss}>
        {intl.formatMessage({ id: errorId })}
      </Alert>
    </div>
  )
}

GenericError.propTypes = {
  errorId: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(GenericError)
