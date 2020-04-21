class VizManager {
   constructor() {
      this.min = 0;
      this.max = 0;

      this.colors = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'];
      this.range = [41.17, 48.05, 60.6, 75.77];
      this.labels = ['Very Low', 'Low', 'Medium', 'High'];
   }

   getColors() {
      return this.colors;
   }

   setRange({ min, max }) {
      this.min = min;
      this.max = max;
   }

   getLabels() {
      return this.labels;
   }

   getRange() {
      return this.range;
   }

   get(val) {
      const intervals = this.range;
      for (let i = 0; i < intervals.length; i++) {
         if (val <= intervals[i]) {
            return this.colors[i];
         }
      }
      return '#fff';
   }
}

const util = new VizManager();

export default util;
