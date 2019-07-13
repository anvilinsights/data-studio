import { notClicked, expected } from './stats'

test('Calculates notClicked from clicks and impressions', () => {
  expect(notClicked(3234, 231000)).toBe(227766)
})

test('Calculates expected clicks', () => {
  expect(parseFloat(expected(234234, 5900, 1059689))).toBeCloseTo(1304.1, 4)
})
