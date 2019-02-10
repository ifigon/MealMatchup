context('Deliverer Groups', () => {
  beforeEach(() => {
    cy.login('Deliverer Group');
  });

  describe('Account-specific Features', () => {
    it('Could use more tests here', () => {
      cy.location('pathname').should('eq', '/calendar');
    });
  });
});
