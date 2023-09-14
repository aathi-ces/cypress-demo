/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-file-upload';
import 'cypress-drag-drop';
import { ApiRequest } from '../support/apiRequests';
// import drag from './utils/drag-n-drop.util';
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>):
//            Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop: (dragSelector: string, dropSelector: string) => Chainable;
    }

    interface Chainable<Subject> {
      apiRequest(request: ApiRequest): Chainable<Response<any>>;
    }
  }
}

Cypress.Commands.add('dragAndDrop', (subject: any, targetEl: any) => {
  const dataTransfer = new DataTransfer();
  cy.get(subject).trigger('dragstart', { dataTransfer });
  cy.get(targetEl).trigger('drop', { dataTransfer });
});

Cypress.Commands.add('apiRequest', (request: ApiRequest) => {
  let token = '';

  if (request.authHeader != null) {
    token = 'Bearer ' + request.authHeader;
  }
  return cy.request({
    method: request.method,
    url: Cypress.env('BASE_URL') + request.url,
    headers: {
      'X-API-Key': Cypress.env('API_KEY'),
      Authorization: token,
    },
    body: request.body,
    form: request.form,
    qs: request.qs,
  });
});

