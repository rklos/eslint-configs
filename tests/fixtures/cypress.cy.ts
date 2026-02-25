describe('homepage', () => {
  it('should load', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
  });
});
