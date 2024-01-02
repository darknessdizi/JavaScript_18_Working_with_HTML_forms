export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.statusChange = false;
    this.data = {};
  }

  init() {
    this.edit.bindToDOM();
    this.edit.addCrossListeners(this.onClickCross.bind(this));
    this.edit.addSaveListeners(this.onClickSave.bind(this));
    this.edit.addCancelListeners(this.onClickCancel.bind(this));
    this.edit.addIconEditListeners(this.onIconEdit.bind(this));
    this.edit.addIconDeleteListeners(this.onIconDelete.bind(this));
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
      this.data[this.edit.inputTitle.value] = this.edit.inputPrice.value;
      this.edit.drawValuesTable(this.data);
    }
    console.log(this.data);
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

  onIconDelete(event) {
    // Callback - Удаление строки таблицы при нажатии иконки удаления
    const div = event.target.closest('tr');
    const key = div.children[0].textContent;
    delete this.data[key];
    this.edit.drawValuesTable(this.data);
  }
}
