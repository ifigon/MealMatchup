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
);


// Logs a user out via the signup button (client auth can't be manipulated via Cypress programmatically)
Cypress.Commands.add('logout', () => {
  cy
    .location('pathname', { log: false })
    .then((pathname) => {
      if (pathname && pathname !== '/') {
        cy
          .log('Logging Out')
          .get('.signout', { log: false })
          .click({ log: false })
          .location('pathname', { log: false })
          .should('eq', '/', 'Logout Redirect')
          .as('Logout');
      }
    });
});

Cypress.Commands.add('login', (type) => {
  cy
    //  Logout if possible - prevents session conflicts
    .logout()
    .log(`Logging in as ${type}`)
    .fixture('users')
    .then((users) => {
      const user = users[type];
      //  Visit the login page, fill out the form
      cy.visit('/', { log: false });
      // I know it's ugly to disable logs 
      cy
        .get('.login-buttons', { log: false })
        .contains('button', 'LOGIN', { log: false })
        .click({ log: false });
      cy
        .get('.login-input-wrapper', { log: false })
        .get('input[type=email]', { log: false })
        .type(user.email, { log: false })
        .parent({ log: false })
        .get('input[type=password]', { log: false })
        .type(user.password, { log: false });
      cy
        .get('.login-button-wrapper', { log: false })
        .get('button[type=submit]', { log: false })
        .click({ log: false });
    })
    // Wait for FB to verify and get account info, prior to redirect
    .wait('@VerifyAcc', { log: false })
    .wait('@GetAcc', { log: false })
    // Wait for redirect
    .location('pathname', { log: false })
    .should('eq', '/calendar', 'Login Redirect')
    .as('Login');
});
