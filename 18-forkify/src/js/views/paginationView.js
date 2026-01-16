import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage + 1, 'next');
    }
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage - 1, 'prev');
    }
    if (currentPage < numPages) {
      return [
        this._generateMarkupButton(currentPage + 1, 'next'),
        this._generateMarkupButton(currentPage - 1, 'prev'),
      ].join('');
    }
    return '';
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkupButton(page, type) {
    return `
			<button data-goto=${page} class="btn--inline pagination__btn--${type}">
            <span>${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
          </button>`;
  }
}
export default new PaginationView();
