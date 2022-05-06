export default class Swiper {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  swiperWrapEl;

  swiperListEl;

  prevBtnEl;

  constructor() {
    this.assignElement();
    this.initSlideNumber();
    this.initSlideWidth();
    this.initSwiperListWidth();
    this.addEvent();
  }

  assignElement() {
    this.swiperWrapEl = document.getElementById('swiper-wrap');
    this.swiperListEl = this.swiperWrapEl.querySelector('#swiper');
    this.nextBtnEl = this.swiperWrapEl.querySelector('#next');
    this.prevBtnEl = this.swiperWrapEl.querySelector('#previous');
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
  }

  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.swiperListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.swiperListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }
}
