context('Login Flow', () => {
  // NOTE: For most of these, location is implicitly asserted via login/logout commands
  describe('General UI and Routing', () => {
    it('should redirect unauthenticated users to a login prompt', () => {
      cy
        .logout()
        .visit('/calendar')
        .location('pathname').should('eq', '/')
      cy
        .get('.login-buttons')
        .contains('button', 'LOGIN')
        .as('LoginButton')
        .should('exist')
    })

    it('should redirect authenticated users to /calendar', () => {
      cy.login('Donating Agency')
    })
  })

  describe('AuthN / AuthZ via Cypress commands', () => {
    it('can login to many different accounts in command chains', () => {
      cy
        .login('Donating Agency')
        .login('Receiving Agency')
        .login('Deliverer Group')
    })

    it('redirects to the login prompt when signing out', () => {
      cy
        .login('Donating Agency')
        .logout()
    })
  })
  
})