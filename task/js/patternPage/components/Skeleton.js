import { Component } from '../../core/index.js';

export class Skeleton extends Component {
  constructor() {
   
    super({
      className: 'skeleton',
      html: `
            
            <p class="film__select">Please select a film to see information</p>
            <div class="skeleton">
                <div class="pulse skeleton__header">
                    <div class="pulse skeleton__circle"></div>
                    <div class="pulse skeleton__mini"></div>
                </div>
                <div class="pulse skeleton__block"></div>
                <div class="pulse skeleton__block"></div>
                <div class="pulse skeleton__block"></div>
            </div>
            
        
            `
    });
  }
}
