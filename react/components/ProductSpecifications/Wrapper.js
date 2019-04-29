import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, prop, propOr } from 'ramda'

import ProductSpecifications from './index';

const ProductSpecificationsWrapper = ({ specificationsDefault, ...props }) => {
  const valuesFromContext = useContext(ProductContext)

  const getSpecifications = () => {
    const { product } = valuesFromContext

    const choose = path(['specificationGroups', 'specification'], specificationsDefault)
    const allSpecifications = propOr([], 'properties', product)

    switch (choose) {
      case 'admin/editor.product-details.product-specifications.chooseDefaultSpecification':
        const typedSpecifications = pathOr('', ['specificationGroups', 'typeSpecifications'], specificationsDefault)
        const specificationNames = typedSpecifications.trim().split(',')

        return specificationNames.reduce((acc, item) => {
          const specification = allSpecifications.filter(
            x => x.name.toLowerCase() === item.trim().toLowerCase()
          )
          return acc.concat(specification)
        }, [])

      case 'admin/editor.product-details.product-specifications.allSpecifications': 
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

  return (
    <ProductSpecifications { ...productSpecificationsProps() } />
  )
}

ProductSpecificationsWrapper.schema = {
  // @TODO review title and description
  title: 'admin/editor.product-details.title',
  description: 'admin/editor.product-details.description',
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
                      title: 'admin/editor.product-details.product-specifications.default',
                      type: 'string',
                      enum: [
                        'admin/editor.product-details.product-specifications.allSpecifications',
                        'admin/editor.product-details.product-specifications.chooseDefaultSpecification',
                      ],
                      default:
                        'admin/editor.product-details.product-specifications.allSpecifications',
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
                                'admin/editor.product-details.product-specifications.allSpecifications',
                              ],
                            },
                          },
                        },
                        {
                          properties: {
                            specification: {
                              enum: [
                                'admin/editor.product-details.product-specifications.chooseDefaultSpecification',
                              ],
                            },
                            typeSpecifications: {
                              type: 'string',
                              title:
                                'admin/editor.product-details.product-specifications.typeSpecifications.title',
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
                    'admin/editor.product-specifications.displaySpecification.title',
                  enum: ['tab', 'table'],
                  enumNames: [
                    'admin/editor.product-specifications.displaySpecification.tabMode',
                    'admin/editor.product-specifications.displaySpecification.tableMode',
                  ],
                  default: 'admin/editor.product-specifications.displaySpecification.tabMode',
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