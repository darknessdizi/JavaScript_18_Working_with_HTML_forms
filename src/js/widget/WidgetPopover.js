export default class WidgetPopover {
  constructor(parent) {
    this.parent = parent;
    this.onClick = this.onClick.bind(this);
    this.elementPopover = null;
  }

  bindToDOM() {
    const button = document.createElement('button');
    button.textContent = 'Click to toggle popover';
    button.setAttribute('type', 'submit');
    button.classList.add('button-popover');
    button.addEventListener('click', this.onClick);

    this.parent.append(button);
  }

  createPopover() {
    this.elementPopover = document.createElement('div');
    this.elementPopover.classList.add('conteiner-popover');

    const div = document.createElement('div');
    div.classList.add('arrow');
    this.elementPopover.append(div);

    const title = document.createElement('h3');
    title.classList.add('popover-title');
    title.textContent = 'Popover title';
    this.elementPopover.append(title);

    const text = document.createElement('div');
    text.classList.add('popover-text');
    text.textContent = "And here's some amazing content. It's very engaging. Right?";
    this.elementPopover.append(text);
  }

  onClick(event) {
    const button = event.target;
    if (this.elementPopover) {
      this.elementPopover.remove();
      this.elementPopover = null;
      return;
    }

    this.createPopover();
    button.append(this.elementPopover);

    const arrow = this.elementPopover.querySelector('.arrow');
    const heigth = 0 - arrow.offsetHeight - this.elementPopover.offsetHeight;
    const width = (button.offsetWidth / 2) - (this.elementPopover.offsetWidth / 2);
    this.elementPopover.style.top = `${heigth}px`;
    this.elementPopover.style.left = `${width}px`;
    const widthArrow = this.elementPopover.offsetWidth / 2 - arrow.offsetWidth / 2;
    arrow.style.left = `${widthArrow}px`;
  }
}
