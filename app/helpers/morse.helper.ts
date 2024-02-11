const DAH = '−' as const;
type Dah = typeof DAH;
const DIT = '·' as const;
type Dit = typeof DIT;
type MorseAtom = Dah | Dit;

type MorseCharacter = MorseAtom[];
// type MorseSequence = MorseCharacter[];

type MorseDictionary = {[char: string]: MorseCharacter};

/**
 * モールス信号の辞書
 *
 * @see https://ja.wikipedia.org/wiki/%E3%83%A2%E3%83%BC%E3%83%AB%E3%82%B9%E7%AC%A6%E5%8F%B7#%E6%AC%A7%E6%96%87%E3%83%A2%E3%83%BC%E3%83%AB%E3%82%B9%E7%AC%A6%E5%8F%B7
 */
const MORSE_DICTIONARY = {
  a: [DAH, DIT],
  b: [DAH, DIT, DIT, DIT],
  c: [DAH, DIT, DAH, DIT],
  d: [DAH, DIT, DIT],
  e: [DIT],
  f: [DIT, DIT, DAH, DIT],
  g: [DAH, DAH, DIT],
  h: [DIT, DIT, DIT, DIT],
  i: [DIT, DIT],
  j: [DIT, DAH, DAH, DAH],
  k: [DAH, DIT, DAH],
  l: [DIT, DAH, DIT, DIT],
  m: [DAH, DAH],
  n: [DAH, DIT],
  o: [DAH, DAH, DAH],
  p: [DIT, DAH, DAH, DIT],
  q: [DAH, DAH, DIT, DAH],
  r: [DIT, DAH, DIT],
  s: [DIT, DIT, DIT],
  t: [DAH],
  u: [DIT, DIT, DAH],
  v: [DIT, DIT, DIT, DAH],
  w: [DIT, DAH, DAH],
  x: [DAH, DIT, DIT, DAH],
  y: [DAH, DIT, DAH, DAH],
  z: [DAH, DAH, DIT, DIT],
  '1': [DIT, DAH, DAH, DAH, DAH],
  '2': [DIT, DIT, DAH, DAH, DAH],
  '3': [DIT, DIT, DIT, DAH, DAH],
  '4': [DIT, DIT, DIT, DIT, DAH],
  '5': [DIT, DIT, DIT, DIT, DIT],
  '6': [DAH, DIT, DIT, DIT, DIT],
  '7': [DAH, DAH, DIT, DIT, DIT],
  '8': [DAH, DAH, DAH, DIT, DIT],
  '9': [DAH, DAH, DAH, DAH, DIT],
  '0': [DAH, DAH, DAH, DAH, DAH],
  '.': [DIT, DAH, DIT, DAH, DIT, DAH],
  ',': [DIT, DIT, DAH, DAH, DIT, DIT],
  ':': [DAH, DAH, DAH, DIT, DIT, DIT],
  '?': [DIT, DIT, DAH, DAH, DIT, DIT],
  '!': [DAH, DIT, DAH, DIT, DAH, DAH],
  _: [DIT, DIT, DAH, DAH, DIT, DAH],
  '+': [DIT, DAH, DIT, DAH, DIT],
  '-': [DAH, DIT, DIT, DIT, DIT, DAH],
  '×': [DAH, DIT, DIT, DAH],
  '^': [DIT, DIT, DIT, DIT, DIT, DIT],
  '/': [DAH, DIT, DIT, DAH, DIT],
  '@': [DIT, DAH, DAH, DIT, DAH, DIT],
  '(': [DAH, DIT, DAH, DAH, DIT],
  ')': [DAH, DIT, DAH, DAH, DIT, DAH],
  ' ': [],
} as const satisfies MorseDictionary;

type MorseEncodable = keyof typeof MORSE_DICTIONARY;

const isMorseEncodable = (char: string): char is MorseEncodable =>
  char in MORSE_DICTIONARY;

/**
 * 文字と文字の間は3
 */
export const BETWEEN_WORD = 3 as const;

export const charToMorse = (char: string): MorseCharacter | null => {
  if (isMorseEncodable(char)) {
    return MORSE_DICTIONARY[char];
  } else {
    return null;
  }
};
