import { nanoid } from 'nanoid';
import OutputError from '../util/output-error';

const MORSE_CODE: Record<string, string> = {
  '.-': 'A',    '-...': 'B',  '-.-.': 'C',  '-..': 'D',   '.': 'E',
  '..-.': 'F',  '--.': 'G',   '....': 'H',  '..': 'I',    '.---': 'J',
  '-.-': 'K',   '.-..': 'L',  '--': 'M',    '-.': 'N',    '---': 'O',
  '.--.': 'P',  '--.-': 'Q',  '.-.': 'R',   '...': 'S',   '-': 'T',
  '..-': 'U',   '...-': 'V',  '.--': 'W',   '-..-': 'X',  '-.--': 'Y',
  '--..': 'Z',
  '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
  '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
  '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'",
  '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')',
  '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=',
  '.-.-.': '+', '-....-': '-', '..--.-': '_', '.-..-.': '"',
  '...-..-': '$', '.--.-.': '@', '/': ' '
};

export default {
  category: 'Encoding',
  name: 'Morse Code',
  slug: 'morse',
  id: nanoid(),
  fn(input: string) {
    const tokens = input.split(' ');
    const result = tokens
      .map(token => {
        if (!token) return '';
        if (token === '/') {
          return ' ';
        }
        if (MORSE_CODE[token]) {
          return MORSE_CODE[token];
        }
        throw new OutputError(`Invalid Morse code sequence: '${token}'`);
      })
      .join('');

    return result;
  },
};
