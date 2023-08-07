import * as fileUpload from '../../fixtures/selectors/file-upload.json';

class FileUpload {
  private FILE_INPUT = () => cy.get(fileUpload.fileInputField);
  private UPLOAD_BUTTON = () => cy.get(fileUpload.uploadButton);
  private FILE_UPLOADED = () => cy.get(fileUpload.uploaded.uploadedFile);

  uploadFile = (filePath: string) => {
    this.FILE_INPUT().attachFile(filePath);
    this.UPLOAD_BUTTON().click();
  };

  uploadFileByDragAndDrop = (filePath: string) => {
    this.FILE_INPUT().attachFile(filePath, { subjectType: 'drag-n-drop' });
    this.UPLOAD_BUTTON().click();
  };

  verifyFileUploaded = (filePath: string) => {
    cy.contains('File Uploaded!');
    this.FILE_UPLOADED().should('contain', filePath.split('/').pop());
  };
}
export default new FileUpload();
