const credentials = {
   id: 'gpk6hVhN',
   token: 'AFKCs6eeSxSYhpbswZsUhgA',
   apikey: 'qHbGACVC8wUgzipkERYFIvbK8ASY9UhPsKSGTB7quRI',
};

const center = {
   lat: 10,
   lng: -0,
};
const zoom = 2;
const minZoom = 1;
const maxZoom = 5;

function mobileActive() {
   const mobileWidth = 500;
   return window.innerWidth <= mobileWidth;
}

export { credentials, center, zoom, minZoom, maxZoom, mobileActive };
