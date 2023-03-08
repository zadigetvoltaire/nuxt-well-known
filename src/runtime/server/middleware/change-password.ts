import {defineEventHandler, sendRedirect} from 'h3'
// @ts-ignore
import wellKnownOptions from '#well-known'

export default defineEventHandler(async (event) => {
  return sendRedirect(event, wellKnownOptions.changePassword.url, 302)
})
