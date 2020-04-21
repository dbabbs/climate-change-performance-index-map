import hexToRgba from './hexToRgba.js';
import vizManager from './VizManager.js';

export function createObjectStyle(value) {
   const color = vizManager.get(value);
   return {
      fillColor: hexToRgba(color, 0.9),
      strokeColor: 'rgb(175, 175, 175)', //hexToRgba(color, 1),
      lineWidth: 1,
      zIndex: -1,
   };
}

async function constructMapPolygon(feature) {
   const geometry =
      feature.geometry.type === 'MultiPolygon'
         ? constructMultiPolygon(feature)
         : constructPolygon(feature);
   const { value } = feature.properties;
   const style = createObjectStyle(value);
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
