import{_ as s,h as o,m as t,a as e,l as i,i as c,o as a,c as l,b as n,n as k,F as d,r as h,j as r,w as b,t as u,d as v}from"./index.0ce31376.js";const p={name:"books",data:()=>({checked:"全部",tags:[]}),computed:{...o("book",["books"]),...t("book",["process"]),booklist(){return"全部"===this.checked?this.books:this.books.filter((s=>s.tags.includes(this.checked)))}},methods:{...e("book",["setActive"]),...i("ui",["setAppLoading"]),switchBook(s){this.setAppLoading(!0),this.setActive(s).then((()=>{this.setAppLoading(!1),this.$router.push("/")}))}},mounted(){fetch("/tags.json").then((s=>s.json())).then((s=>{this.tags=s})),this.$store.dispatch("book/getBooks")}},g={class:"taglist"},f=["onClick"],m={class:"booklist"},j=["onClick"],A={class:"bookcover"},C=["src"],y={key:1,class:"booknocover"},_={class:"bookinfo"},w={class:"booktitle"},B={class:"bookorigin"},L={class:"bookintroduce"},x={class:"bookfoot}"};const $=s(p,[["render",function(s,o,t,e,i,p){const $=c("router-link");return a(),l("div",null,[n("div",g,[n("span",{onClick:o[0]||(o[0]=s=>i.checked="全部"),class:k(["全部"==i.checked?"active":""])},"全部",2),(a(!0),l(d,null,h(i.tags,(s=>(a(),l("span",{key:s,onClick:o=>i.checked=s,class:k([i.checked==s?"active":""])},u(s),11,f)))),128)),r($,{class:"active",to:"/"},{default:b((()=>[v("继续学习")])),_:1})]),n("div",m,[(a(!0),l(d,null,h(p.booklist,(s=>(a(),l("div",{class:"book",key:s.id,onClick:o=>p.switchBook(s.id)},[n("div",A,[s.cover?(a(),l("img",{key:0,src:s.cover},null,8,C)):(a(),l("div",y,u(s.title),1))]),n("div",_,[n("p",w,u(s.title),1),n("p",B,u(s.origin),1),n("p",L,u(s.introduce),1),n("div",x,[n("div",null,u(s.tags.join(",")),1)])])],8,j)))),128))])])}],["__scopeId","data-v-21a0392a"]]);export{$ as default};
