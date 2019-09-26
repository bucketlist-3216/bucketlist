var serviceWorkerOption = {
  "assets": [
    "/assets/brand/brand-logo-c92a08bc.png",
    "/src/client/components/Create/link-489c0a4e.png",
    "/main.css",
    "/bundle.js",
    "/assets/brand/brand-logo.png",
    "/assets/common/icon-info.svg",
    "/assets/common/icon-downarrow.png",
    "/assets/common/icon-leftarrow.png",
    "/assets/common/icon-like.png",
    "/assets/common/icon-list.png",
    "/assets/fonts/JosefinSans-Regular.ttf",
    "/assets/common/icon-reject.png",
    "/assets/common/worldmap.jpg",
    "/assets/login/login-google.svg",
    "/assets/fonts/JosefinSans-SemiBold.ttf",
    "/assets/places/default.jpg",
    "/assets/login/login-facebook.svg",
    "/assets/trips/Singapore.jpg",
    "/assets/login/bg-login.png",
    "/assets/fonts/Gloss_And_Bloom.ttf"
  ]
};
        
        !function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=0)}([function(e,n,t){(function(e){var n,t=e.serviceWorkerOption.assets,o=(new Date).toISOString(),r=[].concat(function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(n=t)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}(),["./"]);r=r.map((function(n){return new URL(n,e.location).toString()})),self.addEventListener("install",(function(n){console.log("[SW] Install event"),n.waitUntil(e.caches.open(o).then((function(e){return e.addAll(r)})).then((function(){console.log("Cached assets: main",r)})).catch((function(e){throw console.error(e),e})))})),self.addEventListener("activate",(function(n){console.log("[SW] Activate event"),n.waitUntil(e.caches.keys().then((function(n){return Promise.all(n.map((function(n){return 0===n.indexOf(o)?null:e.caches.delete(n)})))})))})),self.addEventListener("message",(function(e){switch(e.data.action){case"skipWaiting":self.skipWaiting&&(self.skipWaiting(),self.clients.claim())}})),self.addEventListener("fetch",(function(n){var t=n.request;if("GET"===t.method){var r=new URL(t.url);if(location.origin==location.origin){var c=e.caches.match(t).then((function(c){return c?(console.log("[SW] fetch URL ".concat(r.href," from cache")),c):fetch(t).then((function(n){if(!n||!n.ok)return console.log("[SW] URL [".concat(r.toString(),"] wrong responseNetwork: ").concat(n.status," ").concat(n.type)),n;console.log("[SW] URL ".concat(r.href," fetched"));var c=n.clone();return e.caches.open(o).then((function(e){return e.put(t,c)})).then((function(){console.log("[SW] Cache asset: ".concat(r.href))})),n})).catch((function(){return"navigate"===n.request.mode?e.caches.match("./"):null}))}));n.respondWith(c)}else console.log("[SW] Ignore difference origin ".concat(r.origin))}else console.log("[SW] Ignore non GET request ".concat(t.method))}))}).call(this,t(1))},function(e,n){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t}]);