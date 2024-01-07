import Tooltip from './ToolTip';

const errors = {
  title: {
    valueMissing: 'Укажите название товара!',
  },
  price: {
    valueMissing: 'Определите стоимость товара!',
    patternMismatch: 'Допустимы только числа больше нуля!',
  },
};

export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.data = {};
    this.casheKey = null;
    this.toolTip = new Tooltip();
    this.actualMessages = [];
  }

  init() {
    this.data = { // для наглядности
      'iPhone XP': 60000,
      'Samsung Galaxy S10+': 80000,
      'Huawei View': 50000,
    };
    this.edit.bindToDOM();
    this.edit.drawValuesTable(this.data);

    this.edit.addCrossListeners(this.onClickCross.bind(this));
    this.edit.addSaveListeners(this.onClickSave.bind(this));
    this.edit.addCancelListeners(this.onClickCancel.bind(this));
    this.edit.addIconEditListeners(this.onIconEdit.bind(this));
    this.edit.addIconDeleteListeners(this.onIconDelete.bind(this));
  }

  showTooltip(message, el) {
    // Сохраняет имя элемента с ошибкой и его номер
    this.actualMessages.push({
      name: el.name,
      id: this.toolTip.showTooltip(message, el),
    });
  }

  static getError(el) {
    // Возвращает текст сообщения об ошибке
    const errorKey = Object.keys(ValidityState.prototype).find((key) => {
      if (!el.name) return false;
      if (key === 'valid') return false;
      return el.validity[key];
    });
    if (!errorKey) return false;
    return errors[el.name][errorKey];
  }

  elementOnBlur(event) {
    // Callback - Обработка события потери фокуса элементом
    const el = event.target;
    const error = EditController.getError(el);
    const currentErrorMessage = this.actualMessages.find((item) => item.name === el.name);
    if (currentErrorMessage) {
      this.toolTip.removeTooltip(currentErrorMessage.id);
      const index = this.actualMessages.indexOf(currentErrorMessage);
      this.actualMessages.splice(index, 1);
    }
    if (error) {
      this.showTooltip(error, el);
    }
  }

  onClickSave() {
    // Callback - Обработка события нажатия на кнопку "Сохранить"
    this.actualMessages.forEach((message) => this.toolTip.removeTooltip(message.id));
    this.actualMessages = [];
    const { elements } = this.edit.form;
    [...elements].some((elem) => {
      const error = EditController.getError(elem);
      if (error) {
        this.showTooltip(error, elem);
        elem.focus();
        return true;
      }
      return false;
    });
    if (!this.edit.form.checkValidity()) {
      return;
    }

    if (this.casheKey !== null) {
      delete this.data[this.casheKey];
      this.data[this.edit.inputTitle.value] = this.edit.inputPrice.value;
      this.casheKey = null;
    } else {
      const price = Number(this.edit.inputPrice.value);
      this.data[this.edit.inputTitle.value] = price;
    }
    this.edit.drawValuesTable(this.data);
    this.onClickCancel();
  }

  onClickCancel() {
    // Callback - Обработка события нажатия кнопки отменить
    this.actualMessages.forEach((item) => {
      this.toolTip.removeTooltip(item.id);
    });
    this.actualMessages = [];
    this.edit.deletePopup();
  }

  onClickCross() {
    // Callback - Обработка события нажатия на крестик для добавления товара
    this.edit.drawPopup();
    [...this.edit.form.elements].forEach((el) => el.addEventListener('focus', () => {
      // Назначаем (всем элементам при получении фокуса) обработчик потери фокуса
      // "Одноразовый"
      el.addEventListener('blur', this.elementOnBlur.bind(this), { once: true });
    }));
    this.edit.inputTitle.focus();
  }

  onIconEdit(event) {
    // Callback - Отрисовывает popup с заполненными полями для редактирования
    this.edit.drawPopup();
    const parent = event.target.closest('tr');
    this.casheKey = parent.children[0].textContent;
    const price = parent.children[1].textContent;
    this.edit.inputTitle.value = this.casheKey;
    this.edit.inputPrice.value = price;
  }

  onIconDelete(event) {
    // Callback - Удаление строки таблицы при нажатии иконки удаления
    const parent = event.target.closest('tr');
    const key = parent.children[0].textContent;
    delete this.data[key];
    this.edit.drawValuesTable(this.data);
    this.edit.drawPopupDelete();
  }
}
