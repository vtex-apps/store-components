import PropTypes from 'prop-types'

export const objectLikeLinkArray = PropTypes.arrayOf(PropTypes.shape({
  url: PropTypes.string,
  title: PropTypes.string,
}))

export const objectLikeBadgeArray = PropTypes.arrayOf(PropTypes.shape({
  image: PropTypes.string,
}))

export const objectLikePaymentFormArray = PropTypes.arrayOf(PropTypes.shape({
  paymentType: PropTypes.oneOf([
    'MasterCard', 'Visa', 'Diners Club',
  ]),
}))

