import { isNullish } from '@src/util/isNullish/isNullish'

describe('isNullishのテスト', () => {
  it('undefinedかnullを渡すとtrueが返る', () => {
    expect(isNullish(undefined)).toBe(true)
    expect(isNullish(null)).toBe(true)
  })
  it('undefinedかnull以外を渡すとfalseが返る', () => {
    expect(isNullish(0)).toBe(false)
    expect(isNullish('')).toBe(false)
    expect(isNullish({})).toBe(false)
    expect(isNullish([])).toBe(false)
  })
})
