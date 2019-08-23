import { exists, percent } from './index'

test('Tests true values', () => {
  expect(exists('--')).toBeFalsy()
  expect(exists('')).toBeFalsy()
  expect(exists('33')).toBeTruthy()
})

test('Displays formatted percentages', () => {
  expect(percent(0 / 0)).toBe('--')
  expect(percent(4)).toBe('4%')
})
