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
        form = createElement('form', '', 'd-flex', 'flex-column', 'mb-5'),
        formTitle = createElement('legend', 'Форма добавления нового студента'),
        labelName = createElement('label', 'Имя', 'form-label', 'mb-3'),
        labelSurname = createElement('label', 'Фамилия', 'form-label', 'mb-3'),
        labelPatronymic = createElement('label', 'Отчество', 'form-label', 'mb-3'),
        labelFaculty = createElement('label', 'Факультет', 'form-label', 'mb-3'),
        labelDateOfBrith = createElement('label', 'Дата рождения', 'form-label', 'mb-3'),
        lableStartsOfStadies = createElement('label', 'Год начала обучения', 'form-label', 'mb-4'),
        inputName = createElement('input', '', 'form-control'),
        inputSurname = createElement('input', '', 'form-control'),
        inputPatronymic = createElement('input', '', 'form-control'),
        inputFaculty = createElement('input', '', 'form-control'),
        inputDateOfBrith = createElement('input', '', 'form-control'),
        inputStartOfStadies = createElement('input', '', 'form-control'),
        submitBtn = createElement('button', 'Добавить студента', 'btn', 'btn-primary', 'align-self-start'),
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

  inputDateOfBrith.type = 'date';

  renderElement(container, title);
  renderElement(form, formTitle);
  renderElement(labelName, inputName);
  renderElement(labelSurname, inputSurname);
  renderElement(labelPatronymic, inputPatronymic);
  renderElement(labelFaculty, inputFaculty);
  renderElement(labelDateOfBrith, inputDateOfBrith);
  renderElement(lableStartsOfStadies, inputStartOfStadies);
  renderElement(form, labelName);
  renderElement(form, labelSurname);
  renderElement(form, labelPatronymic);
  renderElement(form, labelFaculty);
  renderElement(form, labelDateOfBrith);
  renderElement(form, lableStartsOfStadies);
  renderElement(form, submitBtn);
  renderElement(container, form);
  renderElement(tHeadTr, thName);
  renderElement(tHeadTr, thFaculty);
  renderElement(tHeadTr, thBrith);
  renderElement(tHeadTr, thYearsOfEducation);
  renderElement(tHead, tHeadTr);
  renderElement(table, tHead);
  renderElement(table, tBody);
  renderElement(container, table);
  renderElement(sectionMain, container);
  renderElement(document.body, sectionMain);

  function renderStudent(obj) {
    const tr = createElement('tr'),
          tdName = createElement(
            'td',
            `${obj.surname} ${obj.name} ${obj.patronymic}`),
          tdFaculty = createElement('td', obj.faculty),
          tdBrith = createElement(
            'td',
            `${obj.dateOfBrith.toLocaleDateString()} ( лет)`),
          tdYearsOfEducation = createElement('td', `${obj.startOfStadies} ( курс)`);

    renderElement(tr, tdName);
    renderElement(tr, tdFaculty);
    renderElement(tr, tdBrith);
    renderElement(tr, tdYearsOfEducation);

    return tr;
  }

  function renderStudentsTable(arr, parent) {
    arr.forEach(student => {
      const element = renderStudent(student);
      renderElement(parent, element);
    });
  }

  renderStudentsTable(studentsList, tBody);
});
