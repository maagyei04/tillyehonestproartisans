"use strict";(self.webpackChunktillyehonestproartisans=self.webpackChunktillyehonestproartisans||[]).push([[931],{1931:(e,t,s)=>{s.r(t),s.d(t,{default:()=>A});var n=s(9950),i=s(2053),o=s(1320),a=s(2235),l=s(5769),r=s(9780),d=s(9213),c=s(1671),x=s(4075),m=s(5195),h=s(9818),u=s(4414);function A(){const[e,t]=(0,n.useState)([]),[s,A]=(0,n.useState)({}),[f,g]=(0,n.useState)({}),[j,N]=(0,n.useState)(!0);return(0,n.useEffect)((()=>{(async()=>{const e=await(0,m.WT)();t(e),N(!1)})()}),[]),(0,n.useEffect)((()=>{e.length>0&&((async()=>{const t={};for(const s of e)if(!t[s.bookingClientId]){const e=await(0,m.Se)(s.bookingClientId);t[s.bookingClientId]={firstName:(null===e||void 0===e?void 0:e.firstName)||"",lastName:(null===e||void 0===e?void 0:e.lastName)||""}}A(t)})(),(async()=>{const t={};for(const s of e)if(!t[s.bookingArtisanId]){const e=await(0,m.VL)(s.bookingArtisanId);t[s.bookingArtisanId]={firstName:(null===e||void 0===e?void 0:e.firstName)||"",lastName:(null===e||void 0===e?void 0:e.lastName)||""}}g(t)})())}),[e]),(0,u.jsxs)("div",{children:[(0,u.jsx)(i.A,{variant:"h4",gutterBottom:!0,className:"font-bold text-xl",children:"History Of Completed Appointments"}),(0,u.jsx)(o.A,{component:a.A,sx:{marginTop:4,overflowX:"auto"},children:(0,u.jsxs)(l.A,{"aria-label":"responsive table",children:[(0,u.jsx)(r.A,{className:"bg-gray-200",children:(0,u.jsxs)(d.A,{children:[(0,u.jsx)(c.A,{children:"Client Name"}),(0,u.jsx)(c.A,{children:"Date Started"}),(0,u.jsx)(c.A,{children:"Location"}),(0,u.jsx)(c.A,{children:"Estimated Amount"}),(0,u.jsx)(c.A,{children:"Artisan Name"}),(0,u.jsx)(c.A,{children:"Action"})]})}),(0,u.jsx)(x.A,{children:e.length>0?e.map(((e,t)=>{var n,i,o,a;return(0,u.jsxs)(d.A,{children:[(0,u.jsxs)(c.A,{className:"text-gray-500 font-semibold",children:[null===(n=s[e.bookingClientId])||void 0===n?void 0:n.firstName," ",null===(i=s[e.bookingClientId])||void 0===i?void 0:i.lastName]}),(0,u.jsx)(c.A,{className:"text-gray-500",children:e.bookingStartDate}),(0,u.jsx)(c.A,{className:"text-gray-500",children:e.bookingTown}),(0,u.jsxs)(c.A,{className:"text-gray-500",children:["GHC ",e.bookingEstimateAmount,".00"]}),(0,u.jsxs)(c.A,{className:"font-semibold text-gray-500",children:[null===(o=f[e.bookingArtisanId])||void 0===o?void 0:o.firstName," ",null===(a=f[e.bookingArtisanId])||void 0===a?void 0:a.lastName]}),(0,u.jsx)(c.A,{children:(0,u.jsx)("button",{className:"bg-blue-500 text-white px-2 py-1 rounded"})})]},t)})):(0,u.jsx)(d.A,{children:(0,u.jsx)(c.A,{colSpan:6,children:(0,u.jsxs)("div",{className:"flex flex-col items-center justify-center mt-10",children:[(0,u.jsx)(h.A,{className:"h-10",style:{color:"gray"}}),(0,u.jsx)("p",{className:"font-bold text-lg",children:"You\u2019ve no pending orders"}),(0,u.jsx)(i.A,{className:"text-gray-500 mt-2 text-center px-2 md:px-20",children:"You're all set! There are currently no pending orders for you. Enjoy your free time or use it to tackle your next task with peace of mind."})]})})})})]})})]})}}}]);