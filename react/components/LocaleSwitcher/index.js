import React, { useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { IconGlobe } from 'vtex.store-icons'

const supportedLangs = [
  {
    text: 'EN',
    id: 'en-US',
  },
  {
    text: 'PT',
    id: 'pt-BR',
  },
  {
    text: 'ES',
    id: 'es-AR',
  },
]

function splitLocale(locale) {
  return locale.split('-')[0]
}

function findLocale(locale) {
  const localeObj = supportedLangs.find(
    ({ id }) => splitLocale(id) === splitLocale(locale)
  )
  return localeObj || supportedLangs[0]
}

const LocaleSwitcher = () => {
  const { culture, emitter } = useRuntime()
  const [openLocaleSelector, setOpenLocaleSelector] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(
    findLocale(culture.locale)
  )

  const handleLocaleClick = id => {
    emitter.emit('localesChanged', id)
    setOpenLocaleSelector(false)
    setSelectedLocale(findLocale(id))
  }

  const handleMouseDown = e => {
    e.preventDefault()
  }

  return (
    <div className="w3 flex items-center justify-end ml2 mr3 relative">
      <button
        onClick={() => setOpenLocaleSelector(!openLocaleSelector)}
        onBlur={() => setOpenLocaleSelector(false)}
        className={`link pa0 bg-transparent bn flex items-center pointer mr3 ${LocaleSwitcher.defaultProps.color} hover-${LocaleSwitcher.defaultProps.hoverColor}`}
      >
        <IconGlobe />
        <span className="pl2 t-action--small order-1">{selectedLocale.text}</span>
      </button>
      <ul
        hidden={!openLocaleSelector}
        className="absolute z-5 list top-1 w3 ph0 mh0 mv4 bg-base"
      >
        {supportedLangs
        .filter(({ id }) => id !== selectedLocale.id)
        .map(({ id, text }) => (
          <li
            className="t-action--small pointer f5 pa3 hover-bg-muted-5 tc"
            onClick={() => handleLocaleClick(id)}
            onMouseDown={handleMouseDown}
            id={id}
            key={id}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

LocaleSwitcher.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
}

LocaleSwitcher.defaultProps = {
  color: 'near-black',
  hoverColor: 'rebel-pink',
}

export default LocaleSwitcher
