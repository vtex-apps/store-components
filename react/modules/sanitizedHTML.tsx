import React, { useMemo, FC } from 'react'
import insane from 'insane'

type SanitizeOpts = {
  allowedAttributes?: Record<string, string[]>
  allowedClasses?: Record<string, string[]>
  allowedTags?: string[]
}
type SanitizedHTMLProps = SanitizeOpts & {
  content: string
}

function filter(token: {
  tag: string
  attrs: Record<string, number | undefined | string>
}) {
  if (token.tag === 'script') return false

  return true
}

function sanitizeHTML(
  html: string,
  { allowedAttributes, allowedClasses, allowedTags }: SanitizeOpts = {}
) {
  return insane(html, {
    filter,
    allowedTags,
    allowedClasses,
    allowedAttributes,
  })
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
