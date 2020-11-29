# jest

## 简介

jest是一个通用的js框架，可以用于vue、angular、react。

* 0配置
* 快速安全
* 内置代码覆盖率的测试，``--couverage``就可以生成一个代码覆盖率的报告
* 非常容易的mocking实现
* 简约错误的报告
* create react app的默认的测试框架

## 简单测试

* 准备代码

```js
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
```

* 测试,结果如下

```bash 
 nick@nicks-MacBook-Pro  ~/Desktop/study/react/vikingship   master ●  npx jest src/jest.test.js 
 PASS  src/jest.test.js
  ✓ test common matcher (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.225 s
Ran all test suites matching /src\/jest.test.js/i.
```



https://jestjs.io/

## 补充说明

* 默认配置jest测试的文件

```bash 
__tests__文件夹下的.js文件
.test.js结尾的文件
.spec.js结尾的文件
```

