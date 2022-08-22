import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component testing', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        addLike={mockHandlerAdd}
        removeBlog={mockHandlerRemove}
      />,
    )
  })

  const blog = {
    author: 'test author',
    title: 'test title',
    url: 'www.test',
    likes: 5
  }

  const mockHandlerAdd = jest.fn()
  const mockHandlerRemove = jest.fn()

  test('renders blog and authour only content', () => {
    const renBlog = component.container.querySelector('.blog')
    expect(component.container).toHaveTextContent(blog.title)
    expect(renBlog).not.toHaveStyle('display: none')
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('renders url and likes when button is clicked', async () => {
    const user = userEvent.setup()
    screen.debug()
    const button = screen.getByText('view')
    await user.click(button)

    //const renBlog = component.container.querySelector('.blog')
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('the event handler is clicked twice', async () => {
    const user = userEvent.setup()
    const button1 = screen.getByText('view')
    await user.click(button1)
    const button2 = screen.getByText('like')
    await user.click(button2)
    await user.click(button2)
    //screen.debug()

    expect(mockHandlerAdd.mock.calls).toHaveLength(2)
  })
})

