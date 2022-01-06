import { Component } from "../../core/Component.js";

export class Slider extends Component {
  constructor({
      countOfSlides,
    rightBtnClassName,
    leftBtnClassName,
    carouselWrapperClassName,
    carouselCardClassName,
    cards,
    className,
    html,
  }) {
    super({ className, html });

    this.cards = cards;
    this.countOfSlides = countOfSlides;
    this.rightBtnClassName = rightBtnClassName;
    this.leftBtnClassName = leftBtnClassName;
    this.carouselWrapperClassName = carouselWrapperClassName;
    this.carouselCardClassName = carouselCardClassName;

    this.slidesLength = cards.length;
    this.currentSlideIdx = 0;
    this.leftSlideIdx = cards.length - 1;
    this.rightSlideIdx = countOfSlides;
    this.side = "";

    this.clicked = (e) => {
      const button = e.target;

      if (button.tagName !== "BUTTON") return;
      if (button.classList.contains(this.rightBtnClassName)) {
        this.side = "right";
        this._toNextCard();

      }
      if (button.classList.contains(this.leftBtnClassName)) {
        this.side = "left";
        this._toPreviousCard();

      }
    };
    this.timerId = setInterval(() => {
      let element = document.querySelector(`.${this.rightBtnClassName}`);
      if (element) {
        element.click();
      }
    }, 3000);

    this.mouseovered = (e) => {
      const carousel = e.target;
      if (!carousel.classList.contains(this.carouselWrapperClassName)) return;
      clearInterval(this.timerId);
    };

    this.mouseouted = (e) => {
      const carousel = e.target;
      if (!carousel.classList.contains(this.carouselWrapperClassName)) return;
      this.timerId = setInterval(() => {
        let element = document.querySelector(`.${this.rightBtnClassName}`);
        if (element) {
          element.click();
        }
      }, 3000);
    };

    this.clickHandler = this.clicked.bind(this);
    this.mouseoverHandler = this.mouseovered.bind(this);
    this.mouseoutHandler = this.mouseouted.bind(this);

  }

  _toNextCard() {

    if (this.currentSlideIdx + 1 >= this.slidesLength) {
      this.currentSlideIdx = 0;
    } else {
      this.currentSlideIdx++;
    }
    this._changeCard();
  }

  _toPreviousCard() {
    if (this.currentSlideIdx - 1 === -1) {
      this.currentSlideIdx = this.slidesLength - 1;
    } else {
      this.currentSlideIdx--;
    }
    this._changeCard();
  }

  _changeCard() {
    this.removeListeners({
      click: this.clickHandler,
      mousedown: this.mouseDownHandler,
    });
    const pageSlides = document.querySelectorAll(`.${this.carouselCardClassName}`);

    if (this.side === "right") {
      pageSlides.forEach(function (item) {
        switch (item.style.left) {
          case "0%":
            item.style.left = "100%";
            break;

          case "-100%":
            item.style.left = "0%";
            break;

          default:
            item.remove();
        }
      });
      this._drawCard();
    }
    if (this.side === "left") {
      pageSlides.forEach(function (item) {
        switch (item.style.left) {
          case "0%":
            item.style.left = "-100%";
            break;

          case "100%":
            item.style.left = "0%";
            break;

          default:
            item.remove();
        }
      });

      this._drawCard();
    }
    setTimeout(() => {
      this.findNode(this.carouselWrapperClassName).addListeners({
        click: this.clickHandler,
        mousedown: this.mouseDownHandler,
      });
    }, 1000);
  }
}
