class ColorUtility {
   constructor() {
      this.min = 0;
      this.max = 0;
   }

   set({ min, max }) {
      this.min = min;
      this.max = max;
   }

   getColor(val) {
      return '#fff';
   }
}

const util = new ColorUtility();

export default util;
