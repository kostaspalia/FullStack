import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('New Blog testing', async () => {
  const addBlog = jest.fn()
  const setTitle = jest.fn()
  const setAuthor = jest.fn()
  const setUrl = jest.fn()
  const title = 'test title'
  const author = 'test author'
  const url = 'test url'
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} setTitle={setTitle}
    setAuthor={setAuthor}
    setUrl={setUrl}
    title={title}
    author={author}
    url={url} />)

  const input1 = screen.getByPlaceholderText('write here the blog title')
  const input2 = screen.getByPlaceholderText('write here the blog author')
  const input3 = screen.getByPlaceholderText('write here the blog url')

  const sendButton = screen.getByText('add')
  userEvent.type(input1,'test title')
  userEvent.type(input2,'test author')
  userEvent.type(input3,'test url')
  userEvent.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].content).toBe('test title')
})