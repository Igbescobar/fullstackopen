describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user1 = {
            name: 'Josemanue',
            username: 'Pedro',
            password: '1234'
        }
        const user2 = {
            name: 'Ignacio',
            username: 'Yakul',
            password: "hellothere"
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
        cy.visit('')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })

    describe('login', function () {
        it('user can login', function () {
            cy.login({ username: 'Pedro', password: '1234' })
        })

        it('login fails with wrong password', function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'Pedro', password: '1234' })
        })

        it('a new blog can be created', function () {
            cy.createBlog({
                title: 'New blog form',
                author: 'Its me, Igoncio',
                url: 'www.hellothere.com'
            })

            cy.contains('New blog form')
        })
    })

    describe('users can like a blog', function () {
        beforeEach(function () {
            cy.login({ username: 'Pedro', password: '1234' })
            cy.createBlog({
                title: 'Does this work?',
                author: 'Its me, Mario',
                url: 'www.thisbetterwork.com',
                likes: 0
            })
        })
        it('it can add likes', function () {
            cy.contains('Does this work?')
            cy.get('#show-button').click()
            cy.get('#like-button').click()
            cy.contains('likes 1')
        })
    })

    describe('user who created the blog can delete it', function () {
        beforeEach(function () {
            cy.login({ username: 'Pedro', password: '1234' })
            cy.createBlog({
                title: 'Does this work?',
                author: 'Its me, Mario',
                url: 'www.thisbetterwork.com',
                likes: 0
            })
        })
        it('delete blog', function () {
            cy.contains('Does this work?')
            cy.get('#show-button').click()
            cy.get('#delete-button').click()

            cy.contains('Does this work?').should('not.exist')
        })
    })

    describe('only the user who created the blog can delete it', function () {
        it('only the owner can delete their blogs', function () {
            cy.login({ username: 'Pedro', password: '1234' })
            cy.createBlog({
                title: 'Does this work?',
                author: 'Its me, Mario',
                url: 'www.thisbetterwork.com',
                likes: 0
            })
            cy.contains('Does this work?')

            cy.contains('logout').click()
            cy.login({ username: 'Yakul', password: 'hellothere' })
            cy.contains('View').click()
            cy.get('#delete-button').should('not.exist')

        })
    })

    describe('blogs are ordered by number of likes', function () {
        beforeEach(function () {
            cy.login({ username: 'Pedro', password: '1234' })
            cy.createBlog({
                title: 'The title with the most likes',
                author: 'Its me, Mario',
                url: 'www.thisbetterwork.com',
                likes: 0
            })
            cy.createBlog({
                title: 'The title with the second most likes',
                author: 'Its me, Mario',
                url: 'www.thisbetterwork.com',
                likes: 0
            })
        })

        it('checks the order of the blogs', function () {
            cy.contains('The title with the most likes')
            cy.get('#show-button').click()
            cy.get('#like-button').click()
            cy.contains('likes 1')
            cy.get('.blog').eq(0).should('exist').and('contain', 'The title with the most likes')
            cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        })
    })
})