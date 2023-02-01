'use strict';

window.addEventListener('DOMContentLoaded', () => {
  function renderElement(element, parent) {
    parent.append(element);
  }

  function createElement(name, parent, text = '', classesEl = []) {
    const element = document.createElement(name);
    if (classesEl.length) {
      element.classList.add(...classesEl);
    }
    if(text) {
      element.textContent = text;
    }
    renderElement(element, parent);
    return element;
  }

  function calculateAge(date) {
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear() - 1;
    if (now.getMonth() >= date.getMonth() && now.getDate() >= date.getDate()) {
      age++;
    }
    return age;
  }

  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20 ?
        2 : cases[number % 10 < 5 ? number % 10 : 5]
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

  function renderStudent(obj, parent) {
    const tr = createElement('tr', parent),
          age = calculateAge(obj.born),
          startDate = obj.startDate;
    createElement('td', tr, `${obj.surname} ${obj.name} ${obj.patronymic}`);
    createElement('td', tr, obj.faculty);
    createElement(
      'td',
      tr,
      `${obj.born.toLocaleDateString()} (${age} ${declOfNum(age, [
          "год",
          "года",
          "лет",
        ])})
      `
    );
    createElement(
            'td',
            tr,
            `${startDate}-${startDate + 4} (${checkCourse(startDate)})`
          );
  }

  function showError(element, errorsContainer, message) {
    element.classList.add('is-invalid');
    createElement(
      'p',
      errorsContainer,
      `Поле "${element.parentNode.textContent}" ${message}`,
      ['text-danger']
    );
    return true;
  }

  function checkDateRange(element, bottomLine, topLine) {
    return Date.parse(element.value) < Date.parse(bottomLine) ||
           Date.parse(element.value) > Date.parse(topLine) ? true : false;
  }

  function checkForm(form, errorsContainer) {
    const nowDate = new Date();
    let wrong = false;
    form.querySelectorAll('input').forEach(input => {
      if (!input.value.trim()) {
        wrong = showError(
          input,
          errorsContainer,
          'не заполнено или содержит пробелы'
        );
      } else if (
          input.type === 'number' &&
          (input.value < 2000 || input.value > nowDate.getFullYear())) {
          wrong = showError(
            input,
            errorsContainer,
            'должно находится в диапазоне от 2000-го до текущего года');
      } else if (
          input.type === 'date' &&
          checkDateRange(input, '1900-01-01', nowDate)) {
          wrong = showError(
            input,
            errorsContainer,
            'должно находится в диапазоне от 01.01.1900-го до текущей даты'
          );
      }
    });
    return wrong;
  }

  function AddCapitalLetter(value) {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }

  function filterList(arr, key, value) {
    return arr.filter(item => {
      if (typeof(item[key]) === 'string') {
        return item[key].toLowerCase().includes(value.trim().toLowerCase());
      }
      return String(item[key]).includes(value.trim());
    });
  }

  const sectionMain = createElement('section', document.body, '', ['main']),
        container = createElement('div', sectionMain, '', ['container', 'p-4']),
        title = createElement('h1', container, 'Список студентов', ['title']),
        form = createElement(
          'form',
          container,
          '',
          ['d-flex', 'flex-column', 'mb-5']
        ),
        formTitle = createElement(
          'legend',
          form,
          'Форма добавления нового студента'
        ),
        labelSurname = createElement(
          'label',
          form,
          'Фамилия',
          ['form-label', 'mb-3']
          ),
        labelName = createElement('label', form, 'Имя', ['form-label', 'mb-3']),
        labelPatronymic = createElement(
          'label',
          form,
          'Отчество',
          ['form-label', 'mb-3']
        ),
        labelFaculty = createElement(
          'label',
          form,
          'Факультет',
          ['form-label', 'mb-3']
        ),
        labelBorn = createElement(
          'label',
          form,
          'Дата рождения',
          ['form-label', 'mb-3']
        ),
        lableStartStady = createElement(
          'label',
          form,
          'Год начала обучения',
          ['form-label', 'mb-4']
        ),
        inputSurname = createElement(
          'input',
          labelSurname,
          '',
          ['form-control']
        ),
        inputName = createElement(
          'input',
          labelName,
          '',
          ['form-control']
        ),
        inputPatronymic = createElement(
          'input',
          labelPatronymic,
          '',
          ['form-control']
        ),
        inputFaculty = createElement(
          'input',
          labelFaculty,
          '',
          ['form-control']
        ),
        inputBorn = createElement('input', labelBorn, '', ['form-control']),
        inputStartDate = createElement(
          'input',
          lableStartStady,
          '',
          ['form-control']
        ),
        errorsContainer = createElement('div', form),
        submitBtn = createElement(
          'button',
          form,
          'Добавить студента',
          ['btn', 'btn-primary', 'align-self-start']
        ),
        filterForm = createElement('form', container),
        filterFormTitle = createElement('legend', filterForm, 'Фильтрация'),
        filerInputName = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
        ),
        filerInputFaculty = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
        ),
        filerInputStartYear = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
          ),
        filerInputFinishYear = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
          ),
        table = createElement('table', container, '', ['table', 'table-hover']),
        tHead = createElement('thead', table),
        tHeadTr = createElement('tr', tHead),
        thName = createElement('th', tHeadTr, 'Ф.И.О. студента'),
        thFaculty = createElement('th', tHeadTr, 'Факультет'),
        thBorn = createElement('th', tHeadTr, 'Дата рождения и возраст'),
        thYearsStudy = createElement('th', tHeadTr, 'Годы обучения'),
        tBody = createElement('tbody', table, '', ['table-group-divider']),
        studentsList = [
          {
            surname: 'Соболев',
            name: 'Георгий',
            patronymic: 'Львович',
            born: new Date('1993-06-27'),
            startDate: 2020,
            faculty: 'Психологии'
          },
          {
            surname: 'Лаптева',
            name: 'Нина',
            patronymic: 'Артёмовна',
            born: new Date('1996-08-23'),
            startDate: 2018,
            faculty: 'Юридический'
          },
          {
            surname: 'Меркулова',
            name: 'Софья',
            patronymic: 'Тимуровна',
            born: new Date('2003-07-15'),
            startDate: 2022,
            faculty: 'Социологии'
          },
          {
            surname: 'Поляков',
            name: 'Матвей',
            patronymic: 'Михайлович',
            born: new Date('2001-10-09'),
            startDate: 2021,
            faculty: 'Журналистики'
          },
          {
            surname: 'Николаев',
            name: 'Кирилл',
            patronymic: 'Иванович',
            born: new Date('2000-02-06'),
            startDate: 2019,
            faculty: 'Юридический'
          }
        ],
        sortDirection = {};

  inputBorn.type = 'date';
  inputStartDate.type ='number';
  tHead.style.cursor = 'pointer';
  thName.dataset.columnName = 'fullName';
  thFaculty.dataset.columnName = 'faculty';
  thBorn.dataset.columnName = 'born';
  thYearsStudy.dataset.columnName = 'startDate';
  filerInputStartYear.type ='number';
  filerInputFinishYear.type ='number';
  filerInputName.placeholder = 'Ф.И.О';
  filerInputFaculty.placeholder = 'Факультет';
  filerInputStartYear.placeholder = 'Год начала обучения';
  filerInputFinishYear.placeholder = 'Год окончания обучения';

  function renderStudentsTable(arr = studentsList, parent = tBody) {
    parent.innerHTML = '';
    let copyArr = [...arr];

    copyArr.forEach(item => {
      item.fullName = `${item.surname} ${item.name} ${item.patronymic}`;
      item.finishDate = item.startDate + 4;
    });

    if (sortDirection.currentColumn) {
      copyArr = copyArr.sort((a, b) => {
        const columnName = sortDirection.currentColumn,
              direction = sortDirection.direction ?
                a[columnName] < b[columnName] : a[columnName] > b[columnName];
        return direction ? -1 : 1;
      });
    }

    if (filerInputName.value.trim() !== '') {
      copyArr = filterList(copyArr, 'fullName', filerInputName.value);
    }

    if (filerInputFaculty.value.trim() !== '') {
      copyArr = filterList(copyArr, 'faculty', filerInputFaculty.value);
    }

    if (filerInputStartYear.value.trim() !== '') {
      copyArr = filterList(copyArr, 'startDate', filerInputStartYear.value);
    }

    if (filerInputFinishYear.value.trim() !== '') {
      copyArr = filterList(copyArr, 'finishDate', filerInputFinishYear.value);
    }

    copyArr.forEach(student => {
      renderStudent(student, parent);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorsContainer.innerHTML = '';

    if (checkForm(form, errorsContainer)) {
      return;
    }

    const newStudent = {
      surname: AddCapitalLetter(inputSurname.value),
      name: AddCapitalLetter(inputName.value),
      patronymic: AddCapitalLetter(inputPatronymic.value),
      born: new Date(inputBorn.value),
      startDate: +inputStartDate.value,
      faculty: AddCapitalLetter(inputFaculty.value)
    };

    studentsList.push(newStudent);
    renderStudentsTable();
    form.reset();
  });

  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      errorsContainer.querySelectorAll('p').forEach(error => {
        if (error.textContent.includes(input.parentNode.textContent)) {
          error.remove();
        }
      });
    });
  });

  tHead.addEventListener('mousedown', e => e.preventDefault());
  tHead.addEventListener('click', (e) => {
    const currentColumn = e.target.dataset.columnName;
    if (sortDirection.currentColumn !== currentColumn) {
      sortDirection.currentColumn = currentColumn;
      sortDirection.direction = true;
    }
    renderStudentsTable();
    sortDirection.direction = !sortDirection.direction;
  });

  filterForm.addEventListener('submit', e => e.preventDefault());
  filterForm.querySelectorAll('input').forEach(
    item => item.addEventListener('input', () => renderStudentsTable())
    );

  renderStudentsTable();
});
