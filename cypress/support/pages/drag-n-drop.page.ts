import drag from '../../fixtures/selectors/drag-n-drop.json';

class DragNDrop {
  private COLUMN_A = () => drag.columnA;
  private COLUMN_B = () => drag.columnB;

  getColumnAText = () => cy.get(this.COLUMN_A()).invoke('text');
  getColumnBText = () => cy.get(this.COLUMN_B()).invoke('text');

  dragNDrop = () => {
    cy.dragAndDrop(this.COLUMN_A(), this.COLUMN_B()).should('contain', 'A');
  };

  verifyDragNDrop = (first: string, second: string) => {
    cy.get(this.COLUMN_A()).should('contain', first);
    cy.get(this.COLUMN_B()).should('contain', second);
  };
}
export default new DragNDrop();
