document.body.addEventListener('click', e => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    e.target.blur();
  }
  if (e.target.tagName === 'use') {
    e.target.parentNode.blur();
  }
  if (e.target.id === 'closeLocation') {
    const companyInfo = document.querySelector('.contacts__company-info');
    companyInfo.style.visibility = 'hidden';
  }

  if (e.target.id === 'searchButtonImage') {
    searchButtonImage.blur();
    if (searchButton.classList.contains('header__search-button--translate')) {
      searchForm.classList.remove('header__search-form--visible');
      setTimeout(() => {
        searchButton.classList.remove('header__search-button--translate');
      }, 200);
    } else {
      searchButton.classList.toggle('header__search-button--translate');
      setTimeout(() => {
        searchForm.classList.toggle('header__search-form--visible');
      }, 200);
    }
  }

  if (e.target.id === 'closeMenu') {
    closeMenu.blur();
    responsiveMenu.style.transform = 'translate(-1000px, 0)';
  }

  if (e.target.id === 'burgerButtonImage') {
    burgerButtonImage.blur();
    responsiveMenu.style.transform = 'translate(0, 0)';
  }
});
