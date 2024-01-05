export default class WindowEdit {
  constructor() {
    this.conteiner = null;
    this.inputTitle = null;
    this.inputPrice = null;
    this.form = null;
    this.crossListeners = [];
    this.saveListeners = [];
    this.cancelListeners = [];
    this.iconEditListeners = [];
    this.iconDeleteListeners = [];
  }

  bindToDOM() {
    // Добавляет поле main к элементу body
    const body = document.querySelector('body');
    this.createMain();
    body.append(this.conteiner);
  }

  createMain() {
    // Создает элемент main содержащий весь контент
    const main = document.createElement('main');
    main.classList.add('content');
    this.conteiner = main;

    const conteiner = this.addHTMLBlockDiv(main, 'conteiner-crm');
    const conteinerTitle = this.addHTMLBlockDiv(conteiner, 'conteiner-crm-title');
    const title = this.addHTMLBlockDiv(conteinerTitle, 'crm_title');
    title.textContent = 'Товары';

    const cross = this.addHTMLBlockDiv(conteinerTitle, 'crm_title__add');
    cross.textContent = '+';
    cross.addEventListener('click', (o) => this.onClickCross(o));

    const table = document.createElement('table');
    table.classList.add('conteiner-table');
    conteiner.append(table);

    const tr = document.createElement('tr');
    table.append(tr);

    const listTtile = ['Название', 'Стоимость', 'Действия'];
    for (const name of listTtile) {
      const th = document.createElement('th');
      th.textContent = name;
      tr.append(th);
    }
  }

  addHTMLBlockDiv(parent, className = null) {
    // Создает блок DIV и добавляет к родителю
    const div = document.createElement('div');
    if (className) {
      div.classList.add(className);
    }
    parent.append(div);
    return div;
  }

  addHTMLBlockInput(parent, text, name) {
    // Добавляет к родителю теги h3 и input
    const title = document.createElement('h3');
    title.textContent = text;
    parent.append(title);

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('name', name);
    input.setAttribute('id', name);
    input.setAttribute('required', '');
    parent.append(input);
    return input;
  }

  drawPopup() {
    // Отрисовывает всплывающее окно при добавлении товара
    const conteiner = this.addHTMLBlockDiv(this.conteiner, 'background-popup');
    const popover = this.addHTMLBlockDiv(conteiner, 'conteiner-popup');

    this.form = document.createElement('form');
    this.form.classList.add('popup-form');
    this.form.setAttribute('novalidate', '');
    this.form.addEventListener('submit', (o) => this.onClickSave(o));

    popover.append(this.form);

    this.inputTitle = this.addHTMLBlockInput(this.form, 'Название', 'title');
    this.inputPrice = this.addHTMLBlockInput(this.form, 'Стоимость', 'price');
    this.inputPrice.setAttribute('pattern', '^[1-9]\\d*');

    const divButton = this.addHTMLBlockDiv(this.form, 'popup-buttons');

    const btnSave = document.createElement('button');
    btnSave.classList.add('button-save');
    btnSave.textContent = 'Сохранить';
    btnSave.type = 'submit';
    divButton.append(btnSave);

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('button-reject');
    btnCancel.textContent = 'Отмена';
    btnCancel.type = 'reset';
    btnCancel.addEventListener('click', (o) => this.onClickCancel(o));
    divButton.append(btnCancel);
  }

  deletePopup() {
    // Удаляет всплывающее окно
    const div = this.conteiner.querySelector('.background-popup');
    div.remove();
  }

  drawPopupDelete() {
    // Отрисовывает всплывающее окно при удалении товара
    const conteiner = this.addHTMLBlockDiv(this.conteiner, 'background-popup');
    const div = this.addHTMLBlockDiv(conteiner, 'popup-delete');

    const span = document.createElement('span');
    span.textContent = 'Товар удален';
    div.append(span);

    const cross = this.addHTMLBlockDiv(div, 'popup-delete__cross');
    cross.addEventListener('click', () => conteiner.remove());

    setTimeout(() => {
      conteiner.remove();
    }, 3000);
  }

  addActions() {
    // Создание блока с иконками действий для продукта
    const td = document.createElement('td');
    td.classList.add('product-actions');

    const iconEdit = this.addHTMLBlockDiv(td, 'actions-edit');
    iconEdit.addEventListener('click', (o) => this.onClickIconEdit(o));

    const iconDelete = this.addHTMLBlockDiv(td, 'actions-delete');

    iconDelete.addEventListener('click', (o) => this.onClickIconDelete(o));
    return td;
  }

  drawValuesTable(object) {
    // Отрисовывает содержимое объекта в таблицу
    const table = this.conteiner.querySelector('.conteiner-table');
    const array = Array.from(table.children);
    array.forEach((item, index) => {
      if (index === 0) return;
      item.remove();
    });
    for (const item of Object.entries(object)) {
      const tr = document.createElement('tr');
      table.append(tr);

      const tdTitle = document.createElement('td');
      tdTitle.textContent = item[0];
      tr.append(tdTitle);

      const tdPrice = document.createElement('td');
      tdPrice.textContent = item[1];
      tr.append(tdPrice);

      const tdActions = this.addActions();
      tr.append(tdActions);
    }
  }

  onClickCross(event) {
    // Вызывает callback при нажатии крестика для добавления товара
    this.crossListeners.forEach((o) => o.call(null));
  }

  addCrossListeners(callback) {
    this.crossListeners.push(callback);
  }

  onClickSave(event) {
    // Вызывает callback при нажатии кнокпи сохранить
    event.preventDefault();
    this.saveListeners.forEach((o) => o.call(null));
  }

  addSaveListeners(callback) {
    this.saveListeners.push(callback);
  }

  onClickCancel(event) {
    // Вызывает callback при нажатии кнопки отменить
    event.preventDefault();
    this.cancelListeners.forEach((o) => o.call(null));
  }

  addCancelListeners(callback) {
    this.cancelListeners.push(callback);
  }

  onClickIconEdit(event) {
    // Вызывает callback для редактирования строки таблицы где нажата иконка
    this.iconEditListeners.forEach((o) => o.call(null, event));
  }

  addIconEditListeners(callback) {
    this.iconEditListeners.push(callback);
  }

  onClickIconDelete(event) {
    // Вызывает callback при нажатии иконки delete
    this.iconDeleteListeners.forEach((o) => o.call(null, event));
  }

  addIconDeleteListeners(callback) {
    this.iconDeleteListeners.push(callback);
  }
}
