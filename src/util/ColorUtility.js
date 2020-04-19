class ColorUtility {
   constructor() {
      this.min = 0;
      this.max = 0;

      this.colors = [
         '#d73027',
         '#fc8d59',
         '#fee08b',
         '#d9ef8b',
         '#91cf60',
         '#1a9850',
      ];
   }

   getColors() {
      return this.colors;
   }

   setRange({ min, max }) {
      this.min = min;
      this.max = max;
   }

   getRange() {
      const steps = this.colors.length;
      const interval = (this.max - this.min) / steps;
      const intervals = Array(steps)
         .fill(0)
         .map((x, i) => this.min + (i + 1) * interval);
      return intervals;
   }

   get(val) {
      const intervals = this.getRange();
      for (let i = 0; i < intervals.length; i++) {
         if (val <= intervals[i]) {
            return this.colors[i];
         }
      }
      return '#fff';
   }
}

const util = new ColorUtility();

export default util;
