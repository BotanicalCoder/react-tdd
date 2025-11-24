describe('adding a restaurant', () => {
    it('displays the restaurant in the list', ()=>{

       const restaurantName= 'Foodco';

       cy.visit('http://localhost:5173');

       cy.get('[data-test="addRestaurantButton"]').click();

       cy.get('[data-test="newRestaurantName"]').type(restaurantName);

       cy.get('[data-test="saveNewRestaurantButton"]').click();

       cy.contains(restaurantName)

    })
});
