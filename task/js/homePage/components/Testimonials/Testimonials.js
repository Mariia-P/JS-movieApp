import { Component } from '../../../core/index.js';
import { TitleWithoutText } from '../../../components/TitleWithoutText/TitleWithoutText.js';
import { TestimonialsContent } from '../Testimonials/TestimonialsContent/TestimonialsContent.js';

export class Testimonials extends Component {
    constructor({ title, cards }) {
        super({
            tagName: 'section',
            className: 'testimonials',
            id: 'testimonials',
            html:'<div class="testimonials__container"></div>'       
        });

        this.findNode('.testimonials__container')
            .append([
                new TitleWithoutText(title),
                new TestimonialsContent(cards)
            ]);
    }
}