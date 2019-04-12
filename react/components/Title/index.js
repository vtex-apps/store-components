import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import { LEFT, RIGHT, CENTER, LEVELS } from './constants.js'
import styles from './title.css'

const Title = ({ content, level, alignment }) => {
  const titleClasses = classNames(styles.title, `t-heading-${level}`, {
    tl: alignment === LEFT,
    tc: alignment === CENTER,
    tr: alignment === RIGHT,
  })

  const Heading = `h${level}`

  return (
    <div className={`${styles.titleContainer} flex justify-between`}>
      <div className={`${styles.titleBox} w-100 ma1 c-muted-1`}>
        <Heading className={titleClasses}>{content}</Heading>
      </div>
    </div>
  )
}

Title.propTypes = {
  /** Text to be displayed */
  content: PropTypes.string,
  /** Heading level */
  level: PropTypes.oneOf(LEVELS).isRequired,
  /** Alignment of the title */
  alignment: PropTypes.oneOf([LEFT, RIGHT, CENTER]).isRequired,
}

Title.defaultProps = {
  level: 3,
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
    level: {
      type: 'number',
      title: 'editor.title.level',
      enum: LEVELS,
      default: 3,
      widget: {
        'ui:widget': 'radio',
        'ui:options': {
          inline: true,
        },
      },
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
