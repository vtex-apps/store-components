import React, { memo, FC, SyntheticEvent } from 'react'
import { FormattedNumber } from 'react-intl'
import classNames from 'classnames'

import styles from '../styles.css'
import { slug } from '../utils'

interface Props {
  isAvailable: boolean
  isSelected: boolean
  maxPrice?: number | null
  price?: number | null
  onClick: (e: SyntheticEvent<HTMLDivElement>) => void
  isImage: boolean
  variationValue: string
  imageUrl?: string
  imageLabel?: string | null
  isImpossible: boolean
}

const getDiscount = (maxPrice?: number | null, price?: number | null) => {
  let discount = 0
  if (maxPrice && price) {
    discount = 1 - price / maxPrice
  }
  return discount
}

/**
 * Inherits the components that should be displayed inside the Selector component.
 */
const SelectorItem: FC<Props> = ({
  isAvailable = true,
  isSelected = false,
  maxPrice,
  price,
  onClick,
  isImage,
  variationValue,
  imageUrl,
  imageLabel,
  isImpossible,
}) => {
  const discount = getDiscount(maxPrice, price)
  return (
    <div
      role="button"
      tabIndex={0}
      className={classNames(
        styles.skuSelectorItem,
        `${styles.skuSelectorItem}--${slug(variationValue)}`,
        'relative di pointer flex items-center outline-0',
        {
          [styles.skuSelectorItemImage]: isImage,
          'o-20': isImpossible,
        }
      )}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick(e)}
    >
      <div
        className={classNames(
          styles.frameAround,
          'absolute b--action-primary br3 bw1',
          {
            ba: isSelected,
          }
        )}
      />
      <div
        className={classNames(
          'w-100 h-100 ba br2 b b--muted-4 z-1 c-muted-5 flex items-center overflow-hidden',
          {
            'hover-b--muted-2': !isSelected && !isImpossible,
          }
        )}
      >
        <div
          className={classNames('absolute absolute--fill', {
            [styles.diagonalCross]: !isAvailable,
          })}
        />
        <div
          className={classNames({
            [`${styles.skuSelectorItemTextValue} c-on-base center pl5 pr5 z-1 t-body`]: !isImage,
          })}
        >
          {isImage && imageUrl ? (
            <img className={styles.skuSelectorItemImageValue} src={imageUrl} alt={imageLabel as string | undefined} />
          ) : (
              variationValue
            )}
        </div>
      </div>
      {discount > 0 && (
        <span className={`${styles.skuSelectorBadge} b`}>
          <FormattedNumber value={discount} style="percent" />
        </span>
      )}
    </div>
  )
}

export default memo(SelectorItem)
