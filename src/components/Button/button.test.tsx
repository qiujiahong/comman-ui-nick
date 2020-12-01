import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('our first react test case', () => {
  const wrapper = render(<Button>click</Button>)
  const element = wrapper.queryByText('click')
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
})


describe('test Button componetn', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>click</Button>)
    const element = wrapper.getByText('click')
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })

  it('should render the correct component based on different props', () => {

  })

  it('should render a link when btnType equels link and href is provided', () => {

  })

  it('should render disabled button when disabled set to true', () => {

  })

})