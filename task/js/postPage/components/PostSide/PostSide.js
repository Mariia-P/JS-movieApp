import { Component } from '../../../core/index.js';


export class PostSide extends Component {
    constructor() {
        super({

            className: 'main__side',
            html: `
            
            <section class="posts main__side-block">
                <div class="posts__wrapper">
                    <h3 class="main__side-bold">Latest posts</h3>

                    <div class="post__card">
                        <div class="post_img">
                            <img
                                class=""
                                src="./img/PostPage/Latest-post-img1.png"
                                alt="confetti"
                            />
                        </div>
                        <div class="post__text-wrapper">
                            <p class="post__text">
                                Much cure inappropriate could this
                                restrictions …
                            </p>
                            <div class="extra-data">
                                <div class="extra-data__data">
                                    20 oct, 2019
                                </div>
                                <div class="dot"></div>
                                <div class="extra-data__time">
                                    10 min read
                                </div>
                                <div class="dot"></div>
                                <img
                                    src="./img/HomePage/icon/a-icon-comment.svg"
                                    alt="comment"
                                />
                                <div class="extra-data__comments">
                                    11
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="post__card">
                        <div class="post_img">
                            <img
                                src="./img/PostPage/Group2/Latest-post-img-2.png"
                                alt="desert"
                            />
                        </div>
                        <div class="post__text-wrapper">
                            <p class="post__text">
                                Much cure inappropriate could this
                                restrictions …
                            </p>
                            <div class="extra-data">
                                <div class="extra-data__data">
                                    20 oct, 2019
                                </div>
                                <div class="dot"></div>
                                <div class="extra-data__time">
                                    10 min read
                                </div>
                                <div class="dot"></div>
                                <img
                                    src="./img/HomePage/icon/a-icon-comment.svg"
                                    alt="comment"
                                />
                                <div class="extra-data__comments">
                                    11
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="post__button-wrapper">
                        <button class="post__button btn-secondary">
                            More posts
                        </button>
                    </div>
                </div>
            </section>
            <section class="categories main__side-block">
                <div class="categories__wrapper">
                    <h3 class="main__side-bold">Categories</h3>
                </div>

                <div class="accordion">
                    <button
                        class="
                            accordion__button accordion__button-first
                        "
                    >
                        Restaurant food (3)
                        <img
                            class="accordion__img accordion__img-closed"
                            src="./img/HomePage/icon/a-icon-arrow.svg"
                            alt="arrow"
                        />
                    </button>

                    <button
                        class="accordion__button accordion__button-open"
                    >
                        Travel news (3)
                        <img
                            class="accordion__img accordion__img-opened"
                            src="./img/HomePage/icon/a-icon-arrow.svg"
                            alt="arrow"
                        />
                    </button>
                    <div class="panel">
                        <a class="panel__item">Hiking</a>
                        <a class="panel__item">Bicycle trip</a>
                        <a class="panel__item">Mountains trip</a>
                    </div>
                    <button class="accordion__button">
                        Modern technology (6)
                        <img
                            class="accordion__img accordion__img-closed"
                            src="./img/HomePage/icon/a-icon-arrow.svg"
                            alt="arrow"
                        />
                    </button>
                    <button class="accordion__button">
                        Product (4)
                        <img
                            class="accordion__img accordion__img-closed"
                            src="./img/HomePage/icon/a-icon-arrow.svg"
                            alt="arrow"
                        />
                    </button>

                    <button class="accordion__button">
                        Inspiration (2)
                        <img
                            class="accordion__img accordion__img-closed"
                            src="./img/HomePage/icon/a-icon-arrow.svg"
                            alt="arrow"
                        />
                    </button>
                </div>
            </section>
            <section class="tags main__side-block">
                <div class="tags__wrapper">
                    <h3 class="main__side-bold">Tags</h3>
                    <div class="tags__buttonsWrapper">
                        <button class="btn-secondary tags__button">
                            Love
                        </button>
                        <button class="btn-secondary tags__button">
                            Signs
                        </button>
                        <button class="btn-secondary tags__button">
                            Waterfall
                        </button>
                        <button class="btn-secondary tags__button">
                            Inspiration
                        </button>
                        <button class="btn-secondary tags__button">
                            Quotes
                        </button>
                        <button class="btn-secondary tags__button">
                            Sea
                        </button>
                        <button class="btn-secondary tags__button">
                            Sense
                        </button>
                        <button class="btn-secondary tags__button">
                            Coffee
                        </button>
                        <button class="btn-secondary tags__button">
                            Gold
                        </button>
                        <button class="btn-secondary tags__button">
                            Images
                        </button>
                        <button class="btn-secondary tags__button">
                            Courage
                        </button>
                        <button class="btn-secondary tags__button">
                            Dancing
                        </button>
                        <button class="btn-secondary tags__button">
                            Video
                        </button>
                    </div>
                </div>
            </section>
        
            `
        });
    }
}
