import { Component } from '../../core/index.js';

export class Input extends Component {
    constructor({
        //
        className,
        type = 'text',
        autocomplete = 'off',
        name,
        placeholder,
        attrs = {}
        //
    } = {}) {
        super({
            tagName: 'input',
            className: className,
            attrs: {
                type,
                name,
                placeholder,
                autocomplete,
                ...attrs
            }
        });
    }
}
