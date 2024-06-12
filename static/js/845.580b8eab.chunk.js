"use strict";(self.webpackChunktillyehonestproartisans=self.webpackChunktillyehonestproartisans||[]).push([[845],{5226:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var l=a(9950),t=a(1413),r=a(1032),i=a(300),n=a(5195),o=a(1845),d=a(6491),c=a(4414);const m={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4};function u(){const e=(0,i.wA)(),[s,a]=(0,l.useState)(!1),{userLoggedIn:u,currentUser:b}=(0,r.A)(),[x,h]=(0,l.useState)(null),[p,g]=(0,l.useState)([]),[N,f]=(0,l.useState)({firstName:!1,lastName:!1,email:!1,phoneNumber:!1}),[j,y]=(0,l.useState)({firstName:"",lastName:"",email:"",phoneNumber:"",bio:"",businessField:"",businessLocation:"",passportImage:""}),[w,v]=(0,l.useState)(null),[k,C]=(0,l.useState)(null),[I,P]=(0,l.useState)(null),[A,S]=(0,l.useState)(null),[L,E]=(0,l.useState)(!1),[U,G]=(0,l.useState)(!1),[F,B]=(0,l.useState)(!1),D=()=>E(!1),R=()=>G(!1),M=()=>B(!1);(0,l.useEffect)((()=>{(async()=>{if(u&&null!==b&&void 0!==b&&b.uid){const e=await(0,n.VL)(b.uid);h(e),y({firstName:e.firstName||"",lastName:e.lastName||"",email:e.email||"",phoneNumber:e.phoneNumber||"",passportImage:e.passportImage||"",businessField:e.businessField||"",businessLocation:e.businessLocation||"",bio:e.bio||""})}})(),(async()=>{try{const e=await(0,n.wV)();g(e)}catch(e){console.error("Error fetching categories:",e)}})()}),[u,b]);const O=e=>{const{name:s,value:a}=e.target;y((e=>({...e,[s]:a})))},V=e=>{f((s=>({...s,[e]:!s[e]})))},T=async s=>{a(!0),s.preventDefault();try{let s={...j};if(w){const a=await(0,n.vA)(b.uid,w,e);s.passportImage=a}await(0,n.AI)(b.uid,s),alert("Profile updated successfully")}catch(l){console.error("Error updating profile:",l),alert("Error updating profile")}finally{a(!1)}};return x?(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:p-6",children:[(0,c.jsx)("form",{onSubmit:T,children:(0,c.jsxs)("div",{className:"border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg",children:[(0,c.jsx)("h1",{className:"text-lg font-bold mb-1",children:"Account Information"}),(0,c.jsx)("label",{htmlFor:"profile-upload",className:"font-semibold text-sm text-gray-500",children:"Upload Your Passport Picture (will be used as profile pic)"}),(0,c.jsx)("label",{children:(0,c.jsxs)("div",{className:"flex items-center mb-4 relative overflow-hidden cursor-pointer",children:[k?(0,c.jsx)(t.A,{src:k,className:"h-24 w-24 mr-4"}):(0,c.jsx)(t.A,{src:j.passportImage,className:"h-24 w-24 mr-4"}),(0,c.jsx)("input",{name:"profile-upload",type:"file",id:"profile-upload",className:"hidden",accept:"image/*",onChange:e=>{v(e.target.files[0]),C(URL.createObjectURL(e.target.files[0]))}})]})}),(0,c.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,c.jsxs)("div",{className:"mb-4 mr-2",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700 mr-2",children:"First Name"}),N.firstName?(0,c.jsx)("input",{type:"text",name:"firstName",value:j.firstName,onChange:O,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"}):(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("p",{className:"text-gray-500 text-sm font-bold mr-5",children:j.firstName}),(0,c.jsx)("button",{onClick:()=>V("firstName"),className:"text-blue-600",children:"Edit"})]})]}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Last Name"}),N.lastName?(0,c.jsx)("input",{type:"text",name:"lastName",value:j.lastName,onChange:O,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"}):(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("p",{className:"text-gray-500 text-sm font-bold mr-5",children:j.lastName}),(0,c.jsx)("button",{onClick:()=>V("lastName"),className:"text-blue-600",children:"Edit"})]})]})]}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Email Address"}),N.email?(0,c.jsx)("input",{type:"email",name:"email",value:j.email,onChange:O,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"}):(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("p",{className:"text-gray-500 text-sm font-bold",children:j.email}),(0,c.jsx)("button",{onClick:()=>V("email"),className:"text-blue-600",children:"Edit"})]})]}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Phone Number"}),N.phoneNumber?(0,c.jsx)("input",{type:"tel",name:"phoneNumber",value:j.phoneNumber,onChange:O,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"}):(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("p",{className:"text-gray-500 text-sm font-bold",children:j.phoneNumber}),(0,c.jsx)("button",{onClick:()=>V("phoneNumber"),className:"text-blue-600",children:"Edit"})]})]}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Biography"}),(0,c.jsx)("textarea",{name:"bio",value:j.bio,onChange:O,placeholder:"Talk about yourself and your work",className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"})]}),(0,c.jsxs)("button",{disabled:s,type:"submit",className:"w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md",children:[!s&&"Update Profile Info",s&&"Please wait..."]})]})}),(0,c.jsxs)("div",{className:"border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg",children:[(0,c.jsx)("h1",{className:"text-lg font-bold mb-2",children:"Payment Information"}),(0,c.jsx)("p",{className:"text-gray-500 font-bold text-sm mb-2",children:"Adding your mobile money details can help you autofill during the payment process"}),(0,c.jsx)("div",{className:"mb-4 flex-col justify-between items-center bg-gray-200 shadow shadow-lg p-4 rounded-[10px]",children:(0,c.jsxs)("div",{className:"flex flex-row justify-between mb-2",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("p",{className:"text-black text-sm font-bold",children:[x.firstName," ",x.lastName]}),(0,c.jsxs)("p",{className:"text-gray-600",children:[x.momoNetwork," Mobile Money - ",x.momoNumber]})]}),(0,c.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,c.jsx)("button",{className:"text-blue-600",children:(0,c.jsx)("i",{className:"material-icons",children:"edit"})}),(0,c.jsx)("button",{className:"text-red-600",children:(0,c.jsx)("i",{className:"material-icons",children:"delete"})})]})]})})]}),(0,c.jsxs)("div",{className:"border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg",children:[(0,c.jsx)("h1",{className:"text-lg font-bold mb-4",children:"Images"}),(0,c.jsxs)("ul",{className:"space-y-2",children:[(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:x.passportImage,className:"text-blue-600 hover:underline",onClick:e=>{e.preventDefault(),G(!0)},children:"PassportPicture"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:x.ghanaCardImage,className:"text-blue-600 hover:underline",onClick:e=>{e.preventDefault(),B(!0)},children:"GhanaCard"})}),(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:x.gaurantorNoteImage,className:"text-blue-600 hover:underline",onClick:e=>{e.preventDefault(),E(!0)},children:"Guarantor note"})})]})]}),(0,c.jsx)("div",{className:"border border-gray-200 rounded-lg p-6 bg-white shadow shadow-lg",children:(0,c.jsxs)("form",{onSubmit:T,children:[(0,c.jsx)("h1",{className:"text-lg font-bold mb-4",children:"Business Info"}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Update your Business field"}),(0,c.jsx)("select",{name:"businessField",value:j.businessField,onChange:O,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2",children:p.map(((e,s)=>(0,c.jsx)("option",{value:e,children:(0,c.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,c.jsx)("div",{className:"w-4 h-4 rounded-full bg-".concat(s%3===0?"blue":s%3===1?"green":"yellow","-500")}),(0,c.jsx)("span",{children:e})]})},s)))})]}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Business Location"}),(0,c.jsx)("input",{type:"tel",name:"businessLocation",value:j.businessLocation,onChange:O,className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"})]}),(0,c.jsxs)("button",{disabled:s,type:"submit",className:"w-full bg-purple-600 hover:bg-green-600 text-white py-2 rounded-md",children:[!s&&"Update Business Info",s&&"Please wait..."]})]})}),(0,c.jsx)(o.A,{open:L,onClose:D,"aria-labelledby":"modal-title","aria-describedby":"modal-description",children:(0,c.jsxs)(d.A,{sx:m,children:[(0,c.jsx)("h2",{id:"modal-title",className:"text-lg font-bold mb-4",children:"Guarantor Note"}),A?(0,c.jsx)("img",{src:A,alt:"Guarantor Note Preview",className:"w-full h-auto mb-4"}):(0,c.jsx)("img",{src:x.gaurantorNoteImage,alt:"Guarantor Note",className:"w-full h-auto mb-4"}),(0,c.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{P(e.target.files[0]),S(URL.createObjectURL(e.target.files[0]))},className:"mt-2 mb-4"}),(0,c.jsxs)("div",{className:"flex justify-end space-x-2",children:[(0,c.jsx)("button",{onClick:D,className:"bg-gray-300 text-gray-700 px-4 py-2 rounded",children:"Close"}),(0,c.jsx)("button",{onClick:async()=>{a(!0);try{if(I){const s=await(0,n.g4)(b.uid,I,e);h((e=>({...e,gaurantorNoteImage:s}))),S(null),P(null),alert("Guarantor note updated successfully"),D()}}catch(s){console.error("Error updating guarantor note image:",s),alert("Error updating guarantor note image")}finally{a(!1)}},className:"bg-blue-600 text-white px-4 py-2 rounded",children:s?"Please wait...":"Update"})]})]})}),(0,c.jsx)(o.A,{open:U,onClose:R,"aria-labelledby":"modal-title","aria-describedby":"modal-description",children:(0,c.jsxs)(d.A,{sx:m,children:[(0,c.jsx)("h2",{id:"modal-title",className:"text-lg font-bold mb-4",children:"Passport Image"}),(0,c.jsx)("img",{src:x.passportImage,alt:"Passport Preview",className:"w-full h-auto mb-4"}),(0,c.jsx)("div",{className:"flex justify-end space-x-2",children:(0,c.jsx)("button",{onClick:R,className:"bg-gray-300 text-gray-700 px-4 py-2 rounded",children:"Close"})})]})}),(0,c.jsx)(o.A,{open:F,onClose:M,"aria-labelledby":"modal-title","aria-describedby":"modal-description",children:(0,c.jsxs)(d.A,{sx:m,children:[(0,c.jsx)("h2",{id:"modal-title",className:"text-lg font-bold mb-4",children:"Ghana Card"}),(0,c.jsx)("img",{src:x.ghanaCardImage,alt:"Ghana Card Preview",className:"w-full h-auto mb-4"}),(0,c.jsx)("div",{className:"flex justify-end space-x-2",children:(0,c.jsx)("button",{onClick:M,className:"bg-gray-300 text-gray-700 px-4 py-2 rounded",children:"Close"})})]})})]}):(0,c.jsx)("div",{children:"Loading..."})}}}]);