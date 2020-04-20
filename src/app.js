import Tooltip from './components/Tooltip.js';
import Map from './components/Map.js';
import data from './data/data.js';
import fetchBoundaries from './data/fetchBoundaries.js';
const tooltip = new Tooltip();
const map = new Map(tooltip);

import colorUtility from './util/ColorUtility.js';

(async () => {
   const codes = data.map((x) => x.code);
   const vals = data.map((x) => x.value);

   const boundaries = await fetchBoundaries(codes);

   const [min, max] = [Math.min(...vals), Math.max(...vals)];
   colorUtility.setRange({ min, max });
   constructLegend({ min, max });
   boundaries.features
      .map((x) => {
         x.properties = data.find((z) => x.properties.ADM0_A3 === z.code);
         return x;
      })
      .forEach((country) => {
         map.addObject(country);
      });
   removeShine();
})();

function removeShine() {
   const nodes = document.querySelectorAll('.shine');
   [...nodes].forEach((node) => {
      node.classList.remove('shine');
   });
}

function constructLegend({ min, max }) {
   const ranges = colorUtility.getRange();
   const colors = colorUtility.getColors();

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
      label.innerText = ranges[i].toFixed(0);
      legendText.appendChild(label);
   }
}
