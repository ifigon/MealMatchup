context('Receiving Agencies', () => {
  beforeEach(() => {
    cy.login('Receiving Agency');
  });

  describe('Account-specific Features', () => {
    it('Could use more tests here', () => {
      cy.location('pathname').should('eq', '/calendar');
    });
  });
});