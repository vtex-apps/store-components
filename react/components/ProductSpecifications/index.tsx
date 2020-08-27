import React, { Fragment, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.styleguide"' has no exported member ... Remove this comment to see the full error message
import { Tabs, Tab } from 'vtex.styleguide'
import { useDevice } from 'vtex.device-detector'

import { SanitizedHTML } from '../SanitizedHTML'
import GradientCollapse from '../GradientCollapse/index'

const CSS_HANDLES = [
  'specificationsTableContainer',
  'specificationsTabsContainer',
  'specificationsTitle',
  'specificationsTable',
  'specificationsTableRow',
  'specificationsTableHead',
  'specificationsTableBody',
  'specificationsTab',
  'specificationsTablePropertyHeading',
  'specificationsTableSpecificationHeading',
  'specificationItemProperty',
  'specificationItemSpecifications',
]

type OwnProps = {
  specifications?: Array<{
    name: string
    values: string[]
  }>
  shouldCollapseInTabChange?: boolean
  tabsMode?: boolean
  visibleSpecifications?: any[]
  hiddenSpecifications?: any[]
  collapsible?: 'always' | 'never' | 'desktopOnly' | 'mobileOnly'
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ProductSpecifications.defaultProps

/**
 * Product Specification Component.
 * Render the technical specifications of a product. Can be displayed in two views: Table view or Tabs view.
 */
// @ts-expect-error ts-migrate(7022) FIXME: 'ProductSpecifications' implicitly has type 'any' ... Remove this comment to see the full error message
const ProductSpecifications = ({
  tabsMode,
  specifications,
  collapsible = 'always',
  hiddenSpecifications,
  visibleSpecifications,
  shouldCollapseInTabChange,
}: Props) => {
  const [currentTab, setCurrentTab] = useState(0)
  const [collapsed, setCollapsed] = useState(true)
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  const shouldBeCollapsible = Boolean(
    collapsible === 'always' ||
      (collapsible === 'mobileOnly' && isMobile) ||
      (collapsible === 'desktopOnly' && !isMobile)
  )

  const handleTabChange = (tabIndex: any) => {
    setCurrentTab(tabIndex)
    if (shouldCollapseInTabChange) {
      setCollapsed(true)
    }
  }

  const getSpecificationItems = () => {
    const mappedSpecifications = specifications.map((specification: any) => {
      return {
        property: specification.name,
        specifications: specification.values.join(', '),
      }
    })

    if (
      visibleSpecifications &&
      visibleSpecifications.length > 0 &&
      hiddenSpecifications &&
      hiddenSpecifications.length > 0
    ) {
      console.warn(
        'A product-specification block is using both visibleSpecifications and hiddenSpecifications props at the same time. Please choose only one of them.'
      )

      return mappedSpecifications
    }

    if (visibleSpecifications && visibleSpecifications.length > 0) {
      return mappedSpecifications.filter((specification: any) =>
        visibleSpecifications.find(
          (filter: any) =>
            specification.property.toLowerCase() === filter.toLowerCase()
        )
      )
    }

    if (hiddenSpecifications && hiddenSpecifications.length > 0) {
      return mappedSpecifications.filter(
        (specification: any) =>
          !hiddenSpecifications.find(
            (filter: any) =>
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
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message */}
          <SanitizedHTML content={txt} />
        </h2>
      )}
    </FormattedMessage>
  )

  const specificationsTable = (
    <table
      className={`${handles.specificationsTable} w-100 bg-base border-collapse`}
    >
      <thead className={handles.specificationsTableHead}>
        <tr className={handles.specificationsTableRow}>
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
      <tbody className={handles.specificationsTableBody}>
        {specificationItems.map((specification: any, i: any) => (
          <tr className={handles.specificationsTableRow} key={i}>
            <td
              data-specification={specification.property}
              className={`${handles.specificationItemProperty} w-50 b--muted-4 bb pa5`}
            >
              <SanitizedHTML content={specification.property} />
            </td>
            <td
              data-specification={specification.specifications}
              className={`${handles.specificationItemSpecifications} w-50 b--muted-4 bb pa5`}
            >
              <SanitizedHTML content={specification.specifications} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const tableView = (
    <Fragment>
      {specifications.length > 0 && (
        <div
          className={`${handles.specificationsTableContainer} mt9 mt0-l pl8-l`}
        >
          {specificationTitle}
          {shouldBeCollapsible ? (
            <GradientCollapse
              collapseHeight={220}
              collapsed={collapsed}
              onCollapsedChange={(_, newValue) => setCollapsed(newValue)}
            >
              {specificationsTable}
            </GradientCollapse>
          ) : (
            specificationsTable
          )}
        </div>
      )}
    </Fragment>
  )

  const tabsView = (
    <div className={`${handles.specificationsTabsContainer} pt8`}>
      {specificationTitle}
      <Tabs fullWidth>
        {specificationItems.map((specification: any, i: any) => (
          <Tab
            key={i}
            label={<SanitizedHTML content={specification.property} />}
            active={currentTab === i}
            onClick={() => handleTabChange(i)}
          >
            <div className={`${handles.specificationsTab} pb8 c-muted-1 pv6`}>
              {shouldBeCollapsible ? (
                <GradientCollapse
                  collapseHeight={220}
                  collapsed={collapsed}
                  onCollapsedChange={(_, newValue) => setCollapsed(newValue)}
                >
                  <SanitizedHTML content={specification.specifications} />
                </GradientCollapse>
              ) : (
                <SanitizedHTML content={specification.specifications} />
              )}
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
  shouldCollapseInTabChange: false,
}

export default ProductSpecifications
