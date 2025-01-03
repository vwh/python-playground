import{r as i}from"./react-BMrMXMSG.js";import{g as v}from"./get-nonce-C-Z93AgS.js";var l="right-scroll-bar-position",u="width-before-scroll-bar",m="with-scroll-bars-hidden",p="--removed-body-scroll-bar-size";function h(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var t=v();return t&&n.setAttribute("nonce",t),n}function y(n,t){n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t))}function b(n){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(n)}var S=function(){var n=0,t=null;return{add:function(r){n==0&&(t=h())&&(y(t,r),b(t)),n++},remove:function(){n--,!n&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},x=function(){var n=S();return function(t,r){i.useEffect(function(){return n.add(t),function(){n.remove()}},[t&&r])}},w=function(){var n=x(),t=function(r){var e=r.styles,o=r.dynamic;return n(e,o),null};return t},C={left:0,top:0,right:0,gap:0},s=function(n){return parseInt(n||"",10)||0},N=function(n){var t=window.getComputedStyle(document.body),r=t[n==="padding"?"paddingLeft":"marginLeft"],e=t[n==="padding"?"paddingTop":"marginTop"],o=t[n==="padding"?"paddingRight":"marginRight"];return[s(r),s(e),s(o)]},A=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return C;var t=N(n),r=document.documentElement.clientWidth,e=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,e-r+t[2]-t[0])}},E=w(),c="data-scroll-locked",R=function(n,t,r,e){var o=n.left,d=n.top,g=n.right,a=n.gap;return r===void 0&&(r="margin"),`
  .`.concat(m,` {
   overflow: hidden `).concat(e,`;
   padding-right: `).concat(a,"px ").concat(e,`;
  }
  body[`).concat(c,`] {
    overflow: hidden `).concat(e,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(e,";"),r==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(d,`px;
    padding-right: `).concat(g,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a,"px ").concat(e,`;
    `),r==="padding"&&"padding-right: ".concat(a,"px ").concat(e,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(l,` {
    right: `).concat(a,"px ").concat(e,`;
  }
  
  .`).concat(u,` {
    margin-right: `).concat(a,"px ").concat(e,`;
  }
  
  .`).concat(l," .").concat(l,` {
    right: 0 `).concat(e,`;
  }
  
  .`).concat(u," .").concat(u,` {
    margin-right: 0 `).concat(e,`;
  }
  
  body[`).concat(c,`] {
    `).concat(p,": ").concat(a,`px;
  }
`)},f=function(){var n=parseInt(document.body.getAttribute(c)||"0",10);return isFinite(n)?n:0},T=function(){i.useEffect(function(){return document.body.setAttribute(c,(f()+1).toString()),function(){var n=f()-1;n<=0?document.body.removeAttribute(c):document.body.setAttribute(c,n.toString())}},[])},z=function(n){var t=n.noRelative,r=n.noImportant,e=n.gapMode,o=e===void 0?"margin":e;T();var d=i.useMemo(function(){return A(o)},[o]);return i.createElement(E,{styles:R(d,!t,o,r?"":"!important")})};export{z as R,u as f,l as z};
