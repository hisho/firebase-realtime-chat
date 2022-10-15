import { isNull } from '@src/util/isNull/isNull'

describe('isNullのテスト', () => {
  it('nullを渡すとtrueが返る', () => {
    expect(isNull(null)).toBe(true)
  })
  it('null以外を渡すとfalseが返る', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull([])).toBe(false)
  })
})
