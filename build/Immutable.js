(function(){"use strict";function t(t){return"string"==typeof t&&bn.test(t)}function r(t){var r=typeof t;return"symbol"===r||"string"===r&&(En.test(t)||xn.test(t))}function n(t){return"string"==typeof t&&xn.test(t)}function e(){if(0===arguments.length)return"(Tag "+dn+" "+ ++wn+")";throw Error("Expected 0 arguments but got "+arguments.length)}function o(r){if(1===arguments.length){if(t(r))return"(UUIDTag "+r+")";throw Error("Expected a lower-case UUID, but got: "+r)}throw Error("Expected 1 argument but got "+arguments.length)}function i(t){for(var r=t.length,n=Array(r),e=0;r>e;++e)n[e]=t[e];return n}function u(t,r,n){for(var e=t.length+1,o=Array(e),i=0;r>i;)o[i]=t[i],++i;for(o[i]=n,++i;e>i;)o[i]=t[i-1],++i;return o}function f(t,r,n){var e=t[r],o=n(e);if(e===o)return t;var u=i(t);return u[r]=o,u}function a(t,r){for(var n=t.length-1,e=Array(n),o=0;r>o;)e[o]=t[o],++o;for(;n>o;)e[o]=t[o+1],++o;return e}function s(t){var r=0;return{next:function(){return r<t.length?{value:t[r++]}:{done:!0}}}}function h(t){return H(t)?null!=t[Sn]||null!==kn&&t[kn]||Array.isArray(t):"string"==typeof t&&!r(t)}function c(t){var n;if(null!=(n=t[Sn]))return n.call(t);if(null!==kn&&null!=(n=t[kn]))return n.call(t);if(Array.isArray(t))return s(t);if("string"!=typeof t||r(t))throw Error("Cannot iter: "+t);return s(t)}function p(t){var r={};return r[Sn]=t,null!==kn&&(r[kn]=t),r}function l(t,r){for(;;){var n=t.next();if(n.done)break;r(n.value)}}function v(t,r){return{next:function(){var n=t.next();return n.done?{done:!0}:{value:r(n.value)}}}}function y(t,r){var n=!1,e=!1;return{next:function(){for(;;)if(n){if(e)return{done:!0};var o=r.next();if(!o.done)return o;e=!0}else{var o=t.next();if(!o.done)return o;n=!0}}}}function g(t,r){for(var n=c(t);;){var e=n.next();if(e.done)return!1;if(r(e.value))return!0}}function d(t,r){for(var n=c(t);;){var e=n.next();if(e.done)return!0;if(!r(e.value))return!1}}function w(t,r,n){for(var e=c(t);;){var o=e.next();if(o.done){if(3===arguments.length)return n;throw Error("Did not find anything")}if(r(o.value))return o.value}}function m(t,r){var n=2===arguments.length;return p(function(){var e=k(t).map(function(t){return c(t)}),o=!1;return{next:function(){for(;;){if(o)return{done:!0};for(var t=[],i=!1,u=0,f=e.length;f>u;++u){var a=e[u].next();if(a.done){if(!n){i=!1;break}t.push(r)}else i=!0,t.push(a.value)}if(i)return{value:B(t)};o=!0}}}})}function b(t){var r=[];l(t,function(t){r.push(t)});var n=r.length;return{next:function(){return n?{value:r[--n]}:{done:!0}}}}function E(t,r,n){return A(t,function(t){r=n(r,t)}),r}function x(t,r,n){return E(T(t),r,function(t,r){return n(r,t)})}function k(t){if(Array.isArray(t))return t;var r=[];return A(t,function(t){r.push(t)}),r}function z(t,r){return null==r&&(r=""),"string"==typeof t&&""===r?t:k(t).join(r)}function S(t,r){var n=!1,e=null;return{next:function(){for(;;){if(n)return{done:!0};if(null===e){var o=t.next();o.done?n=!0:e=r(o.value)}else{var o=e.next();if(!o.done)return o;e=null}}}}}function _(t){return V(t)?O(Object.keys(t),function(r){return[r,t[r]]}):t}function A(t,r){l(c(t),r)}function I(t,r,n){for(var e=c(t),o=0;;){var i=e.next();if(i.done){if(3===arguments.length)return n;throw Error("Did not find anything")}if(r(i.value))return o;++o}}function O(t,r){return p(function(){return v(c(t),r)})}function T(t){return p(function(){return b(c(t))})}function j(t,r){return p(function(){var n=c(t);return{next:function(){for(;;){var t=n.next();if(t.done)return{done:!0};if(r(t.value))return t}}}})}function D(t){if(H(t)){var e=t[An];if(null!=e){var o=On[e];if(null!=o)return o(t);throw Error("Cannot handle type "+e)}return t}if(r(t)){if(n(t))return t;throw Error("Cannot convert Tag from JSON, use UUIDTag instead: "+t)}return t}function U(t){if(H(t)){var e=t[In];return null!=e?e(t):t}if(r(t)){if(n(t))return t;throw Error("Cannot convert Tag to JSON, use UUIDTag instead: "+t)}return t}function C(t,r){var n={};return n[An]=t,n.keys=[],n.values=[],A(r,function(t){tr(t,function(t,r){n.keys.push(U(t)),n.values.push(U(r))})}),n}function R(t,r){var n={};return n[An]=t,n.values=[],A(r,function(t){n.values.push(U(t))}),n}function J(t){for(var r=t.keys,n=t.values,e=r.length,o=Array(e),i=0;e>i;++i)o[i]=[D(r[i]),D(n[i])];return o}function N(t){for(var r=t.values,n=r.length,e=Array(n),o=0;n>o;++o)e[o]=D(r[o]);return e}function L(t){if(H(t)){var r=t[_n];return null!=r?r(t):t}return t}function M(t){var r={};return A(t,function(t){tr(t,function(t,n){if("string"!=typeof t)throw Error("Cannot convert to JavaScript: expected key to be string or Tag but got "+t);r[t]=L(n)})}),r}function Q(t){var r=[];return A(t,function(t){r.push(L(t))}),r}function K(){return nr(this)}function q(t,r){return t>=0&&r>t}function $(t){var r=this.size();return 0>t&&(t+=r),q(t,r)}function P(t){this.values=t,this.hash=null}function F(t){return t instanceof P}function B(t){return new P(t)}function G(t){if(null!=t){if(F(t))return t;var r=[];return A(t,function(t){r.push(t)}),new P(r)}return new P([])}function H(t){return Object(t)===t}function V(t){if(H(t)){var r=Object.getPrototypeOf(t);return null===r||r===Object.prototype}return!1}function W(t,r){return Array(r+1).join(t)}function X(t,r,n){var e=Math.max(0,r-t.length);return t+W(n,e)}function Y(t){return t}function Z(t,r){return 1===t?r:r+"s"}function tr(t,r){if(Array.isArray(t)){if(2===t.length)return r(t[0],t[1]);throw Error("Expected array with 2 elements but got "+t.length+" "+Z(t.length,"element"))}if(F(t)){if(2===t.size())return r(t.get(0),t.get(1));throw Error("Expected Tuple with 2 elements but got "+t.size()+" "+Z(t.size(),"element"))}throw Error("Expected array or Tuple but got: "+t)}function rr(t){return'"'+t.replace(/[\\\"\n]/g,function(t){return"\n"===t?t+" ":"\\"+t})+'"'}function nr(t){var n=typeof t;if("string"===n)return r(t)?t:rr(t);if("number"===n||"boolean"===n||"undefined"===n||null===t)return""+t;var e=t[zn];if(null!=e)return e(t);var o="(Mutable "+ ++Un+")";return Object.defineProperty(t,zn,{configurable:!1,enumerable:!1,writable:!1,value:function(){return o}}),o}function er(t,r){var n=0,e=[];A(t,function(t){tr(t,function(t,r){t=nr(t),r=nr(r),t=t.split(/\n/),A(t,function(t){n=Math.max(n,t.length)}),e.push({key:t,value:r})})});var r="  ";return e=O(e,function(t){var r=t.key.length-1;t.key[r]=X(t.key[r],n," ");var e=z(t.key,"\n"),o=t.value.replace(/\n/g,"\n"+W(" ",n+3));return e+" = "+o}),ir(e,r)}function or(t){return function(r){if(null===r.hash){var n=O(r,function(t){return nr(t)});r.hash="("+t+ir(n,"  ")+")"}return r.hash}}function ir(t,r){var n="\n"+r;return z(O(t,function(t){return n+t.replace(/\n/g,n)}))}function ur(t,r){return t>r?t:r}function fr(t,r,n){var e=r.depth,o=n.depth;if(e>o+1){var i=r.left,u=r.right;return u.depth>i.depth?u.copy(r.copy(i,u.left),t.copy(u.right,n)):r.copy(i,t.copy(u,n))}if(o>e+1){var f=n.right,a=n.left;return a.depth>f.depth?a.copy(t.copy(r,a.left),n.copy(a.right,f)):n.copy(t.copy(r,a),f)}return t.copy(r,n)}function ar(t,r){if(t===Tn)return r;if(r===Tn)return t;if(t.depth<r.depth){var n=ar(t,r.left);return fr(r,n,r.right)}var e=ar(t.right,r);return fr(t,t.left,e)}function sr(t,r){return t===Tn?r:fr(t,sr(t.left,r),t.right)}function hr(t,r){return t===Tn?r:fr(t,t.left,hr(t.right,r))}function cr(t){for(var r=[];t!==Tn;)r.push(t),t=t.left;return{next:function(){if(r.length){var n=r.pop();for(t=n.right;t!==Tn;)r.push(t),t=t.left;return{value:n}}return{done:!0}}}}function pr(t,r){return t===r?0:r>t?-1:1}function lr(t,r,n){for(;t!==Tn;){var e=r(n,t.hash);if(0===e)break;t=0>e?t.left:t.right}return t}function vr(t,r,n,e){if(t===Tn)return e;var o=t.left,i=t.right,u=r(n,t.hash);if(0===u)return t.modify(e);if(0>u){var f=vr(o,r,n,e);return f===o?t:fr(t,f,i)}var f=vr(i,r,n,e);return f===i?t:fr(t,o,f)}function yr(t,r,n,e,o){if(t===Tn)throw Error("Key "+e+" not found");var i=t.left,u=t.right,f=r(n,t.hash);if(0===f)return t.modify({key:e,hash:n,value:o(t.value)});if(0>f){var a=yr(i,r,n,e,o);return a===i?t:fr(t,a,u)}var a=yr(u,r,n,e,o);return a===u?t:fr(t,i,a)}function gr(t,r,n){if(t===Tn)return t;var e=t.left,o=t.right,i=r(n,t.hash);if(0===i)return ar(e,o);if(0>i){var u=gr(e,r,n);return u===e?t:fr(t,u,o)}var u=gr(o,r,n);return u===o?t:fr(t,e,u)}function dr(){return this.root===Tn}function wr(t){return lr(this.root,this.sort,this.hash_fn(t))!==Tn}function mr(t){return function(r){var n=this.root,e=this.sort,o=this.hash_fn,i=gr(n,e,o(r));return i===n?this:new t(i,e,o)}}function br(t){return E(_(t),this,function(t,r){return tr(r,function(r,n){return t.set(r,n)})})}function Er(){return this.len}function xr(t){return E(t,this,function(t,r){return t.push(r)})}function kr(t,r,n,e,o){this.left=t,this.right=r,this.hash=n,this.key=e,this.value=o,this.depth=ur(t.depth,r.depth)+1}function zr(t,r,n){this.root=t,this.sort=r,this.hash_fn=n,this.hash=null}function Sr(t){return t instanceof zr}function _r(t){return Sr(t)&&t.hash_fn===Y}function Ar(t,r){return null!=r?_r(r)&&r.sort===t?r:new zr(Tn,t,Y).merge(r):new zr(Tn,t,Y)}function Ir(t){return null!=t?Sr(t)&&!_r(t)?t:new zr(Tn,pr,nr).merge(t):new zr(Tn,pr,nr)}function Or(t,r,n,e){this.left=t,this.right=r,this.hash=n,this.key=e,this.depth=ur(t.depth,r.depth)+1}function Tr(t,r,n){this.root=t,this.sort=r,this.hash_fn=n,this.hash=null}function jr(t){return t instanceof Tr}function Dr(t){return jr(t)&&t.hash_fn===Y}function Ur(t,r){return null!=r?Dr(r)&&r.sort===t?r:new Tr(Tn,t,Y).union(r):new Tr(Tn,t,Y)}function Cr(t){return null!=t?jr(t)&&!Dr(t)?t:new Tr(Tn,pr,nr).union(t):new Tr(Tn,pr,nr)}function Rr(t,r){this.car=t,this.cdr=r}function Jr(t){return{next:function(){if(t===Tn)return{done:!0};var r=t.car;return t=t.cdr,{value:r}}}}function Nr(t,r){for(;t!==Tn;)r(t.car),t=t.cdr}function Lr(t,r){if(t.length){var n=t[t.length-1];n.length+r.length<=Cn?t[t.length-1]=n.concat(r):t.push(r)}else t.push(r)}function Mr(t,r,n){if(n>r){var e=Jn((r+n)/2),o=Mr(t,r,e),i=Mr(t,e+1,n);return new Pr(o,i,t[e])}return Tn}function Qr(t){return Mr(t,0,t.length)}function Kr(t,r,n){0>r&&(r=0);var e=t.length;return n>e&&(n=e),0===r&&n===e?t:t.slice(r,n)}function qr(t,r){for(var n=Array(r);r--;)n[r]=t.car,t=t.cdr;return n}function $r(t,r,n){for(;--r!==n;)t=t.cdr;return t.car}function Pr(t,r,n){this.left=t,this.right=r,this.array=n,this.size=t.size+r.size+n.length,this.depth=ur(t.depth,r.depth)+1}function Fr(t,r){for(;;){var n=t.left,e=n.size;if(e>r)t=n;else{r-=e;var o=t.array,i=o.length;if(i>r)return o[r];r-=i,t=t.right}}}function Br(t,r,n){if(t===Tn)return new Pr(Tn,Tn,[n]);var e=t.left,o=t.right,i=e.size;if(i>r){var f=Br(e,r,n);return fr(t,f,o)}r-=i;var a=t.array,s=a.length;if(s>=r){if(a=u(a,r,n),s===Cn){var h=Rn(a.length/2),c=a.slice(0,h),p=a.slice(h);return e.depth<o.depth?new Pr(hr(e,new Pr(Tn,Tn,c)),o,p):new Pr(e,sr(o,new Pr(Tn,Tn,p)),c)}return new Pr(e,o,a)}var f=Br(o,r-s,n);return fr(t,e,f)}function Gr(t,r,n){var e=t.left,o=t.right,i=e.size;if(i>r){var u=Gr(e,r,n);return u===e?t:t.copy(u,o)}r-=i;var a=t.array,s=a.length;if(s>r){var h=f(a,r,n);return h===a?t:new Pr(e,o,h)}var u=Gr(o,r-s,n);return u===o?t:t.copy(e,u)}function Hr(t,r){var n=t.left,e=t.right,o=n.size;if(o>r){var i=Hr(n,r);return fr(t,i,e)}r-=o;var u=t.array,f=u.length;if(f>r)return u=a(u,r),0===u.length?ar(n,e):new Pr(n,e,u);var i=Hr(e,r-f);return fr(t,n,i)}function Vr(t,r,n,e){if(r!==Tn){var o=r.left,i=o.size;i>n&&Vr(t,o,n,e);var u=r.array,f=u.length;n-=i,e-=i,f>n&&e>0&&Lr(t,Kr(u,n,e)),e>f&&Vr(t,r.right,n-f,e-f)}}function Wr(t,r,n){this.root=t,this.tail=r,this.tail_size=n,this.hash=null}function Xr(t){return t instanceof Wr}function Yr(t){return null!=t?t instanceof Wr?t:new Wr(Tn,Tn,0).concat(t):new Wr(Tn,Tn,0)}function Zr(t,r,n){this.left=t,this.right=r,this.len=n,this.hash=null}function tn(t){return t instanceof Zr}function rn(t){return null!=t?t instanceof Zr?t:new Zr(Tn,Tn,0).concat(t):new Zr(Tn,Tn,0)}function nn(t,r){this.root=t,this.len=r,this.hash=null}function en(t){return t instanceof nn}function on(t){return null!=t?t instanceof nn?t:new nn(Tn,0).concat(t):new nn(Tn,0)}function un(t){if("string"!=typeof t)throw Error("Expected key to be a string or Tag but got "+t)}function fn(t,r){this.keys=t,this.values=r,this.hash=null}function an(t){return t instanceof fn}function sn(t){var r={},n=[];if(null!=t){if(an(t))return t;A(_(t),function(t){tr(t,function(t,e){un(t),r[t]=n.push(e)-1})})}return new fn(r,n)}function hn(t,r){this._id=++Nn,this._value=t,this._onchange=r}function cn(t){return pn(t)?t.get():t}function pn(t){return t instanceof hn}function ln(t,r){if(arguments.length<1||arguments.length>2)throw Error("Expected 1 to 2 arguments but got "+arguments.length);return new hn(t,r)}function vn(t,r){return t===r||nr(t)===nr(r)}function yn(t){if(H(t))return Object.isFrozen(t)||Sr(t)||jr(t)||Xr(t)||F(t)||tn(t)||en(t)||an(t);var r=typeof t;return"string"===r||"number"===r||"boolean"===r||"symbol"===r||null==t}function gn(t){if(Array.isArray(t)){for(var r=Yr(),n=0,e=t.length;e>n;++n)r=r.insert(gn(t[n]));return r}if(V(t)){var r=Ir();for(var o in t)r=r.set(o,gn(t[o]));return r}return t}var dn="48de6fff-9d11-472d-a76f-ed77a59a5cbc",wn=0,mn="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",bn=RegExp("^"+mn+"$"),En=RegExp("^\\(Tag "+dn+" [0-9]+\\)$"),xn=RegExp("^\\(UUIDTag "+mn+"\\)$"),kn="undefined"!=typeof Symbol&&void 0!==Symbol.iterator?Symbol.iterator:null,zn=o("e1c3818d-4c4f-4703-980a-00969e4ca900"),Sn=o("6199065c-b518-4cb3-8b41-ab70a9769ec3"),_n=o("1b75a273-16bd-4248-be8a-e4b5e8c4b523"),An=o("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37"),In=o("99e14916-bc99-4c48-81aa-299cf1ad6de3"),On={},Tn={};Tn.depth=0,Tn.size=0;var jn={},Dn={};jn.toString=Dn.toString=K,jn.inspect=Dn.inspect=K,null!==kn&&(jn[kn]=Dn[kn]=function(){return c(this)}),P.prototype=Object.create(Dn),P.prototype[zn]=or("Tuple"),P.prototype[_n]=Q,On.Tuple=function(t){return G(N(t))},P.prototype[In]=function(t){return R("Tuple",t)},P.prototype[Sn]=function(){return c(this.values)},P.prototype.size=function(){return this.values.length},P.prototype.get=function(t){var r=this.size();if(q(t,r))return this.values[t];throw Error("Index "+t+" is not valid")},P.prototype.modify=function(t,r){var n=this.size();if(q(t,n)){var e=this.values,o=f(e,t,r);return o===e?this:new P(o)}throw Error("Index "+t+" is not valid")};var Un=0;kr.prototype.copy=function(t,r){return new kr(t,r,this.hash,this.key,this.value)},kr.prototype.modify=function(t){var r=t.hash,n=t.key,e=t.value;return this.hash===r&&this.key===n&&this.value===e?this:new kr(this.left,this.right,r,n,e)},zr.prototype=Object.create(Dn),zr.prototype[_n]=M,zr.prototype.isEmpty=dr,zr.prototype.has=wr,zr.prototype.remove=mr(zr),zr.prototype.merge=br,zr.prototype[Sn]=function(){return v(cr(this.root),function(t){return B([t.key,t.value])})},zr.prototype[zn]=function(t){return null===t.hash&&(t.hash=Sr(t)&&!_r(t)?"(Dict"+er(t,"  ")+")":"(SortedDict "+nr(t.sort)+er(t,"  ")+")"),t.hash},On.Dict=function(t){return Ir(J(t))},zr.prototype[In]=function(t){if(Sr(t)&&!_r(t))return C("Dict",t);throw Error("Cannot convert SortedDict to JSON")},zr.prototype.removeAll=function(){return new zr(Tn,this.sort,this.hash_fn)},zr.prototype.get=function(t,r){var n=lr(this.root,this.sort,this.hash_fn(t));if(n===Tn){if(2===arguments.length)return r;throw Error("Key "+t+" not found")}return n.value},zr.prototype.set=function(t,r){var n=this.root,e=this.sort,o=this.hash_fn,i=o(t),u=vr(n,e,i,new kr(Tn,Tn,i,t,r));return u===n?this:new zr(u,e,o)},zr.prototype.modify=function(t,r){var n=this.root,e=this.sort,o=this.hash_fn,i=yr(n,e,o(t),t,r);return i===n?this:new zr(i,e,o)},Or.prototype.copy=function(t,r){return new Or(t,r,this.hash,this.key)},Or.prototype.modify=function(t){var r=t.hash,n=t.key;return this.hash===r&&this.key===n?this:new Or(this.left,this.right,r,n)},Tr.prototype=Object.create(Dn),Tr.prototype[_n]=Q,Tr.prototype.isEmpty=dr,Tr.prototype.has=wr,Tr.prototype.remove=mr(Tr),On.Set=function(t){return Cr(N(t))},Tr.prototype[Sn]=function(){return v(cr(this.root),function(t){return t.key})},Tr.prototype[In]=function(t){if(jr(t)&&!Dr(t))return R("Set",t);throw Error("Cannot convert SortedSet to JSON")},Tr.prototype[zn]=function(t){if(null===t.hash){var r=O(t,function(t){return nr(t)}),n="  ";t.hash=jr(t)&&!Dr(t)?"(Set"+ir(r,n)+")":"(SortedSet "+nr(t.sort)+ir(r,n)+")"}return t.hash},Tr.prototype.removeAll=function(){return new Tr(Tn,this.sort,this.hash_fn)},Tr.prototype.add=function(t){var r=this.root,n=this.sort,e=this.hash_fn,o=e(t),i=vr(r,n,o,new Or(Tn,Tn,o,t));return i===r?this:new Tr(i,n,e)},Tr.prototype.union=function(t){return E(t,this,function(t,r){return t.add(r)})},Tr.prototype.intersect=function(t){var r=this;if(r.isEmpty())return r;var n=r.removeAll();return E(t,n,function(t,n){return r.has(n)?t.add(n):t})},Tr.prototype.disjoint=function(t){var r=this;return E(t,r,function(t,n){return r.has(n)?t.remove(n):t.add(n)})},Tr.prototype.subtract=function(t){return this.isEmpty()?this:E(t,this,function(t,r){return t.remove(r)})};var Cn=125,Rn=Math.ceil,Jn=Math.floor;Pr.prototype.copy=function(t,r){return new Pr(t,r,this.array)},Wr.prototype=Object.create(Dn),Wr.prototype[zn]=or("List"),Wr.prototype[_n]=Q,Wr.prototype.has=$,On.List=function(t){return Yr(N(t))},Wr.prototype[In]=function(t){return R("List",t)},Wr.prototype[Sn]=function(){var t=S(cr(this.root),function(t){return c(t.array)});return y(t,b(Jr(this.tail)))},Wr.prototype.isEmpty=function(){return this.root===Tn&&this.tail===Tn},Wr.prototype.removeAll=function(){return new Wr(Tn,Tn,0)},Wr.prototype.size=function(){return this.root.size+this.tail_size},Wr.prototype.get=function(t,r){var n=this.size();if(0>t&&(t+=n),q(t,n)){var e=this.root,o=e.size;return o>t?Fr(e,t):$r(this.tail,this.tail_size,t-o)}if(2===arguments.length)return r;throw Error("Index "+t+" is not valid")},Wr.prototype.insert=function(t,r){1===arguments.length&&(r=-1);var n=this.size();0>r&&(r+=n+1);var e=this.root,o=this.tail,i=this.tail_size;if(r===n){if(i===Cn){var f=hr(e,new Pr(Tn,Tn,qr(o,i)));return new Wr(f,new Rr(t,Tn),1)}return new Wr(e,new Rr(t,o),i+1)}if(q(r,n)){var a=e.size;if(a>r)return new Wr(Br(e,r,t),o,i);var s=u(qr(o,i),r-a,t),f=hr(e,new Pr(Tn,Tn,s));return new Wr(f,Tn,0)}throw Error("Index "+r+" is not valid")},Wr.prototype.remove=function(t){0===arguments.length&&(t=-1);var r=this.size();0>t&&(t+=r);var n=this.root,e=this.tail,o=this.tail_size;if(e!==Tn&&t===r-1)return new Wr(n,e.cdr,o-1);if(q(t,r)){var i=n.size;if(i>t)return new Wr(Hr(n,t),e,o);var u=a(qr(e,o),t-i),f=hr(n,new Pr(Tn,Tn,u));return new Wr(f,Tn,0)}throw Error("Index "+t+" is not valid")},Wr.prototype.modify=function(t,r){var n=this.size();if(0>t&&(t+=n),q(t,n)){var e=this.root,o=this.tail,i=this.tail_size,u=e.size;if(o!==Tn&&t===n-1){var a=r(o.car);return a===o.car?this:new Wr(e,new Rr(a,o.cdr),i)}if(u>t){var s=Gr(e,t,r);return s===e?this:new Wr(s,o,i)}var h=qr(o,i),c=f(h,t-u,r);if(c===h)return this;var s=hr(e,new Pr(Tn,Tn,c));return new Wr(s,Tn,0)}throw Error("Index "+t+" is not valid")},Wr.prototype.slice=function(t,r){var n=this.size();if(null==t&&(t=0),null==r&&(r=n),0>t&&(t+=n),0>r&&(r+=n),0===t&&r===n)return this;if(t>r)throw Error("Index "+t+" is greater than index "+r);if(q(t,n)){if(t===r)return new Wr(Tn,Tn,0);if(r>0&&n>=r){var e=this.root,o=e.size,i=[];if(o>=t&&Vr(i,e,t,r),r>o){var u=qr(this.tail,this.tail_size);Lr(i,Kr(u,t-o,r-o))}return new Wr(Qr(i),Tn,0)}throw Error("Index "+r+" is not valid")}throw Error("Index "+t+" is not valid")},Wr.prototype.concat=function(t){if(t instanceof Wr){var r=this.root,n=this.tail,e=t.root,o=t.tail;if(e===Tn&&o===Tn)return this;if(r===Tn&&n===Tn)return t;n!==Tn&&(r=hr(r,new Pr(Tn,Tn,qr(n,this.tail_size))));var i=ar(r,e);return new Wr(i,o,t.tail_size)}return E(t,this,function(t,r){return t.insert(r)})},Zr.prototype=Object.create(Dn),Zr.prototype[_n]=Q,Zr.prototype[zn]=or("Queue"),Zr.prototype.size=Er,Zr.prototype.concat=xr,On.Queue=function(t){return rn(N(t))},Zr.prototype[In]=function(t){return R("Queue",t)},Zr.prototype.isEmpty=function(){return this.left===Tn&&this.right===Tn},Zr.prototype.removeAll=function(){return new Zr(Tn,Tn,0)},Zr.prototype[Sn]=function(){return y(Jr(this.left),b(Jr(this.right)))},Zr.prototype.peek=function(t){if(this.isEmpty()){if(1===arguments.length)return t;throw Error("Cannot peek from an empty queue")}return this.left.car},Zr.prototype.push=function(t){return this.isEmpty()?new Zr(new Rr(t,this.left),this.right,this.len+1):new Zr(this.left,new Rr(t,this.right),this.len+1)},Zr.prototype.pop=function(){if(this.isEmpty())throw Error("Cannot pop from an empty queue");var t=this.left.cdr;if(t===Tn){var r=Tn;return Nr(this.right,function(t){r=new Rr(t,r)}),new Zr(r,Tn,this.len-1)}return new Zr(t,this.right,this.len-1)},nn.prototype=Object.create(Dn),nn.prototype[_n]=Q,nn.prototype[zn]=or("Stack"),nn.prototype.isEmpty=dr,nn.prototype.size=Er,nn.prototype.concat=xr,On.Stack=function(t){return on(N(t))},nn.prototype[Sn]=function(){return b(Jr(this.root))},nn.prototype[In]=function(t){return R("Stack",t)},nn.prototype.removeAll=function(){return new nn(Tn,0)},nn.prototype.peek=function(t){if(this.isEmpty()){if(1===arguments.length)return t;throw Error("Cannot peek from an empty stack")}return this.root.car},nn.prototype.push=function(t){return new nn(new Rr(t,this.root),this.len+1)},nn.prototype.pop=function(){if(this.isEmpty())throw Error("Cannot pop from an empty stack");return new nn(this.root.cdr,this.len-1)},fn.prototype=Object.create(Dn),fn.prototype.update=br,fn.prototype[_n]=M,On.Record=function(t){return sn(J(t))},fn.prototype[In]=function(t){return C("Record",t)},fn.prototype[zn]=function(t){return null===t.hash&&(t.hash="(Record"+er(t,"  ")+")"),t.hash},fn.prototype[Sn]=function(){var t=this.keys,r=this.values;return c(O(_(t),function(t){return tr(t,function(t,n){return B([t,r[n]])})}))},fn.prototype.get=function(t){un(t);var r=this.keys[t];if(null==r)throw Error("Key "+t+" not found");return this.values[r]},fn.prototype.set=function(t,r){return this.modify(t,function(){return r})},fn.prototype.modify=function(t,r){un(t);var n=this.keys,e=n[t];if(null==e)throw Error("Key "+t+" not found");var o=this.values,i=f(o,e,r);return i===o?this:new fn(n,i)};var Nn=0;hn.prototype=Object.create(jn),hn.prototype[zn]=function(t){return"(Ref "+nr(t._id)+")"},hn.prototype.get=function(){return this._value},hn.prototype.set=function(t){var r=this._value;t!==r&&(this._value=t,null!=this._onchange&&this._onchange(r,t))},hn.prototype.modify=function(t){this.set(t(this.get()))},function(t,r){"function"==typeof define&&define.amd?define(["exports"],r):"object"==typeof exports?r(exports):(t.Immutable={},r(t.Immutable))}(this,function(t){t.equal=vn,t.fromJS=gn,t.toJS=L,t.isDict=Sr,t.isSet=jr,t.isSortedDict=_r,t.isSortedSet=Dr,t.isList=Xr,t.isQueue=tn,t.isTuple=F,t.isStack=en,t.isImmutable=yn,t.SortedDict=Ar,t.SortedSet=Ur,t.isIterable=h,t.Dict=Ir,t.Set=Cr,t.List=Yr,t.Tuple=G,t.Queue=rn,t.Stack=on,t.simpleSort=pr,t.isRecord=an,t.Record=sn,t.toJSON=U,t.fromJSON=D,t.deref=cn,t.Ref=ln,t.isRef=pn,t.isTag=r,t.isUUIDTag=n,t.Tag=e,t.UUIDTag=o,t.each=A,t.map=O,t.keep=j,t.findIndex=I,t.reverse=T,t.foldl=E,t.foldr=x,t.join=z,t.zip=m,t.toArray=k,t.any=g,t.all=d,t.find=w})}).call(this);