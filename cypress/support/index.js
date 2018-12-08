import './commands'

// Initialize console and XHR monitoring
before(() => {
  let polyfill
  // Polyfills must be in umd format - cypress will coerce (and fail) to load this as a fixture or ES/CJS module
  cy
    .log('Polyfill Fetch >>> XHR Fallback')
    .readFile('node_modules/unfetch/dist/unfetch.umd.js')
    .then(file => polyfill = file)
  Cypress.on('window:before:load', (win) => {
    // Spy on console output - Disabled for now (so many background routing errs...)
    // cy.spy(win.console, 'log')
    // cy.spy(win.console, 'error')
    // Cy does not support fetch - make it fallback to XHR, which is supported by Cy
    delete win.fetch
    win.eval(polyfill)
    win.fetch = win.unfetch
  })
})

// Initialize generic tracking for in-flight XHR
beforeEach(function () { // May need to reference `this` in the future
  cy._apiCount = 0
  const onRequest = () => { cy._apiCount++ }
  // Allocate a delay in case any API calls chain off each other
  const onResponse = (xhr) => {
    const delayTime = 500
    cy._apiCount === 1
      ? setTimeout(() => { cy._apiCount-- }, delayTime)
      : cy._apiCount--
  }
  const onAbort = () => { cy._apiCount-- }
  cy.server({ onRequest, onResponse, onAbort })
  // You can now refer to this with `cy.wait('@API');` inside tests if you want
  cy.route('googleapis.com/**').as('Firebase')  //  
  cy.route({ method: 'POST', url: '/identitytoolkit/**/relyingparty/verifyPassword**' }).as('VerifyAcc')
  cy.route({ method: 'POST', url: '/identitytoolkit/**/relyingparty/getAccountInfo**' }).as('GetAcc')
  cy.route('/sockjs-node/**').as('WebSockets')
})

// Wait for tests to resolve XHR, so API calls don't "bleed" into other tests and user sessions
afterEach(function () {
  cy.awaitXHR()
})

// Before each - silently visit (load) the app. You still have to manually login and visit other routes, but the app will have initialized
beforeEach(function () {
  cy.visit('/', { log: false })
})
