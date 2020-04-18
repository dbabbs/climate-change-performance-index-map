import {
   credentials,
   center,
   zoom,
   minZoom,
   maxZoom,
   mobileActive,
} from '../config.js';
import constructMapPolygon from '../util/constructMapPolygon.js';
class Map {
   constructor(tooltip) {
      this.platform = new H.service.Platform({ apikey: credentials.apikey });
      const defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(
         document.querySelector('.map'),
         defaultLayers.vector.normal.map,
         {
            center,
            zoom,
            pixelRatio: window.devicePixelRatio || 1,
         }
      );
      window.addEventListener('resize', () => this.map.getViewPort().resize());
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      const provider = this.map.getBaseLayer().getProvider();
      const style = new H.map.Style('../static/map-style/scene.yaml');
      provider.setStyle(style);

      defaultLayers.vector.normal.map.setMax(maxZoom);
      defaultLayers.vector.normal.map.setMin(minZoom);

      this.tooltip = tooltip;

      document.querySelector('.H_logo').onclick = () => {
         window.open(
            'https://developer.here.com/freemium?cid=Coronavirus-coronavirusmap-CM-0-Dev-&utm_source=coronavirusmap&utm_medium=referral&utm_campaign=Online_Coronavirus_Dev_2020',
            '_blank'
         );
      };

      this.objectProvider = new H.map.provider.LocalObjectProvider();
      this.objectLayer = new H.map.layer.ObjectLayer(this.objectProvider);
      this.interleave(this.map);
   }

   async addObject(feature) {
      const object = await constructMapPolygon(feature);

      object.addEventListener('pointerenter', (evt) => {
         if (!mobileActive()) {
            const { clientX: x, clientY: y } = evt.originalEvent;
            this.tooltip.show();
            this.tooltip.position({ x, y });
            console.log(feature.properties);
            this.tooltip.setContent(feature.properties);
         }
      });

      object.addEventListener('pointermove', (evt) => {
         if (!mobileActive()) {
            const { clientX: x, clientY: y } = evt.originalEvent;
            this.tooltip.position({ x, y });
         }
      });

      object.addEventListener('pointerleave', () => {
         if (!mobileActive()) {
            this.tooltip.hide();
         }
      });

      object.addEventListener('tap', () => {
         if (mobileActive()) {
            this.tooltip.showMobile();
            this.tooltip.setMobileContent(feature.properties);
         }
      });

      this.objectProvider.getRootGroup().addObject(object);
   }

   interleave(map) {
      const provider = this.map.getBaseLayer().getProvider();
      const style = provider.getStyle();
      return new Promise((resolve) => {
         const changeListener = () => {
            if (style.getState() === H.map.Style.State.READY) {
               style.removeEventListener('change', changeListener);
               map.addLayer(this.objectLayer);

               const labels = new H.map.Style(style.extractConfig('places'));
               const labelsLayer = this.platform
                  .getOMVService()
                  .createLayer(labels);
               map.addLayer(labelsLayer);
               resolve();
            }
         };
         style.addEventListener('change', changeListener);
      });
   }
}

export default Map;
