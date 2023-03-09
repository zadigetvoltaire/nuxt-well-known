export type SecurityTxtOptions = {
  disabled?: boolean;
  contacts: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.3
  expires: string | Date; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.5
  encryption?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.4
  acknowledgments?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.1
  preferredLanguages?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.8
  canonical?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.2
  policy?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.7
  hiring?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.6
}

export type ChangePasswordOptions = {
  disabled?: boolean;
  url: string;
}
