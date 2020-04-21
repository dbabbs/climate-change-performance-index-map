import vizManager from '../util/VizManager.js';

class Sidebar {
   constructor() {}

   populate() {
      const ranges = vizManager.getRange();
      const colors = vizManager.getColors();

      const legend = document.querySelector('.legend');
      const legendText = document.querySelector('.legend-text');

      legend.style.gridTemplateColumns = `repeat(${ranges.length}, 1fr)`;
      legendText.style.gridTemplateColumns = `repeat(${ranges.length}, 1fr)`;
      for (let i = 0; i < ranges.length; i++) {
         const block = document.createElement('div');

         if (i == 0) {
            block.style.borderTopLeftRadius = 'var(--border-radius)';
            block.style.borderBottomLeftRadius = 'var(--border-radius)';
         } else if (i === ranges.length - 1) {
            block.style.borderTopRightRadius = 'var(--border-radius)';
            block.style.borderBottomRightRadius = 'var(--border-radius)';
         }
         block.classList.add('block');
         block.style.background = colors[i];
         legend.appendChild(block);

         const label = document.createElement('p');
         label.style.display = 'block';
         label.innerText = vizManager.getLabels()[i];
         legendText.appendChild(label);
      }
   }

   removeShine() {
      const nodes = document.querySelectorAll('.shine');
      [...nodes].forEach((node) => {
         node.classList.remove('shine');
      });
   }
}

export default Sidebar;
