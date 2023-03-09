import { defineEventHandler, setHeader } from 'h3'
import { SecurityTxtOptions } from '../../../types'
// @ts-ignore
import wellKnownOptions from '#well-known'

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain')

  return render(wellKnownOptions.securityTxt)
})

function render (options: SecurityTxtOptions) {
  const mapping: Record<string, string> = {
    contacts: 'Contact',
    expires: 'Expires',
    encryption: 'Encryption',
    acknowledgments: 'Acknowledgments',
    preferredLanguages: 'Preferred-Languages',
    canonical: 'Canonical',
    policy: 'Policy',
    hiring: 'Hiring'
  }

  const securityTxtOutput: string[] = []

  Object.keys(mapping).forEach((key: string) => {
    const optionKey = options[key]

    if (optionKey) {
      if (key === 'preferredLanguages') {
        securityTxtOutput.push(`${mapping[key]}: ${optionKey.join(', ')}`)
        return
      }

      if (key === 'expires') {
        // Check if Date object or
        securityTxtOutput.push(`${mapping[key]}: ${optionKey}`)
        return
      }

      optionKey.forEach((value: string) => {
        securityTxtOutput.push(`${mapping[key]}: ${value}`)
      })
    }
  })

  securityTxtOutput.push('') // Trailing new line

  return securityTxtOutput.join('\n')
}
