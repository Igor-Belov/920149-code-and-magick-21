"use strict";

const QUANITY_WIZARDS = 4;

const FIRST_NAMES = [
  `Иван`,
  `Хуан`,
  `Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const LAST_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COATS_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const similarList = document.querySelector(`.setup-similar`);

const similarListElement = document.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
.content.querySelector(`.setup-similar-item`);

const openSetup = document.querySelector(`.setup`);
openSetup.classList.remove(`hidden`);

const getArrayRandElement = function (array) {
  let randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
};

const getFullNameWizard = function () {
  const firstName = getArrayRandElement(FIRST_NAMES);
  const lastName = getArrayRandElement(LAST_NAMES);
  return getArrayRandElement([true, false]) ? firstName + ` ` + lastName : lastName + ` ` + firstName;
};

const getCreateSomeWizards = function (quanityWizards) {
  let wizards = [];
  for (let i = 0; i < quanityWizards; i++) {
    let wizard = {};
    wizard.name = getFullNameWizard();
    wizard.coatColor = getArrayRandElement(COATS_COLORS);
    wizard.eyesColor = getArrayRandElement(EYES_COLORS);
    wizards[i] = wizard;
  }
  return wizards;
};

const getWizardElement = function (someWizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = someWizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = someWizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = someWizard.eyesColor;
  return wizardElement;
};

const createWizardInDOM = function (quanityWizards) {
  const fragment = document.createDocumentFragment();
  const someWizards = getCreateSomeWizards(quanityWizards);
  for (let i = 0; i < quanityWizards; i++) {
    fragment.appendChild(getWizardElement(someWizards[i]));
  }
  similarListElement.appendChild(fragment);
  similarList.classList.remove(`hidden`);
  someWizards = null;
};

createWizardInDOM(QUANITY_WIZARDS);
