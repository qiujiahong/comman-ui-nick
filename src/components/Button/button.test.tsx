import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('our first react test case', () => {
  const wrapper = render(<Button>click</Button>)
  const element = wrapper.queryByText('click')
  expect(element).toBeTruthy()
})

