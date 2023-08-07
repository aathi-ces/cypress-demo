import homePage from '../support/pages/home.page';
import fileUpload from '../support/pages/file-upload.page';
import webInputs from '../support/pages/web-inputs.page';
import actions from '../fixtures/actions-enums';

describe('Automate different elements', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl!);
    cy.fixture('constants.json').as('constants');
  });

  it('verify file upload by attaching file', () => {
    homePage.search('upload');
    homePage.selectCard(actions.FileUpload);
    fileUpload.uploadFile('upload/pdf-test.pdf');
    fileUpload.verifyFileUploaded('upload/pdf-test.pdf');
  });

  it('verify file upload by drag and drop', () => {
    homePage.search('upload');
    homePage.selectCard(actions.FileUpload);
    fileUpload.uploadFileByDragAndDrop('upload/pdf-test.pdf');
    fileUpload.verifyFileUploaded('upload/pdf-test.pdf');
  });

  it('verify web inputs', () => {
    homePage.selectCard(actions.WebInputs);
    webInputs.inputForm().then((input) => {
      webInputs.clickDisplayButton();
      webInputs.verifyOutputForm(input);
    });
  });

  it.only('verify web inputs cleared', () => {
    homePage.selectCard(actions.WebInputs);
    webInputs.inputForm().then((input) => {
      webInputs.clickDisplayButton();
      webInputs.verifyOutputForm(input);
    });
    webInputs.clickClearButton();
    webInputs.verifyOutputFormExist(false);
  });
});
