export default class Swiper {
  #currentPosition = 0;
  #slideNumber = 0;
  #slideWidth = 0;
  #autoPlay = true;
  #intervalId;

  swiperWrapEl;
  swiperListEl;
  prevBtnEl;
  nextBtnEl;

  indicatorWrapEl;

  controlWrapEl;

  constructor() {
    this.assignElement();
    this.initSlideNumber();
    this.initSlideWidth();
    this.initSwiperListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoPlay();
  }

  assignElement() {
    this.swiperWrapEl = document.getElementById('swiper-wrap');
    this.swiperListEl = this.swiperWrapEl.querySelector('#swiper');
    this.nextBtnEl = this.swiperWrapEl.querySelector('#next');
    this.prevBtnEl = this.swiperWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.swiperWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.swiperWrapEl.querySelector('#control-wrap');
    this.pauseBtnEl = this.controlWrapEl.querySelector('#pause');
    this.playBtnEl = this.controlWrapEl.querySelector('#play');
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

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    } else if (event.target.dataset.status === 'pause') {
      this.#autoPlay = false;
      this.controlWrapEl.classList.add('pause');
      this.controlWrapEl.classList.remove('play');
      clearInterval(this.#intervalId);
    }
  }

  onClickIndicator(event) {
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

    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
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

    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
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
