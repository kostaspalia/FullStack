describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kostas Palialexis',
      username: 'kostas',
      password: 'palia'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })

  it('user can login with correct creds', function() {
    cy.get('#username').type('kostas')
    cy.get('#password').type('palia')
    cy.contains('login').click()
    cy.contains('logged in')
  })

  it('log in fails with wrong creds', function() {
    cy.get('#username').type('kosta')
    cy.get('#password').type('palia')
    cy.contains('login').click()
    cy.contains('wrong')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // cy.get('#username').type('kostas')
      // cy.get('#password').type('palia')
      // cy.contains('login').click()
      cy.login({ username: 'kostas', password: 'palia' })
      cy.createBlog({
        title: 'first title',
        author: 'first author',
        url: 'first url'
      })
    })

    it('A blog can be created', function() {
      cy.contains('create').click()
      cy.createBlog({
        title: 'test title',
        author: 'test author',
        url: 'test url'
      })
    })

    it('A user can like a blog', function() {
      cy.contains('view').click()
      cy.get('#likes').should('contain',0)
      cy.get('#like-button').click()
      cy.get('#likes').should('contain',1)
    })

    it('Deleting a blog', function() {
      cy.contains('view').click()
      cy.contains('first title')
      cy.contains('remove').click()
      cy.contains('first title').should('not.exist')
    })
  })
})