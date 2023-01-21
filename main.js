'use strict';

window.addEventListener('DOMContentLoaded', () => {
  function createElement(name, text, ...classesEl) {
    const element = document.createElement(name);
    if (classesEl.length) {
      element.classList.add(...classesEl);
    }
    if(text) {
      element.textContent = text;
    }
    return element;
  }

  function renderElement(parent, element) {
    parent.append(element);
  }

  const sectionMain = createElement('section', '', 'main'),
        container = createElement('div', '', 'container'),
        title = createElement('h1', 'Список студентов', 'title'),
        table = createElement('table', '', 'table'),
        tHead = createElement('thead'),
        tHeadTr = createElement('tr'),
        thName = createElement('th', 'Ф.И.О. студента'),
        thFaculty = createElement('th', 'Факультет'),
        thBrith = createElement('th', 'Дата рождения'),
        thYearsOfEducation = createElement('th', 'Годы обучения'),
        tBody = createElement('tbody'),
        studentsList = [
          {
            name: 'Георгий',
            surname: 'Соболев',
            patronymic: 'Львович',
            dateOfBrith: new Date('1993-06-27'),
            startOfStadies: 2020,
            faculty: 'Психологии'
          },
          {
            name: 'Нина',
            surname: 'Лаптева',
            patronymic: 'Артёмовна',
            dateOfBrith: new Date('1996-08-23'),
            startOfStadies: 2018,
            faculty: 'Юридический'
          },
          {
            name: 'Софья',
            surname: 'Меркулова',
            patronymic: 'Тимуровна',
            dateOfBrith: new Date('2003-07-15'),
            startOfStadies: 2022,
            faculty: 'Социологии'
          },
          {
            name: 'Матвей',
            surname: 'Поляков',
            patronymic: 'Михайлович',
            dateOfBrith: new Date('2002-10-09'),
            startOfStadies: 2021,
            faculty: 'Журналистики'
          },
          {
            name: 'Кирилл',
            surname: 'Николаев',
            patronymic: 'Иванович',
            dateOfBrith: new Date('2000-02-06'),
            startOfStadies: 2019,
            faculty: 'Юридический'
          }
        ];

  renderElement(tHeadTr, thName);
  renderElement(tHeadTr, thFaculty);
  renderElement(tHeadTr, thBrith);
  renderElement(tHeadTr, thYearsOfEducation);
  renderElement(tHead, tHeadTr);
  renderElement(table, tHead);
  renderElement(table, tBody);
  renderElement(sectionMain, container);
  renderElement(container, title);
  renderElement(container, table);
  renderElement(document.body, sectionMain);

    // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

    function getStudentItem(studentObj) {

    }

    // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

    function renderStudentsTable(studentsArray) {

    }

    // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

    // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

    // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
});
