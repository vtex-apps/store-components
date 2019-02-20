import React from 'react'
import { render } from 'enzyme'

import CollectionBadges from '../../CollectionBadges'

describe('<CollectionBadges /> component', () => {
  function renderComponent(customProps = {}) {
    const component = <CollectionBadges {...customProps}>Test</CollectionBadges>

    return render(component)
  }

  it('should be able to mount and not break', () => {
    const component = renderComponent()
    expect(component).toBeTruthy()
  })

  it('should match snapshot without badges', () => {
    const component = renderComponent()
    expect(component).toMatchSnapshot()
  })

  it('should match snapshot with badges', () => {
    const component = renderComponent({
      collectionBadgesText: ['badge1', 'badge2'],
    })
    expect(component).toMatchSnapshot()
  })
})
