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

  function calculateAge(obj) {
    const now = new Date();
    let age = now.getFullYear() - obj.getFullYear() - 1;
    if (now.getMonth() >= obj.getMonth() && now.getDate() >= obj.getDate()) {
      age++;
    }
    return age;
  }

  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  function checkCourse(year) {
    const now = new Date();
    let courseNumber = now.getFullYear() - year;

    if (now.getMonth() > 8) {
      courseNumber++;
    }
    return courseNumber > 4 ? 'закончил' : `${courseNumber} курс`;
  }

  function renderStudent(obj) {
    const tr = createElement('tr'),
          tdName = createElement(
            'td',
            `${obj.surname} ${obj.name} ${obj.patronymic}`),
          tdFaculty = createElement('td', obj.faculty),
          age = calculateAge(obj.born),
          tdBorn = createElement(
            'td',
            `${obj.born.toLocaleDateString()} (${age} ${declOfNum(age, [
              "год",
              "года",
              "лет",
          ])})`),
          startDate = obj.startDate,
          tdYearsOfEducation = createElement(
            'td',
            `${startDate}-${startDate + 4} (${checkCourse(startDate)})`
          );

    renderElement(tr, tdName);
    renderElement(tr, tdFaculty);
    renderElement(tr, tdBorn);
    renderElement(tr, tdYearsOfEducation);

    return tr;
  }

  function renderStudentsTable(arr, parent) {
    parent.innerHTML = '';
    arr.forEach(student => {
      const element = renderStudent(student);
      renderElement(parent, element);
    });
  }

  const sectionMain = createElement('section', '', 'main'),
        container = createElement('div', '', 'container'),
        title = createElement('h1', 'Список студентов', 'title'),
        form = createElement('form', '', 'd-flex', 'flex-column', 'mb-5'),
        formTitle = createElement('legend', 'Форма добавления нового студента'),
        labelName = createElement('label', 'Имя', 'form-label', 'mb-3'),
        labelSurname = createElement('label', 'Фамилия', 'form-label', 'mb-3'),
        labelPatronymic = createElement(
          'label',
          'Отчество',
          'form-label',
          'mb-3'
        ),
        labelFaculty = createElement(
          'label',
          'Факультет',
          'form-label',
          'mb-3'
        ),
        labelBorn = createElement(
          'label',
          'Дата рождения',
          'form-label',
          'mb-3'
        ),
        lableStartsOfStadies = createElement(
          'label',
          'Год начала обучения',
          'form-label',
          'mb-4'
        ),
        inputName = createElement('input', '', 'form-control'),
        inputSurname = createElement('input', '', 'form-control'),
        inputPatronymic = createElement('input', '', 'form-control'),
        inputFaculty = createElement('input', '', 'form-control'),
        inputBorn = createElement('input', '', 'form-control'),
        inputStartDate = createElement('input', '', 'form-control'),
        submitBtn = createElement(
          'button',
          'Добавить студента',
          'btn',
          'btn-primary',
          'align-self-start'
        ),
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
            born: new Date('1993-06-27'),
            startDate: 2020,
            faculty: 'Психологии'
          },
          {
            name: 'Нина',
            surname: 'Лаптева',
            patronymic: 'Артёмовна',
            born: new Date('1996-08-23'),
            startDate: 2018,
            faculty: 'Юридический'
          },
          {
            name: 'Софья',
            surname: 'Меркулова',
            patronymic: 'Тимуровна',
            born: new Date('2003-07-15'),
            startDate: 2022,
            faculty: 'Социологии'
          },
          {
            name: 'Матвей',
            surname: 'Поляков',
            patronymic: 'Михайлович',
            born: new Date('2001-10-09'),
            startDate: 2021,
            faculty: 'Журналистики'
          },
          {
            name: 'Кирилл',
            surname: 'Николаев',
            patronymic: 'Иванович',
            born: new Date('2000-02-06'),
            startDate: 2019,
            faculty: 'Юридический'
          }
        ];

  inputBorn.type = 'date';


  renderElement(container, title);
  renderElement(form, formTitle);
  renderElement(labelName, inputName);
  renderElement(labelSurname, inputSurname);
  renderElement(labelPatronymic, inputPatronymic);
  renderElement(labelFaculty, inputFaculty);
  renderElement(labelBorn, inputBorn);
  renderElement(lableStartsOfStadies, inputStartDate);
  renderElement(form, labelName);
  renderElement(form, labelSurname);
  renderElement(form, labelPatronymic);
  renderElement(form, labelFaculty);
  renderElement(form, labelBorn);
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

  renderStudentsTable(studentsList, tBody);
});
