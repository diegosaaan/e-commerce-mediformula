/*! For license information please see bundle.js.LICENSE.txt */
"use strict";(self.webpackChunke_commerce=self.webpackChunke_commerce||[]).push([[184],{9655:(e,t,n)=>{var r;n.d(t,{OL:()=>g,aj:()=>d,rU:()=>h});var a=n(7294),o=n(4309),l=n(2599);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function s(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const u=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"],c=["aria-current","caseSensitive","className","end","style","to","children"];function d(e,t){return(0,l.p7)({basename:null==t?void 0:t.basename,future:i({},null==t?void 0:t.future,{v7_prependBasename:!0}),history:(0,l.lX)({window:null==t?void 0:t.window}),hydrationData:(null==t?void 0:t.hydrationData)||p(),routes:e,mapRouteProperties:o.us}).initialize()}function p(){var e;let t=null==(e=window)?void 0:e.__staticRouterHydrationData;return t&&t.errors&&(t=i({},t,{errors:m(t.errors)})),t}function m(e){if(!e)return null;let t=Object.entries(e),n={};for(let[e,r]of t)if(r&&"RouteErrorResponse"===r.__type)n[e]=new l.iQ(r.status,r.statusText,r.data,!0===r.internal);else if(r&&"Error"===r.__type){if(r.__subType){let t=window[r.__subType];if("function"==typeof t)try{let a=new t(r.message);a.stack="",n[e]=a}catch(e){}}if(null==n[e]){let t=new Error(r.message);t.stack="",n[e]=t}}else n[e]=r;return n}(r||(r=n.t(a,2))).startTransition;const v="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,f=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,h=a.forwardRef((function(e,t){let n,{onClick:r,relative:c,reloadDocument:d,replace:p,state:m,target:h,to:g,preventScrollReset:y}=e,C=s(e,u),{basename:E}=a.useContext(o.Us),R=!1;if("string"==typeof g&&f.test(g)&&(n=g,v))try{let e=new URL(window.location.href),t=g.startsWith("//")?new URL(e.protocol+g):new URL(g),n=(0,l.Zn)(t.pathname,E);t.origin===e.origin&&null!=n?g=n+t.search+t.hash:R=!0}catch(e){}let b=(0,o.oQ)(g,{relative:c}),x=function(e,t){let{target:n,replace:r,state:i,preventScrollReset:s,relative:u}=void 0===t?{}:t,c=(0,o.s0)(),d=(0,o.TH)(),p=(0,o.WU)(e,{relative:u});return a.useCallback((t=>{if(function(e,t){return!(0!==e.button||t&&"_self"!==t||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e))}(t,n)){t.preventDefault();let n=void 0!==r?r:(0,l.Ep)(d)===(0,l.Ep)(p);c(e,{replace:n,state:i,preventScrollReset:s,relative:u})}}),[d,c,p,r,i,n,e,s,u])}(g,{replace:p,state:m,target:h,preventScrollReset:y,relative:c});return a.createElement("a",i({},C,{href:n||b,onClick:R||d?r:function(e){r&&r(e),e.defaultPrevented||x(e)},ref:t,target:h}))})),g=a.forwardRef((function(e,t){let{"aria-current":n="page",caseSensitive:r=!1,className:l="",end:u=!1,style:d,to:p,children:m}=e,v=s(e,c),f=(0,o.WU)(p,{relative:v.relative}),g=(0,o.TH)(),y=a.useContext(o.FR),{navigator:C}=a.useContext(o.Us),E=C.encodeLocation?C.encodeLocation(f).pathname:f.pathname,R=g.pathname,b=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;r||(R=R.toLowerCase(),b=b?b.toLowerCase():null,E=E.toLowerCase());let x,U=R===E||!u&&R.startsWith(E)&&"/"===R.charAt(E.length),w=null!=b&&(b===E||!u&&b.startsWith(E)&&"/"===b.charAt(E.length)),S=U?n:void 0;x="function"==typeof l?l({isActive:U,isPending:w}):[l,U?"active":null,w?"pending":null].filter(Boolean).join(" ");let k="function"==typeof d?d({isActive:U,isPending:w}):d;return a.createElement(h,i({},v,{"aria-current":S,className:x,ref:t,style:k,to:p}),"function"==typeof m?m({isActive:U,isPending:w}):m)}));var y,C;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher"})(y||(y={})),function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(C||(C={}))},4309:(e,t,n)=>{var r;n.d(t,{FR:()=>s,Fg:()=>N,HJ:()=>D,TH:()=>f,Us:()=>u,WU:()=>C,f_:()=>O,j3:()=>_,oQ:()=>m,pG:()=>P,s0:()=>g,us:()=>F});var a=n(7294),o=n(2599);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}const i=a.createContext(null),s=a.createContext(null),u=a.createContext(null),c=a.createContext(null),d=a.createContext({outlet:null,matches:[],isDataRoute:!1}),p=a.createContext(null);function m(e,t){let{relative:n}=void 0===t?{}:t;v()||(0,o.J0)(!1);let{basename:r,navigator:l}=a.useContext(u),{hash:i,pathname:s,search:c}=C(e,{relative:n}),d=s;return"/"!==r&&(d="/"===s?r:(0,o.RQ)([r,s])),l.createHref({pathname:d,search:c,hash:i})}function v(){return null!=a.useContext(c)}function f(){return v()||(0,o.J0)(!1),a.useContext(c).location}function h(e){a.useContext(u).static||a.useLayoutEffect(e)}function g(){let{isDataRoute:e}=a.useContext(d);return e?function(){let{router:e}=function(e){let t=a.useContext(i);return t||(0,o.J0)(!1),t}(w.UseNavigateStable),t=L(S.UseNavigateStable),n=a.useRef(!1);return h((()=>{n.current=!0})),a.useCallback((function(r,a){void 0===a&&(a={}),n.current&&("number"==typeof r?e.navigate(r):e.navigate(r,l({fromRouteId:t},a)))}),[e,t])}():function(){v()||(0,o.J0)(!1);let e=a.useContext(i),{basename:t,navigator:n}=a.useContext(u),{matches:r}=a.useContext(d),{pathname:l}=f(),s=JSON.stringify((0,o.Zq)(r).map((e=>e.pathnameBase))),c=a.useRef(!1);return h((()=>{c.current=!0})),a.useCallback((function(r,a){if(void 0===a&&(a={}),!c.current)return;if("number"==typeof r)return void n.go(r);let i=(0,o.pC)(r,JSON.parse(s),l,"path"===a.relative);null==e&&"/"!==t&&(i.pathname="/"===i.pathname?t:(0,o.RQ)([t,i.pathname])),(a.replace?n.replace:n.push)(i,a.state,a)}),[t,n,s,l,e])}()}const y=a.createContext(null);function C(e,t){let{relative:n}=void 0===t?{}:t,{matches:r}=a.useContext(d),{pathname:l}=f(),i=JSON.stringify((0,o.Zq)(r).map((e=>e.pathnameBase)));return a.useMemo((()=>(0,o.pC)(e,JSON.parse(i),l,"path"===n)),[e,i,l,n])}function E(e,t,n){v()||(0,o.J0)(!1);let{navigator:r}=a.useContext(u),{matches:i}=a.useContext(d),s=i[i.length-1],p=s?s.params:{},m=(s&&s.pathname,s?s.pathnameBase:"/");s&&s.route;let h,g=f();if(t){var y;let e="string"==typeof t?(0,o.cP)(t):t;"/"===m||(null==(y=e.pathname)?void 0:y.startsWith(m))||(0,o.J0)(!1),h=e}else h=g;let C=h.pathname||"/",E="/"===m?C:C.slice(m.length)||"/",R=(0,o.fp)(e,{pathname:E}),w=function(e,t,n){var r;if(void 0===t&&(t=[]),void 0===n&&(n=null),null==e){var l;if(null==(l=n)||!l.errors)return null;e=n.matches}let i=e,s=null==(r=n)?void 0:r.errors;if(null!=s){let e=i.findIndex((e=>e.route.id&&(null==s?void 0:s[e.route.id])));e>=0||(0,o.J0)(!1),i=i.slice(0,Math.min(i.length,e+1))}return i.reduceRight(((e,r,o)=>{let l=r.route.id?null==s?void 0:s[r.route.id]:null,u=null;n&&(u=r.route.errorElement||b);let c=t.concat(i.slice(0,o+1)),d=()=>{let t;return t=l?u:r.route.Component?a.createElement(r.route.Component,null):r.route.element?r.route.element:e,a.createElement(U,{match:r,routeContext:{outlet:e,matches:c,isDataRoute:null!=n},children:t})};return n&&(r.route.ErrorBoundary||r.route.errorElement||0===o)?a.createElement(x,{location:n.location,revalidation:n.revalidation,component:u,error:l,children:d(),routeContext:{outlet:null,matches:c,isDataRoute:!0}}):d()}),null)}(R&&R.map((e=>Object.assign({},e,{params:Object.assign({},p,e.params),pathname:(0,o.RQ)([m,r.encodeLocation?r.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?m:(0,o.RQ)([m,r.encodeLocation?r.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),i,n);return t&&w?a.createElement(c.Provider,{value:{location:l({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:o.aU.Pop}},w):w}function R(){let e=function(){var e;let t=a.useContext(p),n=k(S.UseRouteError),r=L(S.UseRouteError);return t||(null==(e=n.errors)?void 0:e[r])}(),t=(0,o.WK)(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return a.createElement(a.Fragment,null,a.createElement("h2",null,"Unexpected Application Error!"),a.createElement("h3",{style:{fontStyle:"italic"}},t),n?a.createElement("pre",{style:r},n):null,null)}const b=a.createElement(R,null);class x extends a.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error||t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error?a.createElement(d.Provider,{value:this.props.routeContext},a.createElement(p.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function U(e){let{routeContext:t,match:n,children:r}=e,o=a.useContext(i);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),a.createElement(d.Provider,{value:t},r)}var w,S;function k(e){let t=a.useContext(s);return t||(0,o.J0)(!1),t}function L(e){let t=function(e){let t=a.useContext(d);return t||(0,o.J0)(!1),t}(),n=t.matches[t.matches.length-1];return n.route.id||(0,o.J0)(!1),n.route.id}function D(){return k(S.UseNavigation).navigation}function O(){let e=k(S.UseLoaderData),t=L(S.UseLoaderData);if(!e.errors||null==e.errors[t])return e.loaderData[t];console.error("You cannot `useLoaderData` in an errorElement (routeId: "+t+")")}!function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"}(w||(w={})),function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"}(S||(S={}));const B=(r||(r=n.t(a,2))).startTransition;function P(e){let{fallbackElement:t,router:n,future:r}=e,[o,l]=a.useState(n.state),{v7_startTransition:u}=r||{},c=a.useCallback((e=>{u&&B?B((()=>l(e))):l(e)}),[l,u]);a.useLayoutEffect((()=>n.subscribe(c)),[n,c]);let d=a.useMemo((()=>({createHref:n.createHref,encodeLocation:n.encodeLocation,go:e=>n.navigate(e),push:(e,t,r)=>n.navigate(e,{state:t,preventScrollReset:null==r?void 0:r.preventScrollReset}),replace:(e,t,r)=>n.navigate(e,{replace:!0,state:t,preventScrollReset:null==r?void 0:r.preventScrollReset})})),[n]),p=n.basename||"/",m=a.useMemo((()=>({router:n,navigator:d,static:!1,basename:p})),[n,d,p]);return a.createElement(a.Fragment,null,a.createElement(i.Provider,{value:m},a.createElement(s.Provider,{value:o},a.createElement(j,{basename:p,location:o.location,navigationType:o.historyAction,navigator:d},o.initialized?a.createElement(J,{routes:n.routes,state:o}):t))),null)}function J(e){let{routes:t,state:n}=e;return E(t,void 0,n)}function N(e){let{to:t,replace:n,state:r,relative:l}=e;v()||(0,o.J0)(!1);let{matches:i}=a.useContext(d),{pathname:s}=f(),u=g(),c=(0,o.pC)(t,(0,o.Zq)(i).map((e=>e.pathnameBase)),s,"path"===l),p=JSON.stringify(c);return a.useEffect((()=>u(JSON.parse(p),{replace:n,state:r,relative:l})),[u,p,l,n,r]),null}function _(e){return function(e){let t=a.useContext(d).outlet;return t?a.createElement(y.Provider,{value:e},t):t}(e.context)}function j(e){let{basename:t="/",children:n=null,location:r,navigationType:l=o.aU.Pop,navigator:i,static:s=!1}=e;v()&&(0,o.J0)(!1);let d=t.replace(/^\/*/,"/"),p=a.useMemo((()=>({basename:d,navigator:i,static:s})),[d,i,s]);"string"==typeof r&&(r=(0,o.cP)(r));let{pathname:m="/",search:f="",hash:h="",state:g=null,key:y="default"}=r,C=a.useMemo((()=>{let e=(0,o.Zn)(m,d);return null==e?null:{location:{pathname:e,search:f,hash:h,state:g,key:y},navigationType:l}}),[d,m,f,h,g,y,l]);return null==C?null:a.createElement(u.Provider,{value:p},a.createElement(c.Provider,{children:n,value:C}))}var T;function F(e){let t={hasErrorBoundary:null!=e.ErrorBoundary||null!=e.errorElement};return e.Component&&Object.assign(t,{element:a.createElement(e.Component),Component:void 0}),e.ErrorBoundary&&Object.assign(t,{errorElement:a.createElement(e.ErrorBoundary),ErrorBoundary:void 0}),t}!function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"}(T||(T={})),new Promise((()=>{})),a.Component}}]);