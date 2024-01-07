export default class Tooltip {
  constructor() {
    this._tooltips = [];
  }

  showTooltip(message, element) {
    // Показывает сообщение об ошибке
    const tooltipElement = document.createElement('DIV');
    tooltipElement.classList.add('form-error');
    tooltipElement.textContent = message;
    const id = performance.now();
    this._tooltips.push({
      id,
      element: tooltipElement,
    });
    document.body.appendChild(tooltipElement);
    const { right, top } = element.getBoundingClientRect();
    tooltipElement.style.left = `${right + 15}px`;
    const height = top + element.offsetHeight / 2 - tooltipElement.offsetHeight / 2;
    tooltipElement.style.top = `${height}px`;
    return id;
  }

  removeTooltip(id) {
    // Удаляет сообщение об ошибке
    const tooltip = this._tooltips.find((t) => t.id === id);
    tooltip.element.remove();
    this._tooltips = this._tooltips.filter((t) => t.id !== id);
  }
}
