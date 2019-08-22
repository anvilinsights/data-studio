import { exists } from './exist'

test('Tests true values', () => {
  expect(exists('--')).toBeFalsy()
  expect(exists('')).toBeFalsy()
  expect(exists('33')).toBeTruthy()
})
