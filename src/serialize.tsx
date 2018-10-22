import * as React from 'react'
import { Elements } from 'prismic-richtext'
import {
  serializeStandardTag,
  serializeHyperlink,
  serializeLabel,
  serializeSpan,
  serializeImage,
  serializeEmbed,
} from './serializeHelpers'

const chooseElement = (
  standardTag: string,
  element: any,
  children: any,
  index: number,
  CustomElement?: React.ComponentType
): any => {
  if (CustomElement) {
    return <CustomElement key={index}>{children}</CustomElement>
  }
  return serializeStandardTag(standardTag, element, children, index)
}

interface SerializeOptions {
  heading1?: React.ComponentType
  heading2?: React.ComponentType
  heading3?: React.ComponentType
  heading4?: React.ComponentType
  heading5?: React.ComponentType
  heading6?: React.ComponentType
  paragraph?: React.ComponentType
  preformatted?: React.ComponentType
  strong?: React.ComponentType
  em?: React.ComponentType
  listItem?: React.ComponentType
  oListItem?: React.ComponentType
  list?: React.ComponentType
  oList?: React.ComponentType
  image?: React.ComponentType
  embed?: React.ComponentType
  hyperlink?: React.ComponentType
  label?: React.ComponentType
  span?: React.ComponentType
}

export const serialize = (
  options: SerializeOptions,
  linkResolver: any,
  type: string,
  element: any,
  content: any,
  children: React.ReactNode,
  index: number
) => {
  const opts = Object.assign({}, options)
  switch (type) {
    case Elements.heading1:
      return chooseElement('h1', element, children, index, opts.heading1)
    case Elements.heading2:
      return chooseElement('h2', element, children, index, opts.heading2)
    case Elements.heading3:
      return chooseElement('h3', element, children, index, opts.heading3)
    case Elements.heading4:
      return chooseElement('h4', element, children, index, opts.heading4)
    case Elements.heading5:
      return chooseElement('h5', element, children, index, opts.heading5)
    case Elements.heading6:
      return chooseElement('h6', element, children, index, opts.heading6)
    case Elements.paragraph:
      return chooseElement('p', element, children, index, opts.paragraph)
    case Elements.preformatted:
      return chooseElement('pre', element, children, index, opts.preformatted)
    case Elements.strong:
      return chooseElement('strong', element, children, index, opts.strong)
    case Elements.em:
      return chooseElement('em', element, children, index, opts.em)
    case Elements.listItem:
      return chooseElement('li', element, children, index, opts.listItem)
    case Elements.oListItem:
      return chooseElement('li', element, children, index, opts.oListItem)
    case Elements.list:
      return chooseElement('ul', element, children, index, opts.list)
    case Elements.oList:
      return chooseElement('ol', element, children, index, opts.oList)
    case Elements.image:
      return serializeImage(linkResolver, element, index, opts.image)
    case Elements.embed:
      return serializeEmbed(element, index)
    case Elements.hyperlink:
      return serializeHyperlink(
        linkResolver,
        element,
        children,
        index,
        opts.hyperlink
      )
    case Elements.label:
      return serializeLabel(element, children, index, opts.label)
    case Elements.span:
      return serializeSpan(content)
    default:
      return null
  }
}
