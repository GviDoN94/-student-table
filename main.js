'use strict';

window.addEventListener('DOMContentLoaded', () => {
  function createElement(name, classEl, text) {
    const element = document.createElement(name);
    if (classEl) {
      element.classList.add(classEl);
    }
    if(text) {
      element.textContent = text;
    }
    return element;
  }

  function renderElement(parent, element) {
    parent.append(element);
  }

  const sectionMain = createElement('section', 'main'),
        container = createElement('div', 'container'),
        title = createElement('h1', 'title', 'Список студентов'),
        table = createElement('table'),
        tHead = createElement('thead'),
        tHeadTr = createElement('tr'),
        thName = createElement('th', '', 'Ф.И.О. студента'),
        thFaculty = createElement('th', '', 'Факультет'),
        thBrith = createElement('th', '', 'Дата рождения'),
        thYearsOfEducation = createElement('th', '', 'Годы обучения'),
        tBody = createElement('tbody'),
        studentsList = [
          {
            name: 'Георгий',
            surname: 'Соболев',
            patronymic: 'Львович',
            dateOfBrith: '27.06.1993',
            startOfStadies: 2020,
            faculty: 'Психологии'
          },
          {
            name: 'Нина',
            surname: 'Лаптева',
            patronymic: 'Артёмовна',
            dateOfBrith: '23.08.1996',
            startOfStadies: 2018,
            faculty: 'Юридический'
          },
          {
            name: 'Софья',
            surname: 'Меркулова',
            patronymic: 'Тимуровна',
            dateOfBrith: '15.07.2003',
            startOfStadies: 2022,
            faculty: 'Социологии'
          },
          {
            name: 'Матвей',
            surname: 'Поляков',
            patronymic: 'Михайлович',
            dateOfBrith: '09.10.2002',
            startOfStadies: 2021,
            faculty: 'Журналистики'
          },
          {
            name: 'Кирилл',
            surname: 'Николаев',
            patronymic: 'Иванович',
            dateOfBrith: '06.02.2000',
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
});
