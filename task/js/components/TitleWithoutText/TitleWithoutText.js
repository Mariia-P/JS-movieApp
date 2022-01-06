import { Component } from '../../core/index.js';

export class TitleWithoutText extends Component {
    constructor( title ) {
        super({
            className: 'title',
            html: ` 
                <h2 class="title__header">${title.titleName}</h2>
                        <div class="title__line">
                            <svg height="${title.height}" width="${title.width}">
                                <polyline
                                    points="${title.points}"
                                    style="fill: none; stroke: #4d4949; stroke-width: 1"
                                />
                            </svg>
                        </div>
            `
        });

    }

}

