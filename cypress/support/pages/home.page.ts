/// <reference types="cypress" />

import home from "../../fixtures/selectors/home.json";


class Home {
  SEARCH_FIELD = () => cy.get(home.searchField);
  SEARCH_BUTTON = () => cy.get(home.searchButton);
  CARD = (title: any) => cy.contains(title).first();

  search = (searchKey: string) => {
    this.SEARCH_FIELD().type(searchKey);
    this.SEARCH_BUTTON().click();
  }

  selectCard = (title: string) => {
    this.CARD(title).click();
  }
}
export const homePage = new Home();
