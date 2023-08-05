import { homePage } from "../support/pages/home.page";

describe('Automate different elements', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl!);
      });

    it('verify file upload', () => {
        homePage.search('upload');
        homePage.selectCard('File Upload');
        cy.get('[data-testid="file-input"]').attachFile('upload/pdf-test.pdf');
    });
});
