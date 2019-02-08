import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'
import GradientCollapse from './GradientCollapse'

import { Tabs, Tab } from 'vtex.styleguide'

import styles from './styles.css'

class ProductSpecifications extends Component {

  state = { currentTab: 0 }

  handleTabChange(tabIndex) {
    this.setState({
      currentTab: tabIndex,
    })
  }

  get specificationItems(){
    return this.props.specifications.map(specification => {
      return { property: specification.name, specifications: specification.values[0] }
    })
  }

  get tableVision(){
    const { specifications } = this.props;

    return(
      <Fragment>
        {specifications.length > 0 && (
          <div className={`${styles.specifications} mt9 mt0-l w-100 w-40-l pl8-l`}>
            <FormattedMessage id="technicalspecifications.title">
              {(txt) => (
                <h2 className={`${styles.specificationsTitle} t-heading-5 mb5 mt0`}>{HtmlParser(txt)}</h2>
              )}
            </FormattedMessage>
            <GradientCollapse collapseHeight={300}>
              <table className={`${styles.specificationsTable} w-100 bg-base border-collapse`}>
                <thead>
                  <tr>
                    <th className="w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5">
                      <FormattedMessage id="product-description.property" />
                    </th>
                    <th className="w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5">
                      <FormattedMessage id="product-description.specification" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.specificationItems.map((specification, i) => (
                    <tr key={i}>
                      <td className="w-50 b--muted-4 bb pa5">{HtmlParser(specification.property)}</td>
                      <td className="w-50 b--muted-4 bb pa5">{HtmlParser(specification.specifications)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GradientCollapse>
          </div>
        )}
      </Fragment>
    )
  }

  get tabsVision(){
    const { currentTab } = this.state;

    return(
      <Fragment>
        <Tabs>
          {
            this.specificationItems.map((specification, i) => (
              <Tab label={HtmlParser(specification.property)} active={currentTab === i} onClick={() => this.handleTabChange(i)}>
                <GradientCollapse collapseHeight={300}>
                  {HtmlParser(specification.specifications)}
                </GradientCollapse>
              </Tab>
            ))
          }
        </Tabs>
      </Fragment>
    )
  }

  render(){
    return this.props.tabs ? this.tabsVision : this.tableVision
  }
}

export default ProductSpecifications