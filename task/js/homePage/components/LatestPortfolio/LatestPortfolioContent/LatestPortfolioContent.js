import { Card } from "../Card/Card.js";
import { Button } from "../../../../components/Button/Button.js";
import { Slider } from "../../../../components/Slider/Slider.js";

export class LatestPortfolioContent extends Slider {
  constructor(cards) {
    super({
      countOfSlides: 3,
      rightBtnClassName: "portfolio__button-right",
      leftBtnClassName: "portfolio__button-left",
      carouselWrapperClassName: "portfolio__img",
      carouselCardClassName: "portfolio__card",
      cards: cards,
      className: "portfolio__content-wrapper",
      html: `
            <div class="portfolio__card-wrapper"></div>
            <div class="portfolio__toggle-wrapper"> </div>
            <div class="portfolio__main-btn-wrapper"></div>
            `,
    });
    this.rightSlideIdx = 3;

    const cardList = this._drawCardList(cards);
    this.addListeners({
      //
      click: this.clickHandler,
      mouseover: this.mouseoverHandler,
      mouseout: this.mouseoutHandler,
    })
      .findNode(".portfolio__card-wrapper")
      .append(cardList);
    this.findNode(".portfolio__toggle-wrapper")
      .prepend(
        new Button({
          className: "portfolio__button-left",
          html: '<img class="portfolio__button-img" src="./img/HomePage/icon/a-icon-arrow.svg"  alt="arrow"/>',
        })
      )
      .append(
        new Button({
          className: "portfolio__button-right",
          html: '<img class="portfolio__button-img" src="./img/HomePage/icon/a-icon-arrow.svg" alt="arrow"/>',
        })
      );
    this.findNode(".portfolio__main-btn-wrapper").prepend(
      new Button({
        className: "btn-secondary",
        text: "See all works",
      })
    );
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
          case 1:
            return new Card({
              ...card,
              attrs: { style: "left: 34.5%" },
            });
          case 2:
            return new Card({
              ...card,
              attrs: { style: "left: 69%" },
            });
          case this.countOfSlides:
            return new Card({
              ...card,
              attrs: { style: "left: 104%" },
            });
          case this.leftSlideIdx:
            return new Card({
              ...card,
              attrs: { style: "left: -34.5%" },
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
        if (this.currentSlideIdx - 1 === -1) {
          this.rightSlideIdx = this.slidesLength - 1;
        } else {
          this.rightSlideIdx = this.slidesLength - this.currentSlideIdx - 1;
        }

        this.findNode(".portfolio__card-wrapper").append(
          new Card({
            ...this.cards[this.rightSlideIdx],
            attrs: { style: "left: -34.5%" },
          })
        );
        break;
      case "left":
        if (this.currentSlideIdx === this.countOfSlides) {
          this.leftSlideIdx = 0;
        } else if (this.currentSlideIdx < this.countOfSlides) {
          this.leftSlideIdx = this.countOfSlides - this.currentSlideIdx;
        } else {
          this.leftSlideIdx = this.slidesLength - this.currentSlideIdx + this.countOfSlides;
        }

        this.findNode(".portfolio__card-wrapper").append(
          new Card({
            ...this.cards[this.leftSlideIdx],
            attrs: { style: "left: 104%" },
          })
        );
        break;

      default:
        break;
    }
  }

  _changeCard() {
    this.removeListeners({
      click: this.clickHandler,
      mousedown: this.mouseDownHandler,
    });
    const pageSlides = document.querySelectorAll(`.portfolio__card`);

    if (this.side === "right") {
      pageSlides.forEach(function (item) {
        switch (item.style.left) {
          case "-34.5%":
            item.style.left = "0%";
            break;

          case "0%":
            item.style.left = "34.5%";
            break;
          case "34.5%":
            item.style.left = "69%";
            break;
          case "69%":
            item.style.left = "104%";
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
            item.style.left = "-34.5%";
            break;
          case "34.5%":
            item.style.left = "0%";
            break;
          case "69%":
            item.style.left = "34.5%";
            break;
          case "104%":
            item.style.left = "69%";
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
