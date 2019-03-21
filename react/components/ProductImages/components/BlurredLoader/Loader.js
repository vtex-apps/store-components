import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import { Spinner } from 'vtex.styleguide'
import { LinearProgress } from './LinearProgress'
import { LOADER_TYPES } from './index'
import styles from '../../styles.css'

export const Loader = ({ loaderType, loaded, children }) => {
  const props = useSpring({
    opacity: loaded ? 0 : 1,
    from: { opacity: 1 },
    config: { duration: 1000 },
  })

  const LoadComp =
    loaderType === LOADER_TYPES.SPINNER ? <Spinner /> : <LinearProgress />
  return (
    <animated.div style={props}>
      <div className={`w-100 h-100 db ${styles.loader}`}>
        <div className="absolute top-0 left-0 w-100 h-100 flex justify-center items-center">
          <div className="z-2 w-100 flex justify-center">{LoadComp}</div>
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

Loader.propTypes = {
  /** Loader Type(Spinner or Linear Progress) */
  loaderType: PropTypes.string,
  /** if Load is completed */
  loaded: PropTypes.bool,
  /** Blurred Children */
  children: PropTypes.node,
}
