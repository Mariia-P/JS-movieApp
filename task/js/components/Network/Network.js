import { Component } from '../../core/index.js';

export class Network extends Component {
    constructor({
        classExtra = ''
    }) {
        super({
            className: `network ${classExtra}`,
            html: ` 
            <a href="https://www.facebook.com/EPAM.Ukraine/" target="_blank">
                <img
                class="network__link"
                src="./img/HomePage/icon/a-icon-facebook.svg"
                alt="facebook"
            /></a>

            <a href="https://training.epam.ua/" target="_blank"><img
                class="network__link"
                src="./img/HomePage/icon/a-icon-dribbble.svg"
                alt="dribbble"
            /></a>
           
            <a href="https://www.instagram.com/epam_ukraine/?hl=ru" target="_blank">
                <img
                class="network__link"
                src="./img/HomePage/icon/a-icon-instagram.svg"
                alt="instagram"
            /></a>
            `
        });
    }
}
