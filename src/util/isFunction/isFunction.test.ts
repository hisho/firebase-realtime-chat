import { isFunction } from '@src/util/isFunction/isFunction'

describe('isFunctionのテスト', () => {
  it('functionを渡すとtrueが返る', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => true)).toBe(true)
  })
  it('function以外を渡すとfalseが返る', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(0)).toBe(false)
    expect(isFunction('')).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
  })
})
