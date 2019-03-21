import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Spinner } from 'vtex.styleguide'
import LinearProgress from '@material-ui/core/LinearProgress'
import styles from '../../styles.css'

export const Loader = ({ loaderType, loaded, children }) => {
  const props = useSpring({ opacity: loaded ? 0 : 1, from: { opacity: 1 } })
  return (
    <animated.div style={props}>
      <div className="w-100 db">
        <div className="absolute top-0 left-0 w-100 h-100 flex justify-center items-center ">
          <div className="z-2">
            <Spinner />
          </div>
          <div
            className={`absolute top-0 left-0 w-100 h-100 ${
              styles.imageBlur30
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </animated.div>
  )
}
