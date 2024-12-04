if(!self.define){let e,t={};const s=(s,n)=>(s=new URL(s+".js",n).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let o={};const c=e=>s(e,r),a={module:{uri:r},exports:o,require:c};t[r]=Promise.all(n.map((e=>a[e]||c(e)))).then((e=>(i(...e),o)))}}define([],(function(){"use strict";try{self["workbox:core:7.2.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.2.0"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=s(e)}}class i extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class r{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let o=r&&r.handler;const c=e.method;if(!o&&this.i.has(c)&&(o=this.i.get(c)),!o)return;let a;try{a=o.handle({url:s,request:e,event:t,params:i})}catch(e){a=Promise.reject(e)}const h=r&&r.catchHandler;return a instanceof Promise&&(this.o||h)&&(a=a.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:i})}catch(e){e instanceof Error&&(n=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw n}))),a}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const o=r.match({url:e,sameOrigin:t,request:s,event:n});if(o)return i=o,(Array.isArray(i)&&0===i.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let o;const c=()=>(o||(o=new r,o.addFetchListener(),o.addCacheListener()),o);function a(e,s,r){let o;if("string"==typeof e){const t=new URL(e,location.href);o=new n((({url:e})=>e.href===t.href),s,r)}else if(e instanceof RegExp)o=new i(e,s,r);else if("function"==typeof e)o=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});o=e}return c().registerRoute(o),o}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch(e){}class h{constructor(e={}){this.h=e.statuses,this.l=e.headers}isResponseCacheable(e){let t=!0;return this.h&&(t=this.h.includes(e.status)),this.l&&t&&(t=Object.keys(this.l).some((t=>e.headers.get(t)===this.l[t]))),t}}try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}const l={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null},u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter((e=>e&&e.length>0)).join("-"),d=e=>e||f(u.precache),w=e=>e||f(u.runtime);function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class y{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;function m(e){return"string"==typeof e?new Request(e):e}class v{constructor(e,t){this.u={},Object.assign(this,t),this.event=t.event,this.p=e,this.m=new y,this.v=[],this.R=[...e.plugins],this.q=new Map;for(const e of this.R)this.q.set(e,{});this.event.waitUntil(this.m.promise)}async fetch(e){const{event:s}=this;let n=m(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this.p.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw i&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:i.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=m(e);let s;const{cacheName:n,matchOptions:i}=this.p,r=await this.getCacheKey(t,"read"),o=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,o);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const n=m(e);var i;await(i=0,new Promise((e=>setTimeout(e,i))));const r=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(o=r.url,new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var o;const c=await this.U(s);if(!c)return!1;const{cacheName:a,matchOptions:h}=this.p,l=await self.caches.open(a),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,n){const i=p(t.url,s);if(t.url===i)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),o=await e.keys(t,r);for(const t of o)if(i===p(t.url,s))return e.match(t,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:a,oldResponse:f,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.u[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=m(await e({mode:t,request:n,event:this.event,params:this.params}));this.u[s]=n}return this.u[s]}hasCallback(e){for(const t of this.p.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.p.plugins)if("function"==typeof t[e]){const s=this.q.get(t),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return t[e](i)};yield n}}waitUntil(e){return this.v.push(e),e}async doneWaiting(){let e;for(;e=this.v.shift();)await e}destroy(){this.m.resolve(null)}async U(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class b{constructor(e={}){this.cacheName=w(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,i=new v(this,{event:t,request:s,params:n}),r=this.L(i,s,t);return[r,this._(r,i,s,t)]}async L(e,s,n){let i;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(i=await this.C(s,e),!i||"error"===i.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:t,event:n,request:s}),i)break;if(!i)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))i=await t({event:n,request:s,response:i});return i}async _(e,t,s,n){let i,r;try{i=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),t.destroy(),r)throw r}}function R(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}function q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class U{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class L{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this.j.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this.j=e}}let x,E;async function C(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const i=e.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},o=s?s(r):r,c=function(){if(void 0===x){const e=new Response("");if("body"in e)try{new Response(e.body),x=!0}catch(e){x=!1}x=!1}return x}()?i.body:await i.blob();return new Response(c,o)}class j extends b{constructor(e={}){e.cacheName=d(e.cacheName),super(e),this.N=!1!==e.fallbackToNetwork,this.plugins.push(j.copyRedirectedCacheableResponsesPlugin)}async C(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this.O(e,t):await this.T(e,t))}async T(e,s){let n;const i=s.params||{};if(!this.N)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=i.integrity,r=e.integrity,o=!r||r===t;n=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&o&&"no-cors"!==e.mode&&(this.W(),await s.cachePut(e,n.clone()))}return n}async O(e,s){this.W();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}W(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==j.copyRedirectedCacheableResponsesPlugin&&(n===j.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(j.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}j.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},j.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await C(e):e};class N{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.P=new Map,this.S=new Map,this.K=new Map,this.p=new j({cacheName:d(e),plugins:[...t,new L({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.p}precache(e){this.addToCacheList(e),this.k||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.k=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=q(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.P.has(i)&&this.P.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.P.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.K.has(e)&&this.K.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.K.set(e,n.integrity)}if(this.P.set(i,e),this.S.set(i,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return R(e,(async()=>{const t=new U;this.strategy.plugins.push(t);for(const[t,s]of this.P){const n=this.K.get(s),i=this.S.get(t),r=new Request(t,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return R(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.P.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.P}getCachedURLs(){return[...this.P.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.P.get(t.href)}getIntegrityForCacheKey(e){return this.K.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const O=()=>(E||(E=new N),E);class T extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const i of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const o=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield o.href,s&&o.pathname.endsWith("/")){const e=new URL(o.href);e.pathname+=s,yield e.href}if(n){const e=new URL(o.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(i);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}var W;self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),W={},function(e){O().precache(e)}([{url:"app.bundle.js",revision:"d017da8da29866a854165101ed9e32ed"},{url:"app.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app.webmanifest.json",revision:"b89f44a7d6f9625c06aa9b59b2e7d80c"},{url:"bd6b63650298f334a08b.jpg",revision:null},{url:"data/DATA.json",revision:"0760fae8cf2d2b172678847987d1d95c"},{url:"favicon.png",revision:"27f4ec3f0210dfdd4e49b606b09cb093"},{url:"icons/icon-128x128.png",revision:"34d9d8d646af9f294d968811da10e546"},{url:"icons/icon-144x144.png",revision:"2dd174daa627ee198c37c9dfe8cdc34d"},{url:"icons/icon-152x152.png",revision:"42ee3d984a8d535d697ccbb4428e8647"},{url:"icons/icon-192x192.png",revision:"923e1610b9d68d2445eb28d6e0f54aaa"},{url:"icons/icon-384x384.png",revision:"7f775b04df567c8d90c9bad2c89e2d81"},{url:"icons/icon-512x512.png",revision:"f6705cd9d5d52d8483a2bf9b47cb5f60"},{url:"icons/icon-72x72.png",revision:"1d463ddf39f394788393e31e1f0e9dbc"},{url:"icons/icon-96x96.png",revision:"7619371082a792ebb06768c13bf094bf"},{url:"images/heros/hero-image_1.jpg",revision:"a2f444d9e2e43a5d0373b1a0d8cb2236"},{url:"images/heros/hero-image_2.jpg",revision:"49f78cae81de4f48caf1c2fe0271c828"},{url:"images/heros/hero-image_3.jpg",revision:"d232e05589056e05f52cf2689f315c6c"},{url:"images/heros/hero-image_4.jpg",revision:"4ea98fe648a0b853ab379c928b5fd0bf"},{url:"index.html",revision:"ef9ce155d9f41d67f900a86762e96c91"}]),function(e){const t=O();a(new T(t,e))}(W),a(/^https:\/\/restaurant-api.dicoding.dev\//,new class extends b{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(l)}async C(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(n);let i,r=await s.cacheMatch(e);if(r);else try{r=await n}catch(e){e instanceof Error&&(i=e)}if(!r)throw new t("no-response",{url:e.url,error:i});return r}}({cacheName:"api-cache",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this.I.isResponseCacheable(e)?e:null,this.I=new h(e)}}({statuses:[200]})]}),"GET")}));
//# sourceMappingURL=sw.workbox.js.map
