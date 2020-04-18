import Flag from './Flag.js';

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
      this.tooltip.innerHTML = `
      <div class="title-row">
         <div class="title">${name}</div>
         ${Flag(code)}
      </div>
      <div class="description">${value} </div>`;
   }

   setMobileContent({ name, code, value }) {
      this.mobileTooltip.innerHTML = `
      <div class="title-row">
         <div class="flex-align">
            ${Flag(code)}
            <div style="margin-left: 5px" class="title">${name}</div>
         </div>
         <img src="./static/icons/close.svg" class="close-button">
      </div>
      <div class="description">${value} </div>`;
      document.querySelector('.close-button').onclick = () => this.hideMobile();
   }
}

export default Tooltip;
