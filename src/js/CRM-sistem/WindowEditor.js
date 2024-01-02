export default class WindowEdit {
  constructor() {
    this.conteiner = null;
    this.conteinerCRM = null;
    this.inputTitle = null;
    this.inputPrice = null;
    this.crossListeners = [];
    this.saveListeners = [];
    this.cancelListeners = [];
    this.iconEditListeners = [];
    this.iconDeleteListeners = [];
    this.cellTable = null;
  }

  bindToDOM() {
    // Добавляет поле main к элементу body
    const body = document.querySelector("body");
    this._createMain();
    body.append(this.conteiner);
  }

  _createMain() {
    // Создает элемент main содержащий поле игры
    const main = document.createElement("main");
    main.classList.add("content");

    const conteiner = document.createElement("div");
    conteiner.classList.add("conteiner-crm");
    main.append(conteiner);

    const conteinerTitle = document.createElement('div');
    conteinerTitle.classList.add("conteiner-crm-title");
    conteiner.append(conteinerTitle);

    const title = document.createElement('div');
    title.textContent = 'Товары';
    conteinerTitle.append(title);

    const cross = document.createElement('div');
    cross.textContent = '+';
    cross.classList.add('crm_title__add');
    cross.addEventListener('click', (o) => this.onClickCross(o));
    conteinerTitle.append(cross);

    const table = document.createElement('table');
    table.classList.add('conteiner-table')
    const tr = document.createElement('tr');
    table.append(tr);

    const listTtile = ['Название', 'Стоимость', 'Действия'];
    for (const name of listTtile) {
      const th = document.createElement('th');
      th.textContent = name;
      tr.append(th);
    }
    conteiner.append(table);
    this.conteiner = main;
  }

  drawPopup() {
    const conteiner = document.createElement('div');
    conteiner.classList.add('conteiner-popup');

    const popover = document.createElement('div');
    popover.classList.add('conteiner-form');
    conteiner.append(popover);

    const form = document.createElement('form');
    form.classList.add('popup-form');
    popover.append(form);

    const title = document.createElement('h3');
    title.textContent = 'Название';
    form.append(title);

    this.inputTitle = document.createElement('input');
    this.inputTitle.type = 'text';
    form.append(this.inputTitle);

    const price = document.createElement('h3');
    price.textContent = 'Стоимость';
    form.append(price);
    
    this.inputPrice = document.createElement('input');
    this.inputPrice.type = 'text';
    form.append(this.inputPrice);

    const divButton = document.createElement('div');
    divButton.classList.add('popup-buttons');
    form.append(divButton);

    const btnSave = document.createElement('button');
    btnSave.classList.add('button-save');
    btnSave.textContent = 'Сохранить';
    btnSave.addEventListener('click', (o) => this.onClickSave(o));
    divButton.append(btnSave);

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('button-reject');
    btnCancel.textContent = 'Отмена';
    btnCancel.addEventListener('click', (o) => this.onClickCancel(o));
    divButton.append(btnCancel);

    this.conteiner.append(conteiner)
  }

  addActions() {
    // Создание блока с иконками действий
    const td = document.createElement('td');
    td.classList.add('product-actions');

    const iconEdit = document.createElement('div');
    iconEdit.classList.add('actions-edit');
    iconEdit.addEventListener('click', (o) => this.onClickIconEdit(o));
    td.append(iconEdit);

    const iconDelete = document.createElement('div');
    iconDelete.classList.add('actions-delete');
    iconDelete.addEventListener('click', (o) => this.onClickIconDelete(o));
    td.append(iconDelete)
    return td;
  }

  onClickCross(event) {
    event.preventDefault();
    this.crossListeners.forEach((o) => o.call(null));
  }

  addCrossListeners(callback) {
    this.crossListeners.push(callback);
  }

  onClickSave(event) {
    event.preventDefault();
    this.saveListeners.forEach((o) => o.call(null));
  }

  addSaveListeners(callback) {
    this.saveListeners.push(callback);
  }

  onClickCancel(event) {
    event.preventDefault();
    this.cancelListeners.forEach((o) => o.call(null));
  }

  addCancelListeners(callback) {
    this.cancelListeners.push(callback);
  }

  onClickIconEdit(event) {
    // Вызывает callback для редактирования строки таблицы где нажата иконка
    this.cellTable = event.target.closest('tr');
    this.iconEditListeners.forEach((o) => o.call(null));
  }

  addIconEditListeners(callback) {
    this.iconEditListeners.push(callback);
  }

  onClickIconDelete(event) {
    // Удаляет строку таблицы нажатой иконки
    const div = event.target.closest('tr');
    div.remove();
  }

  // _createButton(mainBlock) {
  //   // Создаем кнопку возврата на главную страницу
  //   const btn = document.createElement("button");
  //   btn.textContent = "Return";
  //   btn.classList.add("btn__return");
  //   mainBlock.append(btn);
  //   btn.addEventListener("click", (event) => this.onReturnClick(event));
  // }

  // onCellClick(event) {
  //   // Запуск сохраненных callback из списка для текущего индекса
  //   const index = this.cells.indexOf(event.currentTarget);
  //   this.cellClickListeners.forEach((o) => o.call(null, index));
  // }

  // onResetClick(event) {
  //   // Запуск callback для кнопки Reset
  //   event.preventDefault();
  //   this.resetListeners.forEach((o) => o.call(null));
  // }

  // onReturnClick(event) {
  //   // Запуск callback для кнопки Return
  //   event.preventDefault();
  //   this.returnListeners.forEach((o) => o.call(null));
  // }

  // addCellClickListener(callback) {
  //   // Сохранение переданных callback поля для дальнейшего их вызова
  //   this.cellClickListeners.push(callback);
  // }

  // addResetListener(callback) {
  //   // Сохранение переданных callback кнопки Reset для дальнейшего их вызова
  //   this.resetListeners.push(callback);
  // }

  // addReturnListener(callback) {
  //   // Сохранение переданных callback кнопки Return для дальнейшего их вызова
  //   this.returnListeners.push(callback);
  // }

  // addStrike(index) {
  //   // Добавляет блок с фоном показывающий попадание
  //   const strikeDiv = document.createElement("div");
  //   strikeDiv.classList.add("strike");
  //   this.cells[index].append(strikeDiv);
  // }

  // removeStrike(element) {
  //   // Удаляет блок показывающий попадание по цели
  //   element.children[0].remove();
  // }

  // createPopup() {
  //   // Создает popup для страницы
  //   this.popup = document.createElement("div");
  //   this.popup.classList.add("popup");
  //   const div = document.createElement("div");
  //   div.classList.add("popup_form");
  //   div.textContent = "Конец игры";
  //   const span = document.createElement("span");
  //   this.spanResult = span;
  //   div.append(span);
  //   const btn = document.createElement("button");
  //   btn.textContent = "Reset";
  //   btn.classList.add("btn_reset");
  //   div.append(btn);

  //   btn.addEventListener("click", (event) => this.onResetClick(event));

  //   this.popup.append(div);
  // }
}
