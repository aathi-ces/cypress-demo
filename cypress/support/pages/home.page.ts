import home from '../../fixtures/selectors/home.json';

class Home {
  private SEARCH_FIELD = () => cy.get(home.searchField);
  private SEARCH_BUTTON = () => cy.get(home.searchButton);
  private CARD = (title: any) => cy.contains(title).first();

  search = (searchKey: string) => {
    this.SEARCH_FIELD().type(searchKey);
    this.SEARCH_BUTTON().click();
  };

  selectCard = (title: string) => {
    this.CARD(title).click();
  };
}
export default new Home();
