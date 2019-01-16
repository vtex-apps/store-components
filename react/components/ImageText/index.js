import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRuntimeContext } from 'render'
import { Button } from 'vtex.styleguide'

/**
 * Image with text
 */
class ImageText extends Component {
  static propTypes = {
    /** Max height size of the image */
    height: PropTypes.number,
    /** The image of the image */
    image: PropTypes.string.isRequired,
    /** The mobile image of the image */
    mobileImage: PropTypes.string,
    /** The text title of the image */
    textTitle: PropTypes.string.isRequired,
    /** The text description of the image */
    textDescription: PropTypes.string.isRequired,
    /** The button title of the image */
    buttonTitle: PropTypes.string.isRequired,
    /** The button function of the image */
    handleButton: PropTypes.function.isRequired,
  }

  static defaultProps = {
    height: 420,
  }

  render() {
    const {
      image,
      height,
      mobileImage,
      textTitle,
      textDescription,
      buttonTitle,
      handleButton,
      runtime,
    } = this.props

    const isMobile = runtime.hints.mobile

    const containerInlineClasses = {
      backgroundImage: `url(${isMobile && mobileImage ? mobileImage : image})`,
      minHeight: height,
    }

    return (
      <div className="flex w-100">
        <div style={containerInlineClasses} className="bg-center cover w-100 center pt8-l pb4-l pt5-m pb3-m pv6-s pl6 absolute">
          <div className="w-50-ns">
            <div>
              <h1>{textTitle}</h1>
            </div>
            <div className="pb7 pt5-ns lh-title">
              {textDescription}
            </div>
            <div>
              <Button
                primary
                className=""
                onClick={handleButton}
              >
                {buttonTitle}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRuntimeContext(ImageText)
