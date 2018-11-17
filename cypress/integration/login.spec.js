context('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('When the app initializes', () => {
    it('should render the login prompt', () => {
      cy
        .get('.login-buttons')
        .contains('button', 'LOGIN')
        .as('LoginButton')
        .should('exist')
        .click() // Opens the login prompt
      // TODO: Load a user from fixtures.
      // Then make this a command, not a test
      cy
        .get('.login-wrapper .login-input-wrapper')
        .get('input[type=email')
        .type('foo@bar.com')
        .parent()
        .get('input[type=password')
        .type('vietnam.123')
      cy
        .get('.login-button-wrapper')
        .get('button[type=submit]')
        .click()
      // XHR in the background will fail, but the test passes for now
    })
  })
})