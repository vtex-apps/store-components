import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export default {
  /** Product selling price */
  sellingPrice: PropTypes.number,
  /** Product list price */
  listPrice: PropTypes.number,
  /** Set visibility of list price */
  showListPrice: PropTypes.bool.isRequired,
  /** Set visibility of labels */
  showLabels: PropTypes.bool.isRequired,
  /** Set visibility of installments */
  showInstallments: PropTypes.bool.isRequired,
  /** Set visibility of savings */
  showSavings: PropTypes.bool,
  /** Text to the selling price's label */
  labelSellingPrice: PropTypes.string,
  /** Available installments */
  installments: PropTypes.arrayOf(
    PropTypes.shape({
      /** Installment value */
      Value: PropTypes.number.isRequired,
      /** Interest rate (zero if interest-free) */
      InterestRate: PropTypes.number.isRequired,
      /** Calculated total value */
      TotalValuePlusInterestRate: PropTypes.number,
      /** Number of installments */
      NumberOfInstallments: PropTypes.number.isRequired,
      /** Installment offer name */
      Name: PropTypes.string,
    })
  ),
  /** CSS classes to be applied in the Price component Component */
  classes: PropTypes.shape({
    root: PropTypes.string,
    rootLoader: PropTypes.string,
    listPrice: PropTypes.shape({
      container: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    }),
    sellingPrice: PropTypes.shape({
      container: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    }),
    savings: PropTypes.shape({
      container: PropTypes.string,
      value: PropTypes.string
    })
  }),
  /** Classes to be applied in the Installments Component */
  installmentsClasses: PropTypes.shape({
    root: PropTypes.string,
    installmentValue: PropTypes.string,
    interestRate: PropTypes.string
  }),
  /** Component and content loader styles */
  styles: PropTypes.object,
  /** intl property to format data */
  intl: intlShape.isRequired,
}
