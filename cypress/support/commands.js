// ***********************************************
// CYPRESS - Custom commands
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// NOTE: Please be mindful of what you log, try disabling logs when possible, otherwise you spam the inspector

Cypress.Commands.add('awaitXHR', () =>
  cy
    // Use any cy.get() cb so cypress timeouts are applied to should() expressions
    .window({ log: false })
    .should(() => expect(cy._apiCount || 0, 'In-Flight XHR').to.equal(0))
)


// Logs a user out via the signup button (client auth can't be manipulated via Cypress programmatically)
Cypress.Commands.add('logout', () => {
  cy
    .location('pathname', { log: false })
    .then((pathname) => {
      if (pathname && pathname !== '/') {
        cy
          .log('Logging Out', pathname)
          .get('.signout', { log: false })
          .click({ log: false })
          .location('pathname').should('eq', '/', 'Logout Redirct')
          .as('Logout')
      }
    })
})

Cypress.Commands.add('login', (type) => {
  cy
    //  Logout if possible - prevents session conflicts
    .logout()
    .fixture('users')
    .then((users) => {
      const user = users[type]
      //  Visit the login page, fill out the form
      cy.visit('/', { log: false })
      cy
        .get('.login-buttons')
        .contains('button', 'LOGIN')
        .click()
      cy
        .get('.login-input-wrapper')
        .get('input[type=email')
        .type(user.email)
        .parent()
        .get('input[type=password')
        .type(user.password)
      cy
        .get('.login-button-wrapper')
        .get('button[type=submit]')
        .click()
    })
    // Wait for FB to verify and get account info, prior to redirect
    .wait('@VerifyAcc', { log: false })
    .wait('@GetAcc', { log: false })
    // Wait for redirect
    .location('pathname').should('eq', '/calendar', 'Login Redirect')
    .as('Login')
})
