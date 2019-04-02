import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { LEFT, RIGHT, CENTER } from './constants.js'
import title from './title.css'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class Title extends Component {
  static propTypes = {
    /** Text to be displayed */
    content: PropTypes.string,
    /** Alignment of the title */
    alignment: PropTypes.oneOf([LEFT, RIGHT, CENTER]).isRequired,
  }

  static defaultProps = {
    alignment: CENTER,
  }

  render() {
    const { content, alignment } = this.props

    return (
      <div className={`${title.titleContainer} flex justify-between`}>
        <div className={`${title.titleBox} w-100 ma1`}>
          {alignment == LEFT && <h3 className="tl">{content}</h3>}
          {alignment == CENTER && <h3 className="tc">{content}</h3>}
          {alignment == RIGHT && <h3 className="tr">{content}</h3>}
        </div>
      </div>
    )
  }
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
