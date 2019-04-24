import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, prop, propOr } from 'ramda'

import ProductSpecifications from './index';

const ProductSpecificationsWrapper = ({ specificationsDefault, ...props }) => {
  const valuesFromContext = React.useContext(ProductContext)
  const showSpecifications = prop('showSpecifications', specificationsDefault)

  const getSpecifications = () => {
    const { product } = valuesFromContext

    const choose = path(['specificationGroups', 'specification'], specificationsDefault)
    const allSpecifications = propOr([], 'properties', product)

    switch (choose) {
      case 'editor.product-details.product-specifications.chooseDefaultSpecification':
        const typedSpecifications = pathOr('', ['specificationGroups', 'typeSpecifications'], specificationsDefault)
        const specificationNames = typedSpecifications.trim().split(',')

        return specificationNames.reduce((acc, item) => {
          const specification = allSpecifications.filter(
            x => x.name.toLowerCase() === item.trim().toLowerCase()
          )
          return acc.concat(specification)
        }, [])

      case 'editor.product-details.product-specifications.allSpecifications': 
        return allSpecifications
      
      default:
        return allSpecifications
    }
  }

  const productSpecificationsProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    return {
      tabsMode: prop('viewMode', specificationsDefault) === 'tab',
      specifications: getSpecifications(),
    }
  }

  if (!showSpecifications) return null

  return (
    <ProductSpecifications { ...productSpecificationsProps() } />
  )
}

ProductSpecificationsWrapper.schema = {
  title: 'editor.product-details.title',
  description: 'editor.product-details.description',
  type: 'object',
  definitions: {
    specificationsDefault: {
      title: 'specificationsDefault',
      type: 'object',
      properties: {
        showSpecifications: {
          title: 'Show specifications',
          type: 'boolean',
          enum: [true, false],
          default: true,
        },
      },
      required: ['showSpecifications'],
      dependencies: {
        showSpecifications: {
          oneOf: [
            {
              properties: {
                showSpecifications: {
                  enum: [true],
                },
                specificationGroups: {
                  title: 'specificationGroups',
                  type: 'object',
                  properties: {
                    specification: {
                      title: 'editor.product-details.product-specifications.default',
                      type: 'string',
                      enum: [
                        'editor.product-details.product-specifications.allSpecifications',
                        'editor.product-details.product-specifications.chooseDefaultSpecification',
                      ],
                      default:
                        'editor.product-details.product-specifications.allSpecifications',
                    },
                  },
                  required: ['specification'],
                  dependencies: {
                    specification: {
                      oneOf: [
                        {
                          properties: {
                            specification: {
                              enum: [
                                'editor.product-details.product-specifications.allSpecifications',
                              ],
                            },
                          },
                        },
                        {
                          properties: {
                            specification: {
                              enum: [
                                'editor.product-details.product-specifications.chooseDefaultSpecification',
                              ],
                            },
                            typeSpecifications: {
                              type: 'string',
                              title:
                                'editor.product-details.product-specifications.typeSpecifications.title',
                            },
                          },
                          required: [''],
                        },
                      ],
                    },
                  },
                },
                viewMode: {
                  type: 'string',
                  title:
                    'editor.product-specifications.displaySpecification.title',
                  enum: ['tab', 'table'],
                  enumNames: [
                    'editor.product-specifications.displaySpecification.tabMode',
                    'editor.product-specifications.displaySpecification.tableMode',
                  ],
                  default: 'editor.product-specifications.displaySpecification.tabMode',
                  widget: {
                    'ui:options': {
                      inline: false,
                    },
                    'ui:widget': 'radio',
                  },
                },
              },
              required: [''],
            },
          ],
        },
      },
    },
  },
  properties: {
    specificationsDefault: {
      title: 'specification',
      $ref: '#/definitions/specificationsDefault',
    },
  },
}

export default ProductSpecificationsWrapper