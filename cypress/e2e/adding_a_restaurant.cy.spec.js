describe('adding a restaurant', () => {
  it('displays the restaurant in the list', () => {
    const restaurantName = 'Foodco';

    cy.visit('http://localhost:5173');

    cy.get('[data-test="hydrated"]').should('exist');

    cy.get('[data-test="newRestaurantName"]').should('not.exist');

    cy.get('[data-test="addRestaurantButton"]').should('be.visible').click();

    cy.get('[data-test="newRestaurantName"]', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .type(restaurantName);

    cy.get('[data-test="saveNewRestaurantButton"]')
      .should('be.enabled')
      .click();

    cy.get('[data-test="newRestaurantName"]').should('not.exist');

    cy.contains(restaurantName).should('be.visible');
  });
});
