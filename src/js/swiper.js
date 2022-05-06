export default class Swiper {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  swiperWrapEl;

  swiperListEl;

  prevBtnEl;

  indicatorWrapEl;

  constructor() {
    this.assignElement();
    this.initSlideNumber();
    this.initSlideWidth();
    this.initSwiperListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
  }

  assignElement() {
    this.swiperWrapEl = document.getElementById('swiper-wrap');
    this.swiperListEl = this.swiperWrapEl.querySelector('#swiper');
    this.nextBtnEl = this.swiperWrapEl.querySelector('#next');
    this.prevBtnEl = this.swiperWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.swiperWrapEl.querySelector('#indicator-wrap');
  }

  initSlideNumber() {
    this.#slideNumber = this.swiperListEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.swiperWrapEl.clientWidth;
  }

  initSwiperListWidth() {
    this.swiperListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
  }

  onClickIndicator() {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.swiperListEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
  }

  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.swiperListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.swiperListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }
}
