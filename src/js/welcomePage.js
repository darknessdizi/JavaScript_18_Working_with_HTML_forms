import WidgetPopover from './widget/WidgetPopover';
import WindowEdit from './CRM-sistem/WindowEditor';
import EditController from './CRM-sistem/EditController';

const body = document.querySelector('body');
const mainDiv = createLinks();
body.append(mainDiv);

export function createLinks() {
  // Создаем ссылки на наши задачи
  const main = document.createElement('main');
  main.classList.add('content');
  const listTask = [runTask1, runTask2];

  for (let i = 0; i < 2; i += 1) {
    const link = document.createElement('a');
    link.classList.add('link__task');
    link.textContent = `Задача ${i + 1}`;
    main.append(link);
    link.addEventListener('click', listTask[i]);
  }
  return main;
}

function onReturnClick() {
  // Обработчик события нажатия кнопки Return
  const body = document.querySelector('body');
  body.className = '';
  body.innerHTML = '';
  const mainDiv = createLinks();
  body.append(mainDiv);
}

export function createButton(mainBlock) {
  // Создаем кнопку возврата на главную страницу
  const btn = document.createElement('button');
  btn.textContent = 'Return';
  btn.classList.add('btn-return');
  mainBlock.append(btn);
  btn.addEventListener('click', (event) => onReturnClick(event));
}

function runTask1() {
  // Запуск задачи 1
  const body = document.querySelector('body');
  body.innerHTML = '';
  body.classList.add('task-1');
  for (let i = 0; i < 3; i += 1) {
    const div = document.createElement('div');
    div.classList.add('conteiner');
    div.classList.add(`test${i + 1}`);
    body.append(div);

    const widget = new WidgetPopover(div);
    widget.bindToDOM();
  }

  createButton(body);
}

function runTask2() {
  // Запуск задачи 2
  body.innerHTML = '';
  const sistem = new WindowEdit();
  const controller = new EditController(sistem);
  controller.init();
  createButton(sistem.conteiner);
}
