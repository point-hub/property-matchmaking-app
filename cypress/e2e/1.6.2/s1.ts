import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the sign-in page', () => {
  cy.visit('/signin');
});

When('I type {string} into Username field', (username: string) => {
  cy.get('[data-testid=input-username]').type(username);
});

When('I type {string} into Password field', (password: string) => {
  cy.get('[data-testid=input-password]').type(password);
});

When('I click on Sign In button', () => {
  cy.get('[data-testid=button-signin]').click();
});

Then('I should be redirected to Homepage', () => {
  cy.location('pathname').should('eq', '/home');
});

Then('I should be able to see error message {string}', (s: string) => {
  cy.get('div').contains(s);
});
