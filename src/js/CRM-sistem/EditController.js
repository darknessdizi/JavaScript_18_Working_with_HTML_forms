export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.statusChange = false;
  }

  init() {
    this.edit.bindToDOM();
    this.edit.addCrossListeners(this.onClickCross.bind(this));
    this.edit.addSaveListeners(this.onClickSave.bind(this));
    this.edit.addCancelListeners(this.onClickCancel.bind(this));
    this.edit.addIconEditListeners(this.onIconEdit.bind(this));
  }

  onClickCross() {
    this.edit.drawPopup();
  }

  onClickSave() {
    // Обработка события нажатия на кнопку "Сохранить"
    const table = this.edit.conteiner.querySelector('table');
    if (this.statusChange) {
      this.edit.cellTable.children[0].textContent = this.edit.inputTitle.value;
      this.edit.cellTable.children[1].textContent = this.edit.inputPrice.value;
      this.statusChange = false;
      this.edit.cellTable = null;
    } else {
      const tr = document.createElement('tr');
      table.append(tr);

      const tdTitle = document.createElement('td');
      tdTitle.textContent = this.edit.inputTitle.value;
      tr.append(tdTitle);
  
      const tdPrice = document.createElement('td');
      tdPrice.textContent = this.edit.inputPrice.value;
      tr.append(tdPrice);
  
      const tdActions = this.edit.addActions();
      tr.append(tdActions);
    }
    this.onClickCancel();
  }

  onClickCancel() {
    const div = this.edit.conteiner.querySelector('.conteiner-popup');
    div.remove();
  }

  onIconEdit() {
    this.edit.drawPopup();
    this.edit.inputTitle.value = this.edit.cellTable.children[0].textContent;
    this.edit.inputPrice.value = this.edit.cellTable.children[1].textContent;
    this.statusChange = true;
  }
}
