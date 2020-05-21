const { hasOwnProperty, getEffectName } = require('../src/utils')

test("utils/hasOwnProperty", () => {
  expect(hasOwnProperty({ a: 1 }, 'a')).toBe(true)
  expect(hasOwnProperty({ a: 1 }, 'b')).toBe(false)
})

test("utils/getEffectName", () => {
  const testObj = {
    url: 'http://www.test.com/goodsList',
    baseURL: 'http://www.test.com',
    method: 'get'
  }
  expect(getEffectName(testObj)).toBe('get/goodsList')
})