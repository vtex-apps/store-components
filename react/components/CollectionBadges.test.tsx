import React from 'react'
import { render } from '@vtex/test-tools/react'

import CollectionBadges from './CollectionBadges'

describe('<CollectionBadges /> component', () => {
  it('should match snapshot without badges', () => {
    const { container } = render(<CollectionBadges>Test</CollectionBadges>)

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="collectionContainer relative dib w-100"
      >
        Test
        <div
          class="inline-flex justify-end absolute w-100 bottom-0 left-0"
        />
      </div>
    `)
  })

  it('should match snapshot with badges', () => {
    const { container } = render(
      <CollectionBadges collectionBadgesText={['badge1', 'badge2']}>
        Test
      </CollectionBadges>
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="collectionContainer relative dib w-100"
      >
        Test
        <div
          class="inline-flex justify-end absolute w-100 bottom-0 left-0"
        >
          <div
            class="item mh1 pa2 bg-blue white tc"
          >
            badge1
          </div>
          <div
            class="item mh1 pa2 bg-blue white tc"
          >
            badge2
          </div>
        </div>
      </div>
    `)
  })
})
