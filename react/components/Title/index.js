import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import { LEFT, RIGHT, CENTER } from './constants.js'
import styles from './title.css'

const Title = ({ content, alignment }) => {
  const titleClasses = classNames(styles.title, 't-heading-3', {
    tl: alignment === LEFT,
    tc: alignment === CENTER,
    tr: alignment === RIGHT,
  })

  return (
    <div className={`${styles.titleContainer} flex justify-between`}>
      <div className={`${styles.titleBox} w-100 ma1 c-muted-1`}>
        <h3 className={titleClasses}>{content}</h3>
      </div>
    </div>
  )
}

Title.propTypes = {
  /** Text to be displayed */
  content: PropTypes.string,
  /** Alignment of the title */
  alignment: PropTypes.oneOf([LEFT, RIGHT, CENTER]).isRequired,
}

Title.defaultProps = {
  alignment: CENTER,
}

Title.schema = {
  title: 'editor.title.title',
  description: 'editor.title.description',
  type: 'object',
  properties: {
    content: {
      type: 'string',
      title: 'editor.title.content',
      isLayout: false,
    },
    alignment: {
      type: 'string',
      title: 'editor.title.alignment',
      enum: [LEFT, RIGHT, CENTER],
      enumNames: [
        'editor.title.alignment.left',
        'editor.title.alignment.right',
        'editor.title.alignment.center',
      ],
      default: CENTER,
      widget: {
        'ui:widget': 'radio',
        'ui:options': {
          inline: true,
        },
      },
      isLayout: true,
    },
  },
}

export default Title
