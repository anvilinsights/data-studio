import { notClicked } from './stats'

test('Calculates notClicked from clicks and impressions', () => {
  expect(notClicked(3234, 231000)).toBe(227766)
})
