import { nanoid } from 'nanoid';
import OutputError from '../util/output-error';
import SubstitutionOptions from '../components/options/SubstitutionOptions';
import { SubstitutionOptionsType } from '../util/store';

export default {
  category: 'Substitution Ciphers',
  name: 'Substitution',
  slug: 'substitution',
  id: nanoid(),
  render: (index: number) => <SubstitutionOptions index={index} />,
  options: {
    from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    to: 'XYZABCDEFGHIJKLMNOPQRSTUVW',
    ignoreCase: true,
  } as SubstitutionOptionsType,
  fn(input: string) {
    const { from, to, ignoreCase } = this.options as SubstitutionOptionsType;

    if (from.length !== to.length) {
      throw new OutputError(
        'From and to values should be same length in substitution cipher'
      );
    }

    // Build lookup maps for O(1) character lookups
    const directMap = new Map<string, string>();
    const lowerMap = new Map<string, string>();
    const upperMap = new Map<string, string>();

    for (let i = 0; i < from.length; i++) {
      directMap.set(from[i], to[i]);
      if (ignoreCase) {
        lowerMap.set(from[i].toLowerCase(), to[i]);
        upperMap.set(from[i].toUpperCase(), to[i]);
      }
    }

    return Array.from(input, (c) => {
      // Direct match
      const direct = directMap.get(c);
      if (direct !== undefined) {
        return direct;
      }

      if (ignoreCase) {
        const isUpper = c === c.toUpperCase();
        if (isUpper) {
          const val = lowerMap.get(c.toLowerCase());
          if (val !== undefined) {
            return val.toUpperCase();
          }
        } else {
          const val = upperMap.get(c.toUpperCase());
          if (val !== undefined) {
            return val.toLowerCase();
          }
        }
      }

      return c;
    }).join('');
  },
};
