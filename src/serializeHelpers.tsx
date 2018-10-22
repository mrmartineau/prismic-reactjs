import * as React from 'react'
import { Link as LinkHelper } from 'prismic-helpers'
import { Elements, asText, serialize as PRserialize } from 'prismic-richtext'

export const propsWithUniqueKey = (props: any, key: number) => {
  return { ...(props || {}), key }
}

export const serializeStandardTag = (
  tag: any,
  element: any,
  children: React.ReactNode,
  key: number
) => {
  const props = element.label ? { className: element.label } : {}
  return React.createElement(tag, propsWithUniqueKey(props, key), children)
}

export const serializeHyperlink = (
  linkResolver: any,
  element: any,
  children: React.ReactNode,
  key: number,
  CustomLink?: React.ReactType
) => {
  const targetAttr = element.data.target ? { target: element.data.target } : {}
  const relAttr = element.data.target ? { rel: 'noopener' } : {}
  const props = {
    href: LinkHelper.url(element.data, linkResolver),
    ...targetAttr,
    ...relAttr,
  }

  if (CustomLink) {
    return (
      <CustomLink key={key} {...props}>
        {children}
      </CustomLink>
    )
  }
  return React.createElement('a', propsWithUniqueKey(props, key), children)
}

export const serializeLabel = (
  element: any,
  children: React.ReactNode,
  key: number,
  CustomLabel?: React.ReactType
) => {
  const props = element.data ? { className: element.data.label } : {}
  if (CustomLabel) {
    return (
      <CustomLabel key={key} {...props}>
        {children}
      </CustomLabel>
    )
  }
  return React.createElement('span', propsWithUniqueKey(props, key), children)
}

export const serializeSpan = (content: string) => {
  if (content) {
    return content.split('\n').reduce((acc, p) => {
      if (acc.length === 0) {
        return [p]
      } else {
        const brIndex = (acc.length + 1) / 2 - 1
        const br = React.createElement('br', propsWithUniqueKey({}, brIndex))
        return acc.concat([br, p])
      }
    }, [])
  } else {
    return null
  }
}

export const serializeImage = (
  linkResolver: any,
  element: any,
  key: number,
  CustomImage?: React.ReactType
) => {
  const linkUrl = element.linkTo
    ? LinkHelper.url(element.linkTo, linkResolver)
    : null
  const linkTarget =
    element.linkTo && element.linkTo.target
      ? { target: element.linkTo.target }
      : {}
  const relAttr = linkTarget.target ? { rel: 'noopener' } : {}
  let img
  if (CustomImage) {
    img = <CustomImage src={element.url} alt={element.alt || ''} />
  } else {
    img = React.createElement('img', {
      src: element.url,
      alt: element.alt || '',
    })
  }

  return React.createElement(
    'p',
    propsWithUniqueKey(
      { className: [element.label || '', 'block-img'].join(' ') },
      key
    ),
    linkUrl
      ? React.createElement(
          'a',
          { href: linkUrl, ...linkTarget, ...relAttr },
          img
        )
      : img
  )
}

export const serializeEmbed = (element: any, key: number) => {
  const props = {
    'data-oembed': element.oembed.embed_url,
    'data-oembed-type': element.oembed.type,
    'data-oembed-provider': element.oembed.provider_name,
    ...(element.label ? { className: element.label } : {}),
  }

  const embedHtml = React.createElement('div', {
    dangerouslySetInnerHTML: { __html: element.oembed.html },
  })

  return React.createElement('div', propsWithUniqueKey(props, key), embedHtml)
}
