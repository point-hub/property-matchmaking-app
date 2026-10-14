import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user visits the signup page', () => {
  cy.visit('/signup');
});

When('the user types {string} in the username field', (username: string) => {
  cy.get('[data-testid=username-input]').type(username);
});

When('the user types {string} in the email field', (email: string) => {
  cy.get('[data-testid=email-input]').type(email);
});

When('the user types {string} in the password field', (password: string) => {
  cy.get('[data-testid=password-input]').type(password);
});

When('the user types {string} in the confirm password field', (confirmPassword: string) => {
  cy.get('[data-testid=confirm-password-input]').type(confirmPassword);
});

When('the user clicks the accept terms & privacy checkbox', () => {
  cy.get('[data-testid=accept-terms-checkbox]').click();
});

When('the user clicks the signup button', () => {
  cy.get('[data-testid=signup-button]').click();
});
