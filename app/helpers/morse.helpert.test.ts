import {DAH, DIT, charToMorse, stringToMorse} from './morse.helper';
import {test, expect} from '@jest/globals';

test('s', () => {
  expect(charToMorse('s')).toStrictEqual([DIT, DIT, DIT]);
});

test('sos', () => {
  expect(stringToMorse('sos')).toStrictEqual([
    [DIT, DIT, DIT],
    [DAH, DAH, DAH],
    [DIT, DIT, DIT],
  ]);
});
