// Импорт библиотеки для работы с браузером
import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

// Группируем тесты, так как тестам понадобится подготовка для запуска
// браузера, его закрытие, переход на страницы и т.д.
describe('Page start', () => {
  let browser = null; // переменная для браузера
  let page = null; // переменная для страницы
  let server = null;

  beforeEach(async () => { // Перед каждым тестом запустить браузер
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false, // чтобы запустить реальный браузер (true браузер не будет запущен)
      slowMo: 100, // Задержка между действиями браузера 100 мс
      // devtools: true, // чтобы видеть инструменты разработчика
      args: [
        '--start-maximized', // you can also use '--start-fullscreen'
      ],
    });
    page = await browser.newPage(); // Создание экземпляра страницы
    // page = await browser.pages(); // Получение списка страниц
    await (await browser.pages())[0].close(); // Закрыть первую страницу (по умолчанию)
  });

  afterEach(async () => {
    await browser.close(); // Закрытие браузера после каждого теста
    server.kill();
  });

  it('Сценарий-1: Удаление продуктов из таблицы', async () => {
    const deleteProduct = async () => {
      // Функция для поиска и нажатия иконки для удаления продуктов
      // Возвращает название удаленного продукта
      const productDelete = await page.waitForSelector('.conteiner-table tr:last-child');
      const element = await productDelete.$('td');
      // Получаем название выбранного продукта
      const value = await element.evaluate((el) => el.textContent);

      const iconDelete = await productDelete.$('.actions-delete');
      await iconDelete.hover(); // Навелись на иконку удаления продукта
      await iconDelete.click(); // Нажали на иконку

      let result = await page.waitForSelector('.popup-delete'); // Ожидаем появления popup при удалении продукта
      result = await result.$('span');
      result = await result.evaluate((el) => el.textContent); // Получили сообщение об удалении
      expect(result).toBe('Товар удален');
      return value;
    };

    await page.goto('http://localhost:9090');

    // Страница ожидает загрузки селектора .content (Стартовая страница)
    const button = await page.waitForSelector('.content a:nth-child(2)');
    await button.click(); // нажали кнопку задачи 2

    // Удаление первого продукта
    let product = await deleteProduct();
    expect(product).toBe('Huawei View');
    let popup = await page.$('.background-popup');
    expect(popup).toBeDefined();
    await page.waitForTimeout(4000); // Ожидаем закрытие popup по таймеру
    popup = await page.$('.background-popup');
    expect(popup).toBeNull();

    // Удаление второго продукта
    product = await deleteProduct();
    expect(product).toBe('Samsung Galaxy S10+');
    popup = await page.$('.background-popup');
    expect(popup).toBeDefined();
    const cross = await page.waitForSelector('.popup-delete__cross');
    await cross.hover();
    await cross.click(); // Нажали элемент закрытия popup
    popup = await page.$('.background-popup');
    expect(popup).toBeNull();
  });

  it('Сценарий-2: Добавление продукта в таблицу', async () => {
    await page.goto('http://localhost:9090');
    const button = await page.waitForSelector('.content a:nth-child(2)');
    await button.click(); // нажали кнопку задачи 2

    const elementPlus = await page.waitForSelector('.crm_title__add');
    await elementPlus.hover();
    await elementPlus.click(); // Нажали элемент добавления товара

    let count = await page.$$('.conteiner-table tr');
    expect(count.length).toBe(4);

    const btnSave = await page.waitForSelector('.button-save');
    await btnSave.click(); // Нажали кнопку сохранить

    const inputTitle = await page.waitForSelector('#title');
    await inputTitle.hover();
    await inputTitle.type('Acer E320'); // Ввод данных в поле инпут
    await btnSave.click(); // Нажали кнопку сохранить

    const inputPrice = await page.waitForSelector('#price');
    await inputPrice.hover();
    await inputPrice.type('0'); // Ввод данных в поле инпут
    await btnSave.click(); // Нажали кнопку сохранить

    await inputPrice.hover();
    await inputPrice.press('Backspace'); // Удалили значение 0 из поля цены нажав 1 раз Backspace
    await inputPrice.type('15000'); // Ввод новых данных в поле инпут

    await btnSave.focus();
    await page.waitForTimeout(1000);
    await btnSave.click(); // Нажали кнопку сохранить

    await page.waitForSelector('.conteiner-table tr:nth-child(5)'); // Поиск нового продукта в таблице
    count = await page.$$('.conteiner-table tr');
    expect(count.length).toBe(5);
  });

  it('Сценарий-3: Нажатие на кнопку отменить', async () => {
    await page.goto('http://localhost:9090');
    const button = await page.waitForSelector('.content a:nth-child(2)');
    await button.click(); // нажали кнопку задачи 2

    const elementPlus = await page.waitForSelector('.crm_title__add');
    await elementPlus.hover();
    await elementPlus.click(); // Нажали элемент добавления товара

    const btnReject = await page.$('.popup-form .button-reject');
    await btnReject.hover();
    await page.waitForTimeout(1000);
    await btnReject.click(); // Нажатие кнопки отменить

    const popup = await page.$('.background-popup');
    expect(popup).toBeNull();
    const listError = await page.$$('.form-error'); // Блоков с ошибками нет в HTML
    expect(listError.length).toBe(0);
  });

  it('Сценарий-4: Редактирование данных продукта', async () => {
    await page.goto('http://localhost:9090');
    const button = await page.waitForSelector('.content a:nth-child(2)');
    await button.click(); // нажали кнопку задачи 2

    const listProducts = await page.$$('.conteiner-table tr'); // Список всех строк в таблице
    let listElements = await listProducts[2].$$('td'); // Получаем содержимое третьей строки
    const product = {
      name: await listElements[0].evaluate((el) => el.textContent),
      price: await listElements[1].evaluate((el) => el.textContent),
    };
    expect(product.name).toBe('Samsung Galaxy S10+');
    expect(product.price).toBe('80000');

    const iconEdit = await listProducts[2].$('.actions-edit'); // Нажали иконку редактирования
    await iconEdit.click();

    // Проверяем правильность заполнения полей в popup
    const popupTitle = await page.$('#title');
    const popupProductTitle = await popupTitle.evaluate((el) => el.value);
    const popupPrice = await page.$('#price');
    const popupProductPrice = await popupPrice.evaluate((el) => el.value);
    expect(popupProductTitle).toEqual(product.name);
    expect(popupProductPrice).toEqual(product.price);

    // Изменяем данные текущего продукта
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 12; i += 1) {
      await popupTitle.press('Backspace');
    }
    /* eslint-enable no-await-in-loop */
    await popupPrice.type('567');
    const btnSave = await page.$('.button-save');
    await btnSave.click();

    // Проверяем, что в таблице данные изменились
    const productEdit = await page.waitForSelector('.conteiner-table tr:last-child');
    listElements = await productEdit.$$('td'); // Получаем содержимое обновленного продукта
    const name = await listElements[0].evaluate((el) => el.textContent);
    product.name = name;
    const price = await listElements[1].evaluate((el) => el.textContent);
    product.price = price;
    expect(product.name).toBe('Samsung');
    expect(product.price).toBe('80000567');
  });
});
