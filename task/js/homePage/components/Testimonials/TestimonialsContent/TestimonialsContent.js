import { Slider } from "../../../../components/Slider/Slider.js";
import { Card } from "../Card/Card.js";
import { Button } from "../../../../components/Button/Button.js";

export class TestimonialsContent extends Slider {
  constructor(cards) {
    super({
      countOfSlides: 1,
      rightBtnClassName: "carousel__btn-right",
      leftBtnClassName: "carousel__btn-left",
      carouselWrapperClassName: "carousel__wrapper",
      carouselCardClassName: "carousel__content",
      cards: cards,
      className: "portfolio__content-wrapper",
      html: `
            <div class="carousel">
                <div class="carousel__wrapper"> </div>
            </div>
            `,
    });

    this.x = null;
    this.y = null;

    this.mouseDown = (e) => {
      const carousel = e.target;
      if (!carousel.classList.contains("carousel__wrapper")) return;
      this._toStartSwipeCard(e);
    };
    this.mouseUp = (e) => {
      const carousel = e.target;
      if (
        !carousel.classList.contains("carousel__wrapper") ||
        !this.x ||
        !this.x
      )
        return;

      this._toFinishSwipeCard(e);
    };

    this.mouseDownHandler = this.mouseDown.bind(this);
    this.mouseUpHandler = this.mouseUp.bind(this);

    const cardList = this._drawCardList();

    this.addListeners({
      //
      click: this.clickHandler,
      mouseover: this.mouseoverHandler,
      mouseout: this.mouseoutHandler,
      mousedown: this.mouseDownHandler,
      mouseup: this.mouseUpHandler,
    })
      .findNode(".carousel__wrapper")
      .append(cardList);
    this.findNode(".carousel")
      .prepend(
        new Button({
          className: "carousel__btn-left",
          html: '<img class="carousel__btn-img" src="./img/HomePage/icon/a-icon-arrow.svg" alt="arrow"/>',
        })
      )
      .append(
        new Button({
          className: "carousel__btn-right",
          html: '<img class="carousel__btn-img" src="./img/HomePage/icon/a-icon-arrow.svg" alt="arrow"/>',
        })
      );
  }

  _toStartSwipeCard(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  }

  _toFinishSwipeCard(e) {
    const x2 = e.clientX;
    const y2 = e.clientY;
    const expectedSwipeLength = 60;

    const differenceX = x2 - this.x;
    const differenceY = y2 - this.y;

    if (Math.abs(differenceX) > Math.abs(differenceY)) {
      if (differenceX > expectedSwipeLength) {
        this.side = "right";
        this.x = null;
        this.y = null;
        this._toNextCard();
      }
      if (differenceX < expectedSwipeLength * -1) {
        this.side = "left";
        this.x = null;
        this.y = null;
        this._toPreviousCard();
      }
    }
  }

  _drawCardList() {
    return this.cards
      .map((card, idx) => {
        switch (idx) {
          case this.currentSlideIdx:
            return new Card({
              ...card,
              attrs: { style: "left: 0%" },
            });
          case this.rightSlideIdx:
            return new Card({
              ...card,
              attrs: { style: "left: -100%" },
            });
          case this.leftSlideIdx:
            return new Card({
              ...card,
              attrs: { style: "left: 100%" },
            });
          default:
            break;
        }
      })
      .filter((card) => !!card);
  }

  _drawCard() {
    switch (this.side) {
      case "right":
        if (this.currentSlideIdx + 1 === this.slidesLength) {
          this.rightSlideIdx = 0;
        } else {
          this.rightSlideIdx = this.currentSlideIdx + 1;
        }

        this.findNode(".carousel__wrapper").append(
          new Card({
            ...this.cards[this.rightSlideIdx],
            attrs: { style: "left: -100%" },
          })
        );
        break;
      case "left":
        if (this.currentSlideIdx - 1 === -1) {
          this.leftSlideIdx = this.slidesLength - 1;
        } else {
          this.leftSlideIdx = this.currentSlideIdx - 1;
        }
        this.findNode(".carousel__wrapper").append(
          new Card({
            ...this.cards[this.leftSlideIdx],
            attrs: { style: "left: 100%" },
          })
        );
        break;

      default:
        break;
    }
  }
}
