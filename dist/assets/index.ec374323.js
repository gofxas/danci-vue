import{m as t,a as e,_ as o,o as r,c as s,b as n,d,t as i,F as l,r as a,n as c,e as u,f as h,g as p,w as v,p as k,h as w,i as b,j as f,k as m}from"./index.db7a460c.js";import{f as W,h as g}from"./format.56ef48ae.js";import{P as y,_ as x}from"./lodash.5709f737.js";import{d as _}from"./db.35f8e1ca.js";const C={name:"Switch",computed:{...t("book",["book","progress","currentWord"])},methods:{...e("book",["getWords","getBooks"]),goBooks(){this.$router.push("/books")}},mounted(){this.getWords(),this.getBooks()}},j={style:{color:"#57c3c2",fontWeight:"bold"}};const S=o(C,[["render",function(t,e,o,l,a,c){var u;return r(),s("div",{class:"switch-handler",onClick:e[0]||(e[0]=(...t)=>c.goBooks&&c.goBooks(...t))},[n("p",null,[d(" 已选词汇:"),n("span",j,i(null==(u=t.book)?void 0:u.title),1)]),n("p",null,"进度："+i(t.progress),1)])}],["__scopeId","data-v-6fc34943"]]),I={class:"card letters"},A=["onClick"];const P=o({name:"spell",props:{letter:{default:"",type:String},word:{default:"",type:String}},data:()=>({userinput:""}),watch:{word(){this.userinput=""}},computed:{letterArr(){return Array.from(new Set(this.letter.split(""))).sort((()=>Math.random()>.5?1:-1))},nextLetter(){if(this.word){let t=this.word[this.userinput.length];return t||"ok"}return"wait"}},methods:{appendIn(t){t==this.nextLetter&&(this.userinput+=t)},nextEvt(){this.$emit("next")}}},[["render",function(t,e,o,d,u,h){return r(),s("div",I,["ok"==h.nextLetter?(r(),s("div",{key:0,onClick:e[0]||(e[0]=(...t)=>h.nextEvt&&h.nextEvt(...t)),class:"letter opend success"},"Nice ！")):(r(!0),s(l,{key:1},a(h.letterArr,(t=>(r(),s("div",{key:t,onClick:e=>h.appendIn(t),class:c(["letter",h.nextLetter==t?"opend":""])},[n("span",null,i(t),1)],10,A)))),128))])}],["__scopeId","data-v-6ad63419"]]),L={name:"Word",components:{Spell:P,Popup:y},data:()=>({visible:!1,rootword:!1}),computed:{...t("book",["currentWord","book"]),studyLink(){var t,e;if(this.book&&this.book.tags.includes("日语")){return"https://dict.youdao.com/result?word="+W(null==(t=this.currentWord)?void 0:t.word)+"&lang=ja"}return"https://dict.youdao.com/result?word="+(null==(e=this.currentWord)?void 0:e.word)+"&lang=en"},uksound(){var t,e;return(null==(t=this.currentWord)?void 0:t.ukphone)?new g.Howl({src:[`https://dict.youdao.com/dictvoice?audio=${null==(e=this.currentWord)?void 0:e.word}&type=2`],html5:!0}):null},ussound(){var t,e;return(null==(t=this.currentWord)?void 0:t.usphone)?new g.Howl({src:[`https://dict.youdao.com/dictvoice?audio=${null==(e=this.currentWord)?void 0:e.word}&type=1`],html5:!0}):null},jsound(){var t,e;if(null==(t=this.currentWord)?void 0:t.jphone){let t=W(null==(e=this.currentWord)?void 0:e.word);return new g.Howl({src:[`https://dict.youdao.com/dictvoice?audio=${t}&le=jap`],html5:!0})}return null},letter(){var t,e;if(this.book&&this.book.tags.includes("日语")){return W(null==(t=this.currentWord)?void 0:t.word)||""}return(null==(e=this.currentWord)?void 0:e.word)||""}},methods:{sayWord(t){t&&!t.playing()&&t.play()}},mounted(){}},B=t=>(k("data-v-732adf06"),t=t(),w(),t),$={class:"card wordcard"},D={class:"word"},E={class:"trans"},H=B((()=>n("p",{class:"sec"},"解释：",-1))),N={class:"voices"},T=B((()=>n("p",{class:"sec"},"发音：",-1))),F={key:0},M={key:1},q={key:2},z={class:"study-links"},G=["src"],J={class:"rel-words"},K=B((()=>n("h2",{style:{"margin-bottom":"1rem"}},"同根词",-1))),O={class:"relWordTable"},Q=B((()=>n("thead",null,[n("tr",null,[n("th",{style:{width:"5rem"}},"词性"),n("th",null,"相关单词")])],-1))),R={style:{textAlign:"center"}},U=["href"];const V={name:"index",components:{Switch:S,Word:o(L,[["render",function(t,e,o,c,k,w){var b,f,m,W,g,y,x,_,C,j;const S=u("Popup"),I=u("router-link");return r(),s("div",$,[n("p",D,i(null==(b=t.currentWord)?void 0:b.word),1),n("div",E,[H,(r(!0),s(l,null,a(null==(f=t.currentWord)?void 0:f.trans,((t,e)=>(r(),s("p",{key:e},i(t.pos?t.pos+":":"")+i(t.cn),1)))),128))]),n("div",N,[T,(null==(m=t.currentWord)?void 0:m.ukphone)?(r(),s("div",F,[n("a",{class:"play",onClick:e[0]||(e[0]=t=>w.sayWord(w.uksound))},[d(" 英式："),n("span",null,i(null==(W=t.currentWord)?void 0:W.ukphone),1)])])):h("",!0),(null==(g=t.currentWord)?void 0:g.usphone)?(r(),s("div",M,[n("a",{class:"play",onClick:e[1]||(e[1]=t=>w.sayWord(w.ussound))},[d(" 美式："),n("span",null,i(null==(y=t.currentWord)?void 0:y.usphone),1)])])):h("",!0),(null==(x=t.currentWord)?void 0:x.jphone)?(r(),s("div",q,[n("a",{class:"play",onClick:e[2]||(e[2]=t=>w.sayWord(w.jsound))},[n("span",null,i(null==(_=t.currentWord)?void 0:_.jphone),1)])])):h("",!0),n("div",z,[n("a",{href:"javascript:void(0)",class:"lbtn",onClick:e[3]||(e[3]=t=>this.visible=!this.visible)}," 学习(当前窗口打开) "),(null==(C=t.currentWord)?void 0:C.rel_words)?(r(),s("a",{key:0,class:"lbtn",href:"javascript:void(0)",onClick:e[4]||(e[4]=t=>k.rootword=!0)},"查看同根词（"+i(null==(j=t.currentWord)?void 0:j.rel_words.length)+"）",1)):h("",!0)])]),p(S,{onClose:e[5]||(e[5]=t=>k.visible=!1),visible:k.visible},{default:v((()=>[n("iframe",{class:"frame",src:w.studyLink,frameborder:"0"},null,8,G)])),_:1},8,["visible"]),p(S,{onClose:e[6]||(e[6]=t=>k.rootword=!1),visible:k.rootword},{default:v((()=>{var e;return[n("div",J,[K,n("table",O,[Q,n("tbody",null,[(r(!0),s(l,null,a(null==(e=t.currentWord)?void 0:e.rel_words,((t,e)=>(r(),s("tr",{key:e},[n("td",R,i(t.pos),1),n("td",null,[(r(!0),s(l,null,a(t.words,((t,e)=>(r(),s("p",{key:e},[n("a",{href:`https://dict.youdao.com/result?word=${t.hwd}&lang=en`,target:"_blank"},i(t.hwd),9,U),d(" : "+i(t.tran),1)])))),128))])])))),128))])]),p(I,{class:"rootlist",to:"/root"},{default:v((()=>[d("查看词根列表")])),_:1})])]})),_:1},8,["visible"])])}],["__scopeId","data-v-732adf06"]]),Spell:P,Popup:y},data:()=>({count:0,poper:!1}),watch:{active_index:{handler(){_.saved.count((t=>{this.count=t}))},immediate:!0},active:{handler(){this.getWords()},immediate:!0}},computed:{...b("book",["active","active_index","words","books"]),...b("ui",["spell"]),...t("book",["book","progress","currentWord"]),letter(){var t,e;if(this.book&&this.book.tags.includes("日语")){return W(null==(t=this.currentWord)?void 0:t.word)||""}return(null==(e=this.currentWord)?void 0:e.word)||""},spellWord(){var t,e;if(this.book&&this.book.tags.includes("日语")){return W(null==(t=this.currentWord)?void 0:t.word)||""}return(null==(e=this.currentWord)?void 0:e.word)||""}},methods:{...e("book",["getWords","getBooks","setActive","setActiveIndex"]),...f("ui",["switchSpell"]),...f("book",["shuffling"]),closePoper(){localStorage.setItem("hidPoper",!0),this.poper=!1},shuffleWords(){this.setActiveIndex({[this.active]:0}),this.shuffling()},nextWord(){null!=this.words[this.active_index[this.active]+1]?(this.setActiveIndex({[this.active]:this.active_index[this.active]+1}),(async({book:t,process:e,index:o,count:r=1,ts:s,date:n})=>{const d=await _.record.get({book:t,date:n});d?d.index<o&&await _.record.update(d.id,{count:d.count+1,process:e,index:o,ts:s}):await _.record.add({book:t,process:e,index:o,count:r,ts:s,date:n})})({book:this.book.title,process:this.progress,index:this.active_index[this.active]+1,ts:(new Date).getTime(),date:(new Date).toLocaleDateString()})):alert("学习完成！")},prevWord(){this.active_index[this.active]>0?this.setActiveIndex({[this.active]:this.active_index[this.active]-1}):alert("已经是第一个了！")},ignore(){var t,e;const o={word:null==(t=this.currentWord)?void 0:t.word,means:x.cloneDeep(null==(e=this.currentWord)?void 0:e.trans),ts:(new Date).getTime(),lang:this.book.tags.includes("日语")?"ja":"en",bookid:this.active};_.saved.add(o),this.nextWord()}}},X=t=>(k("data-v-e3d7ef50"),t=t(),w(),t),Y={class:"wrapper"},Z={style:{color:"#f33b1f"}},tt={class:"footer"},et=X((()=>n("a",{href:"https://github.com/gofxas/danci-vue",target:"_blank"},"开源地址",-1))),ot=X((()=>n("div",null,[n("p",null,"本次更新！"),n("p",null,"乱序模式："),n("p",null,"打乱单词本顺序，但是从0开始。"),n("p",null,"新增日语50音图")],-1)));const rt=o(V,[["render",function(t,e,o,a,c,h){const k=u("Switch"),w=u("Word"),b=u("Spell"),f=u("router-link"),W=u("Popup");return r(),s("div",Y,[p(k),p(w),t.spell?(r(),m(b,{key:0,onNext:h.nextWord,letter:h.letter,word:h.spellWord},null,8,["onNext","letter","word"])):(r(),s(l,{key:1},[n("div",{class:"card btn",onClick:e[0]||(e[0]=(...t)=>h.prevWord&&h.prevWord(...t))},"上一个"),n("div",{class:"card btn",onClick:e[1]||(e[1]=(...t)=>h.nextWord&&h.nextWord(...t))},"下一个")],64)),n("div",{class:"card btn",onClick:e[2]||(e[2]=(...t)=>h.ignore&&h.ignore(...t))},"不会"),p(f,{class:"card btn link",to:"/saved"},{default:v((()=>[d(" 生词本 "),n("span",Z,i(c.count?"("+c.count+")":""),1)])),_:1}),n("div",tt,[p(f,{to:"/report"},{default:v((()=>[d("报告")])),_:1}),n("a",{onClick:e[3]||(e[3]=(...e)=>t.switchSpell&&t.switchSpell(...e))},"切换模式"),et]),p(W,{onClose:h.closePoper,visible:c.poper},{default:v((()=>[ot])),_:1},8,["onClose","visible"])])}],["__scopeId","data-v-e3d7ef50"]]);export{rt as default};
