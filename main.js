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

  function renderStudent(obj) {
    const tr = createElement('tr'),
          tdName = createElement(
            'td',
            `${obj.surname} ${obj.name} ${obj.patronymic}`
          ),
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
          tdYearsStudy = createElement(
            'td',
            `${startDate}-${startDate + 4} (${checkCourse(startDate)})`
          );

    renderElement(tr, tdName);
    renderElement(tr, tdFaculty);
    renderElement(tr, tdBorn);
    renderElement(tr, tdYearsStudy);

    return tr;
  }

  function renderStudentsTable(arr, parent) {
    const copyArr = [...arr];
    parent.innerHTML = '';
    copyArr.forEach(student => {
      const element = renderStudent(student);
      renderElement(parent, element);
    });
  }

  function showError(element, errorsContainer, message) {
    element.classList.add('is-invalid');
    const error = createElement(
      'p',
      `Поле "${element.parentNode.textContent}" ${message}`,
      'text-danger'
    );
    renderElement(errorsContainer, error);
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
      }
      else if (
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

  const sectionMain = createElement('section', '', 'main'),
        container = createElement('div', '', 'container', 'p-4'),
        title = createElement('h1', 'Список студентов', 'title'),
        form = createElement('form', '', 'd-flex', 'flex-column', 'mb-5'),
        formTitle = createElement('legend', 'Форма добавления нового студента'),
        table = createElement('table', '', 'table', 'table-hover'),
        tHead = createElement('thead'),
        tHeadTr = createElement('tr'),
        thName = createElement('th', 'Ф.И.О. студента'),
        thFaculty = createElement('th', 'Факультет'),
        thBorn = createElement('th', 'Дата рождения и возраст'),
        thYearsStudy = createElement('th', 'Годы обучения'),
        tBody = createElement('tbody', '', 'table-group-divider'),
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
        errorsContainer = createElement('div'),
        submitBtn = createElement(
          'button',
          'Добавить студента',
          'btn',
          'btn-primary',
          'align-self-start'
        ),
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
        ];

  inputBorn.type = 'date';
  inputStartDate.type ='number';
  tHead.style.cursor = 'pointer';
  thName.dataset.id = 'name';
  thFaculty.dataset.id = 'faculty';
  thBorn.dataset.id = 'born';
  thYearsStudy.dataset.id = 'startDate';

  renderElement(container, title);
  renderElement(form, formTitle);
  renderElement(labelSurname, inputSurname);
  renderElement(labelName, inputName);
  renderElement(labelPatronymic, inputPatronymic);
  renderElement(labelFaculty, inputFaculty);
  renderElement(labelBorn, inputBorn);
  renderElement(lableStartsOfStadies, inputStartDate);
  renderElement(form, labelSurname);
  renderElement(form, labelName);
  renderElement(form, labelPatronymic);
  renderElement(form, labelFaculty);
  renderElement(form, labelBorn);
  renderElement(form, lableStartsOfStadies);
  renderElement(form, errorsContainer);
  renderElement(form, submitBtn);
  renderElement(container, form);
  renderElement(tHeadTr, thName);
  renderElement(tHeadTr, thFaculty);
  renderElement(tHeadTr, thBorn);
  renderElement(tHeadTr, thYearsStudy);
  renderElement(tHead, tHeadTr);
  renderElement(table, tHead);
  renderElement(table, tBody);
  renderElement(container, table);
  renderElement(sectionMain, container);
  renderElement(document.body, sectionMain);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorsContainer.innerHTML = '';

    if (checkForm(form, errorsContainer)) {
      return;
    }

    const newStudent = {
      surname: inputSurname.value,
      name: inputName.value,
      patronymic: inputPatronymic.value,
      born: new Date(inputBorn.value),
      startDate: +inputStartDate.value,
      faculty: inputFaculty.value
    };

    studentsList.push(newStudent);
    renderStudentsTable(studentsList, tBody);
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

  tHead.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    let sortArr = null;

    switch (id) {
      case 'name':
        sortArr = studentsList.sort((a, b) => {
          const firstFullName =
                  (a.surname + a.name + a.patronymic).toLowerCase(),
                secondFullName =
                  (b.surname + b.name + b.patronymic).toLowerCase();
          if (firstFullName < secondFullName) {
            return -1;
          }
        });
        break;
      case 'faculty':
        sortArr = studentsList.sort((a, b) => {
          if (a[id] < b[id]) {
            return -1;
          }
        });
        break;
      case 'born':
        sortArr = studentsList.sort((a, b) => {
          const firstBorn = Date.parse(a[id]),
                secondBorn = Date.parse(b[id]);
          if (firstBorn < secondBorn) {
            return -1;
          }
        });
        break;
      case 'startDate':
        sortArr = studentsList.sort((a, b) => a[id] - b[id]);
        break;
      default:
        return;
    }

    renderStudentsTable(sortArr, tBody);
  });

  tHead.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });

  renderStudentsTable(studentsList, tBody);
});
