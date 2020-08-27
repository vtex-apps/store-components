import React, { PureComponent } from 'react'

import styles from '../styles.css'

type OwnProps = {}

type Props = OwnProps & typeof CollectionBadgeItem.defaultProps

/**
 * Collection Badge Item.
 * Displays a collection badge item.
 */
// eslint-disable-next-line react/prefer-stateless-function
export class CollectionBadgeItem extends PureComponent<Props> {
  static defaultProps = {
    children: {},
  }

  render() {
    return (
      <div className={`${styles.item} mh1 pa2 bg-blue white tc`}>
        {this.props.children}
      </div>
    )
  }
}
