describe('adding a restaurant', () => {
  it('displays the restaurant in the list', () => {
    // Test data – the restaurant name we expect to add and see later
    const restaurantName = 'Foodco';

    // Navigate to the application home page
    // This must match Cypress baseUrl or be a full URL
    cy.visit('http://localhost:5173');

    // Wait for React hydration to complete
    // Ensures event handlers are attached before interacting
    cy.get('[data-test="hydrated"]').should('exist');

    // Assert the form input is NOT present initially
    // The dialog should be closed on first load
    cy.get('[data-test="newRestaurantName"]').should('not.exist');

    // Open the "Add Restaurant" dialog
    // This should trigger a React state update
    cy.get('[data-test="addRestaurantButton"]').should('be.visible').click();

    // Ensure the input is now visible and ready for interaction
    // We also assert it's not disabled before typing
    cy.get('[data-test="newRestaurantName"]', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .type(restaurantName);

    //  Click the Save button to submit the form
    // Save should only be clickable when the form is valid
    cy.get('[data-test="saveNewRestaurantButton"]')
      .should('be.enabled')
      .click();

    //  Assert the dialog has closed after saving
    // The input should be removed from the DOM
    cy.get('[data-test="newRestaurantName"]').should('not.exist');

    //  Finally, assert the new restaurant appears in the list
    // This confirms the full user flow worked end-to-end
    cy.contains(restaurantName).should('be.visible');
  });
});
