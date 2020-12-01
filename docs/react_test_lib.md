# react test library


## 简介

*  create react app默认安装好了``testing-library/react``

```js
    "@testing-library/react": "^11.1.0"
```


* 测试代码 

```js
import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('our first react test case', () => {
  const wrapper = render(<Button>click</Button>)
  const element = wrapper.queryByText('click')
  expect(element).toBeTruthy()
})


```