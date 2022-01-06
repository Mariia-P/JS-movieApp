import { Component } from '../core/index.js';

import { Post } from '../postPage/components/Post/Post.js';
import { PostHeader } from '../postPage/components/PostHeader/PostHeader.js';
import { PostSide } from '../postPage/components/PostSide/PostSide.js';


export class Main extends Component {
    constructor({movie, allReviews, review, type}) {
        super({ 
            tagName:'main',
        className: 'main',
        children: [
            //
            new PostHeader({movie, review}),
            new Post({movie, review, allReviews, type}),
            new PostSide(),
        ] });
        
    }
}
