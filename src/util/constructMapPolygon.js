import hexToRgba from './hexToRgba.js';
import { colors } from '../config.js';

export function createObjectStyle() {
   const color = colors[Math.floor(Math.random() * colors.length)];
   return {
      fillColor: hexToRgba(color, 1),
      strokeColor: hexToRgba(color, 1),
      lineWidth: 1,
      zIndex: -1,
   };
}

async function constructMapPolygon(feature) {
   const geometry =
      feature.geometry.type === 'MultiPolygon'
         ? constructMultiPolygon(feature)
         : constructPolygon(feature);
   const { classification, classification_id: id } = feature.properties;
   const style = createObjectStyle(classification, id);
   return new H.map.Polygon(geometry, { style });
}

function constructPolygon(feature) {
   const { coordinates } = feature.geometry;
   const output = coordinates[0].map((x) => [x[1], x[0], 0]).flat();
   const lineString = new H.geo.LineString(output);
   return new H.geo.Polygon(lineString);
}

function constructMultiPolygon(feature) {
   const { coordinates } = feature.geometry;
   const multiPolygons = coordinates.map(([row]) => {
      const output = row.map((x) => [x[1], x[0], 0]).flat();
      const lineString = new H.geo.LineString(output);
      return new H.geo.Polygon(lineString);
   });
   return new H.geo.MultiPolygon(multiPolygons);
}

export default constructMapPolygon;
