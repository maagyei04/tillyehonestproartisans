"use strict";(self.webpackChunkabesjobconsult=self.webpackChunkabesjobconsult||[]).push([[769],{8150:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var l=s(9950),a=s(899),n=s(6491),o=s(2053),i=s(5195),c=s(1032),r=s(2074),d=s(9818),m=s(4414);const x={backgroundColor:"white",padding:"16px",margin:"8px 0",borderRadius:"10px"};function h(){const{userLoggedIn:e,currentUser:t}=(0,c.A)(),[s,h]=(0,l.useState)(null),[p,u]=(0,l.useState)([]),[f,b]=(0,l.useState)([]),[j,g]=(0,l.useState)({});(0,l.useEffect)((()=>{(async()=>{if(e&&null!==t&&void 0!==t&&t.uid){const e=await(0,i.VL)(t.uid);h(e)}})(),(async()=>{if(e&&null!==t&&void 0!==t&&t.uid){const e=await(0,i.g6)(t.uid);u(e)}})(),(async()=>{if(e&&null!==t&&void 0!==t&&t.uid){const e=await(0,i.Pd)(3,t.uid);b(e)}})()}),[e,t]),(0,l.useEffect)((()=>{(async()=>{const e={};for(const t of f)if(!e[t.bookingClientId]){const s=await(0,i.Se)(t.bookingClientId);e[t.bookingClientId]=s.firstName}g(e)})()}),[f]);const N=[];let y=0;const k=[],w=[];return p.forEach((e=>{const t=e;"complete"===t.bookingStatusClient&&"complete"===t.bookingStatusArtisan&&N.push(t),"complete"===t.bookingPayment&&"0"!==t.bookingEstimateAmount&&(y+=t.bookingEstimateAmount)})),f.forEach((e=>{0!==e.bookingEstimateAmount&&""===e.bookingPayment&&k.push(e)})),f.forEach((e=>{0===e.bookingEstimateAmount&&"complete"!==e.bookingPayment&&"complete"!==e.bookingStatusArtisan&&"complete"!==e.bookingStatusClient&&w.push(e)})),(0,m.jsxs)("div",{children:[(0,m.jsxs)("h1",{className:"font-bold text-2xl",children:["Hi ",s?s.firstName:"","!"]}),(0,m.jsxs)(a.Ay,{container:!0,className:"flex flex-col md:flex-row",children:[(0,m.jsxs)(a.Ay,{item:!0,xs:12,md:8,className:"p-2",children:[(0,m.jsx)("p",{className:"text-sm text-gray-500",children:"Welcome aboard to your hub for part-time opportunities! We're thrilled to have you join our community of hustlers, learners, and go-getters."}),(0,m.jsxs)(n.A,{className:"flex flex-col h-full",children:[(0,m.jsxs)(n.A,{className:"flex flex-col md:flex-row justify-between mb-2",children:[(0,m.jsxs)(n.A,{className:"shadow-xl shadow-black-600",sx:{...x,flex:1,mr:2},children:[(0,m.jsx)("p",{className:"mb-2",children:"Total Appointments"}),(0,m.jsx)("p",{className:"mb-2 font-bold",children:p.length}),(0,m.jsxs)("p",{className:"text-sm text-gray-500",children:[(0,m.jsx)("span",{className:"text-blue-700",children:"Approved"})," appointments"]})]}),(0,m.jsxs)(n.A,{className:"shadow-xl shadow-black-600",sx:{...x,flex:1,mr:2},children:[(0,m.jsx)("p",{className:"mb-2",children:"Completed Appointments"}),(0,m.jsx)("p",{className:"mb-2 font-bold",children:N.length}),(0,m.jsxs)("p",{className:"text-sm text-gray-500",children:["Audited and ",(0,m.jsx)("span",{className:"text-blue-700",children:"paid"})," services"]})]}),(0,m.jsxs)(n.A,{className:"shadow-xl shadow-black-600",sx:{...x,flex:1,mr:2},children:[(0,m.jsx)("p",{className:"mb-2",children:"Total Profit"}),(0,m.jsx)("p",{className:"text-xl text-gray-500",children:(0,m.jsxs)("span",{className:"text-green-500",children:["GHC ",y,".00"]})})]})]}),(0,m.jsxs)(n.A,{className:"shadow-xl shadow-black-600 flex-1",sx:x,children:[(0,m.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,m.jsxs)("div",{className:"flex flex-col",children:[(0,m.jsx)(o.A,{className:"text-l font-bold",gutterBottom:!0,children:"Pending Appointments"}),(0,m.jsx)("p",{className:"text-sm text-gray-500 mb-5",children:"Approved appointments that you are supposed to complete at the due date"})]}),(0,m.jsx)("div",{children:(0,m.jsx)("p",{className:"text-blue-600",children:(0,m.jsx)(r.N_,{to:"/artisan_dashboard/appointments",children:"See All"})})})]}),k.length>0?k.map(((e,t)=>(0,m.jsxs)(n.A,{className:"p-2 rounded-[10px] border border-gray-300 mb-2",children:[(0,m.jsxs)("div",{className:"flex justify-between mb-5",children:[(0,m.jsx)("div",{className:"flex flex-row",children:(0,m.jsx)("p",{className:"font-bold",children:j[e.bookingClientId]})}),(0,m.jsx)("div",{className:"bg-red-300 rounded-[10px] px-4",children:(0,m.jsx)("p",{className:"text-red-700",children:0===e.bookingEstimateAmount?"waiting for estimate":"complete"!==e.bookingPayment?"waiting for payment":"complete"!==e.bookingStatusArtisan?"waiting your completion":"complete"!==e.bookingStatusClient?"waiting client completion":"complete"===e.bookingPayment?"Full payment":""})})]}),(0,m.jsxs)("div",{className:"flex flex-row justify-between text-left",children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Job Description"}),(0,m.jsx)("p",{className:"font-bold text-sm truncate max-w-full",children:e.bookingServiceDetail})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Expected Date"}),(0,m.jsx)("p",{className:"font-bold text-sm",children:e.bookingStartDate})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Total Estimate"}),(0,m.jsxs)("p",{className:"font-bold text-sm",children:["GHC ",e.bookingEstimateAmount,".00"]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Location"}),(0,m.jsxs)("p",{className:"font-bold text-sm",children:[e.bookingTown," ",e.bookingRegion]})]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"text-gray-500 mt-2",children:"Expected Action"}),(0,m.jsx)("p",{className:"font-bold text-sm",children:0===e.bookingEstimateAmount?"Client is waiting for estimate":"complete"!==e.bookingPayment?"Client is expected to make full payment":"complete"!==e.bookingStatusArtisan?"Confirm when the entire is completed to recieve full payment":"complete"!==e.bookingStatusClient?"Waiting for client work complete confirmation":""})]})]},t))):(0,m.jsxs)(n.A,{className:"flex flex-col items-center justify-center mt-10",children:[(0,m.jsx)(d.A,{className:"h-20",style:{color:"gray"}}),(0,m.jsx)("p",{className:"font-bold text-lg",children:"You\u2019ve no pending appointments yet"}),(0,m.jsx)(o.A,{className:"text-gray-500 mt-2 text-center px-2 md:px-20",children:"You're all set! There are currently no pending appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind."})]})]})]})]}),(0,m.jsxs)(a.Ay,{item:!0,xs:12,md:4,className:"flex flex-col p-2",children:[(0,m.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,m.jsx)("div",{children:(0,m.jsx)(o.A,{className:"text-l font-bold",gutterBottom:!0,children:"Incoming Appointments"})}),(0,m.jsx)("div",{children:(0,m.jsx)("p",{className:"text-blue-600",children:(0,m.jsx)(r.N_,{to:"/artisan_dashboard/appointments",children:"See All"})})})]}),(0,m.jsx)(o.A,{variant:"body1",className:"text-gray-500",gutterBottom:!0,children:"Latest appointment listing from clients. Browse through and accept the ones that match your schedule          "}),w.length>0?w.map(((e,t)=>(0,m.jsxs)(n.A,{className:"mb-2 shadow-xl shadow-black-600",sx:x,children:[(0,m.jsx)("div",{className:"flex flex-row mb-2",children:(0,m.jsx)("p",{className:"text-sm font-semibold",children:j[e.bookingClientId]})}),(0,m.jsxs)("div",{className:"flex flex-col mb-2",children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Job Description"}),(0,m.jsx)("p",{className:"font-bold text-sm truncate max-w-full",children:e.bookingServiceDetail})]}),(0,m.jsxs)("div",{className:"flex flex-col mb-2",children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Estimated Date"}),(0,m.jsx)("p",{className:"font-bold text-sm",children:e.bookingStartDate})]}),(0,m.jsxs)("div",{className:"flex flex-col mb-2",children:[(0,m.jsx)("p",{className:"text-gray-500",children:"Total Estimate"}),(0,m.jsxs)("p",{className:"font-bold text-sm",children:["GHC ",e.bookingEstimateAmount,".00"]})]}),(0,m.jsx)("div",{className:"bg-gray-300 w-auto text-center rounded p-2",children:(0,m.jsx)("p",{className:"text-red-600",children:"Waiting For Estimate"})})]}))):(0,m.jsxs)(n.A,{className:"mb-2 shadow-xl flex flex-col items-center shadow-black-600",sx:x,children:[(0,m.jsx)(d.A,{className:"h-20",style:{color:"gray"}}),(0,m.jsx)("p",{className:"font-bold text-lg",children:"No new Appointments"}),(0,m.jsx)(o.A,{className:"text-gray-500 mt-2 text-center px-2",children:"You're all set! There are currently no new appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind."})]})]})]})]})}},9818:(e,t,s)=>{s.d(t,{A:()=>a});var l=s(9950);const a=l.forwardRef((function(e,t){let{title:s,titleId:a,...n}=e;return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":a},n),s?l.createElement("title",{id:a},s):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"}))}))}}]);