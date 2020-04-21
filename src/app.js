import Tooltip from './components/Tooltip.js';
import Map from './components/Map.js';
import data from './data/data.js';
import fetchBoundaries from './data/fetchBoundaries.js';
import vizManager from './util/VizManager.js';
import Sidebar from './components/Sidebar.js';

const tooltip = new Tooltip();
const map = new Map(tooltip);
const sidebar = new Sidebar();

(async () => {
   const codes = data.map((x) => x.code);
   const vals = data.map((x) => x.value);

   const boundaries = await fetchBoundaries(codes);

   const [min, max] = [Math.min(...vals), Math.max(...vals)];
   vizManager.setRange({ min, max });
   boundaries.features
      .map((x) => {
         x.properties = data.find((z) => x.properties.ADM0_A3 === z.code);
         return x;
      })
      .forEach((country) => {
         map.addObject(country);
      });

   sidebar.removeShine();
   sidebar.populate();
})();
