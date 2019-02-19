import React from 'react'
import { render } from 'enzyme'

import CollectionBadges from '../../CollectionBadges'

describe('<CollectionBadges />', () => {
  function renderComponent(customProps = {}) {
    const props = {
      collectionBadgesText: ['badge1', 'badge2'],
      ...customProps,
    }
    const component = <CollectionBadges {...props}>Test</CollectionBadges>

    return render(component)
  }

  it('should be able to mount and not break', () => {
    expect(renderComponent()).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
})
