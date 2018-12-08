context('Donating Agencies', () => {
  beforeEach(() => {
    cy
      .visit('/')
      .login('Donating Agency')
  })

  describe('Account-specific Features', () => {
    it('Could use more tests here', () => {
      cy.location('pathname').should('eq', '/calendar')
    })
  })
})