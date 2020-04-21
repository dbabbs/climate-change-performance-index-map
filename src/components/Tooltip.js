import Flag from './Flag.js';
import vizManager from '../util/VizManager.js';

class Tooltip {
   constructor() {
      this.tooltip = document.querySelector('.desktop-tooltip');
      this.mobileTooltip = document.querySelector('.mobile-tooltip');
   }

   showMobile() {
      this.mobileTooltip.style.transform = `translateY(0)`;
   }
   hideMobile() {
      this.mobileTooltip.style.transform = `translateY(-150%)`;
   }

   show() {
      this.tooltip.style.display = 'block';
   }

   position({ x, y }) {
      this.tooltip.style.top = y + 15;
      this.tooltip.style.left = x + 15;
   }

   hide() {
      this.tooltip.style.display = 'none';
   }

   setContent({ name, code, value }) {
      this.tooltip.style.borderTop = '4px solid ' + vizManager.get(value);
      this.tooltip.innerHTML = `
      <div class="title-row">
         <div class="title">${name}</div>
         ${Flag(code)}
      </div>
      <div class="separator"></div>
      <div class="description-row">
         <div class="key">CCPI Score</div>
         <div class="value">${value}</div>
      </div>`;
   }

   setMobileContent({ name, code, value }) {
      this.mobileTooltip.style.borderTop = '4px solid ' + vizManager.get(value);
      this.mobileTooltip.innerHTML = `
      <div class="title-row">
         <div class="flex-align">
            ${Flag(code)}
            <div style="margin-left: 10px" class="title">${name}</div>
         </div>
         <img src="./static/icons/close.svg" class="close-button">
      </div>
      <div class="separator"></div>
      <div class="description-row">
         <div class="key">CCPI Score</div>
         <div class="value">${value}</div>
      </div>`;
      document.querySelector('.close-button').onclick = () => this.hideMobile();
   }
}

export default Tooltip;
