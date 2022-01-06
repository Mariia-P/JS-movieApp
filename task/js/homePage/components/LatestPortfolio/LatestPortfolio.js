import { Component } from '../../../core/index.js';
import { Title } from '../Title/Title.js';
import { LatestPortfolioContent } from '../LatestPortfolio/LatestPortfolioContent/LatestPortfolioContent.js';

export class LatestPortfolio extends Component {
    constructor({ title, cards }) {
        super({
            tagName: 'section',
            className: 'portfolio',
            id: 'portfolio',
            children: [
                new Title(title),
                new LatestPortfolioContent(cards),   
            ]       
        });
    }
}