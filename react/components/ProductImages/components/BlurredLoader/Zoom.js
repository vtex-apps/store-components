import { useState } from 'react'

const useZoom = (container, maxScale) => {
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 })
  const [isActive, setIsActive] = useState(false)

  const zoom = event => {
    const { left, top } = container.current.getBoundingClientRect()

    setStyle({
      ...style,
      scale: maxScale,
      x: -(event.clientX - left),
      y: -(event.clientY - top),
    })
    setIsActive(true)
  }

  const out = event => {
    console.log('zoomed out')
    setStyle({ x: 0, y: 0, scale: 1 })
    setIsActive(false)
  }

  const pan = event => {
    console.log('panned')
  }

  const { x, y, scale } = style

  return {
    zoom,
    out,
    pan,
    isActive,
    style: {
      transition: 'transform 300ms ease',
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      transformOrigin: '0 0',
    },
  }
}

export default useZoom
