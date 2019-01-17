import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import debounce from 'debounce'
import { FormattedMessage } from 'react-intl'
import { classNames } from 'classnames'
import styles from '../styles.css'


const transitionStyle = (transitionTime) => ({ transition: `${transitionTime}ms ease-in-out` })

class GradientCollapse extends Component {
  constructor(props) {
    super(props)
    this.state = { isCollapseVisible: true, collapsed: true, maxHeight: 'auto' }

    this.wrapper = React.createRef()
  }

  calcMaxHeight = () => {
    const { collapseHeight } = this.props
    const wrapper = this.wrapper.current

    if (wrapper.scrollHeight > collapseHeight) {
      const maxHeight = wrapper.scrollHeight + 60
      this.setState({ isCollapseVisible: true, maxHeight })
    } else this.setState({ isCollapseVisible: false, maxHeight: 'auto' })
  }

  debouncedCalcMaxHeight = debounce(this.calcMaxHeight, 500)

  componentDidMount() {
    window.addEventListener('resize', this.debouncedCalcMaxHeight)
    this.calcMaxHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedCalcMaxHeight)
  }

  render() {
    const { children, collapseHeight } = this.props
    const { collapsed, isCollapseVisible, maxHeight } = this.state
    const height = isCollapseVisible && collapsed ? collapseHeight : maxHeight
    const transitionTime = 600
    const fadeOutTime = 400

    const pointerEventsNoneClasses = classNames(styles.pointerEventsNone, { 'flex': isCollapseVisible, 'dn': !isCollapseVisible }, 'absolute bottom-0 w-100 h-100 flex-column justify-end')
    const fadeBottomClasses = classNames(styles.fadeBottom, { 'o-0': state === 'entered' }, 'w-100 h-50')
    const pointerEventsAutoClasses = classNames(styles.pointerEventsAuto, { 'bg-transparent': state === 'entered', 'bg-base': state != 'entered' }, 'tc w-100')

    return (
      <Transition timeout={transitionTime} in={!collapsed}>
        {(state) => (
          <div
            style={{ ...transitionStyle(transitionTime), height, overflow: 'hidden' }}
            className="relative">
            <div ref={this.wrapper} className="h-auto">
              {children}
            </div>
            <div className={pointerEventsNoneClasses}>
              <div style={transitionStyle(fadeOutTime)}
                className={fadeBottomClasses} />
              <div className={pointerEventsAutoClasses}>
                <div
                  className="c-action-primary t-action pointer ma5"
                  onClick={() => this.setState({ collapsed: !collapsed })}>
                  {state === 'entered' || collapsed && state !== 'exited'
                    ? <FormattedMessage id="product-description.collapse.showLess" />
                    : <FormattedMessage id="product-description.collapse.showMore" />}
                </div>
              </div>
            </div>
          </div>)}
      </Transition>)
  }
}

GradientCollapse.propTypes = {
  /** Maximum height collapsed */
  collapseHeight: PropTypes.number.isRequired,
  children: PropTypes.node,
}

export default GradientCollapse

