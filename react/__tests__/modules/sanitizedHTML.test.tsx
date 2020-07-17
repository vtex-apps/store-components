import React from 'react'
import { render } from '@vtex/test-tools/react'

import { SanitizedHTML } from '../../modules/sanitizedHTML'

test('renders a simple string', () => {
  const { container } = render(<SanitizedHTML content="Potato" />)

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      style="display: contents;"
    >
      Potato
    </div>
  `)
})

test('filters out script tags', () => {
  const { container } = render(
    <SanitizedHTML content="<script>console.log('potato')</script><h1>Hey</h1>" />
  )

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      style="display: contents;"
    >
      <h1>
        Hey
      </h1>
    </div>
  `)
})

test('filters out attributes', () => {
  const { container } = render(
    <SanitizedHTML
      allowedAttributes={{ h1: ['potato'] }}
      content={`<h1 potato="🥔" fruit="🍎">Hey</h1>`}
    />
  )

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      style="display: contents;"
    >
      <h1
        potato="🥔"
      >
        Hey
      </h1>
    </div>
  `)
})

test('filters out classes', () => {
  const { container } = render(
    <SanitizedHTML
      allowedClasses={{ h1: ['🥔', '🍇'] }}
      content={`<h1 class="🥔 🍎 🍇">Hey</h1>`}
    />
  )

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      style="display: contents;"
    >
      <h1
        class="🥔 🍇"
      >
        Hey
      </h1>
    </div>
  `)
})

test('filters out tags', () => {
  const { container } = render(
    <SanitizedHTML
      allowedTags={['h1', 'h3']}
      content={`<h1>Hey</h1><h2>Ho</h2><h3>Let's go</h3>`}
    />
  )

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      style="display: contents;"
    >
      <h1>
        Hey
      </h1>
      <h3>
        Let's go
      </h3>
    </div>
  `)
})

test('renders iframes', () => {
  const { container } = render(
    <SanitizedHTML
      content={`<iframe src="https://player.vimeo.com/video/402279141" frameborder="0" 
      allow="autoplay; fullscreen" allowfullscreen="" style="position: relative; height: 200px; width: 100%;"></iframe>`}
    />
  )

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      style="display: contents;"
    >
      <iframe
        allow="autoplay; fullscreen"
        allowfullscreen=""
        frameborder="0"
        src="https://player.vimeo.com/video/402279141"
        style="position: relative; height: 200px; width: 100%;"
      />
    </div>
  `)
})
