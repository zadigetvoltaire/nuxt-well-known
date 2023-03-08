import {defineEventHandler, setHeader} from 'h3';
import {SecurityTxtOptions} from '../../../types';
// @ts-ignore
import wellKnownOptions from '#well-known'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/plain')
  return render(wellKnownOptions.securityTxt);
})

function render(options: SecurityTxtOptions) {
  const mapping: Record<string, string> = {
    contacts: 'Contact',
    expires: 'Expires',
    encryption: 'Encryption',
    acknowledgments: 'Acknowledgments',
    preferredLanguages: 'Preferred-Languages',
    canonical: 'Canonical',
    policy: 'Policy',
    hiring: 'Hiring',
  }

  const securityTxtOutput: string[] = [];

  Object.keys(mapping).forEach((key: string) => {
    if (key === 'enabled') {
      return;
    }

    // @ts-ignore
    if (options[key]) {
      if (key === 'preferredLanguages') {
        // @ts-ignore
        securityTxtOutput.push(`${mapping[key]}: ${options[key].join(', ')}`)
        return;
      }

      if (key === 'expires') {
        // Check if Date object or
        // @ts-ignore
        securityTxtOutput.push(`${mapping[key]}: ${options[key]}`)
        return;
      }

      // @ts-ignore
      options[key].forEach((value: string) => {
        // @ts-ignore
        securityTxtOutput.push(`${mapping[key]}: ${value}`)
      })
    }
  });

  securityTxtOutput.push(''); // Trailing new line

  return securityTxtOutput.join('\n')
}
