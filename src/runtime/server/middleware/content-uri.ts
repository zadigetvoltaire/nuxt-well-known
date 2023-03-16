import { defineEventHandler, setHeader, sendError, H3Error } from 'h3'
import { ContentUriOptions } from '../../../types'
// @ts-ignore
import wellKnownOptions from '#well-known'

export default defineEventHandler((event) => {
  const url = event.node.req.url

  if (!url) {
    throw sendError(event, new H3Error('no url found in request'))
  }

  setHeader(event, 'Content-Type', 'text/plain')

  const path = url.split('/').pop()

  return render(wellKnownOptions.contentUris.find(({ path: optionPath }) => optionPath === path))
})

function render (options: ContentUriOptions) {
  return options.content
}
