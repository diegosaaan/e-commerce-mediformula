"use strict";(self.webpackChunke_commerce=self.webpackChunke_commerce||[]).push([[329],{5542:(e,a,t)=>{t.d(a,{Z:()=>i});var s=t(7294),r=t(9655),n=t(8948);const l=[t.p+"assets/images/jpg/auth-background-1.jpg",t.p+"assets/images/jpg/auth-background-2.jpg",t.p+"assets/images/jpg/auth-background-3.jpg",t.p+"assets/images/jpg/auth-background-4.jpg",t.p+"assets/images/jpg/auth-background-5.jpg",t.p+"assets/images/jpg/auth-background-6.jpg"],i=({children:e,name:a,text:t,textLink:i,textButton:o,path:d,title:c,disabled:m,isAddAddress:u,isDataFetching:p,handlePrevRegister:h})=>{const[g,_]=(0,s.useState)("");return(0,s.useEffect)((()=>{const e=Math.floor(Math.random()*l.length);_(l[e])}),[]),s.createElement("section",{className:"auth "+(p?"auth--opacity":""),style:{backgroundImage:`url(${g})`}},s.createElement("div",{className:"auth__container"},s.createElement("div",{className:"auth__container-heading"},s.createElement("h1",{className:"auth__heading"},c),u?s.createElement("button",{className:"auth__button-prev",type:"button",onClick:h}):s.createElement(r.rU,{className:"auth__link auth__link_type_main",to:"/"},"На главную")),s.createElement(n.l0,{className:"auth__form",name:a,autoComplete:"off",noValidate:!0},e,!u&&s.createElement("button",{className:"auth__button",type:"submit",disabled:m},o),s.createElement("p",{className:"auth__text"},t),s.createElement("div",{className:"auth__container-link"},s.createElement(r.rU,{className:"auth__link",to:d},i),s.createElement("div",{className:"auth__arrow"})))))}},7290:(e,a,t)=>{t.r(a),t.d(a,{default:()=>g});var s=t(7294),r=t(2823),n=t(9250),l=t(8948),i=t(6642),o=t(8508),d=t(4094),c=t(8958),m=t(5542),u=t(1970),p=t(8712),h=t(6782);const g=()=>{const{signIn:e}=(0,d.Z)(),a=(0,n.s0)(),t=(0,n.HJ)(),[g,_]=(0,s.useState)(!1);return s.createElement(s.Fragment,null,(g||"loading"===t.state)&&s.createElement(h.Z,{pageClassname:"registration",isDataFetching:g||"loading"===t.state}),s.createElement(l.J9,{initialValues:{email:"",password:""},validationSchema:o.pj,onSubmit:async t=>{_(!0);const{email:s,password:n}=t;try{await u.x(s,n);const t=await(0,i.k0)(s,n);null!==t&&"object"==typeof t&&(r.ZP.info({content:"Добро пожаловать!"}),e((()=>a("/"))),(0,i.F_)(t,"1SortUserToken"),localStorage.removeItem("1SortAnonymousToken"))}catch(e){_(!1);const a=e,{response:{data:{statusCode:t,message:s}}}=a;console.error("Произошла ошибка:",e),(0,p.Z)(t,s)}}},(({values:e,errors:a,touched:t,handleChange:r,isValid:n,dirty:l})=>s.createElement(m.Z,{name:"form-login",text:"Еще не зарегистрированы?",textLink:"Регистрация",textButton:"Войти",path:"/registration",title:"Вход",disabled:!n||!l,isDataFetching:g},s.createElement("ul",{className:"auth__list auth__list_active"},s.createElement("li",null,s.createElement(c.Z,{type:"text",placeholder:"Email*",name:"email",htmlFor:"email",isInputPassword:!1,onChange:r,value:e.email,errors:a.email,touched:t.email})),s.createElement("li",null,s.createElement(c.Z,{type:"password",placeholder:"Пароль*",name:"password",htmlFor:"password",isInputPassword:!0,onChange:r,value:e.password,errors:a.password,touched:t.password})))))))}},1970:(e,a,t)=>{t.d(a,{x:()=>o,z:()=>i});var s=t(2861),r=t(9091),n=t(5747),l=t(9037);const i=async(e,a,t,l,i,o,d,c,m,u)=>{let p;return p=""===d&&""===c?{email:e,firstName:a,lastName:t,password:l,dateOfBirth:i,addresses:o,shippingAddresses:m,billingAddresses:u}:""===d?{email:e,firstName:a,lastName:t,password:l,dateOfBirth:i,addresses:o,defaultBillingAddress:c,shippingAddresses:m,billingAddresses:u}:""===c?{email:e,firstName:a,lastName:t,password:l,dateOfBirth:i,addresses:o,defaultShippingAddress:d,shippingAddresses:m,billingAddresses:u}:{email:e,firstName:a,lastName:t,password:l,dateOfBirth:i,addresses:o,defaultShippingAddress:d,defaultBillingAddress:c,shippingAddresses:m,billingAddresses:u},(await s.Z.post(n.Z.URL_CUSTOMERS,p,{headers:await(0,r.o6)()})).data},o=async(e,a)=>{let t;try{t={email:e,password:a,anonymousCart:{id:(await(0,l.CQ)(!1)).id,typeId:"cart"}}}catch(s){const r=s;r.response&&401===r.response.status?t={email:e,password:a}:console.error("Произошла ошибка:",s)}return(await s.Z.post(n.Z.URL_LOGIN,t,{headers:await(0,r.o6)()})).data}}}]);