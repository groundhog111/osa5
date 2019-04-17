import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Komponenttitestaus',
    author: 'koira',
    likes: 2
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus'
  )
  expect(component.container).toHaveTextContent(
    'koira'
  )
  expect(component.container).toHaveTextContent(2)
})

test('clicking button calls eventHandler', () => {
  const blog = {
    title: 'Komponenttitestaus',
    author: 'koira',
    likes: 2
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick = {mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})


