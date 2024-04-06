const form = document.querySelector('form');
form.addEventListener('submit', (e) => e.preventDefault());

const allLinks = document.querySelectorAll('a');
const allButtons = document.querySelectorAll('button:not(.modal__button, .footer__button)');
const modalButtonOk = document.querySelector('.modal__button--ok');
const modalButtonClose = document.querySelector('.modal__button--close');
const modal = document.querySelector('.modal');
const modalPaper = document.querySelector('.modal__paper');
const openModalStorageName = 'OPEN_MODAL';
const openModalStorageValue = 'false';

let timerId = 0;

const actions = [...allLinks, ...allButtons];

const openModal = () => {
  modal.classList.add('modal--block');
};

const closeModal = () => {
  modal.classList.remove('modal--block');
};

const openModalByTimeout = () => {
  const isOpenByTimeout = localStorage.getItem(openModalStorageName);

  if (isOpenByTimeout === openModalStorageValue) {
    return;
  }

  timerId = setTimeout(() => modal.classList.add('modal--block'), 5 * 1000);
};

const closeWithTimeout = () => {
  closeModal();

  clearTimeout(timerId);

  openModalByTimeout();
};

actions.forEach((action) => {
  action.addEventListener('click', openModal);
});

modalButtonClose.addEventListener('click', closeWithTimeout);
modal.addEventListener('click', closeWithTimeout);
modalPaper.addEventListener('click', (e) => e.stopPropagation());

modalButtonOk.addEventListener('click', () => {
  closeModal();

  localStorage.setItem(openModalStorageName, openModalStorageValue);
});

openModalByTimeout();

