if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>l(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(r.map((s=>o[s]||u(s)))).then((s=>(i(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/@monaco-editor-BrJCHBAK.js",revision:null},{url:"assets/@radix-ui-C1GVTVHq.js",revision:null},{url:"assets/aria-hidden-DQ5UC2Eg.js",revision:null},{url:"assets/class-variance-authority-Bb4qSo10.js",revision:null},{url:"assets/clsx-B-dksMZM.js",revision:null},{url:"assets/detect-node-es-l0sNRNKZ.js",revision:null},{url:"assets/get-nonce-C-Z93AgS.js",revision:null},{url:"assets/index-BEaXzkD1.js",revision:null},{url:"assets/index-BEpWn1Fp.css",revision:null},{url:"assets/lucide-react-D56Oj-Qe.js",revision:null},{url:"assets/react-BMrMXMSG.js",revision:null},{url:"assets/react-dom-XhyPzpGK.js",revision:null},{url:"assets/react-remove-scroll-bar-DLmkPBsp.js",revision:null},{url:"assets/react-remove-scroll-Df20_Mxm.js",revision:null},{url:"assets/react-resizable-panels-CUcdorkG.js",revision:null},{url:"assets/react-style-singleton-Cmt3ZKmQ.js",revision:null},{url:"assets/scheduler-CzFDRTuY.js",revision:null},{url:"assets/state-local-BBNhjlcY.js",revision:null},{url:"assets/tailwind-merge-BkWO730n.js",revision:null},{url:"assets/tslib-CDuPK5Eb.js",revision:null},{url:"assets/use-callback-ref-Dc1rmTkS.js",revision:null},{url:"assets/use-sidecar-s-jgbz0b.js",revision:null},{url:"assets/use-sync-external-store-CIXbO2Kd.js",revision:null},{url:"assets/vaul-OreU8RvA.js",revision:null},{url:"assets/zustand-3uy3gfa1.js",revision:null},{url:"index.html",revision:"fc27f5ef1f5e316e64b2f35d43310060"},{url:"registerSW.js",revision:"f2cf0c1eaf99853b228998d3a9d6cf26"},{url:"manifest.webmanifest",revision:"09c2aa301212911da6e98731d461de4c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
