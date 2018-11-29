import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Vimeo from './Vimeo'
//import Youtube from './Youtube'

class Video extends Component {
  static getThumbUrl(url, thumbWidth){

    /**
     * Youtube Component disabled until settings update and backend update to support video
    if(url.search('youtube') !== -1)
      return Youtube.getThumbUrl(url, thumbWidth)
     */
    if(url.search('vimeo') !== -1)
      return Vimeo.getThumbUrl(url, thumbWidth)
  }

  render(){
    const { url } = this.props

    /**
    if(url.search('youtube') !== -1)
      return <Youtube {...this.props}/>
     */
    if(url.search('vimeo') !== -1)
      return <Vimeo {...this.props}/>
  }
}

Video.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  play: PropTypes.bool,
}

export default Video
