import React from 'react'
import { render } from 'intl-helper'
import ProductImages from './../../ProductImages'

describe('<ProductImages />', () => {
  const renderComponent = () => {
    const props = {
      images: [
        {
          imageUrls: ['url'],
          thresholds: [1],
          thumbnailUrl: 'url',
          imageText: 'imageText',
        },
      ],
    }
    return render(<ProductImages {...props} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
