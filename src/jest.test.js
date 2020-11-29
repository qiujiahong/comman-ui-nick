test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2+2).not.toBe(3)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(4).toBeLessThan(5)
})

test('test object', () => {
  //如果使用toBe需要2个对象完全相同，toEqual对象值相同就可以了
  expect({name:'nick'}).toEqual({name:'nick'})
})