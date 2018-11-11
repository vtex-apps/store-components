import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const GenericError = ({ error, errorId, onDismiss, intl }) => {
  return (
    <div className="mb5">
      <Alert type="error" onClose={onDismiss}>
        {errorId ? intl.formatMessage({ id: errorId }) : error}
      </Alert>
    </div>
  )
}

GenericError.propTypes = {
  error: PropTypes.string,
  errorId: PropTypes.string,
  onDismiss: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(GenericError)
