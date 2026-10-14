import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user visits the signup page', () => {
  cy.visit('/signup');
});

When('the user types {string} in the username field', (s: string) => {
  cy.get('[data-testid=username-input]').type(s);
});

When('the user clicks the signup button', () => {
  cy.get('[data-testid=signup-button]').click();
});

Then('the username field should display the error message {string}', (s: string) => {
  cy.get('[data-testid=username-input]').parent().parent().contains(s);
});

Then('the password field should display the error message {string}', (s: string) => {
  cy.get('[data-testid=password-input]').parent().parent().contains(s);
});

Then('the email field should display the error message {string}', (s: string) => {
  cy.get('[data-testid=email-input]').parent().parent().contains(s);
});
