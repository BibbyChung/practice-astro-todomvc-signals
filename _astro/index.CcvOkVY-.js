function x(){}function O(n){return n()}function j(){return Object.create(null)}function $(n){n.forEach(O)}function I(n){return typeof n=="function"}function ln(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}function M(n){return Object.keys(n).length===0}function T(n,...e){if(n==null){for(const i of e)i(void 0);return x}const t=n.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function un(n,e,t){n.$$.on_destroy.push(T(e,t))}let w=!1;function q(){w=!0}function z(){w=!1}function F(n,e,t,i){for(;n<e;){const u=n+(e-n>>1);t(u)<=i?n=u+1:e=u}return n}function H(n){if(n.hydrate_init)return;n.hydrate_init=!0;let e=n.childNodes;if(n.nodeName==="HEAD"){const r=[];for(let c=0;c<e.length;c++){const a=e[c];a.claim_order!==void 0&&r.push(a)}e=r}const t=new Int32Array(e.length+1),i=new Int32Array(e.length);t[0]=-1;let u=0;for(let r=0;r<e.length;r++){const c=e[r].claim_order,a=(u>0&&e[t[u]].claim_order<=c?u+1:F(1,u,g=>e[t[g]].claim_order,c))-1;i[r]=t[a]+1;const o=a+1;t[o]=r,u=Math.max(o,u)}const f=[],l=[];let s=e.length-1;for(let r=t[u]+1;r!=0;r=i[r-1]){for(f.push(e[r-1]);s>=r;s--)l.push(e[s]);s--}for(;s>=0;s--)l.push(e[s]);f.reverse(),l.sort((r,c)=>r.claim_order-c.claim_order);for(let r=0,c=0;r<l.length;r++){for(;c<f.length&&l[r].claim_order>=f[c].claim_order;)c++;const a=c<f.length?f[c]:null;n.insertBefore(l[r],a)}}function P(n,e){if(w){for(H(n),(n.actual_end_child===void 0||n.actual_end_child!==null&&n.actual_end_child.parentNode!==n)&&(n.actual_end_child=n.firstChild);n.actual_end_child!==null&&n.actual_end_child.claim_order===void 0;)n.actual_end_child=n.actual_end_child.nextSibling;e!==n.actual_end_child?(e.claim_order!==void 0||e.parentNode!==n)&&n.insertBefore(e,n.actual_end_child):n.actual_end_child=e.nextSibling}else(e.parentNode!==n||e.nextSibling!==null)&&n.appendChild(e)}function sn(n,e,t){w&&!t?P(n,e):(e.parentNode!==n||e.nextSibling!=t)&&n.insertBefore(e,t||null)}function G(n){n.parentNode&&n.parentNode.removeChild(n)}function fn(n,e){for(let t=0;t<n.length;t+=1)n[t]&&n[t].d(e)}function R(n){return document.createElement(n)}function L(n){return document.createTextNode(n)}function on(){return L(" ")}function an(n,e,t,i){return n.addEventListener(e,t,i),()=>n.removeEventListener(e,t,i)}function dn(n){return function(e){return e.preventDefault(),n.call(this,e)}}function _n(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function hn(n){return n.dataset.svelteH}function U(n){return Array.from(n.childNodes)}function V(n){n.claim_info===void 0&&(n.claim_info={last_index:0,total_claimed:0})}function k(n,e,t,i,u=!1){V(n);const f=(()=>{for(let l=n.claim_info.last_index;l<n.length;l++){const s=n[l];if(e(s)){const r=t(s);return r===void 0?n.splice(l,1):n[l]=r,u||(n.claim_info.last_index=l),s}}for(let l=n.claim_info.last_index-1;l>=0;l--){const s=n[l];if(e(s)){const r=t(s);return r===void 0?n.splice(l,1):n[l]=r,u?r===void 0&&n.claim_info.last_index--:n.claim_info.last_index=l,s}}return i()})();return f.claim_order=n.claim_info.total_claimed,n.claim_info.total_claimed+=1,f}function W(n,e,t,i){return k(n,u=>u.nodeName===e,u=>{const f=[];for(let l=0;l<u.attributes.length;l++){const s=u.attributes[l];t[s.name]||f.push(s.name)}f.forEach(l=>u.removeAttribute(l))},()=>i(e))}function mn(n,e,t){return W(n,e,t,R)}function J(n,e){return k(n,t=>t.nodeType===3,t=>{const i=""+e;if(t.data.startsWith(i)){if(t.data.length!==i.length)return t.splitText(i.length)}else t.data=i},()=>L(e),!0)}function pn(n){return J(n," ")}function yn(n,e){e=""+e,n.data!==e&&(n.data=e)}function $n(n,e,t){n.classList.toggle(e,!!t)}let y;function p(n){y=n}function K(){if(!y)throw new Error("Function called outside component initialization");return y}function gn(n){K().$$.on_mount.push(n)}const h=[],C=[];let m=[];const B=[],Q=Promise.resolve();let E=!1;function X(){E||(E=!0,Q.then(D))}function N(n){m.push(n)}const v=new Set;let _=0;function D(){if(_!==0)return;const n=y;do{try{for(;_<h.length;){const e=h[_];_++,p(e),Y(e.$$)}}catch(e){throw h.length=0,_=0,e}for(p(null),h.length=0,_=0;C.length;)C.pop()();for(let e=0;e<m.length;e+=1){const t=m[e];v.has(t)||(v.add(t),t())}m.length=0}while(h.length);for(;B.length;)B.pop()();E=!1,v.clear(),p(n)}function Y(n){if(n.fragment!==null){n.update(),$(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(N)}}function Z(n){const e=[],t=[];m.forEach(i=>n.indexOf(i)===-1?e.push(i):t.push(i)),t.forEach(i=>i()),m=e}const b=new Set;let d;function bn(){d={r:0,c:[],p:d}}function xn(){d.r||$(d.c),d=d.p}function nn(n,e){n&&n.i&&(b.delete(n),n.i(e))}function wn(n,e,t,i){if(n&&n.o){if(b.has(n))return;b.add(n),d.c.push(()=>{b.delete(n),i&&(t&&n.d(1),i())}),n.o(e)}else i&&i()}function vn(n){return n?.length!==void 0?n:Array.from(n)}function En(n){n&&n.c()}function Nn(n,e){n&&n.l(e)}function en(n,e,t){const{fragment:i,after_update:u}=n.$$;i&&i.m(e,t),N(()=>{const f=n.$$.on_mount.map(O).filter(I);n.$$.on_destroy?n.$$.on_destroy.push(...f):$(f),n.$$.on_mount=[]}),u.forEach(N)}function tn(n,e){const t=n.$$;t.fragment!==null&&(Z(t.after_update),$(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function rn(n,e){n.$$.dirty[0]===-1&&(h.push(n),X(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function An(n,e,t,i,u,f,l=null,s=[-1]){const r=y;p(n);const c=n.$$={fragment:null,ctx:[],props:f,update:x,not_equal:u,bound:j(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:j(),dirty:s,skip_bound:!1,root:e.target||r.$$.root};l&&l(c.root);let a=!1;if(c.ctx=t?t(n,e.props||{},(o,g,...A)=>{const S=A.length?A[0]:g;return c.ctx&&u(c.ctx[o],c.ctx[o]=S)&&(!c.skip_bound&&c.bound[o]&&c.bound[o](S),a&&rn(n,o)),g}):[],c.update(),a=!0,$(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){q();const o=U(e.target);c.fragment&&c.fragment.l(o),o.forEach(G)}else c.fragment&&c.fragment.c();e.intro&&nn(n.$$.fragment),en(n,e.target,e.anchor),z(),D()}p(r)}class Sn{$$=void 0;$$set=void 0;$destroy(){tn(this,1),this.$destroy=x}$on(e,t){if(!I(t))return x;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(t),()=>{const u=i.indexOf(t);u!==-1&&i.splice(u,1)}}$set(e){this.$$set&&!M(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const cn="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(cn);export{nn as A,bn as B,xn as C,wn as D,tn as E,fn as F,$n as G,Sn as S,on as a,U as b,mn as c,pn as d,R as e,G as f,hn as g,_n as h,An as i,sn as j,P as k,an as l,C as m,x as n,gn as o,dn as p,J as q,yn as r,ln as s,L as t,$ as u,un as v,vn as w,En as x,Nn as y,en as z};
