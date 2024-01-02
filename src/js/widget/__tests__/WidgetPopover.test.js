import WidgetPopover from '../WidgetPopover';

const body = document.querySelector('body');

test('Проверка работы виджета Popover', () => {
  const widget = new WidgetPopover(body);
  widget.bindToDOM();

  const button = body.querySelector('.button-popover');

  expect(button).toBeInstanceOf(HTMLElement);
  expect(button.children.length).toEqual(0);

  button.click();
  expect(button.children.length).toEqual(1);
  expect(button.children[0].classList).toContain('conteiner-popover');

  button.click();
  expect(button.children.length).toEqual(0);
  const popover = body.querySelector('.conteiner-popover');
  expect(popover).toEqual(null);
});
