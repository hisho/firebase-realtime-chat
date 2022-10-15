import { isUndefined } from '@src/util/isUndefined/isUndefined'

describe('isUndefinedのテスト', () => {
  it('undefinedを渡すとtrueが返る', () => {
    expect(isUndefined(undefined)).toBe(true)
  })
  it('undefined以外を渡すとfalseが返る', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined([])).toBe(false)
  })
})
