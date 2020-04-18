//500
const colors = ['#ffffcc', '#c2e699', '#78c679', '#238443'];

const credentials = {
   id: 'gpk6hVhN',
   token: 'AFKCs6eeSxSYhpbswZsUhgA',
   apikey: 'qHbGACVC8wUgzipkERYFIvbK8ASY9UhPsKSGTB7quRI',
};

const center = {
   lat: 40,
   lng: -0,
};
const zoom = 1;
const minZoom = 1;
const maxZoom = 4;

function mobileActive() {
   const mobileWidth = 420;
   return window.innerWidth <= mobileWidth;
}

function embedActive() {
   return !mobileActive() && window.innerHeight < 700;
}

export {
   colors,
   credentials,
   center,
   zoom,
   minZoom,
   maxZoom,
   mobileActive,
   embedActive,
};
