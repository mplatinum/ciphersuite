import { nanoid } from 'nanoid';

export default {
  category: 'Simple Ciphers',
  name: 'Atbash Cipher',
  slug: 'atbash',
  id: nanoid(),
  fn(input: string) {
    return input
      .split('')
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Uppercase A-Z
          return String.fromCharCode(90 - (code - 65));
        } else if (code >= 97 && code <= 122) {
          // Lowercase a-z
          return String.fromCharCode(122 - (code - 97));
        }
        return c;
      })
      .join('');
  },
};
