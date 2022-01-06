import { Component } from '../../core/index.js';

export class Button extends Component {
    constructor({
        //
        tagName = 'button',
        className,
        title,
        type = 'button',
        attrs = {},
        text,
        html,
        onClick
        //
    } = {}) {
        super({
            tagName,
            className: className,
            attrs: {
                type,
                title,
                ...attrs
            },
            text,
            html
        });

        this.addListeners({ click: onClick });
    }
}
