import { Main } from './Main.js';
import { GlobalState, render } from '../core/index.js';
import  {data}  from '../assets/database/home.js';

const [aboutUsPart, latestPostPart, latestPortfolioPart, testimonialsPart] =
data;

   
render(
    new Main(
        aboutUsPart.aboutUs,
        latestPostPart.latestPost,
        latestPortfolioPart.latestPortfolio,
        testimonialsPart.testimonials
    ),
    document.getElementById('root')
);
$('body').modalWindow({
    typeModal: 'success',
    closedModalOnFonClick: true,
    text: 'Subscribe to this blog and be the first to know about updates',
    autoShow: 10000
  });
