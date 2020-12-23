import React from 'react'
import ContentLoader from 'react-content-loader'
import classNames from 'classnames'

import styles from './styles.css'

interface Props {
  containerClass?: string
  contentLoaderClass?: string
  'vtex-share__button--loader'?: Partial<React.SVGProps<SVGCircleElement>>
  'vtex-share__button--loader-1'?: Partial<React.SVGProps<SVGCircleElement>>
  'vtex-share__button--loader-2'?: Partial<React.SVGProps<SVGCircleElement>>
  'vtex-share__button--loader-3'?: Partial<React.SVGProps<SVGCircleElement>>
}

function Loader(loaderProps: Props) {
  const {
    'vtex-share__button--loader': button,
    'vtex-share__button--loader-1': button1,
    'vtex-share__button--loader-2': button2,
    'vtex-share__button--loader-3': button3,
    containerClass,
    contentLoaderClass,
  } = loaderProps

  const loaderStyles = {
    r: '1em',
    height: '2em',
    cy: '1em',
    ...button,
  }

  return (
    <div
      className={classNames(
        styles.shareContainer,
        styles.shareLoader,
        containerClass
      )}
    >
      <ContentLoader
        className={contentLoaderClass}
        style={{
          width: '100%',
          height: '100%',
        }}
        height={100}
        width={100}
      >
        <circle cx="1em" {...loaderStyles} {...button1} />
        <circle cx="3.5em" {...loaderStyles} {...button2} />
        <circle cx="6em" {...loaderStyles} {...button3} />
      </ContentLoader>
    </div>
  )
}

export default Loader
