import React from 'react'
import { render } from 'enzyme'

import CollectionBadges from '../../CollectionBadges'

describe('<CollectionBadges />', () => {
  function renderComponent(customProps = {}) {
    const component = <CollectionBadges {...customProps}>Test</CollectionBadges>

    return render(component)
  }

  it('should be able to mount and not break', () => {
    expect(renderComponent()).toBeTruthy()
  })

  it('should match snapshot without badges', () => {
    expect(renderComponent()).toMatchSnapshot()
  })

  it('should match snapshot with badges', () => {
    expect(
      renderComponent({ collectionBadgesText: ['badge1', 'badge2'] })
    ).toMatchSnapshot()
  })
})
