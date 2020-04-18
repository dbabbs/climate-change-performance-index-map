import Tooltip from './components/Tooltip.js';
import Map from './components/Map.js';
import data from './data/data.js';
import fetchBoundaries from './data/fetchBoundaries.js';
const tooltip = new Tooltip();
const map = new Map(tooltip);

import color from './util/ColorUtility.js';

(async () => {
   const codes = data.map((x) => x.code);
   const boundaries = await fetchBoundaries(codes);

   const vals = data.map((x) => x.value);
   const [min, max] = [Math.min(...vals), Math.max(...vals)];

   color.set({ min, max });
   console.log(min, max);
   boundaries.features
      .map((x) => {
         x.properties = data.find((z) => x.properties.ADM0_A3 === z.code);
         return x;
      })
      .forEach((country) => {
         map.addObject(country);
      });
})();
