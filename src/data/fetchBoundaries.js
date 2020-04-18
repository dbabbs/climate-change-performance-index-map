import { credentials } from '../config.js';
import jsonFetcher from '../util/fetch.js';

async function fetchBoundaries(codes) {
   const base = `https://xyz.api.here.com/hub/spaces/${credentials.id}/search?access_token=${credentials.token}`;
   const url = base + codes.map((code) => `&tags=ADM0_A3@${code}`).join(',');
   const data = await jsonFetcher(url);
   return data;
}

export default fetchBoundaries;
