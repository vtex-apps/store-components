import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRuntimeContext } from 'render'
import { Button } from 'vtex.styleguide'

import imageText from './imageText.css'

/**
 * Image with text
 */
class ImageText extends Component {
  static propTypes = {
    /** The description of the image */
    imageDescription: PropTypes.string,
    /** Max height size of the image */
    height: PropTypes.number,
    /** The image of the image */
    image: PropTypes.string,
    /** The mobile image of the image */
    mobileImage: PropTypes.string,
    /** The text title of the image */
    textTitle: PropTypes.string,
    /** The text description of the image */ 
    textDescription: PropTypes.string,
    /** The button title of the image */
    buttonTitle: PropTypes.string,
    /** The button function of the image */
    handleButton: PropTypes.function,
  }


  static defaultProps = {
    height: 420,
    textTitle: "Enjoy pure water throughout your home",
    textDescription: "Your family relies on clean water to stay healthy. Choose from a high-quality selection of water softeners and filtration systems to remove water contaminants and hardness in your home. Take control with a water system designed around your unique needs.",
    buttonTitle: "Shop water infiltration",
    image: "https://ecowaterqa.vteximg.com.br/arquivos/ids/155512",
    mobileImage: "https://ecowaterqa.vteximg.com.br/arquivos/ids/155513",
  }

  render() {
    const { 
      image, 
      height, 
      mobileImage, 
      textTitle, 
      textDescription,
      imageDescription,
      buttonTitle,
      handleButton,
      runtime,
    } = this.props
    
    const isMobile = runtime.hints.mobile

    return (
      <div className={imageText.container}>
        <div className={imageText.imageContainer}>
          <img className={`${imageText.image} w-100`} 
            src={isMobile && mobileImage ? mobileImage : image} 
            alt={imageDescription} />
        </div>
        <div className={`${imageText.textContainer} w-50-ns center pt8 w-90 left-2 absolute`}>
          <div>

            <div className={imageText.textTitleContainer}>
              <h1>{textTitle}</h1>
            </div>
            <div className={`${imageText.textDescriptionContainer} pb7 pt5`}>
              {textDescription}
            </div>
            <div>
              <Button
                primary
                className=""
                onClick={() => {handleButton}}
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
