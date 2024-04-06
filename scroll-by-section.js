const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');
const footerButton = document.querySelector('.footer__button');
const windowHeight = window.innerHeight;

let currentSectionIndex = 0;
let scrollSteps = 0;

const scrollToSection = (index) => {
  const sectionLength = sections.length;

  if (index < 0 || index >= sectionLength - 1) {
    return;
  }

  const offset = index * windowHeight;

  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });

  console.log(index);

  if (index >= sectionLength - 2) {
    footerButton.classList.add('button--hidden');
    footer.classList.add('footer--without-button');
  } else {
    footerButton.classList.remove('button--hidden');
    footer.classList.remove('footer--without-button');
  }

  currentSectionIndex = index;
};

const handleWheel = (event) => {
  event.preventDefault();

  const delta = event.deltaY;
  let newIndex = currentSectionIndex;

  if (delta < 0 || delta > 0) {
    scrollSteps++;
  }

  if (delta > 0 && scrollSteps >= 3) {
    newIndex++;
    scrollSteps = 0;
  }

  if (delta < 0 && scrollSteps >= 3) {
    newIndex--;
    scrollSteps = 0;
  }

  scrollToSection(newIndex);
};

const handleKeyDown = (event) => {
  const key = event.key;
  let newIndex = currentSectionIndex;

  if (key === 'ArrowDown') {
    newIndex++;
  } else if (key === 'ArrowUp') {
    newIndex--;
  }

  scrollToSection(newIndex);
};

window.addEventListener('wheel', handleWheel, { passive: false });
window.addEventListener('keydown', handleKeyDown);

footerButton.addEventListener('click', () =>
  scrollToSection(currentSectionIndex + 1)
);

function checkWindowSize() {
  if (window.innerWidth < 1028) {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('keydown', handleKeyDown);
  } else {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
  }
}

checkWindowSize();
window.addEventListener('resize', checkWindowSize);
