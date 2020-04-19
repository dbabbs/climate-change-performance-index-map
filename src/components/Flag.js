function getUrl(code) {
   return code.toLowerCase() === 'schengen'
      ? './static/flags/schengen.png'
      : `https://restcountries.eu/data/${code.toLowerCase()}.svg`;
}

const Flag = (code) => {
   return `<img class="flag" src="${getUrl(code)}" />`;
};

export default Flag;
