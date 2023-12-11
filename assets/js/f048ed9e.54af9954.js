"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[962],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,h=p["".concat(s,".").concat(m)]||p[m]||c[m]||i;return n?r.createElement(h,o(o({ref:t},d),{},{components:n})):r.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5675:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return p}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1},s="Getting Started",u={unversionedId:"introduction/getting-started",id:"introduction/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"NestJS hybrid auth is a dynamic nestjs module or assembling of individual modules written over passport authentication library which enables you to integrate social login in your nestjs application for various identity providers such as Facebook, Google, Instagram and many more.",source:"@site/docs/introduction/getting-started.md",sourceDirName:"introduction",slug:"/introduction/getting-started",permalink:"/nestjs-hybrid-auth/docs/introduction/getting-started",editUrl:"https://github.com/mjangir/nestjs-hybrid-auth/blob/main/website/docs/introduction/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"How To Use?",permalink:"/nestjs-hybrid-auth/docs/introduction/how-to-use"}},d=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"How To Install",id:"how-to-install",children:[{value:"Install Hybrid Auth All In One",id:"install-hybrid-auth-all-in-one",children:[]},{value:"Install Hybrid Auth For Individual Identity Provider",id:"install-hybrid-auth-for-individual-identity-provider",children:[]}]}],c={toc:d};function p(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"getting-started"},"Getting Started"),(0,i.kt)("p",null,"NestJS hybrid auth is a dynamic nestjs module or assembling of individual modules written over passport authentication library which enables you to integrate social login in your nestjs application for various identity providers such as Facebook, Google, Instagram and many more."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"The library requires you to install few peer dependencies"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @nestjs/passport passport reflect-metadata --save\n")),(0,i.kt)("p",null,"OR"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @nestjs/passport passport reflect-metadata\n")),(0,i.kt)("h2",{id:"how-to-install"},"How To Install"),(0,i.kt)("p",null,"You can install nestjs hybrid auth module for just a single social identity provider or all the supported providers. Both of them are identical. I would recommend if you have lots of social logins to integrate, just use the all-in-one variant."),(0,i.kt)("h3",{id:"install-hybrid-auth-all-in-one"},"Install Hybrid Auth All In One"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @nestjs-hybrid-auth/all\n")),(0,i.kt)("p",null,"OR"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @nestjs-hybrid-auth/all --save\n")),(0,i.kt)("h3",{id:"install-hybrid-auth-for-individual-identity-provider"},"Install Hybrid Auth For Individual Identity Provider"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @nestjs-hybrid-auth/<provider-name>\n")),(0,i.kt)("p",null,"OR"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @nestjs-hybrid-auth/<provider-name> --save\n")),(0,i.kt)("p",null,"Where ",(0,i.kt)("inlineCode",{parentName:"p"},"provider-name")," can be ",(0,i.kt)("inlineCode",{parentName:"p"},"facebook"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"google"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"twitter")," or anything supported."))}p.isMDXComponent=!0}}]);