import { Component } from '../../../core/index.js';
import { Title } from '../Title/Title.js';
import { AboutUsContent } from '../AboutUs/AboutUsContent/AboutUsContent.js';

export class AboutUs extends Component {
    constructor({ title, cards, video }) {
        super({
            tagName: 'section',
            className: 'about-us',
            id: 'about',
            children: [
                new Title(title),
                new AboutUsContent(cards, video),   
            ]
            
        });
    }
}