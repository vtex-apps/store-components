import React, { useState, useRef, useLayoutEffect } from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-transition-group` if... Remove this comment to see the full error message
import { Transition } from 'react-transition-group'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/debounce` if it exists or ... Remove this comment to see the full error message
import debounce from 'debounce'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'

const CSS_HANDLES = ['container', 'content', 'showMoreButton']

const transitionStyle = (transitionTime: any) => ({
  transition: `${transitionTime}ms ease-in-out`,
})

const fadeBottomClasses = (state: any) =>
  classNames(styles.fadeBottom, { 'o-0': state === 'entered' }, 'w-100 h-50')

const pointerEventsAutoClasses = (state: any) =>
  classNames(
    styles.pointerEventsAuto,
    {
      'bg-transparent': state === 'entered',
      'bg-base': state !== 'entered',
    },
    'tc w-100'
  )

type OwnProps = {
  collapseHeight: number
  collapsed?: boolean
  children?: React.ReactNode
  onCollapsedChange?: (...args: any[]) => any
}

type Props = OwnProps & typeof GradientCollapse.defaultProps

function GradientCollapse(props: Props) {
  const {
    children,
    collapseHeight,
    onCollapsedChange,
    collapsed: collapsedProp,
  } = props

  const handles = useCssHandles(CSS_HANDLES)
  const [collapsed, setCollapsed] = useState(collapsedProp)
  const [prevCollapsedProp, setPrevCollapsedProp] = useState(collapsedProp)
  const [maxHeight, setMaxHeight] = useState('auto')
  const [collapseVisible, setCollapseVisible] = useState(true)
  const wrapper = useRef()

  if (prevCollapsedProp !== collapsedProp) {
    setCollapsed(collapsedProp)
    setPrevCollapsedProp(collapsedProp)
  }

  const calcMaxHeight = () => {
    const wrapperEl = wrapper.current

    // check if the content is smaller than the passed
    // height to collapse
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (wrapperEl.scrollHeight > collapseHeight) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      setMaxHeight(wrapperEl.scrollHeight + 60)
      setCollapseVisible(true)
    } else {
      setCollapseVisible(false)
      setMaxHeight('auto')
    }
  }

  const handleCollapsedChange = (e: any, newValue: any) => {
    setCollapsed(newValue)
    setPrevCollapsedProp(collapsedProp)

    if (onCollapsedChange) {
      onCollapsedChange(e, newValue)
    }
  }

  const debouncedCalcMaxHeight = debounce(calcMaxHeight, 500)

  useLayoutEffect(() => {
    window.addEventListener('resize', debouncedCalcMaxHeight)
    calcMaxHeight()

    return () => {
      window.removeEventListener('resize', debouncedCalcMaxHeight)
    }
  })

  const height = collapseVisible && collapsed ? collapseHeight : maxHeight
  const transitionTime = 600
  const fadeOutTime = 400

  const pointerEventsNoneClasses = classNames(
    styles.pointerEventsNone,
    { flex: collapseVisible, dn: !collapseVisible },
    'absolute bottom-0 w-100 h-100 flex-column justify-end'
  )

  return (
    <Transition timeout={transitionTime} in={!collapsed}>
      {(state: any) => (
        <div
          style={{
            ...transitionStyle(transitionTime),
            height,
            overflow: 'hidden',
            display: 'block',
          }}
          onTransitionEnd={calcMaxHeight}
          className={`${handles.container} relative`}
        >
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'HTMLDi... Remove this comment to see the full error message */}
          <div ref={wrapper} className={`${handles.content} h-auto`}>
            {children}
          </div>
          <div className={pointerEventsNoneClasses}>
            <div
              style={transitionStyle(fadeOutTime)}
              className={fadeBottomClasses(state)}
            />
            <div className={pointerEventsAutoClasses(state)}>
              <button
                onClick={e => handleCollapsedChange(e, !collapsed)}
                className={`${handles.showMoreButton} c-action-primary t-action pointer ma5 bn outline-0`}
              >
                {state === 'entered' || (collapsed && state !== 'exited') ? (
                  <FormattedMessage id="store/product-description.collapse.showLess" />
                ) : (
                  <FormattedMessage id="store/product-description.collapse.showMore" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

GradientCollapse.defaultProps = {
  collapsed: true,
}

export default GradientCollapse
