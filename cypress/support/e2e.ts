/// <reference types="cypress" />

// Optional: Ignore uncaught exceptions from app (e.g. React errors)
Cypress.on('uncaught:exception', (err: Error) => {
  // Return false to prevent Cypress from failing the test
  if (err.message.includes('ResizeObserver')) return false;
  if (err.message.includes('Hydration')) return false;
  return true;
});
