import { Component } from '../../../core/index.js';
import { Title } from '../Title/Title.js';
import { LatestPostsContent } from '../LatestPosts/LatestPostContent/LatestPostContent.js';

export class LatestPosts extends Component {
    constructor({ title, cards }) {
        super({
            tagName: 'section',
            className: 'posts',
            id: 'pages',
            children: [
                new Title(title),
                new LatestPostsContent(cards),   
            ]
            
        });
    }
}