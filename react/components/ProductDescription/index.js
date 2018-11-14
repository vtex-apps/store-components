import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import SpecificationRow from './SpecificationRow'

import './global.css'

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */
class ProductDescription extends Component {
  render() {
    const { specifications, skuName, description, rowClasses } = this.props
    const classes = {
      ...ProductDescription.defaultProps.classes,
      ...this.props.classes,
    }

    if (!description || !specifications) {
      return null
    }

    return (
      <div className={classes.root}>
        <div className={classes.description.container}>
          <div className={classes.description.title}>
            <FormattedMessage id="product-description.title" />
          </div>
          <span
            className={classes.description.text}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {specifications.length > 0 && (
          <div className={classes.table.container}>
            <div className={classes.table.title}>
              <FormattedMessage id="technicalspecifications.title" />
            </div>
            <table className={classes.table.tableElement}>
              <tbody className={classes.table.tableBody}>
                {skuName && (
                  <SpecificationRow classes={rowClasses} name={`SKU ${skuName}`} />
                )}
                {specifications.map(specification => (
                  <SpecificationRow
                    classes={rowClasses}
                    key={specification.name}
                    name={specification.name}
                    values={specification.values.map((value, i) => (
                      <Fragment key={value}>
                        <span dangerouslySetInnerHTML={{ __html: value }} />{' '}
                        {i !== specification.values.length - 1 && <br />}
                      </Fragment>
                    ))}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

ProductDescription.defaultProps = {
  classes: {
    root: null,
    description: {
      text: null,
      title: null,
      container: null,
    },
    table: {
      title: null,
      container: null,
      tableBody: null,
      tableElement: null
    }
  },
  specifications: []
}

ProductDescription.propTypes = {
  /** CSS classes to be applied in the elements of the component */
  classes: PropTypes.shape({
    root: PropTypes.string,
    description: PropTypes.shape({
      container: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    }),
    table: PropTypes.shape({
      container: PropTypes.string,
      title: PropTypes.string,
      tableElement: PropTypes.string,
      tableBody: PropTypes.string
    }),
  }),
  /** Product description string */
  description: PropTypes.string,
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
  /** Specifications that will be displayed on the table */
  specifications: PropTypes.arrayOf(
    PropTypes.shape({
      /** Specification name */
      name: PropTypes.string.isRequired,
      /** Specifications value */
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  /** Name of the current SKU */
  skuName: PropTypes.string,
  /** CSS classes to be applied in the elements of SpecificaitonRow component */
  rowClasses: PropTypes.shape({
    row: PropTypes.string,
    thName: PropTypes.string,
    tdValue: PropTypes.string
  })
}

export default injectIntl(ProductDescription)
