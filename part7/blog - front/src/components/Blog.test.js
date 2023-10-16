import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'

test('renders content when hidden', async () => {
    const blog = {
        title: 'mi nuevo blog igoncio',
        author: 'igoncio',
        url: 'www.ignacioisgood.com',
        user: {
            id: '6512d7bf50333bc623483d15'
        }
    }
    const user = {
        id: '6512d7bf50333bc623483d15'
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.whenHidden')
    expect(div).toHaveTextContent(
        'mi nuevo blog igoncio'
    )
})

test('renders content when showing', async () => {
    const blog = {
        title: 'mi nuevo blog igoncio',
        author: 'igoncio',
        url: 'www.ignacioisgood.com',
        likes: 3,
        user: {
            id: '6512d7bf50333bc623483d15'
        }
    }
    const user = {
        id: '6512d7bf50333bc623483d15'
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.whenShowing')
    expect(div).toHaveTextContent(
        'www.ignacioisgood.com', 3
    )
})

test('clicking the button twice calls event handler twice', async () => {
    const blog = {
        title: 'mi nuevo blog igoncio',
        author: 'igoncio',
        url: 'www.ignacioisgood.com',
        likes: 3,
        user: {
            id: '6512d7bf50333bc623483d15'
        }
    }
    const user = {
        id: '6512d7bf50333bc623483d15'
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={user} addLikes={mockHandler} />
    )

    const userSetup = userEvent.setup()
    const button = screen.getByText('like')
    await userSetup.click(button)
    await userSetup.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

