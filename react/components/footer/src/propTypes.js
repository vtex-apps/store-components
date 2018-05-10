import PropTypes from 'prop-types'

export const objectLikeLinkArray = PropTypes.objectOf(PropTypes.shape({
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}))

export const objectLikeBadgeArray = PropTypes.objectOf(PropTypes.shape({
  image: PropTypes.string.isRequired,
}))

export const objectLikePaymentFormArray = PropTypes.objectOf(PropTypes.shape({
  paymentType: PropTypes.oneOf([
    'MasterCard', 'Visa', 'American Express', 'Diners', 'Elo', 'Boleto',
  ]),
}))

