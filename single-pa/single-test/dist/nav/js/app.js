(function(t,e){if("object"===typeof exports&&"object"===typeof module)module.exports=e(require("vuex"),require("vue-router"),require("vue"));else if("function"===typeof define&&define.amd)define(["vuex","vue-router","vue"],e);else{var n="object"===typeof exports?e(require("vuex"),require("vue-router"),require("vue")):e(t["vuex"],t["vue-router"],t["vue"]);for(var r in n)("object"===typeof exports?exports:t)[r]=n[r]}})(window,(function(t,e,n){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/nav/",n(n.s=0)}({0:function(t,e,n){n("9bf1"),t.exports=n("56d7")},"0446":function(t,e,n){var r=n("da06"),o=n("5bb7"),i=n("7d53"),c=i("iterator");t.exports=function(t){if(void 0!=t)return t[c]||t["@@iterator"]||o[r(t)]}},"083f":function(t,e,n){var r=n("7526");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"0a1e":function(t,e,n){"use strict";var r=n("5428"),o=n("abdf"),i=n("7d53"),c=n("d4cb"),a=i("species");t.exports=function(t){var e=r(t),n=o.f;c&&e&&!e[a]&&n(e,a,{configurable:!0,get:function(){return this}})}},"0c47":function(t,e,n){var r=n("c91c"),o=n("b17e");t.exports=Object.keys||function(t){return r(t,o)}},"0e39":function(t,e,n){var r=n("f1a7"),o=n("37d1"),i=n("332c"),c=n("802e"),a=i("IE_PROTO"),u=Object.prototype;t.exports=c?Object.getPrototypeOf:function(t){return t=o(t),r(t,a)?t[a]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},"0e93":function(t,e){t.exports=!1},"0ed3":function(t,e,n){"use strict";function r(t,e){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],c=i[0],a=i[1],u=i[2],f=i[3],s={id:t+":"+o,css:a,media:u,sourceMap:f};r[c]?r[c].parts.push(s):n.push(r[c]={id:c,parts:[s]})}return n}n.r(e),n.d(e,"default",(function(){return v}));var o="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},c=o&&(document.head||document.getElementsByTagName("head")[0]),a=null,u=0,f=!1,s=function(){},p=null,l="data-vue-ssr-id",d="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(t,e,n,o){f=n,p=o||{};var c=r(t,e);return h(c),function(e){for(var n=[],o=0;o<c.length;o++){var a=c[o],u=i[a.id];u.refs--,n.push(u)}e?(c=r(t,e),h(c)):c=[];for(o=0;o<n.length;o++){u=n[o];if(0===u.refs){for(var f=0;f<u.parts.length;f++)u.parts[f]();delete i[u.id]}}}}function h(t){for(var e=0;e<t.length;e++){var n=t[e],r=i[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(y(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var c=[];for(o=0;o<n.parts.length;o++)c.push(y(n.parts[o]));i[n.id]={id:n.id,refs:1,parts:c}}}}function b(){var t=document.createElement("style");return t.type="text/css",c.appendChild(t),t}function y(t){var e,n,r=document.querySelector("style["+l+'~="'+t.id+'"]');if(r){if(f)return s;r.parentNode.removeChild(r)}if(d){var o=u++;r=a||(a=b()),e=g.bind(null,r,o,!1),n=g.bind(null,r,o,!0)}else r=b(),e=x.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function g(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,o);else{var i=document.createTextNode(o),c=t.childNodes;c[e]&&t.removeChild(c[e]),c.length?t.insertBefore(i,c[e]):t.appendChild(i)}}function x(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),p.ssrId&&t.setAttribute(l,e.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}},"157c":function(t,e,n){var r=n("7526");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},"174d":function(t,e,n){"use strict";var r=n("d4cb"),o=n("72df"),i=n("0c47"),c=n("2402"),a=n("e129"),u=n("37d1"),f=n("83a6"),s=Object.assign,p=Object.defineProperty;t.exports=!s||o((function(){if(r&&1!==s({b:1},s(p({},"a",{enumerable:!0,get:function(){p(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol(),o="abcdefghijklmnopqrst";return t[n]=7,o.split("").forEach((function(t){e[t]=t})),7!=s({},t)[n]||i(s({},e)).join("")!=o}))?function(t,e){var n=u(t),o=arguments.length,s=1,p=c.f,l=a.f;while(o>s){var d,v=f(arguments[s++]),h=p?i(v).concat(p(v)):i(v),b=h.length,y=0;while(b>y)d=h[y++],r&&!l.call(v,d)||(n[d]=v[d])}return n}:s},"185a":function(t,e,n){var r=n("d4cb"),o=n("e129"),i=n("9618"),c=n("378c"),a=n("083f"),u=n("f1a7"),f=n("7c3f"),s=Object.getOwnPropertyDescriptor;e.f=r?s:function(t,e){if(t=c(t),e=a(e,!0),f)try{return s(t,e)}catch(n){}if(u(t,e))return i(!o.f.call(t,e),t[e])}},1884:function(t,e,n){function r(t,e){const n=document.createElement("a");n.href=t;const r="/"===n.pathname[0]?n.pathname:"/"+n.pathname;let o=0,i=r.length;while(o!==e&&i>=0){const t=r[--i];"/"===t&&o++}if(o!==e)throw Error("systemjs-webpack-interop: rootDirectoryLevel ("+e+") is greater than the number of directories ("+o+") in the URL path "+t);const c=r.slice(0,i+1);return n.protocol+"//"+n.host+c}e.setPublicPath=function(t,e){if(e||(e=1),"string"!==typeof t||0===t.trim().length)throw Error("systemjs-webpack-interop: setPublicPath(systemjsModuleName) must be called with a non-empty string 'systemjsModuleName'");if("number"!==typeof e||e<=0||isNaN(e)||!o(e))throw Error("systemjs-webpack-interop: setPublicPath(systemjsModuleName, rootDirectoryLevel) must be called with a positive integer 'rootDirectoryLevel'");let i;try{if(i=window.System.resolve(t),!i)throw Error()}catch(c){throw Error("systemjs-webpack-interop: There is no such module '"+t+"' in the SystemJS registry. Did you misspell the name of your module?")}n.p=r(i,e)},e.resolveDirectory=r;const o=Number.isInteger||function(t){return"number"===typeof t&&isFinite(t)&&Math.floor(t)===t}},"1d2e":function(t,e,n){var r=n("64e4");t.exports=/web0s(?!.*chrome)/i.test(r)},"1d8a":function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},"1f5e":function(t,e,n){var r=n("378c"),o=n("b495"),i=n("9a0f"),c=function(t){return function(e,n,c){var a,u=r(e),f=o(u.length),s=i(c,f);if(t&&n!=n){while(f>s)if(a=u[s++],a!=a)return!0}else for(;f>s;s++)if((t||s in u)&&u[s]===n)return t||s||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},2007:function(t,e,n){var r=n("6b1d"),o=n("174d");r({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},2117:function(t,e,n){var r=n("8697");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},2402:function(t,e){e.f=Object.getOwnPropertySymbols},2435:function(t,e,n){var r,o,i,c=n("f498"),a=n("72df"),u=n("2117"),f=n("9324"),s=n("f2bf"),p=n("e03e"),l=n("f117"),d=c.location,v=c.setImmediate,h=c.clearImmediate,b=c.process,y=c.MessageChannel,m=c.Dispatch,g=0,x={},w="onreadystatechange",j=function(t){if(x.hasOwnProperty(t)){var e=x[t];delete x[t],e()}},O=function(t){return function(){j(t)}},S=function(t){j(t.data)},E=function(t){c.postMessage(t+"",d.protocol+"//"+d.host)};v&&h||(v=function(t){var e=[],n=1;while(arguments.length>n)e.push(arguments[n++]);return x[++g]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},r(g),g},h=function(t){delete x[t]},l?r=function(t){b.nextTick(O(t))}:m&&m.now?r=function(t){m.now(O(t))}:y&&!p?(o=new y,i=o.port2,o.port1.onmessage=S,r=u(i.postMessage,i,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts&&d&&"file:"!==d.protocol&&!a(E)?(r=E,c.addEventListener("message",S,!1)):r=w in s("script")?function(t){f.appendChild(s("script"))[w]=function(){f.removeChild(this),j(t)}}:function(t){setTimeout(O(t),0)}),t.exports={set:v,clear:h}},"26d3":function(t,e,n){"use strict";var r,o,i,c,a=n("6b1d"),u=n("0e93"),f=n("f498"),s=n("5428"),p=n("2903"),l=n("b8ba"),d=n("b203"),v=n("fa46"),h=n("0a1e"),b=n("7526"),y=n("8697"),m=n("4cce"),g=n("df6f"),x=n("b578"),w=n("3211"),j=n("433a"),O=n("2435").set,S=n("8573"),E=n("9c36"),P=n("422d"),T=n("881c"),_=n("42ba"),I=n("cdcd"),C=n("ebac"),A=n("7d53"),M=n("f117"),k=n("4fed"),R=A("species"),N="Promise",L=I.get,D=I.set,U=I.getterFor(N),q=p,F=f.TypeError,V=f.document,B=f.process,$=s("fetch"),G=T.f,W=G,z=!!(V&&V.createEvent&&f.dispatchEvent),H="function"==typeof PromiseRejectionEvent,J="unhandledrejection",X="rejectionhandled",Y=0,K=1,Q=2,Z=1,tt=2,et=C(N,(function(){var t=g(q)!==String(q);if(!t){if(66===k)return!0;if(!M&&!H)return!0}if(u&&!q.prototype["finally"])return!0;if(k>=51&&/native code/.test(q))return!1;var e=q.resolve(1),n=function(t){t((function(){}),(function(){}))},r=e.constructor={};return r[R]=n,!(e.then((function(){}))instanceof n)})),nt=et||!w((function(t){q.all(t)["catch"]((function(){}))})),rt=function(t){var e;return!(!b(t)||"function"!=typeof(e=t.then))&&e},ot=function(t,e){if(!t.notified){t.notified=!0;var n=t.reactions;S((function(){var r=t.value,o=t.state==K,i=0;while(n.length>i){var c,a,u,f=n[i++],s=o?f.ok:f.fail,p=f.resolve,l=f.reject,d=f.domain;try{s?(o||(t.rejection===tt&&ut(t),t.rejection=Z),!0===s?c=r:(d&&d.enter(),c=s(r),d&&(d.exit(),u=!0)),c===f.promise?l(F("Promise-chain cycle")):(a=rt(c))?a.call(c,p,l):p(c)):l(r)}catch(v){d&&!u&&d.exit(),l(v)}}t.reactions=[],t.notified=!1,e&&!t.rejection&&ct(t)}))}},it=function(t,e,n){var r,o;z?(r=V.createEvent("Event"),r.promise=e,r.reason=n,r.initEvent(t,!1,!0),f.dispatchEvent(r)):r={promise:e,reason:n},!H&&(o=f["on"+t])?o(r):t===J&&P("Unhandled promise rejection",n)},ct=function(t){O.call(f,(function(){var e,n=t.facade,r=t.value,o=at(t);if(o&&(e=_((function(){M?B.emit("unhandledRejection",r,n):it(J,n,r)})),t.rejection=M||at(t)?tt:Z,e.error))throw e.value}))},at=function(t){return t.rejection!==Z&&!t.parent},ut=function(t){O.call(f,(function(){var e=t.facade;M?B.emit("rejectionHandled",e):it(X,e,t.value)}))},ft=function(t,e,n){return function(r){t(e,r,n)}},st=function(t,e,n){t.done||(t.done=!0,n&&(t=n),t.value=e,t.state=Q,ot(t,!0))},pt=function(t,e,n){if(!t.done){t.done=!0,n&&(t=n);try{if(t.facade===e)throw F("Promise can't be resolved itself");var r=rt(e);r?S((function(){var n={done:!1};try{r.call(e,ft(pt,n,t),ft(st,n,t))}catch(o){st(n,o,t)}})):(t.value=e,t.state=K,ot(t,!1))}catch(o){st({done:!1},o,t)}}};et&&(q=function(t){m(this,q,N),y(t),r.call(this);var e=L(this);try{t(ft(pt,e),ft(st,e))}catch(n){st(e,n)}},r=function(t){D(this,{type:N,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:Y,value:void 0})},r.prototype=d(q.prototype,{then:function(t,e){var n=U(this),r=G(j(this,q));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=M?B.domain:void 0,n.parent=!0,n.reactions.push(r),n.state!=Y&&ot(n,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new r,e=L(t);this.promise=t,this.resolve=ft(pt,e),this.reject=ft(st,e)},T.f=G=function(t){return t===q||t===i?new o(t):W(t)},u||"function"!=typeof p||(c=p.prototype.then,l(p.prototype,"then",(function(t,e){var n=this;return new q((function(t,e){c.call(n,t,e)})).then(t,e)}),{unsafe:!0}),"function"==typeof $&&a({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return E(q,$.apply(f,arguments))}}))),a({global:!0,wrap:!0,forced:et},{Promise:q}),v(q,N,!1,!0),h(N),i=s(N),a({target:N,stat:!0,forced:et},{reject:function(t){var e=G(this);return e.reject.call(void 0,t),e.promise}}),a({target:N,stat:!0,forced:u||et},{resolve:function(t){return E(u&&this===i?q:this,t)}}),a({target:N,stat:!0,forced:nt},{all:function(t){var e=this,n=G(e),r=n.resolve,o=n.reject,i=_((function(){var n=y(e.resolve),i=[],c=0,a=1;x(t,(function(t){var u=c++,f=!1;i.push(void 0),a++,n.call(e,t).then((function(t){f||(f=!0,i[u]=t,--a||r(i))}),o)})),--a||r(i)}));return i.error&&o(i.value),n.promise},race:function(t){var e=this,n=G(e),r=n.reject,o=_((function(){var o=y(e.resolve);x(t,(function(t){o.call(e,t).then(n.resolve,r)}))}));return o.error&&r(o.value),n.promise}})},2903:function(t,e,n){var r=n("f498");t.exports=r.Promise},"2df4":function(t,e,n){"use strict";var r=n("6b1d"),o=n("2e3f"),i=n("0e39"),c=n("c1a2"),a=n("fa46"),u=n("5b12"),f=n("b8ba"),s=n("7d53"),p=n("0e93"),l=n("5bb7"),d=n("ff89"),v=d.IteratorPrototype,h=d.BUGGY_SAFARI_ITERATORS,b=s("iterator"),y="keys",m="values",g="entries",x=function(){return this};t.exports=function(t,e,n,s,d,w,j){o(n,e,s);var O,S,E,P=function(t){if(t===d&&A)return A;if(!h&&t in I)return I[t];switch(t){case y:return function(){return new n(this,t)};case m:return function(){return new n(this,t)};case g:return function(){return new n(this,t)}}return function(){return new n(this)}},T=e+" Iterator",_=!1,I=t.prototype,C=I[b]||I["@@iterator"]||d&&I[d],A=!h&&C||P(d),M="Array"==e&&I.entries||C;if(M&&(O=i(M.call(new t)),v!==Object.prototype&&O.next&&(p||i(O)===v||(c?c(O,v):"function"!=typeof O[b]&&u(O,b,x)),a(O,T,!0,!0),p&&(l[T]=x))),d==m&&C&&C.name!==m&&(_=!0,A=function(){return C.call(this)}),p&&!j||I[b]===A||u(I,b,A),l[e]=A,d)if(S={values:P(m),keys:w?A:P(y),entries:P(g)},j)for(E in S)(h||_||!(E in I))&&f(I,E,S[E]);else r({target:e,proto:!0,forced:h||_},S);return S}},"2e3f":function(t,e,n){"use strict";var r=n("ff89").IteratorPrototype,o=n("82e8"),i=n("9618"),c=n("fa46"),a=n("5bb7"),u=function(){return this};t.exports=function(t,e,n){var f=e+" Iterator";return t.prototype=o(r,{next:i(1,n)}),c(t,f,!1,!0),a[f]=u,t}},3211:function(t,e,n){var r=n("7d53"),o=r("iterator"),i=!1;try{var c=0,a={next:function(){return{done:!!c++}},return:function(){i=!0}};a[o]=function(){return this},Array.from(a,(function(){throw 2}))}catch(u){}t.exports=function(t,e){if(!e&&!i)return!1;var n=!1;try{var r={};r[o]=function(){return{next:function(){return{done:n=!0}}}},t(r)}catch(u){}return n}},"332c":function(t,e,n){var r=n("4cdd"),o=n("1d8a"),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},3521:function(t,e,n){"use strict";(function(t){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c,a,u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof t?t:"undefined"!=typeof self?self:{};(function(t,e){var n;n=u,t.exports=function(t){if(t.CSS&&t.CSS.escape)return t.CSS.escape;var e=function(t){if(0==arguments.length)throw new TypeError("`CSS.escape` requires an argument.");for(var e,n=String(t),r=n.length,o=-1,i="",c=n.charCodeAt(0);++o<r;)0!=(e=n.charCodeAt(o))?i+=e>=1&&e<=31||127==e||0==o&&e>=48&&e<=57||1==o&&e>=48&&e<=57&&45==c?"\\"+e.toString(16)+" ":0==o&&1==r&&45==e||!(e>=128||45==e||95==e||e>=48&&e<=57||e>=65&&e<=90||e>=97&&e<=122)?"\\"+n.charAt(o):n.charAt(o):i+="�";return i};return t.CSS||(t.CSS={}),t.CSS.escape=e,e}(n)})(a={path:c,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&a.path)}},a.exports),a.exports;var f={appOptions:null,template:null,Vue:null,createApp:null,handleInstance:null};function s(t){if("object"!==n(t))throw new Error("single-spa-vue requires a configuration object");var e=i(i({},f),t);if(!e.Vue&&!e.createApp)throw Error("single-spa-vue must be passed opts.Vue or opts.createApp");if(!e.appOptions)throw Error("single-spa-vue must be passed opts.appOptions");if(e.appOptions.el&&"string"!=typeof e.appOptions.el&&!(e.appOptions.el instanceof HTMLElement))throw Error("single-spa-vue: appOptions.el must be a string CSS selector, an HTMLElement, or not provided at all. Was given ".concat(n(e.appOptions.el)));e.createApp=e.createApp||e.Vue&&e.Vue.createApp;var r={};return{bootstrap:p.bind(null,e,r),mount:l.bind(null,e,r),unmount:v.bind(null,e,r),update:d.bind(null,e,r)}}function p(t){return t.loadRootComponent?t.loadRootComponent().then((function(e){return t.rootComponent=e})):Promise.resolve()}function l(t,e,n){var r={};return Promise.resolve().then((function(){return function(t){return"function"==typeof t.appOptions?t.appOptions():Promise.resolve(i({},t.appOptions))}(t).then((function(o){var c;if(n.domElement&&!o.el&&(o.el=n.domElement),o.el)if("string"==typeof o.el){if(!(c=document.querySelector(o.el)))throw Error("If appOptions.el is provided to single-spa-vue, the dom element must exist in the dom. Was provided as ".concat(o.el))}else(c=o.el).id||(c.id="single-spa-application:".concat(n.name)),o.el="#".concat(CSS.escape(c.id));else{var a="single-spa-application:".concat(n.name);o.el="#".concat(CSS.escape(a)),(c=document.getElementById(a))||((c=document.createElement("div")).id=a,document.body.appendChild(c))}if(o.el=o.el+" .single-spa-container",!c.querySelector(".single-spa-container")){var u=document.createElement("div");u.className="single-spa-container",c.appendChild(u)}return r.domEl=c,o.render||o.template||!t.rootComponent||(o.render=function(e){return e(t.rootComponent)}),o.data||(o.data={}),o.data=function(){return i(i({},o.data),n)},t.createApp?(r.vueInstance=t.createApp(o),t.handleInstance&&t.handleInstance(r.vueInstance),r.vueInstance.mount(o.el)):(r.vueInstance=new t.Vue(o),r.vueInstance.bind&&(r.vueInstance=r.vueInstance.bind(r.vueInstance)),t.handleInstance&&t.handleInstance(r.vueInstance)),e[n.name]=r,r.vueInstance}))}))}function d(t,e,n){return Promise.resolve().then((function(){var r=e[n.name],o=i(i({},t.appOptions.data||{}),n);for(var c in o)r.vueInstance[c]=o[c]}))}function v(t,e,n){return Promise.resolve().then((function(){var r=e[n.name];t.createApp?r.vueInstance.unmount(r.domEl):(r.vueInstance.$destroy(),r.vueInstance.$el.innerHTML=""),delete r.vueInstance,r.domEl&&(r.domEl.innerHTML="",delete r.domEl)}))}e["a"]=s}).call(this,n("7d15"))},"378c":function(t,e,n){var r=n("83a6"),o=n("730c");t.exports=function(t){return r(o(t))}},"37d1":function(t,e,n){var r=n("730c");t.exports=function(t){return Object(r(t))}},"3c10":function(t,e,n){"use strict";function r(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"===typeof btoa){var i=o(r),c=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(c).concat([i]).join("\n")}return[n].join("\n")}function o(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(n," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=r(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"===typeof t&&(t=[[null,t,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(o[c]=!0)}for(var a=0;a<t.length;a++){var u=[].concat(t[a]);r&&o[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),e.push(u))}},e}},"3cec":function(t,e,n){var r=n("7d53"),o=r("toStringTag"),i={};i[o]="z",t.exports="[object z]"===String(i)},"3e34":function(t,e,n){var r=n("f498"),o=n("5b12");t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},"3e36":function(t,e,n){var r=n("f498");t.exports=r},"41ab":function(t,e,n){"use strict";var r=n("6b1d"),o=n("0e93"),i=n("2903"),c=n("72df"),a=n("5428"),u=n("433a"),f=n("9c36"),s=n("b8ba"),p=!!i&&c((function(){i.prototype["finally"].call({then:function(){}},(function(){}))}));r({target:"Promise",proto:!0,real:!0,forced:p},{finally:function(t){var e=u(this,a("Promise")),n="function"==typeof t;return this.then(n?function(n){return f(e,t()).then((function(){return n}))}:t,n?function(n){return f(e,t()).then((function(){throw n}))}:t)}}),o||"function"!=typeof i||i.prototype["finally"]||s(i.prototype,"finally",a("Promise").prototype["finally"])},"422d":function(t,e,n){var r=n("f498");t.exports=function(t,e){var n=r.console;n&&n.error&&(1===arguments.length?n.error(t):n.error(t,e))}},"42ba":function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(e){return{error:!0,value:e}}}},"433a":function(t,e,n){var r=n("157c"),o=n("8697"),i=n("7d53"),c=i("species");t.exports=function(t,e){var n,i=r(t).constructor;return void 0===i||void 0==(n=r(i)[c])?e:o(n)}},"4cce":function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},"4cdd":function(t,e,n){var r=n("0e93"),o=n("c607");(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.9.1",mode:r?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},"4db4":function(t,e,n){var r=n("e7a0");t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},"4fed":function(t,e,n){var r,o,i=n("f498"),c=n("64e4"),a=i.process,u=a&&a.versions,f=u&&u.v8;f?(r=f.split("."),o=r[0]+r[1]):c&&(r=c.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=c.match(/Chrome\/(\d+)/),r&&(o=r[1]))),t.exports=o&&+o},5268:function(t,e,n){"use strict";var r=n("3cec"),o=n("da06");t.exports=r?{}.toString:function(){return"[object "+o(this)+"]"}},5428:function(t,e,n){var r=n("3e36"),o=n("f498"),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},"56d7":function(t,e,n){"use strict";n.r(e),n.d(e,"bootstrap",(function(){return j})),n.d(e,"mount",(function(){return O})),n.d(e,"unmount",(function(){return S}));n("9531"),n("26d3"),n("2007"),n("41ab"),n("ef1f");var r=n("8bbf"),o=n.n(r),i=n("3521"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/pa"}},[t._v("项目 pa")]),t._v(" | "),n("router-link",{attrs:{to:"/pb"}},[t._v("项目 pb")])],1),n("router-view")],1)},a=[];n("5c0b");function u(t,e,n,r,o,i,c,a){var u,f="function"===typeof t?t.options:t;if(e&&(f.render=e,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),c?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(c)},f._ssrRegister=u):o&&(u=a?function(){o.call(this,(f.functional?this.parent:this).$root.$options.shadowRoot)}:o),u)if(f.functional){f._injectStyles=u;var s=f.render;f.render=function(t,e){return u.call(e),s(t,e)}}else{var p=f.beforeCreate;f.beforeCreate=p?[].concat(p,u):[u]}return{exports:t,options:f}}var f={},s=u(f,c,a,!1,null,null,null),p=s.exports,l=n("5880"),d=n.n(l);o.a.use(d.a);var v=new d.a.Store({state:{},mutations:{},actions:{},modules:{}}),h=n("6389"),b=n.n(h);o.a.use(b.a);var y=[],m=new b.a({routes:y}),g=m,x="nav";o.a.config.productionTip=!1;var w=Object(i["a"])({Vue:o.a,appOptions:{render:function(t){return t(p,{props:{}})},router:g}}),j=[function(){return new Promise((function(t,e){console.log(window.rootStore);try{window.rootStore.registerModule(x,v),t()}catch(n){e(n)}}))},w.bootstrap],O=w.mount,S=w.unmount},5880:function(e,n){e.exports=t},"5b12":function(t,e,n){var r=n("d4cb"),o=n("abdf"),i=n("9618");t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},"5bb7":function(t,e){t.exports={}},"5c0b":function(t,e,n){"use strict";n("a0cd")},6389:function(t,n){t.exports=e},"64e4":function(t,e,n){var r=n("5428");t.exports=r("navigator","userAgent")||""},"65d0":function(t,e,n){var r=n("c91c"),o=n("b17e"),i=o.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},"6a61":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"6b1d":function(t,e,n){var r=n("f498"),o=n("185a").f,i=n("5b12"),c=n("b8ba"),a=n("3e34"),u=n("b634"),f=n("ebac");t.exports=function(t,e){var n,s,p,l,d,v,h=t.target,b=t.global,y=t.stat;if(s=b?r:y?r[h]||a(h,{}):(r[h]||{}).prototype,s)for(p in e){if(d=e[p],t.noTargetGet?(v=o(s,p),l=v&&v.value):l=s[p],n=f(b?p:h+(y?".":"#")+p,t.forced),!n&&void 0!==l){if(typeof d===typeof l)continue;u(d,l)}(t.sham||l&&l.sham)&&i(d,"sham",!0),c(s,p,d,t)}}},7297:function(t,e,n){var r=n("f498"),o=n("df6f"),i=r.WeakMap;t.exports="function"===typeof i&&/native code/.test(o(i))},"72df":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"730c":function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t}},7526:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},"7c3f":function(t,e,n){var r=n("d4cb"),o=n("72df"),i=n("f2bf");t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},"7d15":function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}t.exports=n},"7d53":function(t,e,n){var r=n("f498"),o=n("4cdd"),i=n("f1a7"),c=n("1d8a"),a=n("e7a0"),u=n("4db4"),f=o("wks"),s=r.Symbol,p=u?s:s&&s.withoutSetter||c;t.exports=function(t){return i(f,t)&&(a||"string"==typeof f[t])||(a&&i(s,t)?f[t]=s[t]:f[t]=p("Symbol."+t)),f[t]}},"802e":function(t,e,n){var r=n("72df");t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},"82e8":function(t,e,n){var r,o=n("157c"),i=n("b99b"),c=n("b17e"),a=n("d687"),u=n("9324"),f=n("f2bf"),s=n("332c"),p=">",l="<",d="prototype",v="script",h=s("IE_PROTO"),b=function(){},y=function(t){return l+v+p+t+l+"/"+v+p},m=function(t){t.write(y("")),t.close();var e=t.parentWindow.Object;return t=null,e},g=function(){var t,e=f("iframe"),n="java"+v+":";return e.style.display="none",u.appendChild(e),e.src=String(n),t=e.contentWindow.document,t.open(),t.write(y("document.F=Object")),t.close(),t.F},x=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(e){}x=r?m(r):g();var t=c.length;while(t--)delete x[d][c[t]];return x()};a[h]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(b[d]=o(t),n=new b,b[d]=null,n[h]=t):n=x(),void 0===e?n:i(n,e)}},"83a6":function(t,e,n){var r=n("72df"),o=n("6a61"),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},8573:function(t,e,n){var r,o,i,c,a,u,f,s,p=n("f498"),l=n("185a").f,d=n("2435").set,v=n("e03e"),h=n("1d2e"),b=n("f117"),y=p.MutationObserver||p.WebKitMutationObserver,m=p.document,g=p.process,x=p.Promise,w=l(p,"queueMicrotask"),j=w&&w.value;j||(r=function(){var t,e;b&&(t=g.domain)&&t.exit();while(o){e=o.fn,o=o.next;try{e()}catch(n){throw o?c():i=void 0,n}}i=void 0,t&&t.enter()},v||b||h||!y||!m?x&&x.resolve?(f=x.resolve(void 0),s=f.then,c=function(){s.call(f,r)}):c=b?function(){g.nextTick(r)}:function(){d.call(p,r)}:(a=!0,u=m.createTextNode(""),new y(r).observe(u,{characterData:!0}),c=function(){u.data=a=!a})),t.exports=j||function(t){var e={fn:t,next:void 0};i&&(i.next=e),o||(o=e,c()),i=e}},8697:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},"881c":function(t,e,n){"use strict";var r=n("8697"),o=function(t){var e,n;this.promise=new t((function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r})),this.resolve=r(e),this.reject=r(n)};t.exports.f=function(t){return new o(t)}},"8bb2":function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},"8bbf":function(t,e){t.exports=n},9324:function(t,e,n){var r=n("5428");t.exports=r("document","documentElement")},9531:function(t,e,n){"use strict";var r=n("378c"),o=n("ed2b"),i=n("5bb7"),c=n("cdcd"),a=n("2df4"),u="Array Iterator",f=c.set,s=c.getterFor(u);t.exports=a(Array,"Array",(function(t,e){f(this,{type:u,target:r(t),index:0,kind:e})}),(function(){var t=s(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}}),"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},9618:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"9a0f":function(t,e,n){var r=n("8bb2"),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},"9bf1":function(t,e,n){"use strict";n.r(e),function(t){var e=n("1884");const r=t.replace(/\?/g,"").split("&"),o=r.reduce((function(t,e){const n=e.split("=");return t[n[0]]=n[1],t}),{});Object(e["setPublicPath"])(decodeURIComponent(o.systemjsModuleName),Number(o.rootDirectoryLevel))}.call(this,"?systemjsModuleName=nav&rootDirectoryLevel=2")},"9c36":function(t,e,n){var r=n("157c"),o=n("7526"),i=n("881c");t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t),c=n.resolve;return c(e),n.promise}},a03e:function(t,e,n){var r=n("5428"),o=n("65d0"),i=n("2402"),c=n("157c");t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(c(t)),n=i.f;return n?e.concat(n(t)):e}},a0cd:function(t,e,n){var r=n("dbdd");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var o=n("0ed3").default;o("288112f6",r,!0,{sourceMap:!1,shadowMode:!1})},aaba:function(t,e,n){var r=n("157c");t.exports=function(t){var e=t["return"];if(void 0!==e)return r(e.call(t)).value}},abdf:function(t,e,n){var r=n("d4cb"),o=n("7c3f"),i=n("157c"),c=n("083f"),a=Object.defineProperty;e.f=r?a:function(t,e,n){if(i(t),e=c(e,!0),i(n),o)try{return a(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},b17e:function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},b203:function(t,e,n){var r=n("b8ba");t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},b495:function(t,e,n){var r=n("8bb2"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},b578:function(t,e,n){var r=n("157c"),o=n("c965"),i=n("b495"),c=n("2117"),a=n("0446"),u=n("aaba"),f=function(t,e){this.stopped=t,this.result=e};t.exports=function(t,e,n){var s,p,l,d,v,h,b,y=n&&n.that,m=!(!n||!n.AS_ENTRIES),g=!(!n||!n.IS_ITERATOR),x=!(!n||!n.INTERRUPTED),w=c(e,y,1+m+x),j=function(t){return s&&u(s),new f(!0,t)},O=function(t){return m?(r(t),x?w(t[0],t[1],j):w(t[0],t[1])):x?w(t,j):w(t)};if(g)s=t;else{if(p=a(t),"function"!=typeof p)throw TypeError("Target is not iterable");if(o(p)){for(l=0,d=i(t.length);d>l;l++)if(v=O(t[l]),v&&v instanceof f)return v;return new f(!1)}s=p.call(t)}h=s.next;while(!(b=h.call(s)).done){try{v=O(b.value)}catch(S){throw u(s),S}if("object"==typeof v&&v&&v instanceof f)return v}return new f(!1)}},b634:function(t,e,n){var r=n("f1a7"),o=n("a03e"),i=n("185a"),c=n("abdf");t.exports=function(t,e){for(var n=o(e),a=c.f,u=i.f,f=0;f<n.length;f++){var s=n[f];r(t,s)||a(t,s,u(e,s))}}},b8ba:function(t,e,n){var r=n("f498"),o=n("5b12"),i=n("f1a7"),c=n("3e34"),a=n("df6f"),u=n("cdcd"),f=u.get,s=u.enforce,p=String(String).split("String");(t.exports=function(t,e,n,a){var u,f=!!a&&!!a.unsafe,l=!!a&&!!a.enumerable,d=!!a&&!!a.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||o(n,"name",e),u=s(n),u.source||(u.source=p.join("string"==typeof e?e:""))),t!==r?(f?!d&&t[e]&&(l=!0):delete t[e],l?t[e]=n:o(t,e,n)):l?t[e]=n:c(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&f(this).source||a(this)}))},b99b:function(t,e,n){var r=n("d4cb"),o=n("abdf"),i=n("157c"),c=n("0c47");t.exports=r?Object.defineProperties:function(t,e){i(t);var n,r=c(e),a=r.length,u=0;while(a>u)o.f(t,n=r[u++],e[n]);return t}},c1a2:function(t,e,n){var r=n("157c"),o=n("f3e4");t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set,t.call(n,[]),e=n instanceof Array}catch(i){}return function(n,i){return r(n),o(i),e?t.call(n,i):n.__proto__=i,n}}():void 0)},c607:function(t,e,n){var r=n("f498"),o=n("3e34"),i="__core-js_shared__",c=r[i]||o(i,{});t.exports=c},c91c:function(t,e,n){var r=n("f1a7"),o=n("378c"),i=n("1f5e").indexOf,c=n("d687");t.exports=function(t,e){var n,a=o(t),u=0,f=[];for(n in a)!r(c,n)&&r(a,n)&&f.push(n);while(e.length>u)r(a,n=e[u++])&&(~i(f,n)||f.push(n));return f}},c965:function(t,e,n){var r=n("7d53"),o=n("5bb7"),i=r("iterator"),c=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||c[i]===t)}},cdcd:function(t,e,n){var r,o,i,c=n("7297"),a=n("f498"),u=n("7526"),f=n("5b12"),s=n("f1a7"),p=n("c607"),l=n("332c"),d=n("d687"),v=a.WeakMap,h=function(t){return i(t)?o(t):r(t,{})},b=function(t){return function(e){var n;if(!u(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}};if(c){var y=p.state||(p.state=new v),m=y.get,g=y.has,x=y.set;r=function(t,e){return e.facade=t,x.call(y,t,e),e},o=function(t){return m.call(y,t)||{}},i=function(t){return g.call(y,t)}}else{var w=l("state");d[w]=!0,r=function(t,e){return e.facade=t,f(t,w,e),e},o=function(t){return s(t,w)?t[w]:{}},i=function(t){return s(t,w)}}t.exports={set:r,get:o,has:i,enforce:h,getterFor:b}},d4cb:function(t,e,n){var r=n("72df");t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},d687:function(t,e){t.exports={}},da06:function(t,e,n){var r=n("3cec"),o=n("6a61"),i=n("7d53"),c=i("toStringTag"),a="Arguments"==o(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=r?o:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),c))?n:a?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},dbdd:function(t,e,n){var r=n("3c10");e=r(!1),e.push([t.i,".nav #app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50}.nav #nav{padding:30px}.nav #nav a{font-weight:700;color:#2c3e50}.nav #nav a.router-link-exact-active{color:#42b983}",""]),t.exports=e},df6f:function(t,e,n){var r=n("c607"),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},e03e:function(t,e,n){var r=n("64e4");t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(r)},e129:function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);e.f=i?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},e7a0:function(t,e,n){var r=n("f117"),o=n("4fed"),i=n("72df");t.exports=!!Object.getOwnPropertySymbols&&!i((function(){return!Symbol.sham&&(r?38===o:o>37&&o<41)}))},ebac:function(t,e,n){var r=n("72df"),o=/#|\.prototype\./,i=function(t,e){var n=a[c(t)];return n==f||n!=u&&("function"==typeof e?r(e):!!e)},c=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},a=i.data={},u=i.NATIVE="N",f=i.POLYFILL="P";t.exports=i},ed2b:function(t,e,n){var r=n("7d53"),o=n("82e8"),i=n("abdf"),c=r("unscopables"),a=Array.prototype;void 0==a[c]&&i.f(a,c,{configurable:!0,value:o(null)}),t.exports=function(t){a[c][t]=!0}},ef1f:function(t,e,n){var r=n("3cec"),o=n("b8ba"),i=n("5268");r||o(Object.prototype,"toString",i,{unsafe:!0})},f117:function(t,e,n){var r=n("6a61"),o=n("f498");t.exports="process"==r(o.process)},f1a7:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},f2bf:function(t,e,n){var r=n("f498"),o=n("7526"),i=r.document,c=o(i)&&o(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},f3e4:function(t,e,n){var r=n("7526");t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},f498:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||function(){return this}()||Function("return this")()}).call(this,n("7d15"))},fa46:function(t,e,n){var r=n("abdf").f,o=n("f1a7"),i=n("7d53"),c=i("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,c)&&r(t,c,{configurable:!0,value:e})}},ff89:function(t,e,n){"use strict";var r,o,i,c=n("72df"),a=n("0e39"),u=n("5b12"),f=n("f1a7"),s=n("7d53"),p=n("0e93"),l=s("iterator"),d=!1,v=function(){return this};[].keys&&(i=[].keys(),"next"in i?(o=a(a(i)),o!==Object.prototype&&(r=o)):d=!0);var h=void 0==r||c((function(){var t={};return r[l].call(t)!==t}));h&&(r={}),p&&!h||f(r,l)||u(r,l,v),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:d}}})}));