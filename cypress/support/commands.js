// ***********************************************
// CYPRESS - Custom commands
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('awaitXHR', () =>
  cy
    // Use any cy.get() cb so cypress timeouts are applied to should() expressions
    .log('Resolving in-flight XHR')
    .window({ log: false })
    .should(() => expect(cy._apiCount || 0).to.equal(0))
)

Cypress.Commands.add('logout', () => {
  // TODO: DELETE user sessions (?)
  cy.log('Logout').as('Logout')
})

Cypress.Commands.add('login', (type) => {
  cy
    .logout()
    .fixture('users')
    .then((users) => {
      const user = users[type]
      // Visit the login page
      cy
        .visit('/')
        .location('pathname').should('eq', '/')
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
