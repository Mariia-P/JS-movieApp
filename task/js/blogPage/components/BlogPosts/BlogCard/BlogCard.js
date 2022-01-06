import { Component } from '../../../../core/index.js';
import { ExtraData } from '../../../../components/ExtraData/ExtraData.js';
import { Button } from '../../../../components/Button/Button.js';

import { validateTitle } from '../../../functions/validateTitle.js';
import { createValidTitle } from '../../../functions/createValidTitle.js';

export class BlogCard extends Component {
  constructor({
    moviesInfo,
    reviewInfo,
    tagName,
    className,
    htmlMediaInfo = '',
    htmlTextContent = '',
    htmlTextContentWrapperClassName,
    iconSrc,
    textContentLimit,
    reviews,
    type
  }) {
    // console.log('[reviews]', reviews);

    const { avatar_path, rating } = reviewInfo.author_details;
    const { countOfcomments } = reviewInfo;

    const APP_STORAGE_URL_AVATAR =
      'https://image.tmdb.org/t/p/w150_and_h150_face/';

    let currentAvatarPath;

    if (!avatar_path) {
      currentAvatarPath = './img/BlogPage/Post/noavatar.jpg';
    } else if (avatar_path.includes('http')) {
      currentAvatarPath = avatar_path.slice(avatar_path.indexOf('http'));
    } else {
      currentAvatarPath = APP_STORAGE_URL_AVATAR + avatar_path;
    }

    let validMovieTitle = validateTitle(
      moviesInfo.original_title,
      createValidTitle
    );

    const html = `${htmlMediaInfo}
        <div class=${htmlTextContentWrapperClassName}>
            <div class="details blog__details">
                <div class="details__foto">
                    <img 
                    class="details__avatar"
                        src="${currentAvatarPath}"
                        alt="avatar"
                    />
                </div>

            <div class="details__left-wrapper">
                <p class="details__name">${reviewInfo.author_details.username}</p>  
            </div>
            </div>

            <h3 class="blog__content-title">
                ${validMovieTitle}
            </h3>
            ${htmlTextContent}
            <p class="blog__content-text"></p>
            <div class="blog__btn-wrapper"></div>
            <div class="blog__content-img">
                <img
                    class="movie__img"
                    src=${iconSrc}
                    alt="icon"
                />
            </div>
        </div>
        <div class="blog__content-bottom"></div>
    `;

    super({
      tagName,
      className,
      html
    });
    this.moviesInfo = moviesInfo;
    this.reviewInfo = reviewInfo;
    this.reviews = reviews;

    this.comment = reviewInfo.content;
    this.readingTime = reviewInfo.updated_at;

    this.handleClick = (movie, review, allReviews) => {
      localStorage.setItem('movie', JSON.stringify(movie));
      localStorage.setItem('review', JSON.stringify(review));

      if (allReviews.length > 2) {
        localStorage.setItem('allReviews', JSON.stringify(allReviews));
      } else {
        localStorage.removeItem('allReviews');
      }
      localStorage.setItem('type', JSON.stringify(type));
    };

    // this.deletePost = $('blog__delete-btn').modalWindow;

    this.cuttedComment = this._commentCut(reviewInfo.content, textContentLimit);
    this.findNode('.blog__content-text').text(this.cuttedComment);
    this.findNode('.blog__btn-wrapper').append([
      new Button({
        tagName: 'a',
        className: 'btn-secondary blog__btn',
        text: 'Read more',
        attrs: {
          href: 'post.html'
        },
        onClick: () => {
          this.handleClick(this.moviesInfo, this.reviewInfo, this.reviews);
        }
      }),
      new Button({
        tagName: 'button',
        className: 'btn-secondary blog__btn blog__delete-btn',
        text: 'Delete post',
        onClick: () => {
          $('blog__delete-btn').modalWindow({
            triggerEl: '.blog__delete-btn',
            refuseButton: true,
            typeModal: 'warning',
            closedModalOnFonClick: false,
            text: 'Are you sure you want to delete this post?',
            autoShow: false
          });
        }
      })
    ]);

    this.findNode('.details__left-wrapper').append(
      new ExtraData({
        amountComents: countOfcomments,
        data: this._formatDate(reviewInfo.created_at),
        time: this._formatReadingTime(),
        classExtra: 'details__data',
        rating: rating / 2
      })
    );
  }
  _commentCut(text, limit) {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    const lastSpace = text.lastIndexOf(' ');
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace);
    }

    return text + '...';
  }

  _formatDate(date) {
    const currentCreateData = new Date(date);
    const monthNames = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
    ];

    const day = currentCreateData.getDate();
    const monthIndex = currentCreateData.getMonth();
    const year = currentCreateData.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ', ' + year;
  }
  _formatReadingTime() {
    // console.log('[this.release_date]', this.release_date);
    const countMsInTimeInterval = {
      year: 31622400000,
      month: 2419200000,
      week: 604800000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000
    };
    const releaseData = new Date(this.readingTime);
    const currentData = new Date();
    let readingTime = currentData - releaseData;

    if (readingTime > countMsInTimeInterval.year)
      return `${Math.floor(readingTime / countMsInTimeInterval.year)} yr read`;

    if (readingTime > countMsInTimeInterval.month)
      return `${Math.floor(
        readingTime / countMsInTimeInterval.month
      )} mnth read`;

    if (readingTime > countMsInTimeInterval.week)
      return `${Math.floor(readingTime / countMsInTimeInterval.week)} wk read`;

    if (readingTime > countMsInTimeInterval.day)
      return `${Math.floor(readingTime / countMsInTimeInterval.day)} dd read`;

    if (readingTime > countMsInTimeInterval.hour)
      return `${Math.floor(readingTime / countMsInTimeInterval.hour)} hr read`;

    if (readingTime > countMsInTimeInterval.minute)
      return `${Math.floor(
        readingTime / countMsInTimeInterval.minute
      )} min read`;

    if (readingTime > countMsInTimeInterval.second)
      return `${Math.floor(
        readingTime / countMsInTimeInterval.second
      )} sec read`;

    return `just now`;
  }
}
