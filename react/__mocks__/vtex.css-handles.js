import React, { createContext, useContext, useMemo } from 'react'

export const useCssHandles = cssHandles => {
  const handles = {}

  cssHandles.forEach(handle => {
    handles[handle] = handle
  })

  return { handles, withModifiers: withModifiersHelper(handles) }
}

const withModifiersHelper = handles => (handle, modifier) => {
  return applyModifiers(handles[handle], modifier)
}

export const createCssHandlesContext = cssHandles => {
  const Context = createContext({
    handles: cssHandles,
    withModifiers: withModifiersHelper(cssHandles),
  })

  const useContextCssHandles = () => {
    return useContext(Context)
  }

  const CssHandlesProvider = ({ withModifiers, handles, children }) => {
    const value = useMemo(
      () => ({
        handles,
        withModifiers,
      }),
      [withModifiers, handles]
    )

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  return { useContextCssHandles, CssHandlesProvider }
}

const validateModifier = modifier => {
  if (typeof modifier !== 'string') {
    console.error(
      `Invalid modifier type on \`cssHandles.applyModifier\`. All modifiers should be strings, found "${modifier}" `
    )

    return false
  }

  /* This is not an error, so doesn't log any message, but should
   * invalidate the current modifier and not include it */
  if (modifier === '') {
    return false
  }

  if (/[^A-z0-9-]/.test(modifier)) {
    console.error(
      `Invalid modifier on \`cssHandles.applyModifier\`. Modifiers should contain only letters, numbers or -`
    )

    return false
  }

  return true
}

export const applyModifiers = (handles, modifier) => {
  const normalizedModifiers =
    typeof modifier === 'string' ? [modifier] : modifier

  if (!Array.isArray(normalizedModifiers)) {
    console.error(
      'Invalid modifier type on `cssHandles.applyModifier`. Please use either a string or an array of strings'
    )

    return handles
  }

  const splitHandles = handles.split(' ')

  const modifiedHandles = normalizedModifiers
    .map(currentModifier => {
      const isValid = validateModifier(currentModifier)

      if (!isValid) {
        return ''
      }

      return splitHandles
        .map(handle => `${handle}--${currentModifier}`)
        .join(' ')
        .trim()
    })
    .filter(l => l.length > 0)
    .join(' ')
    .trim()

  return splitHandles.concat(modifiedHandles).join(' ').trim()
}

// eslint-disable-next-line default-param-last
export const withCssHandles = (handles = [], options) => Component => {
  const EnhancedComponent = props => {
    const { handles: cssHandles } = useCssHandles(handles, options)

    return <Component handles={cssHandles} {...props} />
  }

  const displayName = Component.displayName || Component.name || 'Component'

  EnhancedComponent.displayName = `withCssHandles(${displayName})`

  return EnhancedComponent
}
