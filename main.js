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
          age = calculateAge(obj.birthday),
          studyStart = obj.studyStart;
    createElement('td', tr, `${obj.surname} ${obj.name} ${obj.lastname}`);
    createElement('td', tr, obj.faculty);
    createElement(
      'td',
      tr,
      `${obj.birthday.toLocaleDateString()} (${age} ${declOfNum(age, [
          "год",
          "года",
          "лет",
        ])})
      `
    );
    createElement(
            'td',
            tr,
            `${studyStart}-${obj.studyEnd} (${checkCourse(studyStart)})`
          );
  }

  function showFormError(element, errorsContainer, message) {
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
        wrong = showFormError(
          input,
          errorsContainer,
          'не заполнено или содержит пробелы'
        );
      } else if (
          input.type === 'number' &&
          (input.value < 2000 || input.value > nowDate.getFullYear())) {
          wrong = showFormError(
            input,
            errorsContainer,
            'должно находится в диапазоне от 2000-го до текущего года');
      } else if (
          input.type === 'date' &&
          checkDateRange(input, '1900-01-01', nowDate)) {
          wrong = showFormError(
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

  function changeDataTypes(obj) {
    obj.birthday = new Date(obj.birthday);
    obj.studyStart = +obj.studyStart;
  }

  function addFullNameAndStudyEnd(obj) {
    obj.fullName = `${obj.surname} ${obj.name} ${obj.lastname}`;
    obj.studyEnd = obj.studyStart + 4;
  }

  async function getData(url) {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status ${result.status}`);
    }
    return await result.json();
  }

  async function postData(url, data) {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await result.json();
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
        labelLastName = createElement(
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
        labelBirthday = createElement(
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
        inputLastName = createElement(
          'input',
          labelLastName,
          '',
          ['form-control']
        ),
        inputFaculty = createElement(
          'input',
          labelFaculty,
          '',
          ['form-control']
        ),
        inputBirthday = createElement('input', labelBirthday, '', ['form-control']),
        inputStudyStart = createElement(
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
        filterInputName = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
        ),
        filterInputFaculty = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
        ),
        filterInputStudyStart = createElement(
          'input',
          filterForm,
          '',
          ['form-control', 'mb-3']
          ),
        filterInputStudyEnd = createElement(
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
        thBirthday = createElement('th', tHeadTr, 'Дата рождения и возраст'),
        thStudyYears = createElement('th', tHeadTr, 'Годы обучения'),
        tBody = createElement('tbody', table, '', ['table-group-divider']),
        sortDirection = {};
        let studentsList = [];

  inputBirthday.type = 'date';
  inputStudyStart.type ='number';
  tHead.style.cursor = 'pointer';
  thName.dataset.columnName = 'fullName';
  thFaculty.dataset.columnName = 'faculty';
  thBirthday.dataset.columnName = 'birthday';
  thStudyYears.dataset.columnName = 'studyStart';
  filterInputStudyStart.type ='number';
  filterInputStudyEnd.type ='number';
  filterInputName.placeholder = 'Ф.И.О';
  filterInputFaculty.placeholder = 'Факультет';
  filterInputStudyStart.placeholder = 'Год начала обучения';
  filterInputStudyEnd.placeholder = 'Год окончания обучения';

  function renderStudentsTable(arr = studentsList, parent = tBody) {
    let copyArr = [...arr];
    parent.innerHTML = '';

    if (sortDirection.currentColumn) {
      copyArr = copyArr.sort((a, b) => {
        const columnName = sortDirection.currentColumn,
              direction = sortDirection.direction ?
                a[columnName] < b[columnName] : a[columnName] > b[columnName];
        return direction ? -1 : 1;
      });
    }

    if (filterInputName.value.trim() !== '') {
      copyArr = filterList(copyArr, 'fullName', filterInputName.value);
    }

    if (filterInputFaculty.value.trim() !== '') {
      copyArr = filterList(copyArr, 'faculty', filterInputFaculty.value);
    }

    if (filterInputStudyStart.value.trim() !== '') {
      copyArr = filterList(copyArr, 'studyStart', filterInputStudyStart.value);
    }

    if (filterInputStudyEnd.value.trim() !== '') {
      copyArr = filterList(copyArr, 'studyEnd', filterInputStudyEnd.value);
    }

    copyArr.forEach(student => {
      renderStudent(student, parent);
    });
  }

  getData('http://localhost:3300/api/students')
  .then(data => {
    studentsList = [...data];
    studentsList.forEach(item => {
      changeDataTypes(item);
      addFullNameAndStudyEnd(item);
    });
    renderStudentsTable();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorsContainer.innerHTML = '';

    if (checkForm(form, errorsContainer)) {
      return;
    }

    const newStudent = {
      surname: AddCapitalLetter(inputSurname.value),
      name: AddCapitalLetter(inputName.value),
      lastname: AddCapitalLetter(inputLastName.value),
      birthday: new Date(inputBirthday.value),
      studyStart: inputStudyStart.value,
      faculty: AddCapitalLetter(inputFaculty.value)
    };

    postData('http://localhost:3300/api/students', newStudent)
      .then(data => {
        changeDataTypes(data);
        addFullNameAndStudyEnd(data);
        studentsList.push(data);
        renderStudent(data, tBody);
      })
      .finally(() => form.reset());
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
});
