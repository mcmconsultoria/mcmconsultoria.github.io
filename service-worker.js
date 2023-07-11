// Versão do Service Worker
const CACHE_VERSION = 'mcm_cache_';
const CACHE_NAME = `cache-${CACHE_VERSION}`;

// Lista de recursos para armazenar em cache
const urlsToCache = [
    '/',
    'index.html',
    'assets/css/flex-center.css',
    'assets/css/flex-column-center.css',
    'assets/css/left.css',
    'assets/css/right.css',
    'assets/css/fonts.css',
    'assets/css/footer.css',
    'assets/css/sections.css',
    'assets/css/style.css',
    'assets/favicons/android-chrome-192x192.png',
    'assets/favicons/android-chrome-512x512.png',
    'assets/fonts/Hind-Bold.ttf',
    'assets/fonts/Hind-Light.ttf',
    'assets/fonts/Hind-Medium.ttf',
    'assets/fonts/Hind-Regular.ttf',
    'assets/fonts/Hind-SemiBold.ttf',
    'assets/images/boticario-large.svg',
    'assets/images/boticario-medium.svg',
    'assets/images/boticario-small.svg',
    'assets/images/cosmetico.jpg',
    'assets/images/cosmetico.svg',
    'assets/images/download.svg',
    'assets/images/eudora-large.svg',
    'assets/images/eudora-medium.svg',
    'assets/images/eudora-small.svg',
    'assets/images/eye.svg',
    'assets/images/instagram.svg',
    'assets/images/mail.svg',
    'assets/images/marilia.jpg',
    'assets/images/natura-large.svg',
    'assets/images/natura-medium.svg',
    'assets/images/natura-small.svg',
    'assets/images/pinterest.svg',
    'assets/images/seta.svg',
    'assets/images/shopping-bag.svg',
    'assets/images/shopping-cart.svg',
    'assets/images/shopping-cart-white.svg',
    'assets/images/verificado-boticario.svg',
    'assets/images/verificado-eudora.svg',
    'assets/images/verificado-natura.svg',
    'assets/images/verificado-principal.svg',
    'assets/images/whats-app.svg',
    'assets/pdf/boticario.pdf',
    'assets/pdf/eudora.pdf',
    'assets/pdf/natura.pdf',
    'pages/boticario.html',
    'pages/eudora.html',
    'pages/natura.html',
];

// Evento de instalação do Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Armazena em cache os recursos definidos
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            // Remove caches antigos, caso existam
            return Promise.all(
                cacheNames.filter((name) => {
                    return name !== CACHE_NAME;
                }).map((name) => {
                    return caches.delete(name);
                })
            );
        })
    );
});

// Evento fetch para interceptar solicitações de rede
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna a resposta armazenada em cache, se existir
                if (response) {
                    return response;
                }

                // Caso contrário, busca a solicitação na rede
                return fetch(event.request);
            })
    );
});
