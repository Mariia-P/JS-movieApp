import { Component } from '../core/index.js';
import { AboutUs } from './components/AboutUs/AboutUs.js';
import { LatestPosts } from './components/LatestPosts/LatestPosts.js';
import { LatestPortfolio } from './components/LatestPortfolio/LatestPortfolio.js';
import { Testimonials } from './components/Testimonials/Testimonials.js';


export class Main extends Component {
    constructor( aboutUs, latestPost, latestPortfolio, testimonials) {
        super({className: 'main-wrapper' });
        this.findNode('.main-wrapper')
        .append([     
                    new AboutUs(aboutUs),
                    new LatestPosts(latestPost),
                    new LatestPortfolio(latestPortfolio),
                    new Testimonials(testimonials)
                    
                ]);
    }
}
