// Импорт библиотеки для работы с браузером
import puppeteer from 'puppeteer';

jest.setTimeout(20000); // default puppeteer timeout


// Группируем тесты, так как тестам понадобится подготовка для запуска
// браузера, его закрытие, переход на страницы и т.д.
describe('Page start', () => {
  let browser; // переменная для браузера
  let page; // переменная для страницы

  beforeEach(async () => { // Перед каждым тестом запустить браузер
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
  });

  // it('Сценарий удаления продуктов из таблицы', async () => {
  //   const deleteProduct = async () => {
  //     // Функция для поиска и нажатия иконки для удаления продуктов
  //     let productDelete = await page.waitForSelector('.conteiner-table tr:last-child'); // Поиск последнего продукта в таблице
  //     let element = await productDelete.$('td');
  //     let value = await element.evaluate(el => el.textContent); // Получили название выбранного продукта
  
  //     let iconDelete = await productDelete.$('.actions-delete');
  //     await iconDelete.hover(); // Навелись на иконку удаления продукта
  //     await iconDelete.click(); // Нажали на иконку
  
  //     let result = await page.waitForSelector('.popup-delete'); // Ожидаем появления popup при удалении продукта
  //     result = await result.$('span');
  //     result = await result.evaluate(el => el.textContent); // Получили сообщение об удалении
  //     console.log(result, ' - ', value); // Выводим в консоль информацию о удаленном товаре
  //   };

  //   // переход страницы по url
  //   // сервер уже должен быть запущен для данной страницы
  //   await page.goto('http://localhost:9090');

  //   // Страница ожидает загрузки селектора .content
  //   const button = await page.waitForSelector('.content a:nth-child(2)');
  //   await button.click(); // нажали кнопку задачи 2

  //   // Удаление первого продукта
  //   await deleteProduct();
  //   await page.waitForTimeout(4000); // Ожидаем закрытие popup по таймеру

  //   // Удаление второго продукта
  //   await deleteProduct();
  //   const cross = await page.waitForSelector('.popup-delete__cross');
  //   await cross.hover();
  //   await cross.click(); // Нажали элемент закрытия popup
  // });

  it('Сценарий добавления продукта в таблицу', async () => {
    await page.goto('http://localhost:9090');
    const button = await page.waitForSelector('.content a:nth-child(2)');
    await button.click(); // нажали кнопку задачи 2

    const elementPlus = await page.waitForSelector('.crm_title__add');
    await elementPlus.hover();
    await elementPlus.click(); // Нажали элемент добавления товара

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
    await page.waitForTimeout(1000);
  });

  // it('test проверки ввода валидных данных', async () => {
    // переход страницы по url
    // сервер уже должен быть запущен для данной страницы
    // await page.goto('http://localhost:9090');

    // Страница ожидает загрузки селектора .content
    // await page.waitForSelector('.content');

  //   const form = await page.$('.conteiner_input_data');
  //   const input = await form.$('.form_text');
  //   const button = await form.$('.form_button');

  //   const number = '2201111111111116';
  //   await input.type(number); // Ввод данных в поле инпут

  //   await page.waitForSelector('#MIR.active');
  //   await button.click(); // Нажатие кнопки
  //   await page.waitForSelector('.form_text.valid'); // Ожидание появления класса валидности у формы

  //   await page.focus('.form_text');
  //   for (let i = 0; i < number.length; i += 1) {
  //     page.keyboard.press('Backspace');
  //   }
  //   await input.type('6221261111111111113');

  //   await page.waitForSelector('#MIR.disable');
  //   await page.waitForSelector('#Discover.active');

  //   await input.press('Enter');
  //   await page.waitForSelector('.conteiner_input_data .form_text.valid'); // Ожидание появления класса валидности у страницы
  // });

  // it('test ввода не существующего номера', async () => {
  //   await page.goto('http://localhost:9090');
  //   await page.waitForSelector('.content');
  //   const form = await page.$('.conteiner_input_data');
  //   const input = await form.$('.form_text');
  //   const button = await form.$('.form_button');

  //   await input.type('1111111111111111');
  //   await button.click();
  //   await page.waitForSelector('.invalid');
  // });
});