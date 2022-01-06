import { Component } from '../../../core/index.js';
import { ExtraData } from '../../../components/ExtraData/ExtraData.js';

export class PostHeader extends Component {
    constructor( {movie, review} ) {
        // console.log('[movie]', movie);
        // console.log('[review]', review);

        const { avatar_path, rating, username } = review.author_details;
       const {original_title} =  movie;
    const { countOfcomments } = review;
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

        super({
            className: 'main__header',
            html: ` 
            <h2 class="main__title">
            ${original_title}
        </h2>
        <div class="details">
            <div class="details__foto">
                <img class="details__avatar"
                    src="${currentAvatarPath}" alt="foto"
                />
            </div>
    
            <div class="details__left-wrapper">
                <p class="details__name">${username}</p>
               
            </div>
        </div>
            `
        });
        this.readingTime=review.updated_at;
        this.findNode('.details__left-wrapper').append(
            new ExtraData({
                amountComents: countOfcomments,
                data: this._formatDate(review.created_at),
                time: this._formatReadingTime(),
                classExtra: 'details__data',
                rating: rating / 2
              })
        );

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
