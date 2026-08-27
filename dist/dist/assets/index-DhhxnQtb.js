(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();var ut={};(function H(t,n,c,e){var r=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),d=typeof Path2D=="function"&&typeof DOMMatrix=="function",m=(function(){if(!t.OffscreenCanvas)return!1;try{var u=new OffscreenCanvas(1,1),s=u.getContext("2d");s.fillRect(0,0,1,1);var w=u.transferToImageBitmap();s.createPattern(w,"no-repeat")}catch{return!1}return!0})();function i(){}function l(u){var s=n.exports.Promise,w=s!==void 0?s:t.Promise;return typeof w=="function"?new w(u):(u(i,i),null)}var o=(function(u,s){return{transform:function(w){if(u)return w;if(s.has(w))return s.get(w);var v=new OffscreenCanvas(w.width,w.height),k=v.getContext("2d");return k.drawImage(w,0,0),s.set(w,v),v},clear:function(){s.clear()}}})(m,new Map),a=(function(){var u=Math.floor(16.666666666666668),s,w,v={},k=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(s=function(x){var S=Math.random();return v[S]=requestAnimationFrame(function C(B){k===B||k+u-1<B?(k=B,delete v[S],x()):v[S]=requestAnimationFrame(C)}),S},w=function(x){v[x]&&cancelAnimationFrame(v[x])}):(s=function(x){return setTimeout(x,u)},w=function(x){return clearTimeout(x)}),{frame:s,cancel:w}})(),h=(function(){var u,s,w={};function v(k){function x(S,C){k.postMessage({options:S||{},callback:C})}k.init=function(C){var B=C.transferControlToOffscreen();k.postMessage({canvas:B},[B])},k.fire=function(C,B,L){if(s)return x(C,null),s;var F=Math.random().toString(36).slice(2);return s=l(function(D){function O(j){j.data.callback===F&&(delete w[F],k.removeEventListener("message",O),s=null,o.clear(),L(),D())}k.addEventListener("message",O),x(C,F),w[F]=O.bind(null,{data:{callback:F}})}),s},k.reset=function(){k.postMessage({reset:!0});for(var C in w)w[C](),delete w[C]}}return function(){if(u)return u;if(!c&&r){var k=["var CONFETTI, SIZE = {}, module = {};","("+H.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{u=new Worker(URL.createObjectURL(new Blob([k])))}catch(x){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",x),null}v(u)}return u}})(),p={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function g(u,s){return s?s(u):u}function y(u){return u!=null}function f(u,s,w){return g(u&&y(u[s])?u[s]:p[s],w)}function E(u){return u<0?0:Math.floor(u)}function I(u,s){return Math.floor(Math.random()*(s-u))+u}function T(u){return parseInt(u,16)}function z(u){return u.map(A)}function A(u){var s=String(u).replace(/[^0-9a-f]/gi,"");return s.length<6&&(s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2]),{r:T(s.substring(0,2)),g:T(s.substring(2,4)),b:T(s.substring(4,6))}}function $(u){var s=f(u,"origin",Object);return s.x=f(s,"x",Number),s.y=f(s,"y",Number),s}function _(u){u.width=document.documentElement.clientWidth,u.height=document.documentElement.clientHeight}function q(u){var s=u.getBoundingClientRect();u.width=s.width,u.height=s.height}function V(u){var s=document.createElement("canvas");return s.style.position="fixed",s.style.top="0px",s.style.left="0px",s.style.pointerEvents="none",s.style.zIndex=u,s}function P(u,s,w,v,k,x,S,C,B){u.save(),u.translate(s,w),u.rotate(x),u.scale(v,k),u.arc(0,0,1,S,C,B),u.restore()}function b(u){var s=u.angle*(Math.PI/180),w=u.spread*(Math.PI/180);return{x:u.x,y:u.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:u.startVelocity*.5+Math.random()*u.startVelocity,angle2D:-s+(.5*w-Math.random()*w),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:u.color,shape:u.shape,tick:0,totalTicks:u.ticks,decay:u.decay,drift:u.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:u.gravity*3,ovalScalar:.6,scalar:u.scalar,flat:u.flat}}function M(u,s){s.x+=Math.cos(s.angle2D)*s.velocity+s.drift,s.y+=Math.sin(s.angle2D)*s.velocity+s.gravity,s.velocity*=s.decay,s.flat?(s.wobble=0,s.wobbleX=s.x+10*s.scalar,s.wobbleY=s.y+10*s.scalar,s.tiltSin=0,s.tiltCos=0,s.random=1):(s.wobble+=s.wobbleSpeed,s.wobbleX=s.x+10*s.scalar*Math.cos(s.wobble),s.wobbleY=s.y+10*s.scalar*Math.sin(s.wobble),s.tiltAngle+=.1,s.tiltSin=Math.sin(s.tiltAngle),s.tiltCos=Math.cos(s.tiltAngle),s.random=Math.random()+2);var w=s.tick++/s.totalTicks,v=s.x+s.random*s.tiltCos,k=s.y+s.random*s.tiltSin,x=s.wobbleX+s.random*s.tiltCos,S=s.wobbleY+s.random*s.tiltSin;if(u.fillStyle="rgba("+s.color.r+", "+s.color.g+", "+s.color.b+", "+(1-w)+")",u.beginPath(),d&&s.shape.type==="path"&&typeof s.shape.path=="string"&&Array.isArray(s.shape.matrix))u.fill(X(s.shape.path,s.shape.matrix,s.x,s.y,Math.abs(x-v)*.1,Math.abs(S-k)*.1,Math.PI/10*s.wobble));else if(s.shape.type==="bitmap"){var C=Math.PI/10*s.wobble,B=Math.abs(x-v)*.1,L=Math.abs(S-k)*.1,F=s.shape.bitmap.width*s.scalar,D=s.shape.bitmap.height*s.scalar,O=new DOMMatrix([Math.cos(C)*B,Math.sin(C)*B,-Math.sin(C)*L,Math.cos(C)*L,s.x,s.y]);O.multiplySelf(new DOMMatrix(s.shape.matrix));var j=u.createPattern(o.transform(s.shape.bitmap),"no-repeat");j.setTransform(O),u.globalAlpha=1-w,u.fillStyle=j,u.fillRect(s.x-F/2,s.y-D/2,F,D),u.globalAlpha=1}else if(s.shape==="circle")u.ellipse?u.ellipse(s.x,s.y,Math.abs(x-v)*s.ovalScalar,Math.abs(S-k)*s.ovalScalar,Math.PI/10*s.wobble,0,2*Math.PI):P(u,s.x,s.y,Math.abs(x-v)*s.ovalScalar,Math.abs(S-k)*s.ovalScalar,Math.PI/10*s.wobble,0,2*Math.PI);else if(s.shape==="star")for(var N=Math.PI/2*3,U=4*s.scalar,Z=8*s.scalar,Y=s.x,et=s.y,st=5,tt=Math.PI/st;st--;)Y=s.x+Math.cos(N)*Z,et=s.y+Math.sin(N)*Z,u.lineTo(Y,et),N+=tt,Y=s.x+Math.cos(N)*U,et=s.y+Math.sin(N)*U,u.lineTo(Y,et),N+=tt;else u.moveTo(Math.floor(s.x),Math.floor(s.y)),u.lineTo(Math.floor(s.wobbleX),Math.floor(k)),u.lineTo(Math.floor(x),Math.floor(S)),u.lineTo(Math.floor(v),Math.floor(s.wobbleY));return u.closePath(),u.fill(),s.tick<s.totalTicks}function R(u,s,w,v,k){var x=s.slice(),S=u.getContext("2d"),C,B,L=l(function(F){function D(){C=B=null,S.clearRect(0,0,v.width,v.height),o.clear(),k(),F()}function O(){c&&!(v.width===e.width&&v.height===e.height)&&(v.width=u.width=e.width,v.height=u.height=e.height),!v.width&&!v.height&&(w(u),v.width=u.width,v.height=u.height),S.clearRect(0,0,v.width,v.height),x=x.filter(function(j){return M(S,j)}),x.length?C=a.frame(O):D()}C=a.frame(O),B=D});return{addFettis:function(F){return x=x.concat(F),L},canvas:u,promise:L,reset:function(){C&&a.cancel(C),B&&B()}}}function W(u,s){var w=!u,v=!!f(s||{},"resize"),k=!1,x=f(s,"disableForReducedMotion",Boolean),S=r&&!!f(s||{},"useWorker"),C=S?h():null,B=w?_:q,L=u&&C?!!u.__confetti_initialized:!1,F=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,D;function O(N,U,Z){for(var Y=f(N,"particleCount",E),et=f(N,"angle",Number),st=f(N,"spread",Number),tt=f(N,"startVelocity",Number),wt=f(N,"decay",Number),kt=f(N,"gravity",Number),xt=f(N,"drift",Number),ht=f(N,"colors",z),Mt=f(N,"ticks",Number),mt=f(N,"shapes"),Ct=f(N,"scalar"),St=!!f(N,"flat"),pt=$(N),gt=Y,ot=[],Et=u.width*pt.x,Bt=u.height*pt.y;gt--;)ot.push(b({x:Et,y:Bt,angle:et,spread:st,startVelocity:tt,color:ht[gt%ht.length],shape:mt[I(0,mt.length)],ticks:Mt,decay:wt,gravity:kt,drift:xt,scalar:Ct,flat:St}));return D?D.addFettis(ot):(D=R(u,ot,B,U,Z),D.promise)}function j(N){var U=x||f(N,"disableForReducedMotion",Boolean),Z=f(N,"zIndex",Number);if(U&&F)return l(function(tt){tt()});w&&D?u=D.canvas:w&&!u&&(u=V(Z),document.body.appendChild(u)),v&&!L&&B(u);var Y={width:u.width,height:u.height};C&&!L&&C.init(u),L=!0,C&&(u.__confetti_initialized=!0);function et(){if(C){var tt={getBoundingClientRect:function(){if(!w)return u.getBoundingClientRect()}};B(tt),C.postMessage({resize:{width:tt.width,height:tt.height}});return}Y.width=Y.height=null}function st(){D=null,v&&(k=!1,t.removeEventListener("resize",et)),w&&u&&(document.body.contains(u)&&document.body.removeChild(u),u=null,L=!1)}return v&&!k&&(k=!0,t.addEventListener("resize",et,!1)),C?C.fire(N,Y,st):O(N,Y,st)}return j.reset=function(){C&&C.reset(),D&&D.reset()},j}var J;function G(){return J||(J=W(null,{useWorker:!0,resize:!0})),J}function X(u,s,w,v,k,x,S){var C=new Path2D(u),B=new Path2D;B.addPath(C,new DOMMatrix(s));var L=new Path2D;return L.addPath(B,new DOMMatrix([Math.cos(S)*k,Math.sin(S)*k,-Math.sin(S)*x,Math.cos(S)*x,w,v])),L}function nt(u){if(!d)throw new Error("path confetti are not supported in this browser");var s,w;typeof u=="string"?s=u:(s=u.path,w=u.matrix);var v=new Path2D(s),k=document.createElement("canvas"),x=k.getContext("2d");if(!w){for(var S=1e3,C=S,B=S,L=0,F=0,D,O,j=0;j<S;j+=2)for(var N=0;N<S;N+=2)x.isPointInPath(v,j,N,"nonzero")&&(C=Math.min(C,j),B=Math.min(B,N),L=Math.max(L,j),F=Math.max(F,N));D=L-C,O=F-B;var U=10,Z=Math.min(U/D,U/O);w=[Z,0,0,Z,-Math.round(D/2+C)*Z,-Math.round(O/2+B)*Z]}return{type:"path",path:s,matrix:w}}function K(u){var s,w=1,v="#000000",k='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof u=="string"?s=u:(s=u.text,w="scalar"in u?u.scalar:w,k="fontFamily"in u?u.fontFamily:k,v="color"in u?u.color:v);var x=10*w,S=""+x+"px "+k,C=new OffscreenCanvas(x,x),B=C.getContext("2d");B.font=S;var L=B.measureText(s),F=Math.ceil(L.actualBoundingBoxRight+L.actualBoundingBoxLeft),D=Math.ceil(L.actualBoundingBoxAscent+L.actualBoundingBoxDescent),O=2,j=L.actualBoundingBoxLeft+O,N=L.actualBoundingBoxAscent+O;F+=O+O,D+=O+O,C=new OffscreenCanvas(F,D),B=C.getContext("2d"),B.font=S,B.fillStyle=v,B.fillText(s,j,N);var U=1/w;return{type:"bitmap",bitmap:C.transferToImageBitmap(),matrix:[U,0,0,U,-F*U/2,-D*U/2]}}n.exports=function(){return G().apply(this,arguments)},n.exports.reset=function(){G().reset()},n.exports.create=W,n.exports.shapeFromPath=nt,n.exports.shapeFromText=K})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),ut,!1);const Tt=ut.exports;ut.exports.create;const ct={"classic-649":{id:"classic-649",name:"Classic Lotto 6/49",country:"International / Canada / UK",minNumber:1,maxNumber:49,pickCount:6,hasBonus:!0,bonusName:"Bonus Ball",defaultSumRange:[115,185],optimalSum:150,color:"#F59E0B"},"power-650":{id:"power-650",name:"Euro-Style 6/50",country:"European Standard",minNumber:1,maxNumber:50,pickCount:6,hasBonus:!0,bonusName:"Star / Bonus",defaultSumRange:[120,190],optimalSum:153,color:"#3B82F6"},"mega-659":{id:"mega-659",name:"Grand Mega 6/59",country:"US / UK Format",minNumber:1,maxNumber:59,pickCount:6,hasBonus:!0,bonusName:"Super Ball",defaultSumRange:[140,220],optimalSum:180,color:"#8B5CF6"},"lucky-645":{id:"lucky-645",name:"Lucky Gold 6/45",country:"Asia / Australia Format",minNumber:1,maxNumber:45,pickCount:6,hasBonus:!0,bonusName:"Bonus Ball",defaultSumRange:[105,170],optimalSum:138,color:"#10B981"},"super-660":{id:"super-660",name:"Super Max 6/60",country:"South America Format",minNumber:1,maxNumber:60,pickCount:6,hasBonus:!1,bonusName:"",defaultSumRange:[145,225],optimalSum:183,color:"#EC4899"}},lt={"quantum-ensemble":{id:"quantum-ensemble",name:"Quantum Monte Carlo Ensemble",badge:"Recommended - AI Blend",description:"Runs 10,000 probabilistic simulations combining recency decay, overdue gap cycles, harmonic sum balance, and pair synergy.",icon:"sparkles",speed:"High Precision"},"frequency-momentum":{id:"frequency-momentum",name:"Hot Momentum Surge",badge:"Trend Follower",description:"Prioritizes statistically hot numbers exhibiting strong positive draw velocity in recent draws.",icon:"flame",speed:"Fast"},"overdue-reversion":{id:"overdue-reversion",name:"Cold & Overdue Reversion",badge:"Law of Averages",description:"Targets numbers with the highest overdue gap index relative to their statistical expected return cycle.",icon:"snowflake",speed:"Fast"},"harmonic-balance":{id:"harmonic-balance",name:"Harmonic Golden Ratio",badge:"Statistical Sweetspot",description:"Constructs tickets adhering to the bell-curve sum median, 3:3 / 4:2 odd-even balance, and equal high/low distribution.",icon:"scale",speed:"Balanced"},"markov-pairs":{id:"markov-pairs",name:"Markov Co-occurrence Network",badge:"Synergy Graph",description:"Leverages high-probability pair-wise affinities and conditional transition chains from historical winning tickets.",icon:"git-branch",speed:"Advanced"},"delta-system":{id:"delta-system",name:"Delta Difference Pattern",badge:"Interval Synthesis",description:"Reconstructs winning number combinations by modeling the statistical frequency of differences between consecutive numbers.",icon:"activity",speed:"Fast"}},dt=[{match:6,name:"Jackpot (6/6)",payout:5e6,color:"#F59E0B"},{match:5,name:"Match 5",payout:2500,color:"#8B5CF6"},{match:4,name:"Match 4",payout:100,color:"#3B82F6"},{match:3,name:"Match 3",payout:10,color:"#10B981"},{match:2,name:"Match 2",payout:0,color:"#6B7280"},{match:1,name:"Match 1",payout:0,color:"#4B5563"},{match:0,name:"No Match",payout:0,color:"#374151"}];function it(H,t=120,n=49){const c=[],e=new Date("2024-01-03");let r=492024;function d(){return r=(r*9301+49297)%233280,r/233280}const m=Array(n+1).fill(1);for(let i=1;i<=n;i++)m[i]=.85+d()*.3;for(let i=1;i<=t;i++){const l=new Date(e);l.setDate(l.getDate()+(i-1)*3.5);const o=[];for(let y=1;y<=n;y++)o.push({num:y,weight:m[y]*(.9+d()*.2)});o.sort((y,f)=>f.weight-y.weight);const a=[],h=[...o];for(;a.length<6;){const y=h.reduce((I,T)=>I+T.weight,0);let f=d()*y,E=0;for(let I=0;I<h.length;I++)if(f-=h[I].weight,f<=0){E=I;break}a.push(h[E].num),h.splice(E,1)}a.sort((y,f)=>y-f);let p=Math.floor(d()*n)+1;for(;a.includes(p);)p=p%n+1;const g=(5+i%7*2.5+d()*1.8).toFixed(1);c.push({drawNumber:1e3+i,date:l.toISOString().split("T")[0],numbers:a,bonus:p,jackpot:`$${g}M`,winners:Math.floor(d()*4)===0?1:0})}return c.reverse()}const ft={"classic-649":it("classic-649",140,49),"power-650":it("power-650",120,50),"mega-659":it("mega-659",110,59),"lucky-645":it("lucky-645",100,45),"super-660":it("super-660",100,60)};function vt(H){return ft[H]?JSON.parse(JSON.stringify(ft[H])):it(H,100,49)}function $t(H,t=49){const n=H.trim().split(`
`),c=[];for(let e=0;e<n.length;e++){const r=n[e].trim();if(!r||e===0&&(r.toLowerCase().includes("date")||r.toLowerCase().includes("draw")||r.toLowerCase().includes("num")))continue;const d=r.split(/[,;\t]+/).map(h=>h.trim()).filter(Boolean);if(d.length<6)continue;let m=c.length+1,i=new Date().toISOString().split("T")[0],l=[],o=null,a=0;!isNaN(d[0])&&parseInt(d[0])>100&&d.length>7&&(m=parseInt(d[0]),a=1),isNaN(d[a])&&isNaN(Date.parse(d[a]))===!1?(i=new Date(d[a]).toISOString().split("T")[0],a++):(d[a]&&d[a].includes("-")||d[a].includes("/"))&&(i=d[a],a++);for(let h=a;h<d.length;h++){const p=parseInt(d[h]);!isNaN(p)&&p>=1&&p<=t+20&&(l.length<6?l.push(p):o===null&&(o=p))}l.length===6&&(l.sort((h,p)=>h-p),c.push({drawNumber:m,date:i,numbers:l,bonus:o||Math.floor(Math.random()*t)+1,jackpot:"$10.0M",winners:0}))}return c}class bt{constructor(t,n){this.draws=t||[],this.config=n,this.minNumber=n.minNumber||1,this.maxNumber=n.maxNumber||49,this.pickCount=n.pickCount||6,this.midPoint=Math.floor((this.minNumber+this.maxNumber)/2),this.analyze()}updateData(t,n){return this.draws=t||[],n&&(this.config=n,this.minNumber=n.minNumber||1,this.maxNumber=n.maxNumber||49,this.pickCount=n.pickCount||6,this.midPoint=Math.floor((this.minNumber+this.maxNumber)/2)),this.analyze()}analyze(){const t=this.draws.length,n=this.maxNumber-this.minNumber+1;this.pickCount/n;const c=n/this.pickCount,e={},r={},d={},m={};for(let b=this.minNumber;b<=this.maxNumber;b++)e[b]=0,r[b]=0,d[b]=0,m[b]=-1;const i={};for(let b=this.minNumber;b<=this.maxNumber;b++){i[b]={};for(let M=this.minNumber;M<=this.maxNumber;M++)i[b][M]=0}const l={"0:6":0,"1:5":0,"2:4":0,"3:3":0,"4:2":0,"5:1":0,"6:0":0},o={"0:6":0,"1:5":0,"2:4":0,"3:3":0,"4:2":0,"5:1":0,"6:0":0},a=[],h={};let p=0;this.draws.forEach((b,M)=>{const R=b.numbers.filter(v=>v>=this.minNumber&&v<=this.maxNumber);if(R.length!==this.pickCount)return;R.forEach(v=>{e[v]=(e[v]||0)+1,M<10&&(r[v]=(r[v]||0)+1),M<25&&(d[v]=(d[v]||0)+1),m[v]===-1&&(m[v]=M)});for(let v=0;v<R.length;v++)for(let k=v+1;k<R.length;k++){const x=R[v],S=R[k];i[x][S]=(i[x][S]||0)+1,i[S][x]=(i[S][x]||0)+1}const W=R.filter(v=>v%2!==0).length,J=this.pickCount-W,G=`${W}:${J}`;l[G]=(l[G]||0)+1;const X=R.filter(v=>v>this.midPoint).length,K=`${this.pickCount-X}:${X}`;o[K]=(o[K]||0)+1;const u=R.reduce((v,k)=>v+k,0);a.push(u);const s=[...R].sort((v,k)=>v-k);let w=!1;for(let v=0;v<s.length-1;v++){const k=s[v+1]-s[v];h[k]=(h[k]||0)+1,k===1&&(w=!0)}w&&p++});for(let b=this.minNumber;b<=this.maxNumber;b++)m[b]===-1&&(m[b]=t);const g=[],y=t>0?t*this.pickCount/n:0;for(let b=this.minNumber;b<=this.maxNumber;b++){const M=e[b],R=t>0?(M/t*100).toFixed(1):0,W=r[b],J=d[b],G=m[b],X=(W*3+J*1.5+M/(t||1)*10).toFixed(2),nt=(G/c).toFixed(2);let K="neutral";M>y*1.15||W>=3?K="hot":G>c*1.5||M<y*.8&&G>c?K="cold":M>=y&&(K="warm"),g.push({number:b,count:M,percentage:parseFloat(R),gap:G,recent10:W,recent25:J,momentum:parseFloat(X),overdueRatio:parseFloat(nt),status:K,isEven:b%2===0,isHigh:b>this.midPoint})}const f=[...g].sort((b,M)=>M.count-b.count||b.gap-M.gap),E=[...g].sort((b,M)=>M.gap-b.gap||b.count-M.count),I=[...g].sort((b,M)=>M.momentum-b.momentum),T=a.length?Math.min(...a):0,z=a.length?Math.max(...a):0,A=a.length?(a.reduce((b,M)=>b+M,0)/a.length).toFixed(1):0,$=[...a].sort((b,M)=>b-M),_=$.length?$[Math.floor($.length/2)]:0,q=a.reduce((b,M)=>b+Math.pow(M-A,2),0)/(a.length||1),V=Math.sqrt(q).toFixed(1),P=[];for(let b=this.minNumber;b<=this.maxNumber;b++)for(let M=b+1;M<=this.maxNumber;M++){const R=i[b][M];R>0&&P.push({pair:[b,M],count:R,percent:t>0?(R/t*100).toFixed(1):0})}return P.sort((b,M)=>M.count-b.count),this.stats={totalDraws:t,poolSize:n,expectedGap:parseFloat(c.toFixed(1)),avgFrequency:parseFloat(y.toFixed(1)),numberStats:g,hotRanking:f,coldRanking:E,momentumRanking:I,oddEvenCounts:l,highLowCounts:o,sums:{min:T,max:z,average:parseFloat(A),median:_,stdDev:parseFloat(V),sweetspotRange:[Math.max(this.minNumber*6,Math.round(A-V)),Math.min(this.maxNumber*6,Math.round(Number(A)+Number(V)))]},consecutiveStats:{drawsWithConsecutive:p,percentage:t>0?(p/t*100).toFixed(1):0},topDeltas:Object.entries(h).map(([b,M])=>({delta:parseInt(b),count:M})).sort((b,M)=>M.count-b.count).slice(0,10),topPairs:P.slice(0,15),coOccurrenceMatrix:i},this.stats}getNumberStat(t){return this.stats||this.analyze(),this.stats.numberStats.find(n=>n.number===t)}getHotNumbers(t=10){return this.stats||this.analyze(),this.stats.hotRanking.slice(0,t).map(n=>n.number)}getColdNumbers(t=10){return this.stats||this.analyze(),this.stats.coldRanking.slice(0,t).map(n=>n.number)}getMomentumNumbers(t=10){return this.stats||this.analyze(),this.stats.momentumRanking.slice(0,t).map(n=>n.number)}}class yt{constructor(t,n){this.statsEngine=t,this.config=n}update(t,n){this.statsEngine=t,n&&(this.config=n)}generateTickets(t={}){const{algorithm:n="quantum-ensemble",ticketCount:c=1,mustInclude:e=[],blacklist:r=[],parityPreference:d="any",sumRange:m=null,maxConsecutive:i=2}=t,l=this.statsEngine.stats||this.statsEngine.analyze(),o=this.config.minNumber||1,a=this.config.maxNumber||49,h=this.config.pickCount||6,p=e.filter(E=>E>=o&&E<=a&&!r.includes(E)).slice(0,h),g=new Set(r),y=[],f=new Set;for(let E=0;E<c;E++){let I=null,T=0;const z=300;for(;T<z;){T++;let $=[];switch(n){case"frequency-momentum":$=this._generateMomentum(p,g);break;case"overdue-reversion":$=this._generateOverdue(p,g);break;case"harmonic-balance":$=this._generateHarmonic(p,g);break;case"markov-pairs":$=this._generateMarkov(p,g);break;case"delta-system":$=this._generateDelta(p,g);break;case"quantum-ensemble":default:$=this._generateEnsemble(p,g);break}if($=Array.from(new Set($)).sort((_,q)=>_-q),$.length!==h&&($=this._fillToCount($,h,o,a,g)),this._validateConstraints($,{mustInclude:p,blacklist:g,parityPreference:d,sumRange:m||l.sums.sweetspotRange,maxConsecutive:i})){const _=$.join("-");if(!f.has(_)||T>z-50){I=$,f.add(_);break}}}I||(I=this._fillToCount([...p],h,o,a,g)),I.sort(($,_)=>$-_);const A=this.analyzeTicket(I);y.push({id:`TKT-${Date.now().toString(36).toUpperCase()}-${E+1}`,numbers:I,algorithm:n,createdAt:new Date().toISOString(),analysis:A})}return y}_generateEnsemble(t,n){const c=this.statsEngine.stats,e=this.config.minNumber,r=this.config.maxNumber,d=this.config.pickCount,m=c.sums.sweetspotRange,i={};for(let a=e;a<=r;a++){if(n.has(a)){i[a]=0;continue}const h=this.statsEngine.getNumberStat(a)||{count:1,momentum:1,overdueRatio:1},p=Math.max(.1,h.momentum),g=h.overdueRatio>1.2?1.3:h.overdueRatio<.5?.9:1,y=h.count/(c.avgFrequency||1);i[a]=p*.45+g*.3+y*.25}let l=null,o=-1/0;for(let a=0;a<150;a++){const h=new Set(t);for(;h.size<d;){const g=[];for(let f=e;f<=r;f++)if(!h.has(f)&&!n.has(f)){let E=1;c.coOccurrenceMatrix&&c.coOccurrenceMatrix[f]&&h.forEach(I=>{const T=c.coOccurrenceMatrix[f][I]||0;E+=T/(c.totalDraws||1)*2}),g.push({num:f,weight:(i[f]||1)*E})}const y=this._weightedRandomPick(g);if(y!==null)h.add(y);else break}const p=Array.from(h).sort((g,y)=>g-y);if(p.length===d){const g=this._scoreTicketFitness(p,c,m);g>o&&(o=g,l=p)}}return l||Array.from(t)}_generateMomentum(t,n){this.statsEngine.stats;const c=this.config.minNumber,e=this.config.maxNumber,r=this.config.pickCount,d=[];for(let i=c;i<=e;i++)if(!n.has(i)){const l=this.statsEngine.getNumberStat(i)||{count:1,recent10:0,recent25:0},o=Math.pow(l.recent10+1,2.5)*(l.recent25+1)*(l.count+1);d.push({num:i,weight:o})}const m=new Set(t);for(;m.size<r&&d.length>0;){const i=d.filter(o=>!m.has(o.num)),l=this._weightedRandomPick(i);if(l!==null)m.add(l);else break}return Array.from(m)}_generateOverdue(t,n){this.statsEngine.stats;const c=this.config.minNumber,e=this.config.maxNumber,r=this.config.pickCount,d=[];for(let i=c;i<=e;i++)if(!n.has(i)){const l=this.statsEngine.getNumberStat(i)||{gap:1},o=Math.pow(l.gap+1,2.2);d.push({num:i,weight:o})}const m=new Set(t);for(;m.size<r&&d.length>0;){const i=d.filter(o=>!m.has(o.num)),l=this._weightedRandomPick(i);if(l!==null)m.add(l);else break}return Array.from(m)}_generateHarmonic(t,n){this.statsEngine.stats;const c=this.config.minNumber,e=this.config.maxNumber;this.config.pickCount;const r=[],d=[];for(let o=c;o<=e;o++)if(!n.has(o)){const a=this.statsEngine.getNumberStat(o)||{count:1},h={num:o,weight:a.count+5};o%2!==0?r.push(h):d.push(h)}const m=new Set(t);let i=3,l=3;t.forEach(o=>{o%2!==0?i--:l--});for(let o=0;o<Math.max(0,i);o++){const a=r.filter(p=>!m.has(p.num)),h=this._weightedRandomPick(a);h!==null&&m.add(h)}for(let o=0;o<Math.max(0,l);o++){const a=d.filter(p=>!m.has(p.num)),h=this._weightedRandomPick(a);h!==null&&m.add(h)}return Array.from(m)}_generateMarkov(t,n){const c=this.statsEngine.stats,e=this.config.minNumber,r=this.config.maxNumber,d=this.config.pickCount,m=new Set(t);if(m.size===0){const i=c.momentumRanking.slice(0,5),l=i[Math.floor(Math.random()*i.length)].number;n.has(l)||m.add(l)}for(;m.size<d;){const i=Array.from(m),l=[];for(let a=e;a<=r;a++)if(!m.has(a)&&!n.has(a)){let h=0;i.forEach(p=>{c.coOccurrenceMatrix&&c.coOccurrenceMatrix[p]&&(h+=c.coOccurrenceMatrix[p][a]||0)}),l.push({num:a,weight:Math.pow(h+1,1.8)})}const o=this._weightedRandomPick(l);if(o!==null)m.add(o);else break}return Array.from(m)}_generateDelta(t,n){const c=this.statsEngine.stats,e=this.config.minNumber,r=this.config.maxNumber,d=this.config.pickCount;if(t.length>0)return this._generateEnsemble(t,n);const m=c.topDeltas&&c.topDeltas.length?c.topDeltas:[{delta:1,count:10},{delta:2,count:15},{delta:3,count:18},{delta:4,count:14},{delta:5,count:12},{delta:6,count:10}];for(let i=0;i<50;i++){let l=Math.floor(Math.random()*10)+e;const o=[l];for(let a=1;a<d;a++){const h=this._weightedRandomPick(m.map(p=>({num:p.delta,weight:p.count})));if(l+=h||Math.floor(Math.random()*8)+1,l<=r&&!n.has(l))o.push(l);else break}if(o.length===d&&new Set(o).size===d)return o}return this._generateEnsemble(t,n)}generateWheeledTickets(t=10,n=5){this.statsEngine.stats||this.statsEngine.analyze();const c=this.statsEngine.getHotNumbers(8),e=this.statsEngine.getMomentumNumbers(8),r=Array.from(new Set([...c,...e])).slice(0,t),d=[],m=this.config.minNumber,i=this.config.maxNumber,l=this.config.pickCount;for(let o=0;o<n;o++){let h=[...r].sort(()=>Math.random()-.5).slice(0,l).sort((p,g)=>p-g);h.length<l&&(h=this._fillToCount(h,l,m,i,new Set)),d.push({id:`WHEEL-${o+1}`,numbers:h,algorithm:"wheeling-system",createdAt:new Date().toISOString(),analysis:this.analyzeTicket(h)})}return{poolNumbers:r,tickets:d}}_scoreTicketFitness(t,n,c){const e=t.reduce((h,p)=>h+p,0);let r=50;const d=(c[0]+c[1])/2,m=Math.abs(e-d);r+=Math.max(0,30-m*.8);const i=t.filter(h=>h%2!==0).length;i===3?r+=20:i===2||i===4?r+=14:(i===1||i===5)&&(r+=5);const l=t.filter(h=>h>n.poolSize/2).length;l===3?r+=15:(l===2||l===4)&&(r+=10);let o=1,a=1;for(let h=0;h<t.length-1;h++)t[h+1]-t[h]===1?(a++,o=Math.max(o,a)):a=1;return o<=2?r+=15:r-=20,r}_validateConstraints(t,n){const{mustInclude:c,blacklist:e,parityPreference:r,sumRange:d,maxConsecutive:m}=n;for(const h of t)if(e.has(h))return!1;for(const h of c)if(!t.includes(h))return!1;const i=t.reduce((h,p)=>h+p,0);if(d&&(i<d[0]||i>d[1]))return!1;const l=t.filter(h=>h%2!==0).length;if(r==="balanced"&&(l<2||l>4)||r==="odd-heavy"&&l<4||r==="even-heavy"&&l>2)return!1;let o=1,a=1;for(let h=0;h<t.length-1;h++)t[h+1]-t[h]===1?(o++,a=Math.max(a,o)):o=1;return!(a>m)}_weightedRandomPick(t){if(!t||t.length===0)return null;const n=t.reduce((e,r)=>e+Math.max(.01,r.weight),0);let c=Math.random()*n;for(const e of t)if(c-=Math.max(.01,e.weight),c<=0)return e.num;return t[t.length-1].num}_fillToCount(t,n,c,e,r){const d=new Set(t);let m=0;for(;d.size<n&&m<200;){m++;const i=Math.floor(Math.random()*(e-c+1))+c;r.has(i)||d.add(i)}return Array.from(d).sort((i,l)=>i-l)}analyzeTicket(t){const n=this.statsEngine.stats||this.statsEngine.analyze(),c=[...t].sort((f,E)=>f-E),e=c.reduce((f,E)=>f+E,0),r=c.filter(f=>f%2!==0).length,d=c.length-r,m=c.filter(f=>f>n.poolSize/2).length,i=c.length-m,l=[];for(let f=0;f<c.length-1;f++)l.push(c[f+1]-c[f]);const o=c.map(f=>{const E=this.statsEngine.getNumberStat(f);return{number:f,count:E?E.count:0,gap:E?E.gap:0,status:E?E.status:"neutral",momentum:E?E.momentum:0}});let a=70;const h=n.sums.sweetspotRange;e>=h[0]&&e<=h[1]?a+=12:Math.abs(e-n.sums.average)<n.sums.stdDev*1.5?a+=5:a-=10,r===3?a+=8:r===2||r===4?a+=5:a-=8,m===3?a+=6:(m===2||m===4)&&(a+=4);const p=o.filter(f=>f.status==="hot").length,g=o.filter(f=>f.status==="cold").length;p>=2&&p<=4&&(a+=4),a=Math.min(98,Math.max(45,a));const y=[];return p>0&&y.push(`Includes ${p} high-momentum surge number(s)`),g>0&&y.push(`Captures ${g} overdue mean-reversion candidate(s)`),y.push(`Sum (${e}) is in optimal historical probability zone [${h[0]}-${h[1]}]`),y.push(`Parity split is ${r} Odd / ${d} Even`),{sum:e,sumRating:e>=h[0]&&e<=h[1]?"Optimal Sweetspot":"Moderate",oddCount:r,evenCount:d,parityRatio:`${r}O / ${d}E`,highCount:m,lowCount:i,highLowRatio:`${i}L / ${m}H`,deltas:l,confidenceScore:a,rationales:y,breakdown:o}}}class Nt{constructor(t,n){this.allDraws=t||[],this.config=n}updateData(t,n){this.allDraws=t||[],n&&(this.config=n)}runBacktest(t={}){const{algorithm:n="quantum-ensemble",testDrawsCount:c=40,ticketsPerDraw:e=1,ticketCost:r=2}=t,d=this.allDraws.length,i=Math.min(c,d-20);if(i<=0)return{error:"Not enough historical draws to backtest. Need at least 25 draws."};const l={0:0,1:0,2:0,3:0,4:0,5:0,6:0},o={0:0,1:0,2:0,3:0,4:0,5:0,6:0};let a=0,h=0,p=0;const g=[],y=this.config.minNumber||1,f=this.config.maxNumber||49,E=this.config.pickCount||6;for(let V=0;V<i;V++){const P=this.allDraws[V],b=P.numbers,M=P.bonus,R=this.allDraws.slice(V+1),W=new bt(R,this.config),G=new yt(W,this.config).generateTickets({algorithm:n,ticketCount:e});let X=0,nt=0;G.forEach(K=>{a++;const u=K.numbers.filter(x=>b.includes(x)).length;l[u]=(l[u]||0)+1,X=Math.max(X,u);const s=dt.find(x=>x.match===u);s&&s.payout>0&&(nt+=s.payout,h+=s.payout);const v=this._generatePureRandom(E,y,f).filter(x=>b.includes(x)).length;o[v]=(o[v]||0)+1;const k=dt.find(x=>x.match===v);k&&k.payout>0&&(p+=k.payout)}),g.push({drawNumber:P.drawNumber,date:P.date,actualWinning:b,actualBonus:M,predicted:G[0].numbers,matches:X,prize:nt})}const I=a*r,T=h-I,z=I>0?(T/I*100).toFixed(1):0,A=(l[3]||0)+(l[4]||0)+(l[5]||0)+(l[6]||0),$=a>0?(A/a*100).toFixed(1):0,_=(o[3]||0)+(o[4]||0)+(o[5]||0)+(o[6]||0),q=a>0?(_/a*100).toFixed(1):0;return{testedDraws:i,totalTickets:a,totalCost:I,totalWinnings:h,netProfit:T,roi:parseFloat(z),prizeHits:A,winRate:parseFloat($),matchDistribution:l,randomComparison:{winnings:p,prizeHits:_,winRate:parseFloat(q),matchDistribution:o},timeline:g.slice(0,15)}}_generatePureRandom(t,n,c){const e=new Set;for(;e.size<t;)e.add(Math.floor(Math.random()*(c-n+1))+n);return Array.from(e).sort((r,d)=>r-d)}}class It{constructor(){this.ctx=null,this.isMuted=localStorage.getItem("lotto_muted")==="true"}_initContext(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}toggleMute(){return this.isMuted=!this.isMuted,localStorage.setItem("lotto_muted",this.isMuted.toString()),this.isMuted}playClick(){if(!this.isMuted&&(this._initContext(),!!this.ctx))try{const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(800,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(400,this.ctx.currentTime+.04),n.gain.setValueAtTime(.08,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.04),t.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.04)}catch{}}playRollTick(){if(!this.isMuted&&(this._initContext(),!!this.ctx))try{const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(320+Math.random()*180,this.ctx.currentTime),n.gain.setValueAtTime(.06,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.03),t.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.03)}catch{}}playBallPop(t=0){if(this.isMuted||(this._initContext(),!this.ctx))return;const n=[523.25,587.33,659.25,783.99,880,1046.5,1174.66],c=n[t%n.length]||523.25;try{const e=this.ctx.createOscillator(),r=this.ctx.createOscillator(),d=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(c,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(c*1.02,this.ctx.currentTime+.05),r.type="triangle",r.frequency.setValueAtTime(c*2,this.ctx.currentTime),d.gain.setValueAtTime(.18,this.ctx.currentTime),d.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.35),e.connect(d),r.connect(d),d.connect(this.ctx.destination),e.start(),r.start(),e.stop(this.ctx.currentTime+.35),r.stop(this.ctx.currentTime+.35)}catch{}}playJackpot(){if(this.isMuted||(this._initContext(),!this.ctx))return;[523.25,659.25,783.99,1046.5,1318.51,1567.98].forEach((n,c)=>{setTimeout(()=>{try{const e=this.ctx.createOscillator(),r=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(n,this.ctx.currentTime),r.gain.setValueAtTime(.12,this.ctx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.4),e.connect(r),r.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.4)}catch{}},c*70)})}}const Q=new It;class at{static renderBall(t,n={}){const{size:c="medium",status:e="neutral",isMatched:r=!1,delay:d=0,showBadge:m=!1,clickable:i=!1,selected:l=!1}=n,o=t<10?`0${t}`:`${t}`,a=d>0?`animation-delay: ${d}ms;`:"";return`
      <div class="lotto-ball size-${c} status-${e} ${r?"matched-ball":""} ${i?"clickable-ball":""} ${l?"selected-ball":""}" 
           data-number="${t}" 
           style="${a}">
        <div class="ball-inner">
          <span class="ball-number">${o}</span>
          <div class="ball-gloss"></div>
          <div class="ball-shadow"></div>
        </div>
        ${m?`<span class="ball-badge badge-${e}">${e.toUpperCase()}</span>`:""}
      </div>
    `}static renderBallRow(t,n={}){const{size:c="medium",bonus:e=null,statsEngine:r=null,matchedNumbers:d=[],animated:m=!1,staggerDelay:i=80}=n,l=[...t].sort((a,h)=>a-h);let o='<div class="balls-row">';if(l.forEach((a,h)=>{let p="neutral";if(r){const f=r.getNumberStat(a);f&&(p=f.status)}const g=d.includes(a),y=m?h*i:0;o+=this.renderBall(a,{size:c,status:p,isMatched:g,delay:y})}),e!=null){const a=m?l.length*i:0;o+=`
        <div class="bonus-separator">+</div>
        ${this.renderBall(e,{size:c,status:"bonus",delay:a,isMatched:d.includes(e)})}
      `}return o+="</div>",o}static renderInteractiveGrid(t,n,c,e,r,d){let m='<div class="interactive-number-grid">';for(let i=t;i<=n;i++){const l=c.has(i),o=e.has(i),a=r?r.getNumberStat(i):null,h=a?a.status:"neutral";let p="";l?p="state-selected":o&&(p="state-blacklisted"),m+=`
        <button type="button" class="grid-number-btn ${p} status-${h}" data-num="${i}" title="Number ${i} (Count: ${a?a.count:0})">
          <span class="btn-num">${i<10?"0"+i:i}</span>
          ${a?`<span class="btn-sub">${a.count}x</span>`:""}
        </button>
      `}return m+="</div>",m}}class rt{static renderFrequencyChart(t,n){const c=document.getElementById(t);if(!c)return;const e=c.getContext("2d"),r=window.devicePixelRatio||1,d=c.getBoundingClientRect();c.width=d.width*r,c.height=d.height*r,e.scale(r,r);const m=d.width,i=d.height;e.clearRect(0,0,m,i);const l=n.stats;if(!l||!l.numberStats.length)return;const o=l.numberStats,a={top:30,right:20,bottom:40,left:40},h=m-a.left-a.right,p=i-a.top-a.bottom,g=Math.max(...o.map(T=>T.count),l.avgFrequency*1.3,10),y=h/o.length,f=Math.max(4,y*.7);e.strokeStyle="rgba(255, 255, 255, 0.06)",e.lineWidth=1;const E=5;e.fillStyle="rgba(255, 255, 255, 0.4)",e.font='11px "JetBrains Mono", monospace',e.textAlign="right";for(let T=0;T<=E;T++){const z=Math.round(g/E*T),A=a.top+p-z/g*p;e.beginPath(),e.moveTo(a.left,A),e.lineTo(m-a.right,A),e.stroke(),e.fillText(z,a.left-8,A+4)}const I=a.top+p-l.avgFrequency/g*p;e.strokeStyle="rgba(245, 158, 11, 0.6)",e.setLineDash([4,4]),e.beginPath(),e.moveTo(a.left,I),e.lineTo(m-a.right,I),e.stroke(),e.setLineDash([]),e.fillStyle="#F59E0B",e.textAlign="left",e.fillText(`Avg: ${l.avgFrequency}`,m-a.right-65,I-6),o.forEach((T,z)=>{const A=a.left+z*y+(y-f)/2,$=T.count/g*p,_=a.top+p-$,q=e.createLinearGradient(0,_,0,_+$);T.status==="hot"?(q.addColorStop(0,"#EF4444"),q.addColorStop(1,"#F59E0B")):T.status==="cold"?(q.addColorStop(0,"#06B6D4"),q.addColorStop(1,"#3B82F6")):T.status==="warm"?(q.addColorStop(0,"#10B981"),q.addColorStop(1,"#059669")):(q.addColorStop(0,"#6366F1"),q.addColorStop(1,"#4338CA")),e.fillStyle=q,e.beginPath();const V=Math.min(3,f/2);e.roundRect(A,_,f,Math.max($,2),[V,V,0,0]),e.fill(),(o.length<=50||z%2===0)&&(e.fillStyle="rgba(255, 255, 255, 0.6)",e.font='10px "JetBrains Mono", monospace',e.textAlign="center",e.fillText(T.number,A+f/2,i-a.bottom+16))})}static renderSumBellCurve(t,n){const c=document.getElementById(t);if(!c)return;const e=c.getContext("2d"),r=window.devicePixelRatio||1,d=c.getBoundingClientRect();c.width=d.width*r,c.height=d.height*r,e.scale(r,r);const m=d.width,i=d.height;e.clearRect(0,0,m,i);const l=n.stats;if(!l||!n.draws.length)return;const o={top:25,right:25,bottom:35,left:35},a=m-o.left-o.right,h=i-o.top-o.bottom,p=n.minNumber*n.pickCount,g=n.maxNumber*n.pickCount,y=10,f={};for(let P=Math.floor(p/y)*y;P<=g;P+=y)f[P]=0;n.draws.forEach(P=>{const b=P.numbers.reduce((R,W)=>R+W,0),M=Math.floor(b/y)*y;f[M]=(f[M]||0)+1});const E=Object.keys(f).map(Number).sort((P,b)=>P-b),I=Math.max(...Object.values(f),5),T=l.sums.sweetspotRange,z=o.left+(T[0]-p)/(g-p)*a,A=o.left+(T[1]-p)/(g-p)*a,$=e.createLinearGradient(z,0,A,0);$.addColorStop(0,"rgba(16, 185, 129, 0.05)"),$.addColorStop(.5,"rgba(16, 185, 129, 0.18)"),$.addColorStop(1,"rgba(16, 185, 129, 0.05)"),e.fillStyle=$,e.fillRect(z,o.top,A-z,h),e.strokeStyle="rgba(16, 185, 129, 0.4)",e.setLineDash([3,3]),e.beginPath(),e.moveTo(z,o.top),e.lineTo(z,i-o.bottom),e.moveTo(A,o.top),e.lineTo(A,i-o.bottom),e.stroke(),e.setLineDash([]),e.fillStyle="#10B981",e.font="11px Outfit, sans-serif",e.textAlign="center",e.fillText(`Sweetspot Range: ${T[0]} - ${T[1]}`,(z+A)/2,o.top+14);const _=a/E.length;E.forEach((P,b)=>{const R=f[P]/I*(h-30),W=o.left+b*_+2,J=i-o.bottom-R;e.fillStyle=P>=T[0]&&P<=T[1]?"rgba(59, 130, 246, 0.7)":"rgba(99, 102, 241, 0.4)",e.fillRect(W,J,Math.max(1,_-4),R)}),e.strokeStyle="#F59E0B",e.lineWidth=2.5,e.beginPath();const q=l.sums.average,V=l.sums.stdDev||25;for(let P=0;P<=a;P+=4){const b=p+P/a*(g-p),M=-Math.pow(b-q,2)/(2*Math.pow(V,2)),R=Math.exp(M),W=i-o.bottom-R*(h-30);P===0?e.moveTo(o.left+P,W):e.lineTo(o.left+P,W)}e.stroke(),e.fillStyle="rgba(255, 255, 255, 0.5)",e.font='10px "JetBrains Mono", monospace',e.textAlign="center",e.fillText(`${p}`,o.left,i-10),e.fillText(`Mean: ${Math.round(q)}`,o.left+(q-p)/(g-p)*a,i-10),e.fillText(`${g}`,m-o.right,i-10)}static renderHeatmapGrid(t,n,c){const e=document.getElementById(t);if(!e)return;const r=n.stats;if(!r)return;const d=Math.max(...r.numberStats.map(l=>l.count),1),m=Math.min(...r.numberStats.map(l=>l.count),0);let i='<div class="heatmap-matrix-grid">';r.numberStats.forEach(l=>{const o=(l.count-m)/(d-m||1),a=l.number<10?`0${l.number}`:`${l.number}`;i+=`
        <div class="heatmap-cell status-${l.status}" data-num="${l.number}" style="--intensity: ${o.toFixed(2)}">
          <div class="cell-top">
            <span class="cell-num">${a}</span>
            <span class="cell-badge">${l.status[0].toUpperCase()}</span>
          </div>
          <div class="cell-bottom">
            <span class="cell-count">${l.count} draws</span>
            <span class="cell-gap">${l.gap}d gap</span>
          </div>
        </div>
      `}),i+="</div>",e.innerHTML=i,c&&e.querySelectorAll(".heatmap-cell").forEach(l=>{l.addEventListener("click",()=>{const o=parseInt(l.getAttribute("data-num"));c(o)})})}static renderParityBreakdown(t,n){const c=document.getElementById(t);if(!c)return;const e=n.stats;if(!e)return;const r=e.totalDraws||1,d=e.oddEvenCounts,m=e.highLowCounts;let i=`
      <div class="distribution-cards-grid">
        <div class="dist-card">
          <div class="dist-card-header">
            <h4>Odd / Even Ratio Distribution</h4>
            <span class="dist-tag">Historical Balance</span>
          </div>
          <div class="dist-bars-list">
    `;Object.entries(d).forEach(([l,o])=>{const a=(o/r*100).toFixed(1),h=l==="3:3"||l==="4:2"||l==="2:4";i+=`
        <div class="dist-row ${h?"optimal-row":""}">
          <div class="dist-label-col">
            <span class="dist-key">${l.split(":")[0]} Odd / ${l.split(":")[1]} Even</span>
            ${h?'<span class="optimal-pill">Golden</span>':""}
          </div>
          <div class="dist-bar-wrapper">
            <div class="dist-bar-fill" style="width: ${a}%"></div>
          </div>
          <span class="dist-pct">${a}% <small>(${o})</small></span>
        </div>
      `}),i+=`
          </div>
        </div>
        <div class="dist-card">
          <div class="dist-card-header">
            <h4>Low / High Ratio Distribution</h4>
            <span class="dist-tag">1-${n.midPoint} vs ${n.midPoint+1}-${n.maxNumber}</span>
          </div>
          <div class="dist-bars-list">
    `,Object.entries(m).forEach(([l,o])=>{const a=(o/r*100).toFixed(1),h=l==="3:3"||l==="4:2"||l==="2:4";i+=`
        <div class="dist-row ${h?"optimal-row":""}">
          <div class="dist-label-col">
            <span class="dist-key">${l.split(":")[0]} Low / ${l.split(":")[1]} High</span>
            ${h?'<span class="optimal-pill">Golden</span>':""}
          </div>
          <div class="dist-bar-wrapper">
            <div class="dist-bar-fill highlow-fill" style="width: ${a}%"></div>
          </div>
          <span class="dist-pct">${a}% <small>(${o})</small></span>
        </div>
      `}),i+=`
          </div>
        </div>
      </div>
    `,c.innerHTML=i}}class Pt{constructor(t,n,c){this.draws=t||[],this.config=n,this.onDataChange=c,this.currentPage=1,this.pageSize=12,this.searchQuery=""}updateData(t,n){this.draws=t||[],n&&(this.config=n),this.currentPage=1,this.render()}render(){const t=document.getElementById("history-table-container");if(!t)return;let n=this.draws;if(this.searchQuery){const i=this.searchQuery.toLowerCase();n=this.draws.filter(l=>{const o=l.numbers.some(p=>p.toString()===i),a=l.date&&l.date.includes(i),h=l.drawNumber&&l.drawNumber.toString().includes(i);return o||a||h})}const c=n.length,e=Math.max(1,Math.ceil(c/this.pageSize));this.currentPage>e&&(this.currentPage=e);const r=(this.currentPage-1)*this.pageSize,d=n.slice(r,r+this.pageSize);let m=`
      <div class="history-controls-bar">
        <div class="history-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="history-search-input" placeholder="Search by number (e.g. 17), date, or draw #..." value="${this.searchQuery}">
          ${this.searchQuery?'<button id="clear-search-btn" class="clear-btn">&times;</button>':""}
        </div>
        <div class="history-actions-group">
          <button class="btn btn-outline" id="btn-open-add-draw">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Winning Draw
          </button>
          <button class="btn btn-outline" id="btn-open-import">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Import CSV/JSON
          </button>
          <button class="btn btn-outline" id="btn-export-csv">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Export
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="history-table">
          <thead>
            <tr>
              <th>Draw #</th>
              <th>Date</th>
              <th>Winning Numbers</th>
              ${this.config.hasBonus?`<th>${this.config.bonusName||"Bonus"}</th>`:""}
              <th>Sum</th>
              <th>Odd / Even</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;d.length===0?m+=`
        <tr>
          <td colspan="7" class="empty-table-cell">
            <div class="empty-state">
              <p>No historical draws match your search criteria.</p>
            </div>
          </td>
        </tr>
      `:d.forEach((i,l)=>{const o=i.numbers.reduce((p,g)=>p+g,0),a=i.numbers.filter(p=>p%2!==0).length,h=i.numbers.length-a;m+=`
          <tr>
            <td class="draw-col"><strong>#${i.drawNumber}</strong></td>
            <td class="date-col">${i.date}</td>
            <td class="numbers-col">
              ${at.renderBallRow(i.numbers,{size:"small"})}
            </td>
            ${this.config.hasBonus?`
              <td class="bonus-col">
                ${i.bonus?at.renderBall(i.bonus,{size:"small",status:"bonus"}):"-"}
              </td>
            `:""}
            <td class="sum-col"><span class="sum-badge">${o}</span></td>
            <td class="parity-col"><span class="parity-badge">${a}O / ${h}E</span></td>
            <td class="actions-col">
              <button class="icon-action-btn delete-draw-btn" data-drawnum="${i.drawNumber}" title="Delete Draw">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </td>
          </tr>
        `}),m+=`
          </tbody>
        </table>
      </div>

      <div class="history-pagination">
        <span class="pagination-info">Showing ${c===0?0:r+1} - ${Math.min(r+this.pageSize,c)} of ${c} draws</span>
        <div class="pagination-buttons">
          <button class="btn-page" id="btn-prev-page" ${this.currentPage===1?"disabled":""}>&larr; Prev</button>
          <span class="page-current">Page ${this.currentPage} of ${e}</span>
          <button class="btn-page" id="btn-next-page" ${this.currentPage===e?"disabled":""}>Next &rarr;</button>
        </div>
      </div>
    `,t.innerHTML=m,this.attachEventListeners()}attachEventListeners(){const t=document.getElementById("history-search-input");t&&t.addEventListener("input",i=>{this.searchQuery=i.target.value.trim(),this.currentPage=1,this.render();const l=document.getElementById("history-search-input");l&&(l.focus(),l.setSelectionRange(this.searchQuery.length,this.searchQuery.length))});const n=document.getElementById("clear-search-btn");n&&n.addEventListener("click",()=>{this.searchQuery="",this.render()});const c=document.getElementById("btn-prev-page");c&&c.addEventListener("click",()=>{this.currentPage>1&&(this.currentPage--,this.render())});const e=document.getElementById("btn-next-page");e&&e.addEventListener("click",()=>{const i=Math.ceil(this.draws.length/this.pageSize);this.currentPage<i&&(this.currentPage++,this.render())}),document.querySelectorAll(".delete-draw-btn").forEach(i=>{i.addEventListener("click",()=>{const l=parseInt(i.getAttribute("data-drawnum"));this.draws=this.draws.filter(o=>o.drawNumber!==l),this.onDataChange&&this.onDataChange(this.draws),this.render()})});const r=document.getElementById("btn-open-add-draw");r&&r.addEventListener("click",()=>this.openAddModal());const d=document.getElementById("btn-open-import");d&&d.addEventListener("click",()=>this.openImportModal());const m=document.getElementById("btn-export-csv");m&&m.addEventListener("click",()=>this.exportCSV())}openAddModal(){var d;const t=document.getElementById("add-draw-modal");if(!t)return;const n=document.getElementById("add-draw-date");n&&(n.value=new Date().toISOString().split("T")[0]);const c=(((d=this.draws[0])==null?void 0:d.drawNumber)||1e3)+1,e=document.getElementById("add-draw-number");e&&(e.value=c);for(let m=1;m<=6;m++){const i=document.getElementById(`add-ball-${m}`);i&&(i.value="")}const r=document.getElementById("add-ball-bonus");r&&(r.value=""),t.classList.add("active")}saveNewDraw(){var i,l;const t=document.getElementById("add-draw-number"),n=document.getElementById("add-draw-date"),c=parseInt(t==null?void 0:t.value)||(((i=this.draws[0])==null?void 0:i.drawNumber)||1e3)+1,e=(n==null?void 0:n.value)||new Date().toISOString().split("T")[0],r=[];for(let o=1;o<=6;o++){const a=document.getElementById(`add-ball-${o}`),h=parseInt(a==null?void 0:a.value);if(isNaN(h)||h<this.config.minNumber||h>this.config.maxNumber){alert(`Ball ${o} must be a number between ${this.config.minNumber} and ${this.config.maxNumber}`);return}r.push(h)}if(new Set(r).size!==6){alert("All 6 winning numbers must be unique!");return}r.sort((o,a)=>o-a);let d=null;if(this.config.hasBonus){const o=document.getElementById("add-ball-bonus"),a=parseInt(o==null?void 0:o.value);isNaN(a)||(d=a)}const m={drawNumber:c,date:e,numbers:r,bonus:d,jackpot:"$15.0M",winners:0};this.draws.unshift(m),this.onDataChange&&this.onDataChange(this.draws),(l=document.getElementById("add-draw-modal"))==null||l.classList.remove("active"),this.render()}openImportModal(){const t=document.getElementById("import-draws-modal");t&&t.classList.add("active")}processImport(t){var n,c;if(!t.trim()){alert("Please paste CSV text or select a file.");return}try{if(t.trim().startsWith("[")){const r=JSON.parse(t);if(Array.isArray(r)&&r.length>0&&r[0].numbers){this.draws=r,this.onDataChange&&this.onDataChange(this.draws),(n=document.getElementById("import-draws-modal"))==null||n.classList.remove("active"),this.render();return}}const e=$t(t,this.config.maxNumber);e.length>0?(this.draws=e,this.onDataChange&&this.onDataChange(this.draws),(c=document.getElementById("import-draws-modal"))==null||c.classList.remove("active"),this.render()):alert("Could not detect valid winning draws. Please check the CSV format.")}catch(e){alert("Error parsing data: "+e.message)}}exportCSV(){let t=`DrawNumber,Date,Ball1,Ball2,Ball3,Ball4,Ball5,Ball6,Bonus
`;this.draws.forEach(r=>{t+=`${r.drawNumber},${r.date},${r.numbers.join(",")},${r.bonus||""}
`});const n=new Blob([t],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(n),e=document.createElement("a");e.setAttribute("href",c),e.setAttribute("download",`lottery_draws_${this.config.id}_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(e),e.click(),document.body.removeChild(e)}}class Rt{static renderResults(t,n,c){const e=document.getElementById(t);if(!e)return;if(n.error){e.innerHTML=`
        <div class="empty-state">
          <p class="error-text">${n.error}</p>
        </div>
      `;return}const r=lt[c]||{name:c},d=n.randomComparison,m=n.netProfit>=0,i=(n.winRate-d.winRate).toFixed(1),l=n.winRate>=d.winRate;let o=`
      <div class="backtest-summary-dashboard">
        <div class="backtest-metric-cards">
          <div class="bmetric-card">
            <span class="bmetric-title">Draws Tested</span>
            <div class="bmetric-val">${n.testedDraws}</div>
            <span class="bmetric-sub">Sliding historical training</span>
          </div>

          <div class="bmetric-card highlight-metric">
            <span class="bmetric-title">${r.name} Hit Rate (3+ Match)</span>
            <div class="bmetric-val color-cyan">${n.winRate}%</div>
            <span class="bmetric-sub ${l?"text-success":"text-danger"}">
              ${l?`+${i}% edge vs Random Quick Pick (${d.winRate}%)`:`${i}% vs Random (${d.winRate}%)`}
            </span>
          </div>

          <div class="bmetric-card">
            <span class="bmetric-title">Simulated Payout</span>
            <div class="bmetric-val color-gold">$${n.totalWinnings.toLocaleString()}</div>
            <span class="bmetric-sub">Cost: $${n.totalCost.toLocaleString()} | Random: $${d.winnings.toLocaleString()}</span>
          </div>

          <div class="bmetric-card">
            <span class="bmetric-title">Algorithm Net ROI</span>
            <div class="bmetric-val ${m?"color-emerald":"color-rose"}">${n.roi>0?"+":""}${n.roi}%</div>
            <span class="bmetric-sub">${m?"Simulated Positive Return":"Simulated Return on Stake"}</span>
          </div>
        </div>

        <!-- Match Distribution Comparison -->
        <div class="backtest-distribution-panel">
          <div class="dist-header">
            <h4>Historical Match Distribution vs Pure Random Quick-Pick</h4>
            <span class="dist-badge">Statistical Benchmark</span>
          </div>

          <div class="match-bars-container">
    `;for(let a=6;a>=0;a--){const h=n.matchDistribution[a]||0,p=d.matchDistribution[a]||0,g=(h/(n.totalTickets||1)*100).toFixed(1),y=(p/(n.totalTickets||1)*100).toFixed(1),f=Math.max(h,p,1);Math.min(100,f/(n.totalTickets||1)*120),o+=`
        <div class="match-dist-row">
          <div class="match-badge-col">
            <span class="match-count-tag match-${a}">${a} of 6 Matches</span>
            ${a>=3?'<span class="prize-tag">Prize</span>':""}
          </div>
          
          <div class="match-comparison-bars">
            <!-- Algorithm Bar -->
            <div class="comp-bar-item">
              <span class="comp-label algo-label">AI Algorithm</span>
              <div class="comp-bar-track">
                <div class="comp-bar-fill fill-algo" style="width: ${Math.min(100,Math.max(g*2.5,4))}%"></div>
              </div>
              <span class="comp-val">${h} (${g}%)</span>
            </div>

            <!-- Random Bar -->
            <div class="comp-bar-item">
              <span class="comp-label rand-label">Pure Random</span>
              <div class="comp-bar-track">
                <div class="comp-bar-fill fill-rand" style="width: ${Math.min(100,Math.max(y*2.5,4))}%"></div>
              </div>
              <span class="comp-val">${p} (${y}%)</span>
            </div>
          </div>
        </div>
      `}o+=`
          </div>
        </div>

        <!-- Timeline Table of Test Draws -->
        <div class="backtest-timeline-panel">
          <div class="timeline-header">
            <h4>Sample Historical Backtest Logs (Last ${n.timeline.length} Test Draws)</h4>
          </div>
          <div class="table-responsive">
            <table class="timeline-table">
              <thead>
                <tr>
                  <th>Draw #</th>
                  <th>Date</th>
                  <th>Actual Winning Numbers</th>
                  <th>Algorithm Predicted Numbers</th>
                  <th>Matches</th>
                  <th>Prize Won</th>
                </tr>
              </thead>
              <tbody>
    `,n.timeline.forEach(a=>{const h=a.matches>=3?"high-match":a.matches>0?"low-match":"no-match";o+=`
        <tr>
          <td><strong>#${a.drawNumber}</strong></td>
          <td>${a.date}</td>
          <td>
            ${at.renderBallRow(a.actualWinning,{size:"small"})}
          </td>
          <td>
            ${at.renderBallRow(a.predicted,{size:"small",matchedNumbers:a.actualWinning})}
          </td>
          <td>
            <span class="match-pill ${h}">${a.matches} / 6</span>
          </td>
          <td>
            ${a.prize>0?`<span class="won-prize-badge">+$${a.prize.toLocaleString()}</span>`:'<span class="text-muted">-</span>'}
          </td>
        </tr>
      `}),o+=`
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,e.innerHTML=o}}class Lt{constructor(t,n){this.config=t,this.onSaveChange=n,this.savedTickets=this.loadSavedTickets()}loadSavedTickets(){try{const t=localStorage.getItem(`lotto_saved_${this.config.id}`);return t?JSON.parse(t):[]}catch{return[]}}persistSavedTickets(){try{localStorage.setItem(`lotto_saved_${this.config.id}`,JSON.stringify(this.savedTickets))}catch{}}updateConfig(t){this.config=t,this.savedTickets=this.loadSavedTickets(),this.render()}saveTicket(t){return this.savedTickets.some(c=>c.numbers.join(",")===t.numbers.join(","))?!1:(this.savedTickets.unshift(t),this.persistSavedTickets(),this.onSaveChange&&this.onSaveChange(this.savedTickets),this.render(),!0)}removeTicket(t){this.savedTickets=this.savedTickets.filter(n=>n.id!==t),this.persistSavedTickets(),this.onSaveChange&&this.onSaveChange(this.savedTickets),this.render()}clearAll(){this.savedTickets=[],this.persistSavedTickets(),this.onSaveChange&&this.onSaveChange(this.savedTickets),this.render()}render(t=null){const n=document.getElementById("saved-tickets-container");if(!n)return;if(this.savedTickets.length===0){n.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon">🎟️</div>
          <h3>No Saved Tickets Yet</h3>
          <p>Generate predictions in the Oracle Predictor and click "Save Ticket" to build your winning portfolio.</p>
        </div>
      `;return}let c=`
      <div class="portfolio-controls-bar">
        <div class="portfolio-summary">
          <span class="portfolio-count"><strong>${this.savedTickets.length}</strong> Saved Tickets</span>
        </div>
        <div class="portfolio-actions">
          <button class="btn btn-outline" id="btn-print-slip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Play Slip
          </button>
          <button class="btn btn-outline" id="btn-copy-all-tickets">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Numbers
          </button>
          <button class="btn btn-danger-outline" id="btn-clear-saved">Clear All</button>
        </div>
      </div>

      <div class="saved-tickets-grid">
    `;this.savedTickets.forEach((e,r)=>{var l,o,a;let d=0,m=[],i=null;if(t&&t.numbers){m=e.numbers.filter(p=>t.numbers.includes(p)),d=m.length;const h=dt.find(p=>p.match===d);h&&h.payout>0&&(i=h)}c+=`
        <div class="saved-ticket-card ${d>=3?"card-winning-match":""}">
          <div class="stkt-header">
            <div class="stkt-id-badge">
              <span class="stkt-line-num">Line ${r+1}</span>
              <span class="stkt-algo-tag">${e.algorithm||"AI Ensemble"}</span>
            </div>
            <button class="btn-remove-ticket" data-id="${e.id}" title="Remove Ticket">&times;</button>
          </div>

          <div class="stkt-balls-body">
            ${at.renderBallRow(e.numbers,{size:"medium",matchedNumbers:m})}
          </div>

          <div class="stkt-meta-footer">
            <div class="stkt-stats">
              <span class="stkt-stat-item">Sum: <strong>${((l=e.analysis)==null?void 0:l.sum)||e.numbers.reduce((h,p)=>h+p,0)}</strong></span>
              <span class="stkt-stat-item">Parity: <strong>${((o=e.analysis)==null?void 0:o.parityRatio)||"3O/3E"}</strong></span>
              <span class="stkt-stat-item">Score: <strong>${((a=e.analysis)==null?void 0:a.confidenceScore)||85}%</strong></span>
            </div>

            ${t?`
              <div class="stkt-match-result">
                <span class="match-badge-tag match-${d}">
                  ${d} / 6 Matches
                </span>
                ${i?`<span class="prize-tag-won">Won $${i.payout.toLocaleString()}!</span>`:""}
              </div>
            `:""}
          </div>
        </div>
      `}),c+="</div>",n.innerHTML=c,this.attachEventListeners()}attachEventListeners(){document.querySelectorAll(".btn-remove-ticket").forEach(e=>{e.addEventListener("click",r=>{const d=e.getAttribute("data-id");this.removeTicket(d)})});const t=document.getElementById("btn-clear-saved");t&&t.addEventListener("click",()=>{confirm("Are you sure you want to clear all saved tickets?")&&this.clearAll()});const n=document.getElementById("btn-copy-all-tickets");n&&n.addEventListener("click",()=>{const e=this.savedTickets.map((r,d)=>{var m;return`Line ${d+1}: ${r.numbers.join(", ")} (Sum: ${((m=r.analysis)==null?void 0:m.sum)||""})`}).join(`
`);navigator.clipboard.writeText(e).then(()=>{alert("Copied all tickets to clipboard!")})});const c=document.getElementById("btn-print-slip");c&&c.addEventListener("click",()=>this.openPrintSlipModal())}openPrintSlipModal(){const t=document.getElementById("print-slip-modal"),n=document.getElementById("print-slip-content");if(!t||!n)return;let c=`
      <div class="lottery-play-slip" id="printable-slip">
        <div class="slip-header">
          <div class="slip-title-block">
            <span class="slip-brand">LOTTO ORACLE AI</span>
            <h2 class="slip-lottery-name">${this.config.name}</h2>
            <span class="slip-country">${this.config.country}</span>
          </div>
          <div class="slip-barcode-stub">
            <div class="mock-barcode">||| | |||| | ||| || |||| | |||</div>
            <span class="slip-date">${new Date().toLocaleString()}</span>
          </div>
        </div>

        <div class="slip-divider"></div>

        <div class="slip-lines-list">
    `;this.savedTickets.forEach((e,r)=>{var d;c+=`
        <div class="slip-ticket-line">
          <span class="slip-line-id">LINE ${String.fromCharCode(65+r)}</span>
          <div class="slip-numbers">
            ${e.numbers.map(m=>`<span class="slip-num-bubble">${m<10?"0"+m:m}</span>`).join("")}
          </div>
          <div class="slip-line-meta">
            <span>SUM: ${((d=e.analysis)==null?void 0:d.sum)||e.numbers.reduce((m,i)=>m+i,0)}</span>
          </div>
        </div>
      `}),c+=`
        </div>

        <div class="slip-divider"></div>

        <div class="slip-footer">
          <div class="slip-security-qr">
            <div class="mock-qr-code">
              <div class="qr-pattern"></div>
            </div>
          </div>
          <div class="slip-legal">
            <p><strong>Generated for Statistical Play</strong></p>
            <p>Verify official lottery results with your local lottery commission.</p>
            <span class="slip-serial">ID: ${Date.now().toString(36).toUpperCase()}-SYS</span>
          </div>
        </div>
      </div>
    `,n.innerHTML=c,t.classList.add("active")}}class Dt{constructor(){this.currentPresetId="classic-649",this.config=ct[this.currentPresetId],this.draws=vt(this.currentPresetId),this.statsEngine=new bt(this.draws,this.config),this.predictionEngine=new yt(this.statsEngine,this.config),this.backtester=new Nt(this.draws,this.config),this.currentPrediction=null,this.currentTickets=[],this.parityPreference="any",this.historyManager=new Pt(this.draws,this.config,t=>{this.handleDrawsUpdated(t)}),this.ticketManager=new Lt(this.config,t=>{this.updateSavedBadge()}),this.init()}init(){this.bindEvents(),this.updateQuickStats(),this.renderCurrentPrediction(),this.renderAnalytics(),this.historyManager.render(),this.ticketManager.render(),this.populateCheckerDropdown(),this.updateSavedBadge(),setTimeout(()=>{this.runBacktest()},200),window.addEventListener("resize",()=>{document.getElementById("tab-analytics").classList.contains("active")&&this.renderAnalytics()})}bindEvents(){document.querySelectorAll(".tab-btn").forEach(g=>{g.addEventListener("click",()=>{const y=g.getAttribute("data-tab");this.switchTab(y),Q.playClick()})});const t=document.getElementById("lottery-preset-select");t&&t.addEventListener("change",g=>{this.changePreset(g.target.value),Q.playClick()});const n=document.getElementById("algo-select");n&&n.addEventListener("change",g=>{const y=lt[g.target.value];y&&(document.getElementById("algo-description").textContent=y.description),Q.playClick()}),document.querySelectorAll("#parity-pill-group .pill-btn").forEach(g=>{g.addEventListener("click",()=>{document.querySelectorAll("#parity-pill-group .pill-btn").forEach(y=>y.classList.remove("active")),g.classList.add("active"),this.parityPreference=g.getAttribute("data-val"),Q.playClick()})});const c=document.getElementById("ticket-count-slider"),e=document.getElementById("ticket-count-num");c&&e&&c.addEventListener("input",g=>{e.textContent=g.target.value});const r=document.getElementById("btn-generate-prediction");r&&r.addEventListener("click",()=>{this.generatePrediction()});const d=document.getElementById("btn-generate-wheel");d&&d.addEventListener("click",()=>{this.generateWheel()});const m=document.getElementById("btn-save-hero-ticket");m&&m.addEventListener("click",()=>{this.currentPrediction&&(this.ticketManager.saveTicket(this.currentPrediction)?(Q.playJackpot(),this.triggerConfetti(.4),alert("Ticket saved to portfolio!")):alert("Ticket is already in your portfolio!"))});const i=document.getElementById("btn-copy-hero-ticket");i&&i.addEventListener("click",()=>{if(this.currentPrediction){const g=this.currentPrediction.numbers.join(", ");navigator.clipboard.writeText(g).then(()=>{alert(`Copied numbers: ${g}`)})}});const l=document.getElementById("btn-toggle-sound");l&&(l.addEventListener("click",()=>{const g=Q.toggleMute();document.getElementById("sound-icon").textContent=g?"🔇":"🔊"}),document.getElementById("sound-icon").textContent=Q.isMuted?"🔇":"🔊");const o=document.getElementById("btn-run-backtest");o&&o.addEventListener("click",()=>{this.runBacktest()});const a=document.getElementById("btn-check-matches");a&&a.addEventListener("click",()=>{this.runTicketCheck()}),document.querySelectorAll("[data-close]").forEach(g=>{g.addEventListener("click",()=>{var f;const y=g.getAttribute("data-close");(f=document.getElementById(y))==null||f.classList.remove("active")})});const h=document.getElementById("btn-save-new-draw");h&&h.addEventListener("click",()=>{this.historyManager.saveNewDraw()});const p=document.getElementById("btn-process-import");p&&p.addEventListener("click",()=>{var y;const g=((y=document.getElementById("import-textarea"))==null?void 0:y.value)||"";this.historyManager.processImport(g)}),window.addEventListener("keydown",g=>{g.code==="Space"&&g.target===document.body&&(g.preventDefault(),this.generatePrediction())})}switchTab(t){var n,c;document.querySelectorAll(".tab-btn").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".tab-pane").forEach(e=>e.classList.remove("active")),(n=document.querySelector(`[data-tab="${t}"]`))==null||n.classList.add("active"),(c=document.getElementById(t))==null||c.classList.add("active"),t==="tab-analytics"&&setTimeout(()=>this.renderAnalytics(),50)}changePreset(t){ct[t]&&(this.currentPresetId=t,this.config=ct[t],this.draws=vt(t),this.statsEngine.updateData(this.draws,this.config),this.predictionEngine.update(this.statsEngine,this.config),this.backtester.updateData(this.draws,this.config),this.historyManager.updateData(this.draws,this.config),this.ticketManager.updateConfig(this.config),document.querySelectorAll(".modal-max-num").forEach(n=>{n.textContent=this.config.maxNumber}),this.updateQuickStats(),this.generatePrediction(!1),this.renderAnalytics(),this.populateCheckerDropdown(),this.runBacktest())}handleDrawsUpdated(t){this.draws=t,this.statsEngine.updateData(this.draws,this.config),this.predictionEngine.update(this.statsEngine,this.config),this.backtester.updateData(this.draws,this.config),this.updateQuickStats(),this.renderAnalytics(),this.populateCheckerDropdown()}updateQuickStats(){const t=this.statsEngine.stats||this.statsEngine.analyze();if(document.getElementById("stat-total-draws").textContent=t.totalDraws,document.getElementById("tab-draw-count").textContent=t.totalDraws,t.hotRanking.length>0){const n=t.hotRanking[0];document.getElementById("stat-hot-number").textContent=`#${n.number<10?"0"+n.number:n.number} (${n.count}x)`}if(t.coldRanking.length>0){const n=t.coldRanking[0];document.getElementById("stat-cold-number").textContent=`#${n.number<10?"0"+n.number:n.number} (${n.gap}d gap)`}t.sums&&t.sums.sweetspotRange&&(document.getElementById("stat-sum-range").textContent=`${t.sums.sweetspotRange[0]} - ${t.sums.sweetspotRange[1]}`)}parseInputNumbers(t){return!t||!t.trim()?[]:t.split(/[\s,;]+/).map(n=>parseInt(n.trim())).filter(n=>!isNaN(n)&&n>=this.config.minNumber&&n<=this.config.maxNumber)}generatePrediction(t=!0){var m,i,l,o;const n=((m=document.getElementById("algo-select"))==null?void 0:m.value)||"quantum-ensemble",c=parseInt((i=document.getElementById("ticket-count-slider"))==null?void 0:i.value)||1,e=this.parseInputNumbers((l=document.getElementById("must-include-input"))==null?void 0:l.value),r=this.parseInputNumbers((o=document.getElementById("blacklist-input"))==null?void 0:o.value),d=this.predictionEngine.generateTickets({algorithm:n,ticketCount:c,mustInclude:e,blacklist:r,parityPreference:this.parityPreference});this.currentTickets=d,this.currentPrediction=d[0],t?this.animateBallDrawSequence(d[0]):this.renderCurrentPrediction()}generateWheel(){const t=this.predictionEngine.generateWheeledTickets(10,5);this.currentTickets=t.tickets,this.currentPrediction=t.tickets[0],Q.playJackpot(),this.triggerConfetti(.6),this.renderCurrentPrediction()}animateBallDrawSequence(t){const n=document.getElementById("hero-balls-display");n&&(n.innerHTML=`
      <div class="balls-row">
        ${t.numbers.map((c,e)=>`
          <div class="lotto-ball size-hero status-neutral animate-pop" style="animation-delay: ${e*60}ms;">
            <div class="ball-inner">
              <span class="ball-number">?</span>
              <div class="ball-gloss"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `,t.numbers.forEach((c,e)=>{setTimeout(()=>{Q.playRollTick()},e*70),setTimeout(()=>{Q.playBallPop(e),e===t.numbers.length-1&&(this.renderCurrentPrediction(),t.analysis.confidenceScore>=88&&this.triggerConfetti(.5))},350+e*120)}))}renderCurrentPrediction(){if(!this.currentPrediction){this.generatePrediction(!1);return}const t=this.currentPrediction,n=lt[t.algorithm]||{name:t.algorithm},c=document.getElementById("stage-algo-title");c&&(c.textContent=n.name);const e=document.getElementById("stage-confidence-text");e&&(e.textContent=`${t.analysis.confidenceScore}% Optimal Fitness Score`);const r=document.getElementById("hero-balls-display");r&&(r.innerHTML=at.renderBallRow(t.numbers,{size:"hero",statsEngine:this.statsEngine,animated:!0}));const d=document.getElementById("breakdown-metrics-pills");d&&(d.innerHTML=`
        <div class="metric-pill">
          <span class="metric-pill-title">Ticket Sum:</span>
          <span class="metric-pill-value mono-font">${t.analysis.sum} (${t.analysis.sumRating})</span>
        </div>
        <div class="metric-pill">
          <span class="metric-pill-title">Parity:</span>
          <span class="metric-pill-value mono-font">${t.analysis.parityRatio}</span>
        </div>
        <div class="metric-pill">
          <span class="metric-pill-title">High / Low:</span>
          <span class="metric-pill-value mono-font">${t.analysis.highLowRatio}</span>
        </div>
        <div class="metric-pill">
          <span class="metric-pill-title">Deltas:</span>
          <span class="metric-pill-value mono-font">${t.analysis.deltas.join(", ")}</span>
        </div>
      `);const m=document.getElementById("breakdown-rationale-list");m&&(m.innerHTML=t.analysis.rationales.map(l=>`
        <div class="rationale-item">
          <svg class="rationale-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${l}</span>
        </div>
      `).join(""));const i=document.getElementById("multi-lines-container");if(i)if(this.currentTickets.length>1){i.style.display="flex";let l="<h4>Additional Generated Combinations:</h4>";this.currentTickets.slice(1).forEach((o,a)=>{l+=`
            <div class="gen-ticket-row">
              <span class="line-tag">Line ${a+2}</span>
              ${at.renderBallRow(o.numbers,{size:"medium",statsEngine:this.statsEngine})}
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-outline btn-save-sub-tkt" data-idx="${a+1}">Save</button>
              </div>
            </div>
          `}),i.innerHTML=l,i.querySelectorAll(".btn-save-sub-tkt").forEach(o=>{o.addEventListener("click",()=>{const a=parseInt(o.getAttribute("data-idx")),h=this.currentTickets[a];h&&(this.ticketManager.saveTicket(h),Q.playJackpot(),alert("Line saved to portfolio!"))})})}else i.style.display="none"}renderAnalytics(){rt.renderFrequencyChart("frequency-bar-canvas",this.statsEngine),rt.renderSumBellCurve("sum-bell-canvas",this.statsEngine),rt.renderHeatmapGrid("heatmap-grid-container",this.statsEngine,t=>{const n=this.statsEngine.getNumberStat(t);alert(`Number #${t}
Draw Count: ${n.count} times
Percentage: ${n.percentage}%
Last seen: ${n.gap} draws ago
Momentum: ${n.momentum}
Status: ${n.status.toUpperCase()}`)}),rt.renderParityBreakdown("parity-breakdown-container",this.statsEngine)}runBacktest(){var e,r;const t=((e=document.getElementById("backtest-algo-select"))==null?void 0:e.value)||"quantum-ensemble",n=parseInt((r=document.getElementById("backtest-draws-count"))==null?void 0:r.value)||50,c=this.backtester.runBacktest({algorithm:t,testDrawsCount:n});Rt.renderResults("backtest-results-container",c,t)}populateCheckerDropdown(){const t=document.getElementById("checker-draw-select");if(!t)return;let n="";this.draws.slice(0,30).forEach(c=>{n+=`<option value="${c.drawNumber}">Draw #${c.drawNumber} (${c.date}) - [${c.numbers.join(", ")}]</option>`}),t.innerHTML=n}runTicketCheck(){const t=document.getElementById("checker-draw-select"),n=parseInt(t==null?void 0:t.value),c=this.draws.find(e=>e.drawNumber===n);c&&(this.ticketManager.render(c),Q.playJackpot(),this.triggerConfetti(.4))}updateSavedBadge(){const t=document.getElementById("saved-tickets-badge");t&&(t.textContent=this.ticketManager.savedTickets.length)}triggerConfetti(t=.5){try{Tt({particleCount:Math.round(70*t),spread:60,origin:{y:.65},colors:["#F59E0B","#06B6D4","#8B5CF6","#10B981"]})}catch{}}}window.addEventListener("DOMContentLoaded",()=>{window.app=new Dt});
