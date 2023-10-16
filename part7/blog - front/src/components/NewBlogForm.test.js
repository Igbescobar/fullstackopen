import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn()
	const user = userEvent.setup()

	render(<NewBlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('write title')
	const authorInput = screen.getByPlaceholderText('write author')
	const urlInput = screen.getByPlaceholderText('write url')
	const sendButton = screen.getByText('create')

	await user.type(titleInput, 'title')
	await user.type(authorInput, 'author')
	await user.type(urlInput, 'http://localhost.com')
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('title')
	expect(createBlog.mock.calls[0][0].author).toBe('author')
	expect(createBlog.mock.calls[0][0].url).toBe('http://localhost.com')
})