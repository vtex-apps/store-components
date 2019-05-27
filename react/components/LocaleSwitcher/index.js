import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { IconGlobe } from 'vtex.store-icons'
import Locales from './queries/locales.gql'

const supportedLanguages = [
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

function getSupportedLangs(languages) {
  let supported = []
  languages.forEach(language => {
    if (language.split("-").length > 1) {
      supported.push({
        text: splitLocale(language),
        id: language
      })
    }
  })
  return supported
}

const LocaleSwitcher = ({ data }) => {
  const supportedLangs = data.languages ? getSupportedLangs(data.languages.supported) : supportedLanguages
  const { culture, emitter } = useRuntime()
  const [openLocaleSelector, setOpenLocaleSelector] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(
    findLocale(culture.locale)
  )

  function findLocale(locale) {
    const localeObj = supportedLangs.find(
      ({ id }) => splitLocale(id) === splitLocale(locale)
    )
    return localeObj || supportedLangs[0]
  }

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
        className="link pa0 bg-transparent bn flex items-center pointer mr3 c-on-base hover-c-emphasis"
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
            key={id}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default graphql(Locales)(LocaleSwitcher)
