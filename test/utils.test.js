const { hasOwnProperty, getEffectName } = require('../src/utils')

test("utils/hasOwnProperty", () => {
  expect(hasOwnProperty({ a: 1 }, 'a')).toBe(true)
  expect(hasOwnProperty({ a: 1 }, 'b')).toBe(false)
})

test("utils/getEffectName", () => {
  const params = {
    url: 'http://www.test.com/goodsList',
    baseURL: 'http://www.test.com',
    method: 'get'
  }
  const withQueryParams = {
    url: 'http://www.test.com/goodsList?a=1&b=2',
    baseURL: 'http://www.test.com',
    method: 'get'
  }

  expect(getEffectName(params)).toBe('get/goodsList')
  expect(getEffectName(withQueryParams)).toBe('get/goodsList')
})