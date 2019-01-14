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
    image: "https://st3.depositphotos.com/1531183/16673/v/1600/depositphotos_166738714-stock-illustration-vector-curved-paper-banner-isolated.jpg",
    mobileImage: "https://st3.depositphotos.com/1531183/16673/v/1600/depositphotos_166738714-stock-illustration-vector-curved-paper-banner-isolated.jpg",
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
          <img className="w-100" src={isMobile && mobileImage ? mobileImage : image} 
            alt={imageDescription} />
          <div className={`${imageText.textContainer} w-40-ns pt4`}>
            <div className={imageText.textTitleContainer}>
              <h1>{textTitle}</h1>
            </div>
            <div className={`${imageText.textDescriptionContainer} pb7 pt5`}>
              {textDescription}
            </div>
            <div>
              <Button
                primary
                onClick={() => {handleButton}}
              >
                {buttonTitle}
              </Button>
            </div>
          </div>
            
      </div>
    )
  }
}

export default withRuntimeContext(ImageText)
