var serviceWorkerOption = {
  "assets": [
    "/assets/brand/brand-logo-c92a08bc.png",
    "/src/client/components/Create/link-489c0a4e.png",
    "/main.css",
    "/bundle.js",
    "/assets/brand/brand-logo.png",
    "/assets/common/icon-info.svg",
    "/assets/common/icon-downarrow.png",
    "/assets/common/icon-like.png",
    "/assets/common/icon-leftarrow.png",
    "/assets/common/icon-list.png",
    "/assets/fonts/JosefinSans-Regular.ttf",
    "/assets/common/icon-reject.png",
    "/assets/login/login-google.svg",
    "/assets/login/login-facebook.svg",
    "/assets/fonts/JosefinSans-SemiBold.ttf",
    "/assets/common/worldmap.jpg",
    "/assets/places/default.jpg",
    "/assets/trips/Singapore.jpg",
    "/assets/fonts/Gloss_And_Bloom.ttf",
    "/assets/login/bg-login.png"
  ]
};
        
        !function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/",e(e.s=0)}([function(t,n,e){(function(t){var n,e=t.serviceWorkerOption.assets,r=(new Date).toISOString(),i=[].concat(function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(n=e)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}(),["./"]);i=i.map((function(n){return new URL(n,t.location).toString()})),self.addEventListener("install",(function(n){n.waitUntil(t.caches.open(r).then((function(t){return t.addAll(i)})).then((function(){0})).catch((function(t){throw console.error(t),t})))})),self.addEventListener("activate",(function(n){n.waitUntil(t.caches.keys().then((function(n){return Promise.all(n.map((function(n){return 0===n.indexOf(r)?null:t.caches.delete(n)})))})))})),self.addEventListener("message",(function(t){switch(t.data.action){case"skipWaiting":self.skipWaiting&&(self.skipWaiting(),self.clients.claim())}})),self.addEventListener("fetch",(function(n){var e=n.request;if("GET"===e.method){var i=new URL(e.url);if(i.origin===location.origin){var o=t.caches.match(e).then((function(i){return i||fetch(e).then((function(n){if(!n||!n.ok)return n;var i=n.clone();return t.caches.open(r).then((function(t){return t.put(e,i)})).then((function(){0})),n})).catch((function(){return"navigate"===n.request.mode?t.caches.match("./"):null}))}));n.respondWith(o)}}}))}).call(this,e(1))},function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e}]);