import { faker } from '@faker-js/faker';
import webInputs from '../../fixtures/selectors/web-inputs.json';

class WebInputs {
  private INPUT_FORM = () => cy.get(webInputs.inputForm);
  private INPUT_NUMBER = () => cy.get(webInputs.inputNumber);
  private INPUT_TEXT = () => cy.get(webInputs.inputText);
  private INPUT_PASSWORD = () => cy.get(webInputs.inputPassword);
  private INPUT_DATE = () => cy.get(webInputs.inputDate);
  private OUTPUT_FORM = () => cy.get(webInputs.outputForm);
  private OUTPUT_NUMBER = () => cy.get(webInputs.outputNumber);
  private OUTPUT_TEXT = () => cy.get(webInputs.outputText);
  private OUTPUT_PASSWORD = () => cy.get(webInputs.outputPassword);
  private OUTPUT_DATE = () => cy.get(webInputs.outputDate);

  private DISPLAY_BUTTON = () => cy.get(webInputs.displayInputs);
  private CLEAR_BUTTON = () => cy.get(webInputs.clearInputs);

  clickDisplayButton = () => this.DISPLAY_BUTTON().click();
  clickClearButton = () => this.CLEAR_BUTTON().click();

  inputForm = () => {
    const input = {
      number: faker.finance.accountNumber({ length: 10 }),
      text: faker.string.alpha(10),
      password: faker.internet.password(),
      date: (new Date()).toISOString().split('T')[0],
    };
    this.INPUT_NUMBER().type(input.number);
    this.INPUT_TEXT().type(input.text);
    this.INPUT_PASSWORD().type(input.password);
    this.INPUT_DATE().type(input.date);
    return cy.wrap(input);
  };

  verifyOutputFormExist = (exist: boolean) => {
    if (exist) { this.OUTPUT_FORM().should('exist'); } else { this.OUTPUT_FORM().should('not.exist'); }
  };

  verifyOutputForm = (input: any) => {
    this.OUTPUT_NUMBER().should('have.text', input.number);
    this.OUTPUT_TEXT().should('have.text', input.text);
    this.OUTPUT_PASSWORD().should('have.text', input.password);
    this.OUTPUT_DATE().should('have.text', input.date);
  };
}
export default new WebInputs();
