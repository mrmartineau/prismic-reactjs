import * as React from 'react'
import { Elements, asText, serialize as PRserialize } from 'prismic-richtext'
import { serialize } from './serialize'

export const RichText = {
  asText: (structuredText: string) => {
    return asText(structuredText)
  },
  render: (
    richText: string,
    options?: any,
    linkResolver?: any,
    htmlSerializer?: any
  ) => {
    const children = PRserialize(
      richText,
      serialize.bind(null, options, linkResolver),
      htmlSerializer
    )
    return React.createElement(React.Fragment, {}, children)
  },
  Elements,
}
