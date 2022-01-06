import { Component } from '../../../../core/index.js';

export class TextContent extends Component {
  constructor(comment, overview) {
    super({
      className: 'main__text-wrapper'
    });
    const textList = this._drawTextList(comment, overview);
    this.html(textList);
  }
  _drawTextList(comment, overview) {
    let commentParts = comment.split(/\r\n+/gm);
    commentParts.push(`<p class="main__text">${overview}</p>`)
    
    commentParts=commentParts.filter(part=>part!=="");
    // console.log('[overviewParts]', commentParts);
    return commentParts
      .map((paragraph, idx) => {
        let part;
        switch (idx) {
          case (0, 1, 2):
            part = `<p class="main__text">${paragraph}</p>`;
            break;

          case 3:
            part = `<div class="main__text-offset"><p class="main__text">${paragraph}</p></div>`;
            break;

          default:
            part = `<p class="main__text">${paragraph}</p>`;
            break;
        }
        return part;
      })
      .join('');
  }
}
