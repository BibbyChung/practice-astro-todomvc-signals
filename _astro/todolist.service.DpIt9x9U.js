import{_ as fe,S as L,O as d,i as v,o as F,a as le,b as W,c as k,r as se,d as de,e as ve,h as me,j as _,k as w,m as M,l as U,n as $,p as R,q as G,s as Y,t as he}from"./util.DortvTSX.js";var Z={now:function(){return(Z.delegate||Date).now()},delegate:void 0},pe=function(e){fe(n,e);function n(t,r,o){t===void 0&&(t=1/0),r===void 0&&(r=1/0),o===void 0&&(o=Z);var a=e.call(this)||this;return a._bufferSize=t,a._windowTime=r,a._timestampProvider=o,a._buffer=[],a._infiniteTimeWindow=!0,a._infiniteTimeWindow=r===1/0,a._bufferSize=Math.max(1,t),a._windowTime=Math.max(1,r),a}return n.prototype.next=function(t){var r=this,o=r.isStopped,a=r._buffer,i=r._infiniteTimeWindow,c=r._timestampProvider,u=r._windowTime;o||(a.push(t),!i&&a.push(c.now()+u)),this._trimBuffer(),e.prototype.next.call(this,t)},n.prototype._subscribe=function(t){this._throwIfClosed(),this._trimBuffer();for(var r=this._innerSubscribe(t),o=this,a=o._infiniteTimeWindow,i=o._buffer,c=i.slice(),u=0;u<c.length&&!t.closed;u+=a?1:2)t.next(c[u]);return this._checkFinalizedStatuses(t),r},n.prototype._trimBuffer=function(){var t=this,r=t._bufferSize,o=t._timestampProvider,a=t._buffer,i=t._infiniteTimeWindow,c=(i?1:2)*r;if(r<1/0&&c<a.length&&a.splice(0,a.length-c),!i){for(var u=o.now(),f=0,l=1;l<a.length&&a[l]<=u;l+=2)f=l;f&&a.splice(0,f+1)}},n}(L),ye=new d(function(e){return e.complete()});function we(e){return e&&v(e.schedule)}function D(e){return e[e.length-1]}function _e(e){return v(D(e))?e.pop():void 0}function V(e){return we(D(e))?e.pop():void 0}var q=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function J(e){return v(e?.then)}function K(e){return v(e[F])}function H(e){return Symbol.asyncIterator&&v(e?.[Symbol.asyncIterator])}function Q(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function be(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var X=be();function z(e){return v(e?.[X])}function N(e){return le(this,arguments,function(){var t,r,o,a;return W(this,function(i){switch(i.label){case 0:t=e.getReader(),i.label=1;case 1:i.trys.push([1,,9,10]),i.label=2;case 2:return[4,k(t.read())];case 3:return r=i.sent(),o=r.value,a=r.done,a?[4,k(void 0)]:[3,5];case 4:return[2,i.sent()];case 5:return[4,k(o)];case 6:return[4,i.sent()];case 7:return i.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function B(e){return v(e?.getReader)}function b(e){if(e instanceof d)return e;if(e!=null){if(K(e))return xe(e);if(q(e))return ge(e);if(J(e))return Ie(e);if(H(e))return ee(e);if(z(e))return Se(e);if(B(e))return Ae(e)}throw Q(e)}function xe(e){return new d(function(n){var t=e[F]();if(v(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function ge(e){return new d(function(n){for(var t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Ie(e){return new d(function(n){e.then(function(t){n.closed||(n.next(t),n.complete())},function(t){return n.error(t)}).then(null,se)})}function Se(e){return new d(function(n){var t,r;try{for(var o=de(e),a=o.next();!a.done;a=o.next()){var i=a.value;if(n.next(i),n.closed)return}}catch(c){t={error:c}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}n.complete()})}function ee(e){return new d(function(n){Oe(e,n).catch(function(t){return n.error(t)})})}function Ae(e){return ee(N(e))}function Oe(e,n){var t,r,o,a;return ve(this,void 0,void 0,function(){var i,c;return W(this,function(u){switch(u.label){case 0:u.trys.push([0,5,6,11]),t=me(e),u.label=1;case 1:return[4,t.next()];case 2:if(r=u.sent(),!!r.done)return[3,4];if(i=r.value,n.next(i),n.closed)return[2];u.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return c=u.sent(),o={error:c},[3,11];case 6:return u.trys.push([6,,9,10]),r&&!r.done&&(a=t.return)?[4,a.call(t)]:[3,8];case 7:u.sent(),u.label=8;case 8:return[3,10];case 9:if(o)throw o.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}})})}function p(e,n,t,r,o){r===void 0&&(r=0),o===void 0&&(o=!1);var a=n.schedule(function(){t(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(a),!o)return a}function ne(e,n){return n===void 0&&(n=0),_(function(t,r){t.subscribe(w(r,function(o){return p(r,e,function(){return r.next(o)},n)},function(){return p(r,e,function(){return r.complete()},n)},function(o){return p(r,e,function(){return r.error(o)},n)}))})}function te(e,n){return n===void 0&&(n=0),_(function(t,r){r.add(e.schedule(function(){return t.subscribe(r)},n))})}function Te(e,n){return b(e).pipe(te(n),ne(n))}function ke(e,n){return b(e).pipe(te(n),ne(n))}function Ce(e,n){return new d(function(t){var r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function Re(e,n){return new d(function(t){var r;return p(t,n,function(){r=e[X](),p(t,n,function(){var o,a,i;try{o=r.next(),a=o.value,i=o.done}catch(c){t.error(c);return}i?t.complete():t.next(a)},0,!0)}),function(){return v(r?.return)&&r.return()}})}function re(e,n){if(!e)throw new Error("Iterable cannot be null");return new d(function(t){p(t,n,function(){var r=e[Symbol.asyncIterator]();p(t,n,function(){r.next().then(function(o){o.done?t.complete():t.next(o.value)})},0,!0)})})}function Pe(e,n){return re(N(e),n)}function je(e,n){if(e!=null){if(K(e))return Te(e,n);if(q(e))return Ce(e,n);if(J(e))return ke(e,n);if(H(e))return re(e,n);if(z(e))return Re(e,n);if(B(e))return Pe(e,n)}throw Q(e)}function P(e,n){return n?je(e,n):b(e)}function Ee(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=V(e);return P(e,t)}var Le=Array.isArray;function Fe(e,n){return Le(n)?e.apply(void 0,U([],$(n))):e(n)}function We(e){return M(function(n){return Fe(e,n)})}var Me=Array.isArray,Ue=Object.getPrototypeOf,$e=Object.prototype,Ge=Object.keys;function Ye(e){if(e.length===1){var n=e[0];if(Me(n))return{args:n,keys:null};if(Ze(n)){var t=Ge(n);return{args:t.map(function(r){return n[r]}),keys:t}}}return{args:e,keys:null}}function Ze(e){return e&&typeof e=="object"&&Ue(e)===$e}function De(e,n){return e.reduce(function(t,r,o){return t[r]=n[o],t},{})}function Ve(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=V(e),r=_e(e),o=Ye(e),a=o.args,i=o.keys;if(a.length===0)return P([],t);var c=new d(qe(a,t,i?function(u){return De(i,u)}:R));return r?c.pipe(We(r)):c}function qe(e,n,t){return t===void 0&&(t=R),function(r){E(n,function(){for(var o=e.length,a=new Array(o),i=o,c=o,u=function(l){E(n,function(){var s=P(e[l],n),h=!1;s.subscribe(w(r,function(y){a[l]=y,h||(h=!0,c--),c||r.next(t(a.slice()))},function(){--i||r.complete()}))},r)},f=0;f<o;f++)u(f)},r)}}function E(e,n,t){e?p(t,e,n):n()}function oe(e){return e<=0?function(){return ye}:_(function(n,t){var r=0;n.subscribe(w(t,function(o){++r<=e&&(t.next(o),e<=r&&t.complete())}))})}function Je(e){e===void 0&&(e={});var n=e.connector,t=n===void 0?function(){return new L}:n,r=e.resetOnError,o=r===void 0?!0:r,a=e.resetOnComplete,i=a===void 0?!0:a,c=e.resetOnRefCountZero,u=c===void 0?!0:c;return function(f){var l,s,h,y=0,g=!1,I=!1,S=function(){s?.unsubscribe(),s=void 0},T=function(){S(),l=h=void 0,g=I=!1},ce=function(){var x=l;T(),x?.unsubscribe()};return _(function(x,j){y++,!I&&!g&&S();var A=h=h??t();j.add(function(){y--,y===0&&!I&&!g&&(s=C(ce,u))}),A.subscribe(j),!l&&y>0&&(l=new G({next:function(O){return A.next(O)},error:function(O){I=!0,S(),s=C(T,o,O),A.error(O)},complete:function(){g=!0,S(),s=C(T,i),A.complete()}}),b(x).subscribe(l))})(f)}}function C(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];if(n===!0){e();return}if(n!==!1){var o=new G({next:function(){o.unsubscribe(),e()}});return b(n.apply(void 0,U([],$(t)))).subscribe(o)}}function Ke(e,n,t){var r,o,a,i,c=!1;return e&&typeof e=="object"?(r=e.bufferSize,i=r===void 0?1/0:r,o=e.windowTime,n=o===void 0?1/0:o,a=e.refCount,c=a===void 0?!1:a,t=e.scheduler):i=e??1/0,Je({connector:function(){return new pe(i,n,t)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:c})}function He(e,n){return _(function(t,r){var o=null,a=0,i=!1,c=function(){return i&&!o&&r.complete()};t.subscribe(w(r,function(u){o?.unsubscribe();var f=0,l=a++;b(e(u,l)).subscribe(o=w(r,function(s){return r.next(n?n(u,s,l,f++):s)},function(){o=null,c()}))},function(){i=!0,c()}))})}function ae(e,n,t){var r=v(e)||n||t?{next:e,error:n,complete:t}:e;return r?_(function(o,a){var i;(i=r.subscribe)===null||i===void 0||i.call(r);var c=!0;o.subscribe(w(a,function(u){var f;(f=r.next)===null||f===void 0||f.call(r,u),a.next(u)},function(){var u;c=!1,(u=r.complete)===null||u===void 0||u.call(r),a.complete()},function(u){var f;c=!1,(f=r.error)===null||f===void 0||f.call(r,u),a.error(u)},function(){var u,f;c&&((u=r.unsubscribe)===null||u===void 0||u.call(r)),(f=r.finalize)===null||f===void 0||f.call(r)}))}):R}const Qe=[{id:"f33f9cd8-4941-4535-bef9-06200b918541",title:"abc",completed:!1}],ie=Y("all"),Ne=e=>ie.next(e),Xe=()=>ie.asObservable(),m=Y(Qe),ue=()=>Xe().pipe(He(e=>Ve([m,Ee(e)])),M(([e,n])=>{switch(n){case"active":return e.filter(t=>!t.completed);case"completed":return e.filter(t=>t.completed);default:return e}}),Ke(1)),Be=e=>{const n={title:e,id:he(),completed:!1},t=m.value;t.push(n),m.next(t)},en=e=>{const t=m.value.filter(r=>r.id!==e);m.next(t)},nn=e=>{const n=m.value,t=n.find(r=>r.id===e.id);t&&Object.assign(t,e),m.next(n)},tn=e=>ue().pipe(oe(1),ae(n=>{n.forEach(t=>t.completed=e),m.next(n)})),rn=()=>ue().pipe(oe(1),ae(e=>{const n=e.filter(t=>!t.completed);m.next(n)}));export{Be as a,Xe as b,Ne as c,en as d,oe as e,tn as f,ue as g,rn as r,He as s,ae as t,nn as u};
