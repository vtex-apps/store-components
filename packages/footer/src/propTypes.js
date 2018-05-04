const objectLikeArrayWithValidator = validate => (
  props,
  propName,
  componentName,
  location
) => {
  // eslint-disable-next-line
  for (const [key] of Object.entries(props[propName])) {
    const error = validate(props[propName], key, componentName, location)

    if (error !== null) return error
  }

  return null
}

const validateRequiredString = (
  obj,
  propName,
  property,
  componentName,
  location
) => {
  if (obj[property] === undefined || obj[property] === null) {
    return new Error(
      `The ${location} \`${propName}.${property}\` is marked as required (in \`${componentName}\`, but its value is \`${
        obj[property]
      }\`)`
    )
  }

  if (typeof obj[property] !== 'string') {
    return new Error(
      `Invalid ${location} \`${propName}.${property}\` of type \`${typeof obj[
        property
      ]}\` supplied to \`${componentName}\`, expected \`string\`.`
    )
  }

  return null
}

export const objectLikeLinkArray = objectLikeArrayWithValidator(
  (obj, propName, componentName, location) => {
    let error = null

    error = validateRequiredString(
      obj,
      propName,
      'url',
      componentName,
      location
    )
    error = validateRequiredString(
      obj,
      propName,
      'title',
      componentName,
      location
    )

    return error
  }
)

export const objectLikeBadgeArray = objectLikeArrayWithValidator(
  (obj, propName, componentName, location) => {
    return validateRequiredString(
      obj,
      propName,
      'image',
      componentName,
      location
    )
  }
)

export const objectLikePaymentFormArray = objectLikeArrayWithValidator(
  (obj, propName, componentName, location) => {
    return validateRequiredString(
      obj,
      propName,
      'paymentType',
      componentName,
      location
    )
  }
)
