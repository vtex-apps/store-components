import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import debounce from 'debounce'
import { FormattedMessage } from 'react-intl'
import './global.css'

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

    return (
      <Transition timeout={transitionTime} in={!collapsed}>
        {(state) => (
          <div
            style={{ ...transitionStyle(transitionTime), height, overflow: 'hidden' }}
            className="relative">
            <div ref={this.wrapper} className="h-auto">
              {children}
            </div>
            <div className={`${isCollapseVisible ? 'flex' : 'dn'} absolute bottom-0 pointer-events-none w-100 h-100 flex-column justify-end`}>
              <div style={transitionStyle(fadeOutTime)}
                className={`${state === 'entered' ? 'o-0' : ''} fade-bottom w-100 h-50`} />
              <div className={`${state === 'entered' ? 'bg-transparent' : 'bg-base'} tc w-100 pointer-events-auto`}>
                <div
                  className="c-action-primary t-action pointer ma5"
                  onClick={() => this.setState({ collapsed: !collapsed })}>
                  {state === 'entered' || collapsed && state !== 'exited'
                    ? <FormattedMessage id="product-description.collapse.showLess" />
                    : <FormattedMessage id="product-description.collapse.showMore" /> }
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

