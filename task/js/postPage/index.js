import { Main } from './Main.js';
import { render } from '../core/index.js';
import  {data}  from '../assets/database/post.js';

const  posts  = data;
const currentkey = 'Sarah Healy';
const currentPost = posts.filter(({key})=>key===currentkey);

let movie =
  localStorage.getItem('movie') !== null
    ? JSON.parse(localStorage.getItem('movie'))
    : '';

let allReviews =
  localStorage.getItem('allReviews') !== null
    ? JSON.parse(localStorage.getItem('allReviews'))
    : '';

let review =
    localStorage.getItem('review') !== null
      ? JSON.parse(localStorage.getItem('review'))
      : ''; 
      
      let type =
      localStorage.getItem('type') !== null
        ? JSON.parse(localStorage.getItem('type'))
        : '';      

// render(new Main(...currentPost), document.getElementById('post'));
render(new Main({movie, allReviews, review, type}), document.getElementById('post'));

