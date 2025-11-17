/// <reference types="cypress" />

describe('Smoke', () => {
  it('should render', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Welcome to React');
  });
});

export {};