import{S as x,i as k,s as y,w as d,e as u,c as p,b as m,f as i,h as c,j as $,n as _,F as E,v as T,t as q,a as w,q as L,d as S,G as g,k as h}from"./index.CcvOkVY-.js";import{g as U}from"./layout.service.CSKTEVd_.js";import{m as j}from"./map.BOKCRUkl.js";import"./util.DiFbyzn0.js";import"./filter.BfNzDnkM.js";function v(r,s,l){const a=r.slice();return a[4]=s[l],a}function b(r){let s,l,a=r[4].title+"",e,n;return{c(){s=u("li"),l=u("a"),e=q(a),n=w(),this.h()},l(t){s=p(t,"LI",{class:!0});var o=m(s);l=p(o,"A",{class:!0,href:!0});var f=m(l);e=L(f,a),f.forEach(i),n=S(o),o.forEach(i),this.h()},h(){c(l,"class","text-blue-5 underline"),c(l,"href",r[4].path),g(l,"text-red-5",(r[1]?.pathname??"")===r[4].path),c(s,"class","mr-2")},m(t,o){$(t,s,o),h(s,l),h(l,e),h(s,n)},p(t,o){o&3&&g(l,"text-red-5",(t[1]?.pathname??"")===t[4].path)},d(t){t&&i(s)}}}function A(r){let s,l=d(r[0]),a=[];for(let e=0;e<l.length;e+=1)a[e]=b(v(r,l,e));return{c(){s=u("ul");for(let e=0;e<a.length;e+=1)a[e].c();this.h()},l(e){s=p(e,"UL",{class:!0});var n=m(s);for(let t=0;t<a.length;t+=1)a[t].l(n);n.forEach(i),this.h()},h(){c(s,"class","flex")},m(e,n){$(e,s,n);for(let t=0;t<a.length;t+=1)a[t]&&a[t].m(s,null)},p(e,[n]){if(n&3){l=d(e[0]);let t;for(t=0;t<l.length;t+=1){const o=v(e,l,t);a[t]?a[t].p(o,n):(a[t]=b(o),a[t].c(),a[t].m(s,null))}for(;t<a.length;t+=1)a[t].d(1);a.length=l.length}},i:_,o:_,d(e){e&&i(s),E(a,e)}}}function C(r,s,l){let a;const e="/practice-astro-todomvc-signals/",n=[{title:"Home",path:e+""},{title:"Todos-React",path:e+"todos-react/"},{title:"Todos-svelte",path:e+"todos-svelte/"},{title:"Todos-angular",path:e+"todos-angular/"}],t=U().pipe(j(o=>o.location));return T(r,t,o=>l(1,a=o)),[n,a,t]}class R extends x{constructor(s){super(),k(this,s,C,A,y,{menus:0})}get menus(){return this.$$.ctx[0]}}export{R as default};