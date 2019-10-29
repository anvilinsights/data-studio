import { notClicked, expected, pValue } from './stats'

test('Calculates notClicked from clicks and impressions', () => {
  expect(notClicked(3234, 231000)).toBe(227766)
})

test('Calculates expected clicks', () => {
  expect(parseFloat(expected(234234, 5900, 1059689))).toBeCloseTo(1304.1, 4)
})

test('Chi-Squared', () => {
  const expected = [2, 2, 2, 2, 2, 2]
  const observed = [6, 3, 3, 0, 0, 0]
  const reduction = 1

  expect(pValue(observed, expected, reduction)).toBeCloseTo(0.010362, 4)
})
