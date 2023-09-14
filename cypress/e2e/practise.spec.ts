import homePage from '../support/pages/home.page';
import fileUpload from '../support/pages/file-upload.page';
import webInputs from '../support/pages/web-inputs.page';
import dragNDrop from '../support/pages/drag-n-drop.page';
import actions from '../fixtures/actions-enums';

describe('Automate different elements', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl!);
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
    webInputs.inputForm().then((input: any) => {
      webInputs.clickDisplayButton();
      webInputs.verifyOutputForm(input);
    });
  });

  it('verify web inputs cleared', () => {
    homePage.selectCard(actions.WebInputs);
    webInputs.inputForm().then((input: any) => {
      webInputs.clickDisplayButton();
      webInputs.verifyOutputForm(input);
    });
    webInputs.clickClearButton();
    webInputs.verifyOutputFormExist(false);
  });

  it('Verify drag and drop', () => {
    let columnA: string; let columnB: string;
    homePage.selectCard(actions.DragNDrop);
    dragNDrop.getColumnAText().then((text) => { columnA = text; });
    dragNDrop.getColumnBText()
      .then((text) => { columnB = text; })
      .then(() => {
        dragNDrop.dragNDrop();
        dragNDrop.verifyDragNDrop(columnB, columnA);
      });
  });
});

describe('Automate https://practicesoftwaretesting.com/', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('testUrl'));
  });
});
