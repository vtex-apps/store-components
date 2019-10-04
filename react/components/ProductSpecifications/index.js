import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'
import { useCssHandles } from 'vtex.css-handles'
import { Tabs, Tab } from 'vtex.styleguide'

import GradientCollapse from '../GradientCollapse/index'

const CSS_HANDLES = [
  'specificationsTableContainer',
  'specificationsTabsContainer',
  'specificationsTitle',
  'specificationsTable',
  'specificationsTab',
  'specificationsTablePropertyHeading',
  'specificationsTableSpecificationHeading',
  'specificationItemProperty',
  'specificationItemSpecifications',
]

/**
 * Product Specification Component.
 * Render the technical specifications of a product. Can be displayed in two views: Table view or Tabs view.
 */
const ProductSpecifications = ({
  hiddenSpecifications,
  visibleSpecifications,
  tabsMode,
  specifications,
}) => {
  const [currentTab, setCurrentTab] = useState(0)
  const handles = useCssHandles(CSS_HANDLES)

  const handleTabChange = tabIndex => {
    setCurrentTab(tabIndex)
  }

  const getSpecificationItems = () => {
    const mappedSpecifications = specifications.map(specification => {
      return {
        property: specification.name,
        specifications: specification.values[0],
      }
    })

    if (visibleSpecifications && hiddenSpecifications) {
      console.warn(
        'A product-specification block is using both visibleSpecifications and hiddenSpecifications props at the same time. Please choose only one of them.'
      )

      return mappedSpecifications
    }

    if (visibleSpecifications) {
      return mappedSpecifications.filter(specification =>
        visibleSpecifications.find(
          filter =>
            specification.property.toLowerCase() === filter.toLowerCase()
        )
      )
    }
    if (hiddenSpecifications) {
      return mappedSpecifications.filter(
        specification =>
          !hiddenSpecifications.find(
            filter =>
              specification.property.toLowerCase() === filter.toLowerCase()
          )
      )
    }

    return mappedSpecifications
  }

  const specificationItems = getSpecificationItems()

  const specificationTitle = (
    <FormattedMessage id="store/technicalspecifications.title">
      {txt => (
        <h2 className={`${handles.specificationsTitle} t-heading-5 mb5 mt0`}>
          {HtmlParser(txt)}
        </h2>
      )}
    </FormattedMessage>
  )

  const tableView = (
    <Fragment>
      {specifications.length > 0 && (
        <div
          className={`${handles.specificationsTableContainer} mt9 mt0-l pl8-l`}
        >
          {specificationTitle}
          <GradientCollapse collapseHeight={220}>
            <table
              className={`${handles.specificationsTable} w-100 bg-base border-collapse`}
            >
              <thead>
                <tr>
                  <th
                    className={`${handles.specificationsTablePropertyHeading} w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5`}
                  >
                    <FormattedMessage id="store/product-description.property" />
                  </th>
                  <th
                    className={`${handles.specificationsTableSpecificationHeading} w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5`}
                  >
                    <FormattedMessage id="store/product-description.specification" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {specificationItems.map((specification, i) => (
                  <tr key={i}>
                    <td
                      className={`${handles.specificationItemProperty} w-50 b--muted-4 bb pa5`}
                    >
                      {HtmlParser(specification.property)}
                    </td>
                    <td
                      className={`${handles.specificationItemSpecifications} w-50 b--muted-4 bb pa5`}
                    >
                      {HtmlParser(specification.specifications)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GradientCollapse>
        </div>
      )}
    </Fragment>
  )

  const tabsView = (
    <div className={`${handles.specificationsTabsContainer} pt8`}>
      {specificationTitle}
      <Tabs fullWidth>
        {specificationItems.map((specification, i) => (
          <Tab
            key={i}
            label={HtmlParser(specification.property)}
            active={currentTab === i}
            onClick={() => handleTabChange(i)}
          >
            <div className={`${handles.specificationsTab} pb8 c-muted-1 pv6`}>
              <GradientCollapse collapseHeight={220}>
                {HtmlParser(specification.specifications)}
              </GradientCollapse>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  )

  return tabsMode ? tabsView : tableView
}

ProductSpecifications.defaultProps = {
  specifications: [],
  tabsMode: false,
}

ProductSpecifications.propTypes = {
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
  /** Tabs mode view */
  tabsMode: PropTypes.bool,
  /** Specifications which will be shown exclusively (optional) */
  visibleSpecifications: PropTypes.array,
  /** Specifications which will be hidden (optional) */
  hiddenSpecifications: PropTypes.array,
}

export default injectIntl(ProductSpecifications)
