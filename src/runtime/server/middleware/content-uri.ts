import { defineEventHandler, setHeader, sendError, H3Error } from 'h3'
import { ContentUriOptions } from '../../../types'
// @ts-ignore
import wellKnownOptions from '#well-known'
import { isPlainObject } from '@vue/shared'

export default defineEventHandler((event) => {
  const url = event.node.req.url

  if (!url) {
    throw sendError(event, new H3Error('no url found in request'))
  }

  const path = url.split('/').pop()
  const contentUri = wellKnownOptions.contentUris.find(
    ({ path: optionPath }) => optionPath === path
  )

  setHeader(
    event,
    'Content-Type',
    isPlainObject(contentUri.content) ? 'application/json' : 'text/plain'
  )

  return render(contentUri)
})

function render(options: ContentUriOptions) {
  return options.content
}
