import React, { useMemo, FC } from 'react'
import insane from '@vtex/insane'

type SanitizeOpts = {
  allowedAttributes?: Record<string, string[]>
  allowedClasses?: Record<string, string[]>
  allowedTags?: string[]
}

type SanitizedHTMLProps = SanitizeOpts & {
  content: string
}

export const DEFAULTS = {
  allowedAttributes: {
    '*': [
      'id',
      'title',
      'accesskey',
      'class',
      'style',
      'aria-label',
      'width',
      'height',
      'hidden',
    ],
    a: ['href', 'name', 'target'],
    iframe: ['allow', 'allowfullscreen', 'frameborder', 'src'],
    img: ['src', 'alt'],
    link: ['rel', 'type', 'href'],
    td: ['colspan', 'rowspan', 'headers'],
  },
  allowedClasses: {},
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedTags: [
    'a',
    'abbr',
    'article',
    'b',
    'blockquote',
    'br',
    'caption',
    'code',
    'del',
    'details',
    'div',
    'em',
    'figure',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'header',
    'footer',
    'i',
    'img',
    'ins',
    'iframe',
    'kbd',
    'li',
    'main',
    'mark',
    'ol',
    'p',
    'picture',
    'pre',
    'section',
    'source',
    'span',
    'strike',
    'strong',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'u',
    'ul',
  ],
}

function sanitizeHTML(
  html: string,
  { allowedAttributes, allowedClasses, allowedTags }: SanitizeOpts = {}
) {
  const opts: Record<string, any> = { ...DEFAULTS }

  if (allowedTags) opts.allowedTags = allowedTags
  if (allowedClasses) opts.allowedClasses = allowedClasses
  if (allowedAttributes) opts.allowedAttributes = allowedAttributes

  return insane(html, opts)
}

function getDangerousSanitizedHTML(html: string, opts: SanitizeOpts = {}) {
  return { __html: sanitizeHTML(html, opts) }
}

function useSanitizedHTML(
  html: string,
  { allowedAttributes, allowedClasses, allowedTags }: SanitizeOpts = {}
) {
  const sanitizedHTML = useMemo(() => {
    return getDangerousSanitizedHTML(html, {
      allowedAttributes,
      allowedClasses,
      allowedTags,
    })
  }, [allowedAttributes, allowedClasses, allowedTags, html])

  return sanitizedHTML
}

export const SanitizedHTML: FC<SanitizedHTMLProps> = ({
  content,
  allowedAttributes,
  allowedClasses,
  allowedTags,
}) => {
  const sanitizedContent = useSanitizedHTML(content, {
    allowedAttributes,
    allowedClasses,
    allowedTags,
  })

  if (!content) {
    return null
  }

  return (
    <div
      // Display 'contents' is used so this div doesn't affect the layout
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={sanitizedContent}
    />
  )
}
