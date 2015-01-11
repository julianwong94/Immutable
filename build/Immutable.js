(function(){"use strict";function t(t){return"string"==typeof t&&An.test(t)}function r(t){return"string"==typeof t&&(_n.test(t)||jn.test(t))}function n(t){return"string"==typeof t&&jn.test(t)}function e(){if(0===arguments.length)return"(Tag "+kn+" "+ ++zn+")";throw Error("Expected 0 arguments but got "+arguments.length)}function o(r){if(1===arguments.length){if(t(r))return"(UUIDTag "+r+")";throw Error("Expected a lower-case UUID, but got: "+r)}throw Error("Expected 1 argument but got "+arguments.length)}function i(t){for(var r=t.length,n=Array(r),e=0;r>e;++e)n[e]=t[e];return n}function u(t,r,n){for(var e=t.length+1,o=Array(e),i=0;r>i;)o[i]=t[i],++i;for(o[i]=n,++i;e>i;)o[i]=t[i-1],++i;return o}function f(t,r,n){var e=t[r],o=n(e);if(e===o)return t;var u=i(t);return u[r]=o,u}function a(t,r){for(var n=t.length-1,e=Array(n),o=0;r>o;)e[o]=t[o],++o;for(;n>o;)e[o]=t[o+1],++o;return e}function s(t){var r=0;return{next:function(){return r<t.length?{value:t[r++]}:{done:!0}}}}function h(t){return qr(t)?null!=t[Dn]||null!==In&&t[In]||Array.isArray(t):"string"==typeof t&&!r(t)}function c(t){var n;if(null!=(n=t[Dn]))return n.call(t);if(null!==In&&null!=(n=t[In]))return n.call(t);if(Array.isArray(t))return s(t);if("string"!=typeof t||r(t))throw Error("Cannot iter: "+t);return s(t)}function l(t){var r={};return r[Dn]=t,null!==In&&(r[In]=t),r}function p(t,r){for(;;){var n=t.next();if(n.done)break;r(n.value)}}function v(t,r){return{next:function(){var n=t.next();return n.done?{done:!0}:{value:r(n.value)}}}}function y(t,r){var n=!1,e=!1;return{next:function(){for(;;)if(n){if(e)return{done:!0};var o=r.next();if(!o.done)return{value:o.value};e=!0}else{var o=t.next();if(!o.done)return{value:o.value};n=!0}}}}function g(t,r){for(var n=c(t);;){var e=n.next();if(e.done)return!1;if(r(e.value))return!0}}function d(t,r){for(var n=c(t);;){var e=n.next();if(e.done)return!0;if(!r(e.value))return!1}}function w(t,r,n){for(var e=c(t);;){var o=e.next();if(o.done){if(3===arguments.length)return n;throw Error("Did not find anything")}if(r(o.value))return o.value}}function m(t,r){var n=[],e=[],o=Ln,i=!1;return Mr([l(function(){return o===Ln&&(o=c(t)),{next:function(){for(;;){if(n.length)return n.shift();if(i)return{done:!0};var t=o.next();if(t.done)i=!0;else{if(r(t.value))return{value:t.value};e.push({value:t.value})}}}}}),l(function(){return o===Ln&&(o=c(t)),{next:function(){for(;;){if(e.length)return e.shift();if(i)return{done:!0};var t=o.next();if(t.done)i=!0;else{if(!r(t.value))return{value:t.value};n.push({value:t.value})}}}}})])}function b(t,r){var n=2===arguments.length;return l(function(){var e=k(t).map(function(t){return c(t)}),o=!1;return{next:function(){for(;;){if(o)return{done:!0};for(var t=[],i=!1,u=0,f=e.length;f>u;++u){var a=e[u].next();if(a.done){if(!n){i=!1;break}t.push(r)}else i=!0,t.push(a.value)}if(i)return{value:Mr(t)};o=!0}}}})}function E(t){var r=[];p(t,function(t){r.push(t)});var n=r.length;return{next:function(){return n?{value:r[--n]}:{done:!0}}}}function x(t,r,n){return _(t,function(t){r=n(r,t)}),r}function S(t,r,n){return x(D(t),r,function(t,r){return n(r,t)})}function k(t){if(Array.isArray(t))return t;var r=[];return _(t,function(t){r.push(t)}),r}function z(t,r){return 1===arguments.length&&(r=""),"string"==typeof t&&""===r?t:k(t).join(r)}function O(t,r){var n=!1,e=Ln;return{next:function(){for(;;){if(n)return{done:!0};if(e===Ln){var o=t.next();o.done?n=!0:e=r(o.value)}else{var o=e.next();if(!o.done)return{value:o.value};e=Ln}}}}}function A(t){return Fr(t)?C(Object.keys(t),function(r){return[r,t[r]]}):t}function _(t,r){p(c(t),r)}function j(t,r,n){for(var e=c(t),o=0;;){var i=e.next();if(i.done){if(3===arguments.length)return n;throw Error("Did not find anything")}if(r(i.value))return o;++o}}function I(t,r){if(Math.round(r)!==r)throw Error("Count must be an integer");if(0>r)throw Error("Count cannot be negative");return l(function(){var n=c(t);return{next:function(){for(;;){if(0>r)throw Error("Invalid count");if(0===r)return{done:!0};var t=n.next();if(!t.done)return--r,{value:t.value};r=0}}}})}function T(t,r,n){if(arguments.length<1&&(t=0),arguments.length<2&&(r=1/0),arguments.length<3&&(n=1),0>n)throw Error("Step cannot be negative");return l(function(){if(r>t)var e=function(){if(r>t){var e=t;return t+=n,{value:e}}return{done:!0}};else var e=function(){if(t>r){var e=t;return t-=n,{value:e}}return{done:!0}};return{next:e}})}function C(t,r){return l(function(){return v(c(t),r)})}function D(t){return l(function(){return E(c(t))})}function J(t,r){return l(function(){var n=c(t);return{next:function(){for(;;){var t=n.next();if(t.done)return{done:!0};if(r(t.value))return{value:t.value}}}}})}function U(t){var e=typeof t;if(r(t)){if(n(t))return t;throw Error("Cannot convert Tag from JSON, use UUIDTag instead: "+t)}if("string"===e||"boolean"===e||null===t||Kr(t))return t;if(qr(t)){var e=t[Un];if(null!=e){var o=Rn[e];if(null!=o)return o(t);throw Error("Cannot handle type "+e)}if(Array.isArray(t))return t.map(U);if(Fr(t)){var i={};return Object.keys(t).forEach(function(r){i[U(r)]=U(t[r])}),i}throw Error("Cannot convert from JSON: "+t)}throw Error("Cannot convert from JSON: "+t)}function N(t){var e=typeof t;if(r(t)){if(n(t))return t;throw Error("Cannot convert Tag to JSON, use UUIDTag instead: "+t)}if("string"===e||"boolean"===e||null===t||Kr(t))return t;if(qr(t)){var o=t[Nn];if(null!=o)return o(t);if("function"==typeof t.toJSON)return N(t.toJSON());if(Array.isArray(t))return t.map(N);if(Fr(t)){var i={};return Object.keys(t).forEach(function(r){i[N(r)]=N(t[r])}),i}throw Error("Cannot convert to JSON: "+t)}throw Error("Cannot convert to JSON: "+t)}function R(t,r){var n={};return n[Un]=t,n.keys=[],n.values=[],_(r,function(t){Hr(t,function(t,r){n.keys.push(N(t)),n.values.push(N(r))})}),n}function M(t,r){var n={};return n[Un]=t,n.values=[],_(r,function(t){n.values.push(N(t))}),n}function L(t){for(var r=t.keys,n=t.values,e=r.length,o=Array(e),i=0;e>i;++i)o[i]=[U(r[i]),U(n[i])];return o}function Q(t){for(var r=t.values,n=r.length,e=Array(n),o=0;n>o;++o)e[o]=U(r[o]);return e}function K(t,r){return t>r?t:r}function q(t,r,n){var e=r.depth,o=n.depth;if(e>o+1){var i=r.left,u=r.right;return u.depth>i.depth?u.copy(r.copy(i,u.left),t.copy(u.right,n)):r.copy(i,t.copy(u,n))}if(o>e+1){var f=n.right,a=n.left;return a.depth>f.depth?a.copy(t.copy(r,a.left),n.copy(a.right,f)):n.copy(t.copy(r,a),f)}return t.copy(r,n)}function F(t,r){if(t===Mn)return r;if(r===Mn)return t;if(t.depth<r.depth){var n=F(t,r.left);return q(r,n,r.right)}var e=F(t.right,r);return q(t,t.left,e)}function $(t,r){return t===Mn?r:q(t,$(t.left,r),t.right)}function P(t,r){return t===Mn?r:q(t,t.left,P(t.right,r))}function B(t){for(var r=[];t!==Mn;)r.push(t),t=t.left;return{next:function(){if(r.length){var n=r.pop();for(t=n.right;t!==Mn;)r.push(t),t=t.left;return{value:n}}return{done:!0}}}}function G(){return Xr(this)}function H(){return N(this)}function V(t,r){return t>=0&&r>t}function W(t){var r=this.size();return 0>t&&(t+=r),V(t,r)}function X(t,r){this.car=t,this.cdr=r}function Y(t){return{next:function(){if(t===Mn)return{done:!0};var r=t.car;return t=t.cdr,{value:r}}}}function Z(t,r){for(;t!==Mn;)r(t.car),t=t.cdr}function tr(t,r){if(t.length){var n=t[t.length-1];n.length+r.length<=qn?t[t.length-1]=n.concat(r):t.push(r)}else t.push(r)}function rr(t,r,n){if(n>r){var e=$n((r+n)/2),o=rr(t,r,e),i=rr(t,e+1,n);return new ur(o,i,t[e])}return Mn}function nr(t){return rr(t,0,t.length)}function er(t,r,n){0>r&&(r=0);var e=t.length;return n>e&&(n=e),0===r&&n===e?t:t.slice(r,n)}function or(t,r){for(var n=Array(r);r--;)n[r]=t.car,t=t.cdr;return n}function ir(t,r,n){for(;--r!==n;)t=t.cdr;return t.car}function ur(t,r,n){this.left=t,this.right=r,this.array=n,this.size=t.size+r.size+n.length,this.depth=K(t.depth,r.depth)+1}function fr(t,r){for(;;){var n=t.left,e=n.size;if(e>r)t=n;else{r-=e;var o=t.array,i=o.length;if(i>r)return o[r];r-=i,t=t.right}}}function ar(t,r,n){if(t===Mn)return new ur(Mn,Mn,[n]);var e=t.left,o=t.right,i=e.size;if(i>r){var f=ar(e,r,n);return q(t,f,o)}r-=i;var a=t.array,s=a.length;if(s>=r){if(a=u(a,r,n),s===qn){var h=Fn(a.length/2),c=a.slice(0,h),l=a.slice(h);return e.depth<o.depth?new ur(P(e,new ur(Mn,Mn,c)),o,l):new ur(e,$(o,new ur(Mn,Mn,l)),c)}return new ur(e,o,a)}var f=ar(o,r-s,n);return q(t,e,f)}function sr(t,r,n){var e=t.left,o=t.right,i=e.size;if(i>r){var u=sr(e,r,n);return u===e?t:t.copy(u,o)}r-=i;var a=t.array,s=a.length;if(s>r){var h=f(a,r,n);return h===a?t:new ur(e,o,h)}var u=sr(o,r-s,n);return u===o?t:t.copy(e,u)}function hr(t,r){var n=t.left,e=t.right,o=n.size;if(o>r){var i=hr(n,r);return q(t,i,e)}r-=o;var u=t.array,f=u.length;if(f>r)return u=a(u,r),0===u.length?F(n,e):new ur(n,e,u);var i=hr(e,r-f);return q(t,n,i)}function cr(t,r,n,e){if(r!==Mn){var o=r.left,i=o.size;i>n&&cr(t,o,n,e);var u=r.array,f=u.length;n-=i,e-=i,f>n&&e>0&&tr(t,er(u,n,e)),e>f&&cr(t,r.right,n-f,e-f)}}function lr(t,r,n){this.root=t,this.tail=r,this.tail_size=n,this.hash=null}function pr(t){return t instanceof lr}function vr(t){return null!=t?t instanceof lr?t:new lr(Mn,Mn,0).concat(t):new lr(Mn,Mn,0)}function yr(t,r){return t===r?0:r>t?-1:1}function gr(t,r,n){for(;t!==Mn;){var e=r(n,t.hash);if(0===e)break;t=0>e?t.left:t.right}return t}function dr(t,r,n,e){if(t===Mn)return e;var o=t.left,i=t.right,u=r(n,t.hash);if(0===u)return t.modify(e);if(0>u){var f=dr(o,r,n,e);return f===o?t:q(t,f,i)}var f=dr(i,r,n,e);return f===i?t:q(t,o,f)}function wr(t,r,n,e,o){if(t===Mn)throw Error("Key "+e+" not found");var i=t.left,u=t.right,f=r(n,t.hash);if(0===f)return t.modify({key:e,hash:n,value:o(t.value)});if(0>f){var a=wr(i,r,n,e,o);return a===i?t:q(t,a,u)}var a=wr(u,r,n,e,o);return a===u?t:q(t,i,a)}function mr(t,r,n){if(t===Mn)return t;var e=t.left,o=t.right,i=r(n,t.hash);if(0===i)return F(e,o);if(0>i){var u=mr(e,r,n);return u===e?t:q(t,u,o)}var u=mr(o,r,n);return u===o?t:q(t,e,u)}function br(){return this.root===Mn}function Er(t){return gr(this.root,this.sort,this.hash_fn(t))!==Mn}function xr(t){return function(r){var n=this.root,e=this.sort,o=this.hash_fn,i=mr(n,e,o(r));return i===n?this:new t(i,e,o)}}function Sr(t){return x(A(t),this,function(t,r){return Hr(r,function(r,n){return t.set(r,n)})})}function kr(){return this.len}function zr(t){return x(t,this,function(t,r){return t.push(r)})}function Or(t,r,n,e,o){this.left=t,this.right=r,this.hash=n,this.key=e,this.value=o,this.depth=K(t.depth,r.depth)+1}function Ar(t,r,n){this.root=t,this.sort=r,this.hash_fn=n,this.hash=null}function _r(t){return t instanceof Ar}function jr(t){return _r(t)&&t.hash_fn===Br}function Ir(t,r){return null!=r?jr(r)&&r.sort===t?r:new Ar(Mn,t,Br).merge(r):new Ar(Mn,t,Br)}function Tr(t){return null!=t?_r(t)&&!jr(t)?t:new Ar(Mn,yr,Xr).merge(t):new Ar(Mn,yr,Xr)}function Cr(t){if(Array.isArray(t)){for(var r=vr(),n=0,e=t.length;e>n;++n)r=r.insert(Cr(t[n]));return r}if(Fr(t)){var r=Tr();return Object.keys(t).forEach(function(n){r=r.set(Cr(n),Cr(t[n]))}),r}return t}function Dr(t){if(qr(t)){var r=t[Jn];if(null!=r)return r(t);if(Array.isArray(t))return t.map(Dr);if(Fr(t)){var n={};return Object.keys(t).forEach(function(r){n[Dr(r)]=Dr(t[r])}),n}return t}return t}function Jr(t){var r={};return _(t,function(t){Hr(t,function(t,n){if("string"!=typeof t)throw Error("Cannot convert to JavaScript: expected key to be string or Tag but got "+t);r[t]=Dr(n)})}),r}function Ur(t){var r=[];return _(t,function(t){r.push(Dr(t))}),r}function Nr(t){this.values=t,this.hash=null}function Rr(t){return t instanceof Nr}function Mr(t){return new Nr(t)}function Lr(t){if(null!=t){if(Rr(t))return t;var r=[];return _(t,function(t){r.push(t)}),new Nr(r)}return new Nr([])}function Qr(t){return t!==t}function Kr(t){return"number"==typeof t&&1/0!==t&&t!==-1/0&&!Qr(t)}function qr(t){return Object(t)===t}function Fr(t){return qr(t)&&Object.getPrototypeOf(t)===Object.prototype}function $r(t,r){return Array(r+1).join(t)}function Pr(t,r,n){var e=Math.max(0,r-t.length);return t+$r(n,e)}function Br(t){return t}function Gr(t,r){return 1===t?r:r+"s"}function Hr(t,r){if(Array.isArray(t)){if(2===t.length)return r(t[0],t[1]);throw Error("Expected array with 2 elements but got "+t.length+" "+Gr(t.length,"element"))}if(Rr(t)){if(2===t.size())return r(t.get(0),t.get(1));throw Error("Expected Tuple with 2 elements but got "+t.size()+" "+Gr(t.size(),"element"))}throw Error("Expected array or Tuple but got: "+t)}function Vr(t){return'"'+t.replace(/[\\\"\n]/g,function(t){return"\n"===t?t+" ":"\\"+t})+'"'}function Wr(t){var r;return null!==Tn&&null!=(r=Tn(t))?"(Symbol.for "+Xr(r)+")":(r=Gn[t],null==r&&(r=Gn[t]=++Bn),"(Symbol "+r+")")}function Xr(t){var n=typeof t;if("string"===n)return r(t)?t:Vr(t);if("number"===n||"boolean"===n||"undefined"===n||null===t)return""+t;if("symbol"===n)return Wr(t);var e=t[Cn];if(null!=e)return e(t);if(Object.isExtensible(t)){var o="(Mutable "+ ++Pn+")";return Object.defineProperty(t,Cn,{configurable:!1,enumerable:!1,writable:!1,value:function(){return o}}),o}throw Error("Cannot use a non-extensible object as a key: "+t)}function Yr(t,r){var n=0,e=[];_(t,function(t){Hr(t,function(t,r){t=Xr(t),r=Xr(r),t=t.split(/\n/),_(t,function(t){n=Math.max(n,t.length)}),e.push({key:t,value:r})})});var r="  ";return e=C(e,function(t){var r=t.key.length-1;t.key[r]=Pr(t.key[r],n," ");var e=z(t.key,"\n"),o=t.value.replace(/\n/g,"\n"+$r(" ",n+3));return e+" = "+o}),tn(e,r)}function Zr(t){return function(r){if(null===r.hash){var n=C(r,function(t){return Xr(t)});r.hash="("+t+tn(n,"  ")+")"}return r.hash}}function tn(t,r){var n="\n"+r;return z(C(t,function(t){return n+t.replace(/\n/g,n)}))}function rn(t,r,n,e){this.left=t,this.right=r,this.hash=n,this.key=e,this.depth=K(t.depth,r.depth)+1}function nn(t,r,n){this.root=t,this.sort=r,this.hash_fn=n,this.hash=null}function en(t){return t instanceof nn}function on(t){return en(t)&&t.hash_fn===Br}function un(t,r){return null!=r?on(r)&&r.sort===t?r:new nn(Mn,t,Br).union(r):new nn(Mn,t,Br)}function fn(t){return null!=t?en(t)&&!on(t)?t:new nn(Mn,yr,Xr).union(t):new nn(Mn,yr,Xr)}function an(t,r,n){this.left=t,this.right=r,this.len=n,this.hash=null}function sn(t){return t instanceof an}function hn(t){return null!=t?t instanceof an?t:new an(Mn,Mn,0).concat(t):new an(Mn,Mn,0)}function cn(t,r){this.root=t,this.len=r,this.hash=null}function ln(t){return t instanceof cn}function pn(t){return null!=t?t instanceof cn?t:new cn(Mn,0).concat(t):new cn(Mn,0)}function vn(t){if("string"!=typeof t)throw Error("Expected key to be a string or Tag but got "+t)}function yn(t,r){this.keys=t,this.values=r,this.hash=null}function gn(t){return t instanceof yn}function dn(t){var r={},n=[];if(null!=t){if(gn(t))return t;var e=C(A(t),function(t){return Hr(t,function(t,r){return vn(t),[t,r]})}),o=k(e).sort(function(t,r){return yr(t[0],r[0])});_(o,function(t){var e=t[0],o=t[1],i=r[e];null==i?r[e]=n.push(o)-1:n[i]=o})}return new yn(r,n)}function wn(t,r){this._id=++Hn,this._value=t,this._onchange=r}function mn(t){return bn(t)?t.get():t}function bn(t){return t instanceof wn}function En(t,r){if(arguments.length<1||arguments.length>2)throw Error("Expected 1 to 2 arguments but got "+arguments.length);return new wn(t,r)}function xn(t,r){return t===r||Xr(t)===Xr(r)}function Sn(t){if(qr(t))return Object.isFrozen(t)||_r(t)||en(t)||pr(t)||Rr(t)||sn(t)||ln(t)||gn(t);var r=typeof t;return"string"===r||"number"===r||"boolean"===r||"symbol"===r||null==t}var kn="48de6fff-9d11-472d-a76f-ed77a59a5cbc",zn=0,On="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",An=RegExp("^"+On+"$"),_n=RegExp("^\\(Tag "+kn+" [0-9]+\\)$"),jn=RegExp("^\\(UUIDTag "+On+"\\)$"),In="undefined"!=typeof Symbol&&void 0!==Symbol.iterator?Symbol.iterator:null,Tn="undefined"!=typeof Symbol&&void 0!==Symbol.keyFor?Symbol.keyFor:null,Cn=o("e1c3818d-4c4f-4703-980a-00969e4ca900"),Dn=o("6199065c-b518-4cb3-8b41-ab70a9769ec3"),Jn=o("1b75a273-16bd-4248-be8a-e4b5e8c4b523"),Un=o("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37"),Nn=o("99e14916-bc99-4c48-81aa-299cf1ad6de3"),Rn={},Mn={};Mn.depth=0,Mn.size=0;var Ln={},Qn={},Kn={};Qn.toString=Kn.toString=G,Qn.inspect=Kn.inspect=G,Kn.toJSON=H,null!==In&&(Qn[In]=Kn[In]=function(){return c(this)});var qn=125,Fn=Math.ceil,$n=Math.floor;ur.prototype.copy=function(t,r){return new ur(t,r,this.array)},lr.prototype=Object.create(Kn),lr.prototype[Cn]=Zr("List"),lr.prototype[Jn]=Ur,lr.prototype.has=W,Rn.List=function(t){return vr(Q(t))},lr.prototype[Nn]=function(t){return M("List",t)},lr.prototype[Dn]=function(){var t=O(B(this.root),function(t){return c(t.array)});return y(t,E(Y(this.tail)))},lr.prototype.isEmpty=function(){return this.root===Mn&&this.tail===Mn},lr.prototype.removeAll=function(){return new lr(Mn,Mn,0)},lr.prototype.size=function(){return this.root.size+this.tail_size},lr.prototype.get=function(t,r){var n=this.size();if(0>t&&(t+=n),V(t,n)){var e=this.root,o=e.size;return o>t?fr(e,t):ir(this.tail,this.tail_size,t-o)}if(2===arguments.length)return r;throw Error("Index "+t+" is not valid")},lr.prototype.insert=function(t,r){1===arguments.length&&(r=-1);var n=this.size();0>r&&(r+=n+1);var e=this.root,o=this.tail,i=this.tail_size;if(r===n){if(i===qn){var f=P(e,new ur(Mn,Mn,or(o,i)));return new lr(f,new X(t,Mn),1)}return new lr(e,new X(t,o),i+1)}if(V(r,n)){var a=e.size;if(a>r)return new lr(ar(e,r,t),o,i);var s=u(or(o,i),r-a,t),f=P(e,new ur(Mn,Mn,s));return new lr(f,Mn,0)}throw Error("Index "+r+" is not valid")},lr.prototype.remove=function(t){0===arguments.length&&(t=-1);var r=this.size();0>t&&(t+=r);var n=this.root,e=this.tail,o=this.tail_size;if(e!==Mn&&t===r-1)return new lr(n,e.cdr,o-1);if(V(t,r)){var i=n.size;if(i>t)return new lr(hr(n,t),e,o);var u=a(or(e,o),t-i),f=P(n,new ur(Mn,Mn,u));return new lr(f,Mn,0)}throw Error("Index "+t+" is not valid")},lr.prototype.modify=function(t,r){var n=this.size();if(0>t&&(t+=n),V(t,n)){var e=this.root,o=this.tail,i=this.tail_size,u=e.size;if(o!==Mn&&t===n-1){var a=r(o.car);return a===o.car?this:new lr(e,new X(a,o.cdr),i)}if(u>t){var s=sr(e,t,r);return s===e?this:new lr(s,o,i)}var h=or(o,i),c=f(h,t-u,r);if(c===h)return this;var s=P(e,new ur(Mn,Mn,c));return new lr(s,Mn,0)}throw Error("Index "+t+" is not valid")},lr.prototype.set=function(t,r){return this.modify(t,function(){return r})},lr.prototype.slice=function(t,r){var n=this.size();if(null==t&&(t=0),null==r&&(r=n),0>t&&(t+=n),0>r&&(r+=n),0===t&&r===n)return this;if(t>r)throw Error("Index "+t+" is greater than index "+r);if(V(t,n)){if(t===r)return new lr(Mn,Mn,0);if(r>0&&n>=r){var e=this.root,o=e.size,i=[];if(o>=t&&cr(i,e,t,r),r>o){var u=or(this.tail,this.tail_size);tr(i,er(u,t-o,r-o))}return new lr(nr(i),Mn,0)}throw Error("Index "+r+" is not valid")}throw Error("Index "+t+" is not valid")},lr.prototype.concat=function(t){if(t instanceof lr){var r=this.root,n=this.tail,e=t.root,o=t.tail;if(e===Mn&&o===Mn)return this;if(r===Mn&&n===Mn)return t;n!==Mn&&(r=P(r,new ur(Mn,Mn,or(n,this.tail_size))));var i=F(r,e);return new lr(i,o,t.tail_size)}return x(t,this,function(t,r){return t.insert(r)})},Or.prototype.copy=function(t,r){return new Or(t,r,this.hash,this.key,this.value)},Or.prototype.modify=function(t){var r=t.hash,n=t.key,e=t.value;return this.hash===r&&this.key===n&&this.value===e?this:new Or(this.left,this.right,r,n,e)},Ar.prototype=Object.create(Kn),Ar.prototype[Jn]=Jr,Ar.prototype.isEmpty=br,Ar.prototype.has=Er,Ar.prototype.remove=xr(Ar),Ar.prototype.merge=Sr,Ar.prototype[Dn]=function(){return v(B(this.root),function(t){return Mr([t.key,t.value])})},Ar.prototype[Cn]=function(t){return null===t.hash&&(t.hash=_r(t)&&!jr(t)?"(Dict"+Yr(t,"  ")+")":"(SortedDict "+Xr(t.sort)+Yr(t,"  ")+")"),t.hash},Rn.Dict=function(t){return Tr(L(t))},Ar.prototype[Nn]=function(t){if(_r(t)&&!jr(t))return R("Dict",t);throw Error("Cannot convert SortedDict to JSON")},Ar.prototype.removeAll=function(){return new Ar(Mn,this.sort,this.hash_fn)},Ar.prototype.get=function(t,r){var n=gr(this.root,this.sort,this.hash_fn(t));if(n===Mn){if(2===arguments.length)return r;throw Error("Key "+t+" not found")}return n.value},Ar.prototype.set=function(t,r){var n=this.root,e=this.sort,o=this.hash_fn,i=o(t),u=dr(n,e,i,new Or(Mn,Mn,i,t,r));return u===n?this:new Ar(u,e,o)},Ar.prototype.modify=function(t,r){var n=this.root,e=this.sort,o=this.hash_fn,i=wr(n,e,o(t),t,r);return i===n?this:new Ar(i,e,o)},Nr.prototype=Object.create(Kn),Nr.prototype[Cn]=Zr("Tuple"),Nr.prototype[Jn]=Ur,Rn.Tuple=function(t){return Lr(Q(t))},Nr.prototype[Nn]=function(t){return M("Tuple",t)},Nr.prototype[Dn]=function(){return c(this.values)},Nr.prototype.size=function(){return this.values.length},Nr.prototype.get=function(t){var r=this.size();if(V(t,r))return this.values[t];throw Error("Index "+t+" is not valid")},Nr.prototype.modify=function(t,r){var n=this.size();if(V(t,n)){var e=this.values,o=f(e,t,r);return o===e?this:new Nr(o)}throw Error("Index "+t+" is not valid")},Nr.prototype.set=function(t,r){return this.modify(t,function(){return r})};var Pn=0,Bn=0,Gn={};rn.prototype.copy=function(t,r){return new rn(t,r,this.hash,this.key)},rn.prototype.modify=function(t){var r=t.hash,n=t.key;return this.hash===r&&this.key===n?this:new rn(this.left,this.right,r,n)},nn.prototype=Object.create(Kn),nn.prototype[Jn]=Ur,nn.prototype.isEmpty=br,nn.prototype.has=Er,nn.prototype.remove=xr(nn),Rn.Set=function(t){return fn(Q(t))},nn.prototype[Dn]=function(){return v(B(this.root),function(t){return t.key})},nn.prototype[Nn]=function(t){if(en(t)&&!on(t))return M("Set",t);throw Error("Cannot convert SortedSet to JSON")},nn.prototype[Cn]=function(t){if(null===t.hash){var r=C(t,function(t){return Xr(t)}),n="  ";t.hash=en(t)&&!on(t)?"(Set"+tn(r,n)+")":"(SortedSet "+Xr(t.sort)+tn(r,n)+")"}return t.hash},nn.prototype.removeAll=function(){return new nn(Mn,this.sort,this.hash_fn)},nn.prototype.add=function(t){var r=this.root,n=this.sort,e=this.hash_fn,o=e(t),i=dr(r,n,o,new rn(Mn,Mn,o,t));return i===r?this:new nn(i,n,e)},nn.prototype.union=function(t){return x(t,this,function(t,r){return t.add(r)})},nn.prototype.intersect=function(t){var r=this;if(r.isEmpty())return r;var n=r.removeAll();return x(t,n,function(t,n){return r.has(n)?t.add(n):t})},nn.prototype.disjoint=function(t){var r=this;return x(t,r,function(t,n){return r.has(n)?t.remove(n):t.add(n)})},nn.prototype.subtract=function(t){return this.isEmpty()?this:x(t,this,function(t,r){return t.remove(r)})},an.prototype=Object.create(Kn),an.prototype[Jn]=Ur,an.prototype[Cn]=Zr("Queue"),an.prototype.size=kr,an.prototype.concat=zr,Rn.Queue=function(t){return hn(Q(t))},an.prototype[Nn]=function(t){return M("Queue",t)},an.prototype.isEmpty=function(){return this.left===Mn&&this.right===Mn},an.prototype.removeAll=function(){return new an(Mn,Mn,0)},an.prototype[Dn]=function(){return y(Y(this.left),E(Y(this.right)))},an.prototype.peek=function(t){if(this.isEmpty()){if(1===arguments.length)return t;throw Error("Cannot peek from an empty queue")}return this.left.car},an.prototype.push=function(t){return this.isEmpty()?new an(new X(t,this.left),this.right,this.len+1):new an(this.left,new X(t,this.right),this.len+1)},an.prototype.pop=function(){if(this.isEmpty())throw Error("Cannot pop from an empty queue");var t=this.left.cdr;if(t===Mn){var r=Mn;return Z(this.right,function(t){r=new X(t,r)}),new an(r,Mn,this.len-1)}return new an(t,this.right,this.len-1)},cn.prototype=Object.create(Kn),cn.prototype[Jn]=Ur,cn.prototype[Cn]=Zr("Stack"),cn.prototype.isEmpty=br,cn.prototype.size=kr,cn.prototype.concat=zr,Rn.Stack=function(t){return pn(Q(t))},cn.prototype[Dn]=function(){return E(Y(this.root))},cn.prototype[Nn]=function(t){return M("Stack",t)},cn.prototype.removeAll=function(){return new cn(Mn,0)},cn.prototype.peek=function(t){if(this.isEmpty()){if(1===arguments.length)return t;throw Error("Cannot peek from an empty stack")}return this.root.car},cn.prototype.push=function(t){return new cn(new X(t,this.root),this.len+1)},cn.prototype.pop=function(){if(this.isEmpty())throw Error("Cannot pop from an empty stack");return new cn(this.root.cdr,this.len-1)},yn.prototype=Object.create(Kn),yn.prototype.update=Sr,yn.prototype[Jn]=Jr,Rn.Record=function(t){return dn(L(t))},yn.prototype[Nn]=function(t){return R("Record",t)},yn.prototype[Cn]=function(t){return null===t.hash&&(t.hash="(Record"+Yr(t,"  ")+")"),t.hash},yn.prototype[Dn]=function(){var t=this.keys,r=this.values;return c(C(A(t),function(t){return Hr(t,function(t,n){return Mr([t,r[n]])})}))},yn.prototype.get=function(t){vn(t);var r=this.keys[t];if(null==r)throw Error("Key "+t+" not found");return this.values[r]},yn.prototype.set=function(t,r){return this.modify(t,function(){return r})},yn.prototype.modify=function(t,r){vn(t);var n=this.keys,e=n[t];if(null==e)throw Error("Key "+t+" not found");var o=this.values,i=f(o,e,r);return i===o?this:new yn(n,i)};var Hn=0;wn.prototype=Object.create(Qn),wn.prototype[Cn]=function(t){return"(Ref "+Xr(t._id)+")"},wn.prototype.get=function(){return this._value},wn.prototype.set=function(t){var r=this._value;t!==r&&(this._value=t,null!=this._onchange&&this._onchange(r,t))},wn.prototype.modify=function(t){this.set(t(this.get()))},function(t,r){"function"==typeof define&&define.amd?define(["exports"],r):"object"==typeof exports?r(exports):(t.Immutable={},r(t.Immutable))}(this,function(t){t.equal=xn,t.fromJS=Cr,t.toJS=Dr,t.isDict=_r,t.isSet=en,t.isSortedDict=jr,t.isSortedSet=on,t.isList=pr,t.isQueue=sn,t.isTuple=Rr,t.isStack=ln,t.isImmutable=Sn,t.SortedDict=Ir,t.SortedSet=un,t.isIterable=h,t.Dict=Tr,t.Set=fn,t.List=vr,t.Tuple=Lr,t.Queue=hn,t.Stack=pn,t.simpleSort=yr,t.isRecord=gn,t.Record=dn,t.toJSON=N,t.fromJSON=U,t.deref=mn,t.Ref=En,t.isRef=bn,t.isTag=r,t.isUUIDTag=n,t.Tag=e,t.UUIDTag=o,t.each=_,t.map=C,t.keep=J,t.findIndex=j,t.reverse=D,t.foldl=x,t.foldr=S,t.join=z,t.zip=b,t.toArray=k,t.any=g,t.all=d,t.find=w,t.partition=m,t.range=T,t.take=I})}).call(this);