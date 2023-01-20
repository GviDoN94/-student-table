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
        tBody = createElement('tbody');
        
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
