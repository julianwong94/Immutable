(function(){"use strict";function t(t){var r=typeof t;if("string"===r)return'"'+t.replace(/\\/g,"\\\\").replace(/\"/g,'\\"').replace(/\n/g,"\n ")+'"';if("number"===r||"boolean"===r||"undefined"===r||null===t)return""+t;var n=t[fr];if(null!=n)return n(t);var e="(Mutable "+ ++ar+")";return Object.defineProperty(t,fr,{configurable:!1,enumerable:!1,writable:!1,value:function(){return e}}),e}function r(t){return Object(t)===t}function n(t){if(r(t)){var n=Object.getPrototypeOf(t);return null===n||n===Object.prototype}return!1}function e(t,r){return Array(r+1).join(t)}function i(t,r,n){var i=Math.max(0,r-t.length);return t+e(n,i)}function o(t,r){if(t.length){var n="\n"+r;return n+t.map(function(t){return t.replace(/\n/g,n)}).join(n)}return""}function u(t){if(r(t)){var n=t[sr];return null!=n?n(t):t}return t}function h(t){var r={};return t.forEach(function(t){var n=t[0],e=t[1];if("string"!=typeof n)throw Error("Cannot convert to JavaScript: expected string key but got "+n);r[n]=u(e)}),r}function f(t){var r=[];return t.forEach(function(t){r.push(u(t))}),r}function a(t,r){return t>r?t:r}function s(t,r,n){var e=r.depth,i=n.depth;if(e>i+1){var o=r.left,u=r.right;return u.depth>o.depth?u.copy(r.copy(o,u.left),t.copy(u.right,n)):r.copy(o,t.copy(u,n))}if(i>e+1){var h=n.right,f=n.left;return f.depth>h.depth?f.copy(t.copy(r,f.left),n.copy(f.right,h)):n.copy(t.copy(r,f),h)}return t.copy(r,n)}function c(t,r){if(t===cr)return r;if(r===cr)return t;if(t.depth<r.depth){var n=c(t,r.left);return s(r,n,r.right)}var e=c(t.right,r);return s(t,t.left,e)}function p(t,r){return t===cr?r:s(t,p(t.left,r),t.right)}function l(t,r){return t===cr?r:s(t,t.left,l(t.right,r))}function y(t,r){return t===r?0:r>t?-1:1}function v(r,n){return r=t(r),n=t(n),y(r,n)}function g(t,r,n){for(;t!==cr;){var e=r(n,t.key);if(0===e)break;t=0>e?t.left:t.right}return t}function w(t,r,n,e){if(t===cr)return e;var i=t.left,o=t.right,u=r(n,t.key);if(0===u)return t.modify(e);if(0>u){var h=w(i,r,n,e);return h===i?t:s(t,h,o)}var h=w(o,r,n,e);return h===o?t:s(t,i,h)}function d(t,r,n,e){if(t===cr)throw Error("Key "+n+" not found");var i=t.left,o=t.right,u=r(n,t.key);if(0===u)return t.modify({key:n,value:e(t.value)});if(0>u){var h=d(i,r,n,e);return h===i?t:s(t,h,o)}var h=d(o,r,n,e);return h===o?t:s(t,i,h)}function E(t,r,n){if(t===cr)return t;var e=t.left,i=t.right,o=r(n,t.key);if(0===o)return c(e,i);if(0>o){var u=E(e,r,n);return u===e?t:s(t,u,i)}var u=E(i,r,n);return u===i?t:s(t,e,u)}function m(t,r,n,e){this.left=t,this.right=r,this.key=n,this.value=e,this.depth=a(t.depth,r.depth)+1}function z(t,r){this.root=t,this.sort=r,this.hash=null}function k(t,r,n){this.left=t,this.right=r,this.key=n,this.depth=a(t.depth,r.depth)+1}function b(t,r){this.root=t,this.sort=r,this.hash=null}function S(t){for(var r=t.length,n=Array(r),e=0;r>e;++e)n[e]=t[e];return n}function _(t,r,n){for(var e=t.length+1,i=Array(e),o=0;r>o;)i[o]=t[o],++o;for(i[o]=n,++o;e>o;)i[o]=t[o-1],++o;return i}function j(t,r,n){var e=t[r],i=n(e);if(e===i)return t;var o=S(t);return o[r]=i,o}function x(t,r){for(var n=t.length-1,e=Array(n),i=0;r>i;)e[i]=t[i],++i;for(;n>i;)e[i]=t[i+1],++i;return e}function A(t,r){this.car=t,this.cdr=r}function C(t,r){if(t.length){var n=t[t.length-1];n.length+r.length<=lr?t[t.length-1]=n.concat(r):t.push(r)}else t.push(r)}function D(t,r,n){if(n>r){var e=vr((r+n)/2),i=D(t,r,e),o=D(t,e+1,n);return new B(i,o,t[e])}return cr}function O(t){return D(t,0,t.length)}function I(t,r,n){0>r&&(r=0);var e=t.length;return n>e&&(n=e),0===r&&n===e?t:t.slice(r,n)}function R(t,r){for(var n=Array(r);r--;)n[r]=t.car,t=t.cdr;return n}function M(t,r,n){for(;--r!==n;)t=t.cdr;return t.car}function B(t,r,n){this.left=t,this.right=r,this.array=n,this.size=t.size+r.size+n.length,this.depth=a(t.depth,r.depth)+1}function J(t,r){return t>=0&&r>t}function q(t,r){for(;;){var n=t.left,e=n.size;if(e>r)t=n;else{r-=e;var i=t.array,o=i.length;if(o>r)return i[r];r-=o,t=t.right}}}function L(t,r,n){if(t===cr)return new B(cr,cr,[n]);var e=t.left,i=t.right,o=e.size;if(o>r){var u=L(e,r,n);return s(t,u,i)}r-=o;var h=t.array,f=h.length;if(f>=r){if(h=_(h,r,n),f===lr){var a=yr(h.length/2),c=h.slice(0,a),y=h.slice(a);return e.depth<i.depth?new B(l(e,new B(cr,cr,c)),i,y):new B(e,p(i,new B(cr,cr,y)),c)}return new B(e,i,h)}var u=L(i,r-f,n);return s(t,e,u)}function Q(t,r,n){var e=t.left,i=t.right,o=e.size;if(o>r){var u=Q(e,r,n);return u===e?t:t.copy(u,i)}r-=o;var h=t.array,f=h.length;if(f>r){var a=j(h,r,n);return a===h?t:new B(e,i,a)}var u=Q(i,r-f,n);return u===i?t:t.copy(e,u)}function K(t,r){var n=t.left,e=t.right,i=n.size;if(i>r){var o=K(n,r);return s(t,o,e)}r-=i;var u=t.array,h=u.length;if(h>r)return u=x(u,r),0===u.length?c(n,e):new B(n,e,u);var o=K(e,r-h);return s(t,n,o)}function P(t,r,n,e){if(r!==cr){var i=r.left,o=i.size;o>n&&P(t,i,n,e);var u=r.array,h=u.length;n-=o,e-=o,h>n&&e>0&&C(t,I(u,n,e)),e>h&&P(t,r.right,n-h,e-h)}}function F(t,r,n){this.root=t,this.tail=r,this.tail_size=n,this.hash=null}function G(t,r,n){this.left=t,this.right=r,this.len=n,this.hash=null}function H(t,r){this.root=t,this.len=r,this.hash=null}function N(r,n){return r===n||t(r)===t(n)}function T(t){return t instanceof z}function U(t){return t instanceof b}function V(t){return T(t)&&t.sort!==v}function W(t){return U(t)&&t.sort!==v}function X(t){return t instanceof F}function Y(t){return t instanceof G}function Z(t){return t instanceof H}function $(t){return T(t)||U(t)||X(t)||Y(t)||Z(t)}function tr(t){if(Array.isArray(t)){for(var r=or(),e=0,i=t.length;i>e;++e)r=r.insert(tr(t[e]));return r}if(n(t)){var r=er();for(var o in t)r=r.set(o,tr(t[o]));return r}return t}function rr(t,r){if(null!=r){if(r instanceof z&&r.sort===t)return r;var e=new z(cr,t);return n(r)?Object.keys(r).forEach(function(t){e=e.set(t,r[t])}):r.forEach(function(t){var r=t[0],n=t[1];e=e.set(r,n)}),e}return new z(cr,t)}function nr(t,r){if(null!=r){if(r instanceof b&&r.sort===t)return r;var n=new b(cr,t);return r.forEach(function(t){n=n.add(t)}),n}return new b(cr,t)}function er(t){return rr(v,t)}function ir(t){return nr(v,t)}function or(t){if(null!=t){if(t instanceof F)return t;var r=new F(cr,cr,0);return t.forEach(function(t){r=r.insert(t)}),r}return new F(cr,cr,0)}function ur(t){if(null!=t){if(t instanceof G)return t;var r=new G(cr,cr,0);return t.forEach(function(t){r=r.push(t)}),r}return new G(cr,cr,0)}function hr(t){if(null!=t){if(t instanceof H)return t;var r=new H(cr,0);return t.forEach(function(t){r=r.push(t)}),r}return new H(cr,0)}var fr="__CFB38D33-7CD8-419E-A1B6-61D1B8AC7C83_hash__",ar=0,sr="__DEE5921D-20A6-40D0-9A74-40C5BAC8C663_toJS__",cr={};cr.depth=0,cr.size=0,cr.forEach=function(){},cr.forEachRev=function(){};var pr={};pr.toString=function(){return t(this)},pr.inspect=pr.toString,m.prototype.copy=function(t,r){return new m(t,r,this.key,this.value)},m.prototype.modify=function(t){var r=t.key,n=t.value;return this.key===r&&this.value===n?this:new m(this.left,this.right,r,n)},m.prototype.forEach=function(t){this.left.forEach(t),t([this.key,this.value]),this.right.forEach(t)},z.prototype=Object.create(pr),z.prototype[fr]=function(r){if(null===r.hash){var n=[],u=0;r.forEach(function(r){var e=t(r[0]),i=t(r[1]);e=e.split(/\n/),e.forEach(function(t){u=Math.max(u,t.length)}),n.push({key:e,value:i})});var h="  ";n=n.map(function(t){var r=t.key.length-1;t.key[r]=i(t.key[r],u," ");var n=t.key.join("\n"),o=t.value.replace(/\n/g,"\n"+e(" ",u+3));return n+" = "+o}),r.hash=r.sort===v?"(Dict"+o(n,h)+")":"(SortedDict "+t(r.sort)+o(n,h)+")"}return r.hash},z.prototype[sr]=h,z.prototype.forEach=function(t){this.root.forEach(t)},z.prototype.isEmpty=function(){return this.root===cr},z.prototype.has=function(t){return g(this.root,this.sort,t)!==cr},z.prototype.get=function(t,r){var n=g(this.root,this.sort,t);if(n===cr){if(2===arguments.length)return r;throw Error("Key "+t+" not found")}return n.value},z.prototype.set=function(t,r){var n=this.root,e=this.sort,i=w(n,e,t,new m(cr,cr,t,r));return i===n?this:new z(i,e)},z.prototype.remove=function(t){var r=this.root,n=this.sort,e=E(r,n,t);return e===r?this:new z(e,n)},z.prototype.modify=function(t,r){var n=this.root,e=this.sort,i=d(n,e,t,r);return i===n?this:new z(i,e)},k.prototype.copy=function(t,r){return new k(t,r,this.key)},k.prototype.modify=function(t){var r=t.key;return this.key===r?this:new k(this.left,this.right,r)},k.prototype.forEach=function(t){this.left.forEach(t),t(this.key),this.right.forEach(t)},b.prototype=Object.create(pr),b.prototype[fr]=function(r){if(null===r.hash){var n=[];r.forEach(function(r){n.push(t(r))});var e="  ";r.hash=r.sort===v?"(Set"+o(n,e)+")":"(SortedSet "+t(r.sort)+o(n,e)+")"}return r.hash},b.prototype[sr]=f,b.prototype.forEach=function(t){this.root.forEach(t)},b.prototype.isEmpty=function(){return this.root===cr},b.prototype.has=function(t){return g(this.root,this.sort,t)!==cr},b.prototype.add=function(t){var r=this.root,n=this.sort,e=w(r,n,t,new k(cr,cr,t));return e===r?this:new b(e,n)},b.prototype.remove=function(t){var r=this.root,n=this.sort,e=E(r,n,t);return e===r?this:new b(e,n)},b.prototype.union=function(t){var r=this;return t.forEach(function(t){r=r.add(t)}),r},b.prototype.intersect=function(t){var r=this;if(r.root===cr)return r;var n=new b(cr,r.sort);return t.forEach(function(t){r.has(t)&&(n=n.add(t))}),n},b.prototype.disjoint=function(t){var r=this;return t.forEach(function(t){r=r.has(t)?r.remove(t):r.add(t)}),r},b.prototype.subtract=function(t){var r=this;return r.root!==cr&&t.forEach(function(t){r=r.remove(t)}),r},A.prototype.forEach=function(t){for(var r=this;r!==cr;)t(r.car),r=r.cdr},A.prototype.forEachRev=function(t){this.cdr.forEachRev(t),t(this.car)};var lr=125,yr=Math.ceil,vr=Math.floor;B.prototype.copy=function(t,r){return new B(t,r,this.array)},B.prototype.forEach=function(t){this.left.forEach(t),this.array.forEach(function(r){t(r)}),this.right.forEach(t)},F.prototype=Object.create(pr),F.prototype[fr]=function(r){if(null===r.hash){var n=[];r.forEach(function(r){n.push(t(r))}),r.hash="(List"+o(n,"  ")+")"}return r.hash},F.prototype[sr]=f,F.prototype.forEach=function(t){this.root.forEach(t),this.tail.forEachRev(t)},F.prototype.isEmpty=function(){return this.root===cr&&this.tail===cr},F.prototype.size=function(){return this.root.size+this.tail_size},F.prototype.has=function(t){var r=this.size();return 0>t&&(t+=r),J(t,r)},F.prototype.get=function(t,r){var n=this.size();if(0>t&&(t+=n),J(t,n)){var e=this.root,i=e.size;return i>t?q(e,t):M(this.tail,this.tail_size,t-i)}if(2===arguments.length)return r;throw Error("Index "+t+" is not valid")},F.prototype.insert=function(t,r){1===arguments.length&&(r=-1);var n=this.size();0>r&&(r+=n+1);var e=this.root,i=this.tail,o=this.tail_size;if(r===n){if(o===lr){var u=l(e,new B(cr,cr,R(i,o)));return new F(u,new A(t,cr),1)}return new F(e,new A(t,i),o+1)}if(J(r,n)){var h=e.size;if(h>r)return new F(L(e,r,t),i,o);var f=_(R(i,o),r-h,t),u=l(e,new B(cr,cr,f));return new F(u,cr,0)}throw Error("Index "+r+" is not valid")},F.prototype.remove=function(t){0===arguments.length&&(t=-1);var r=this.size();0>t&&(t+=r);var n=this.root,e=this.tail,i=this.tail_size;if(e!==cr&&t===r-1)return new F(n,e.cdr,i-1);if(J(t,r)){var o=n.size;if(o>t)return new F(K(n,t),e,i);var u=x(R(e,i),t-o),h=l(n,new B(cr,cr,u));return new F(h,cr,0)}throw Error("Index "+t+" is not valid")},F.prototype.modify=function(t,r){var n=this.size();if(0>t&&(t+=n),J(t,n)){var e=this.root,i=this.tail,o=this.tail_size,u=e.size;if(i!==cr&&t===n-1){var h=r(i.car);return h===i.car?this:new F(e,new A(h,i.cdr),o)}if(u>t){var f=Q(e,t,r);return f===e?this:new F(f,i,o)}var a=R(i,o),s=j(a,t-u,r);if(s===a)return this;var f=l(e,new B(cr,cr,s));return new F(f,cr,0)}throw Error("Index "+t+" is not valid")},F.prototype.slice=function(t,r){var n=this.size();if(null==t&&(t=0),null==r&&(r=n),0>t&&(t+=n),0>r&&(r+=n),0===t&&r===n)return this;if(t>r)throw Error("Index "+t+" is greater than index "+r);if(J(t,n)){if(t===r)return new F(cr,cr,0);if(r>0&&n>=r){var e=this.root,i=e.size,o=[];if(i>=t&&P(o,e,t,r),r>i){var u=R(this.tail,this.tail_size);C(o,I(u,t-i,r-i))}return new F(O(o),cr,0)}throw Error("Index "+r+" is not valid")}throw Error("Index "+t+" is not valid")},F.prototype.concat=function(t){if(t instanceof F){var r=this.root,n=this.tail,e=t.root,i=t.tail;if(e===cr&&i===cr)return this;if(r===cr&&n===cr)return t;n!==cr&&(r=l(r,new B(cr,cr,R(n,this.tail_size))));var o=c(r,e);return new F(o,i,t.tail_size)}var u=this;return t.forEach(function(t){u=u.insert(t)}),u},G.prototype=Object.create(pr),G.prototype[sr]=f,G.prototype.isEmpty=function(){return this.left===cr&&this.right===cr},G.prototype.forEach=function(t){this.left.forEach(t),this.right.forEachRev(t)},G.prototype[fr]=function(r){if(null===r.hash){var n=[];r.forEach(function(r){n.push(t(r))}),r.hash="(Queue"+o(n,"  ")+")"}return r.hash},G.prototype.size=function(){return this.len},G.prototype.peek=function(t){if(this.isEmpty()){if(1===arguments.length)return t;throw Error("Cannot peek from an empty queue")}return this.left.car},G.prototype.push=function(t){return this.isEmpty()?new G(new A(t,this.left),this.right,this.len+1):new G(this.left,new A(t,this.right),this.len+1)},G.prototype.pop=function(){if(this.isEmpty())throw Error("Cannot pop from an empty queue");var t=this.left.cdr;if(t===cr){var r=cr;return this.right.forEach(function(t){r=new A(t,r)}),new G(r,cr,this.len-1)}return new G(t,this.right,this.len-1)},G.prototype.concat=function(t){var r=this;return t.forEach(function(t){r=r.push(t)}),r},H.prototype=Object.create(pr),H.prototype[sr]=f,H.prototype.isEmpty=function(){return this.root===cr},H.prototype[fr]=function(r){if(null===r.hash){var n=[];r.forEach(function(r){n.push(t(r))}),r.hash="(Stack"+o(n,"  ")+")"}return r.hash},H.prototype.forEach=function(t){this.root.forEachRev(t)},H.prototype.size=function(){return this.len},H.prototype.peek=function(t){if(this.isEmpty()){if(1===arguments.length)return t;throw Error("Cannot peek from an empty stack")}return this.root.car},H.prototype.push=function(t){return new H(new A(t,this.root),this.len+1)},H.prototype.pop=function(){if(this.isEmpty())throw Error("Cannot pop from an empty stack");return new H(this.root.cdr,this.len-1)},H.prototype.concat=function(t){var r=this;return t.forEach(function(t){r=r.push(t)}),r},function(t,r){"function"==typeof define&&define.amd?define(["exports"],r):"object"==typeof exports?r(exports):(t.Immutable={},r(t.Immutable))}(this,function(t){t.equal=N,t.fromJS=tr,t.toJS=u,t.isDict=T,t.isSet=U,t.isSortedDict=V,t.isSortedSet=W,t.isList=X,t.isQueue=Y,t.isStack=Z,t.isImmutable=$,t.SortedDict=rr,t.SortedSet=nr,t.Dict=er,t.Set=ir,t.List=or,t.Queue=ur,t.Stack=hr,t.simpleSort=y,t.defaultSort=v})}).call(this);