/* Manage Automation — animated diagrams.
   Each block runs only when its target element exists on the current page. */
(function(){
const NS='http://www.w3.org/2000/svg';
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;};
const tx=(p,x,y,s,a)=>{const t=el('text',Object.assign({x,y},a||{}),p);t.textContent=s;return t;};
let tmr=null;const reduce=false; // animations always on (Windows 'animation effects off' was disabling them)
function prep(path,dur,delay){const L=path.getTotalLength();path.classList.add('draw');path.style.setProperty('--len',L);if(dur)path.style.setProperty('--dur',dur+'s');if(delay!=null)path.style.setProperty('--delay',delay+'s');}
function replay(svg){if(reduce)return;svg.classList.remove('play');void svg.getBoundingClientRect();svg.classList.add('play');}
const star=(cx,cy,R,r)=>{let p='';for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r:R;p+=(k?'L':'M')+(cx+rr*Math.cos(a)).toFixed(1)+' '+(cy+rr*Math.sin(a)).toFixed(1);}return p+'Z';};
let seed=11;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
const B='#007BFF',BD='#005DA2',BL='#5897FB',AM='#F5A623',RD='#E5484D',GR='#B7C6D8';
function dotsOn(svg,paths,dur){if(reduce)return;paths.forEach((d,i)=>{const c=el('circle',{r:4,fill:B},svg);const m=el('animateMotion',{dur:dur+'s',repeatCount:'indefinite',path:d,begin:(i*dur/paths.length)+'s'},c);});}

/* hero */
if(document.getElementById('heroArt')){
const h=document.getElementById('heroArt');
for(let i=0;i<34;i++){const up=i%2===0,y=up?40+rnd()*190:330+rnd()*160,x=170+rnd()*280;
  const p=el('path',{d:`M40 280C${110+rnd()*50} 280 ${x-70-rnd()*60} ${y+(up?50:-50)*rnd()} ${x} ${y}`,stroke:'#8FA8C6','stroke-opacity':(.35+rnd()*.35).toFixed(2),'stroke-width':1.4,fill:'none'},h);prep(p,1.1,.1+i*.025);
  if(i%5===0)el('path',{d:`M${x-4} ${y-4}l8 8m0-8l-8 8`,stroke:RD,'stroke-width':1.8,'stroke-linecap':'round'},h);else el('circle',{cx:x,cy:y,r:2.6,fill:'#8FA8C6'},h);}
el('circle',{cx:560,cy:280,r:78,fill:AM,'fill-opacity':.08},h);el('circle',{cx:560,cy:280,r:52,fill:AM,'fill-opacity':.16,class:'pulse'},h);
el('path',{d:'M40 280H530',stroke:B,'stroke-opacity':.16,'stroke-width':14,'stroke-linecap':'round'},h);
prep(el('path',{d:'M40 280H530',stroke:B,'stroke-width':4,'stroke-linecap':'round'},h),1.6,1.1);
for(let i=0;i<7;i++){const x=100+i*62;el('circle',{cx:x,cy:280,r:12,fill:'#fff',stroke:B,'stroke-width':2.2},h);tx(h,x,284,i+1,{'text-anchor':'middle','font-size':11,fill:BD});}
el('path',{d:star(560,280,30,13),fill:AM},h);
el('circle',{cx:40,cy:280,r:9,fill:BD},h);el('circle',{cx:40,cy:280,r:16,fill:'none',stroke:BD,'stroke-opacity':.3,'stroke-width':1.5},h);
tx(h,24,312,'IDEA',{'font-size':12,fill:BD,'letter-spacing':1.2});tx(h,560,226,'YOUR TARGET',{'font-size':12,fill:'#B7791F','text-anchor':'middle','letter-spacing':1.2});
tx(h,170,22,'1,000,000,000 POSSIBLE ROUTES',{'font-size':12,fill:'#5B6B82','letter-spacing':1.2});tx(h,100,318,'ONE PROVEN PATH · 7 CONTROL GATES',{'font-size':12,fill:B,'letter-spacing':1.2});
replay(h);
const ioH=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)replay(h);}),{threshold:.3});ioH.observe(h);
}

/* options chart */
if(document.getElementById('options')){
const o=document.getElementById('options');
const cols=[['Suppliers','×10','Siemens\nRockwell · Omron'],['Application','×10²','Fans · Pumps\nRobots'],['Products','×10³','Async · Sync\nDanfoss · ABB'],['Specs','×10⁴','Linear · Ratio\nLevel · Interval'],['Frameworks','×10⁵','Step by step\nper OEM'],['Methods','×10⁶','PackML · S88\nBatch'],['Software','×10⁷','Drive SW\nParameters'],['Control','×10⁸','Touch panel\nButtons'],['Commission','×10⁹','Checklists\nRecipes']];
const X0=20,CW=76,GAP=26,Y0=90,RH=28,ROWS=10,GY=Y0+3*RH,END=X0+9*(CW+GAP)+16;
cols.forEach((c,i)=>{const x=X0+i*(CW+GAP);tx(o,x+CW/2,30,c[1],{'text-anchor':'middle',class:'mult'});tx(o,x+CW/2,56,c[0],{'text-anchor':'middle',class:'hd'});
  for(let r=0;r<ROWS;r++)el('line',{x1:x,x2:x+CW,y1:Y0+r*RH,y2:Y0+r*RH,class:'ol'},o);
  c[2].split('\n').forEach((s,k)=>tx(o,x+CW/2,Y0+ROWS*RH+22+k*15,s,{'text-anchor':'middle',class:'ex'}));});
tx(o,985,30,'1 billion',{class:'mult','text-anchor':'middle'});tx(o,985,56,'options',{class:'hd','text-anchor':'middle'});
el('line',{x1:END,x2:975,y1:GY,y2:GY,stroke:'#C9D6E6','stroke-width':2,'stroke-dasharray':'4 5'},o);
el('circle',{cx:1005,cy:GY,r:34,fill:AM,'fill-opacity':.18,class:'pulse'},o);el('path',{d:star(1005,GY,24,10.5),fill:AM},o);tx(o,1005,GY+50,'Vision',{'text-anchor':'middle',class:'goal'});
function routeD(rows,fy){let d=`M${X0} ${Y0+rows[0]*RH}`;rows.forEach((r,i)=>{const x=X0+i*(CW+GAP),y=Y0+r*RH;d+=` H${x+CW}`;const ny=i<rows.length-1?Y0+rows[i+1]*RH:fy,nx=x+CW+GAP;d+=` C${x+CW+GAP*.6} ${y} ${x+CW+GAP*.4} ${ny} ${nx} ${ny}`;});return d;}
const rg=el('g',{},o);
const chaos=[[4,6,5,8,9,7,8,9,8],[5,2,1,0,2,1,0,1,0],[3,5,7,6,4,6,8,6,7],[6,7,4,2,5,8,6,5,5],[2,4,3,5,1,3,2,0,1]];
const cc=['#8FA8C6',RD,'#A9B8C9','#E08A5A','#5B7CA6'];const path=[4,2,3,6,6,4,5,1,3];
function draw(m){rg.innerHTML='';
  if(m==='c'){chaos.forEach((rw,i)=>{const fy=Y0+rw[8]*RH;prep(el('path',{d:routeD(rw,fy),class:'route',stroke:cc[i],'stroke-width':2.6},rg),2.2,i*.25);el('path',{d:`M${END-5} ${fy-5}l10 10m0-10l-10 10`,stroke:RD,'stroke-width':2.2,'stroke-linecap':'round'},rg);});}
  else{const d=routeD(path,GY)+' H975';el('path',{d,class:'route',stroke:B,'stroke-width':12,'stroke-opacity':.15},rg);prep(el('path',{d,class:'route',stroke:B,'stroke-width':4},rg),2.4,0);path.forEach((r,i)=>el('circle',{cx:X0+i*(CW+GAP)+CW/2,cy:Y0+r*RH,r:5.5,fill:'#fff',stroke:BD,'stroke-width':2.4},rg));}
  replay(o);}
const bC=document.getElementById('bChaos'),bP=document.getElementById('bPath'),st=document.getElementById('status');let auto=true;
function set(m){bC.setAttribute('aria-pressed',m==='c');bP.setAttribute('aria-pressed',m!=='c');st.className='status'+(m==='c'?'':' ok');st.innerHTML=m==='c'?'<b>5 routes, 0 reach the vision.</b>':'<b>1 route, straight to the vision.</b>';draw(m);}
bC.onclick=()=>{auto=false;clearTimeout(tmr);set('c')};bP.onclick=()=>{auto=false;clearTimeout(tmr);set('p')};set('c');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&auto){clearTimeout(tmr);set('c');tmr=setTimeout(()=>{if(auto)set('p')},3600);}}),{threshold:.45});io.observe(o);
}

/* layers */
if(document.querySelector('.layer')){
const L=[
 {e:'Layer 1 · Decide',h:'Define the goal once.',p:'You fix the target and business case. The path follows from it.',l:['Concept and business case up front','Clear success criteria in the URS','Ownership of system and knowledge'],t:'Supported by the CAPP Playbook'},
 {e:'Layer 2 · Control',h:'Seven gates keep it on course.',p:'Nothing moves on until the gate is approved.',l:['Scope agreed → system accepted','Quality, change and configuration control','One status view per project'],t:'Supported by the CAPP framework'},
 {e:'Layer 3 · Structure',h:'One playbook for every engineer.',p:'Same documents, same order, every project.',l:['Functional description and naming','System hierarchy (IEC 81346) and IO-list','HMI structure and sequence logic'],t:'Supported by CAPP libraries'},
 {e:'Layer 4 · Build',h:'Code generated, not typed.',p:'The IO-list becomes PLC and HMI code in minutes of clicks.',l:['Tags, function blocks and data blocks','Alarm texts and HMI tags','Ready for I/O testing right after import'],t:'Powered by Build-IT'}];
const lb=[...document.querySelectorAll('.layer')];
function show(i){lb.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const d=L[i];dE.textContent=d.e;dH.textContent=d.h;dP.textContent=d.p;dL.innerHTML=d.l.map(x=>'<li>'+x+'</li>').join('');dT.textContent=d.t;dB.style.width=(i+1)*25+'%';dN.textContent=(i+1)+' / 4';}
lb.forEach((b,i)=>b.onclick=()=>show(i));show(0);
}

/* CAPP product vis: scattered assets snap into library */
if(document.getElementById('cappVis')){
const cv=document.getElementById('cappVis');
const items=['Popup','Tags','Script','Icon','Graphic','Logic','Docs','Backup'];
const shelf=el('rect',{x:300,y:30,width:200,height:160,rx:14,fill:'#fff',stroke:BL,'stroke-width':1.5},cv);
tx(cv,400,58,'CAPP LIBRARY',{'text-anchor':'middle','font-size':12,'font-family':'IBM Plex Mono, monospace','font-weight':600,fill:BD});
items.forEach((n,i)=>{const col=i%2,row=Math.floor(i/2);const tx0=318+col*92,ty0=72+row*28;
  const sx=20+rnd()*200,sy=20+rnd()*170;const g=el('g',{},cv);
  el('rect',{x:0,y:0,width:80,height:22,rx:6,fill:i%3===0?B:'#EAF3FF',stroke:i%3===0?B:'#BCD4F5'},g);
  tx(g,40,15,n,{'text-anchor':'middle','font-size':11.5,'font-family':'Nunito Sans, sans-serif','font-weight':700,fill:i%3===0?'#fff':BD});
  g.style.transition='transform 1.2s cubic-bezier(.6,.1,.2,1) '+(i*.08)+'s';
  g.dataset.a=`translate(${sx}px,${sy}px) rotate(${(rnd()*30-15).toFixed(0)}deg)`;g.dataset.b=`translate(${tx0}px,${ty0}px)`;g.style.transform=g.dataset.b;g.classList.add('it');});
const arr=el('path',{d:'M240 110H286',stroke:BL,'stroke-width':2,'stroke-dasharray':'4 4','marker-end':''},cv);
let cs=true;function cycle(){cs=!cs;cv.querySelectorAll('.it').forEach(g=>g.style.transform=cs?g.dataset.b:g.dataset.a);}
if(!reduce){setTimeout(cycle,600);setInterval(cycle,3200);}
}

/* Build-IT product vis */
if(document.getElementById('biVis')){
const bv=document.getElementById('biVis');
el('rect',{x:16,y:40,width:130,height:140,rx:10,fill:'#fff',stroke:'#BCD4F5'},bv);el('rect',{x:16,y:40,width:130,height:24,rx:10,fill:'#1F9D55'},bv);
tx(bv,81,57,'IO-list.xlsx',{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'#fff','font-family':'Nunito Sans, sans-serif'});
for(let r=0;r<7;r++){for(let c=0;c<3;c++)el('rect',{x:24+c*40,y:72+r*14,width:34,height:8,rx:2,fill:r%2?'#EAF3FF':'#DCE8F7'},bv);}
el('rect',{x:200,y:70,width:120,height:80,rx:14,fill:BD},bv);tx(bv,260,106,'Build-IT',{'text-anchor':'middle','font-size':16,'font-weight':700,fill:'#fff','font-family':'Poppins, sans-serif'});
tx(bv,260,126,'CHECK · GENERATE',{'text-anchor':'middle','font-size':9.5,fill:'#CFE2FF','font-family':'IBM Plex Mono, monospace'});
const outs=['PLC tags','Function blocks','Alarms','HMI tags'];
outs.forEach((n,i)=>{const y=34+i*44;el('rect',{x:380,y,width:124,height:32,rx:8,fill:'#fff',stroke:'#BCD4F5'},bv);tx(bv,442,y+21,n,{'text-anchor':'middle','font-size':12,'font-weight':700,fill:BD,'font-family':'Nunito Sans, sans-serif'});
  el('path',{d:`M320 110C350 110 350 ${y+16} 380 ${y+16}`,stroke:BL,'stroke-width':1.6,fill:'none'},bv);});
el('path',{d:'M146 110H200',stroke:BL,'stroke-width':1.6},bv);
dotsOn(bv,['M146 110H200','M320 110C350 110 350 50 380 50','M320 110C350 110 350 94 380 94','M320 110C350 110 350 138 380 138','M320 110C350 110 350 182 380 182'],2.4);
}

/* phases */
if(document.getElementById('ph')){
const P=[['Concept & Analysis','Process understanding','Scope agreed'],['User Requirements','Functional definition','Requirements locked'],['Functional & System Design','System design · IO-list','Design approved'],['Detailed Design & Build','Code generation','Build complete'],['Factory Acceptance (FAT)','I/O testing','FAT approved'],['Site Acceptance (SAT)','Commissioning','SAT approved'],['Handover & Evaluation','Anchoring','System accepted']];
const ph=document.getElementById('ph');
P.forEach((p,i)=>{const c=document.createElement('div');c.className='chev lit';c.style.animationDelay=i+'s';c.innerHTML='<small>PHASE '+(i+1)+'</small><b>'+p[0]+'</b>';ph.appendChild(c);});
P.forEach(p=>{const w=document.createElement('div');w.className='work';w.textContent=p[1];ph.appendChild(w);});
P.forEach(p=>{const g=document.createElement('div');g.className='gate';g.textContent=p[2];ph.appendChild(g);});
ph.insertAdjacentHTML('beforeend','<div class="band bi"><b>Build-IT</b><span>IO-list → code → I/O test</span></div><div class="band capp"><b>CAPP · continuous control &amp; ownership</b><span>Framework, playbook and libraries across every phase</span></div>');
}

/* Build-IT pipeline */
if(document.getElementById('pipe')){
const pp=document.getElementById('pipe');
// IO-list sheet
el('rect',{x:20,y:70,width:200,height:290,rx:12,fill:'#fff',stroke:'#BCD4F5','stroke-width':1.5},pp);
el('path',{d:'M20 82a12 12 0 0 1 12-12h176a12 12 0 0 1 12 12v24H20z',fill:'#1F9D55'},pp);
tx(pp,120,94,'IO-list.xlsx',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'#fff'});
['Tag','Type','Description'].forEach((s,i)=>tx(pp,34+i*56,126,s,{'font-size':11,'font-weight':700,fill:BD}));
const rowsG=el('g',{},pp);const RR=[['M101','Motor','Conveyor 1'],['V204','Valve','Inlet water'],['AI12','AIN','Tank level'],['M101','Motor','Conveyor 1'],['FC05','VFD','Pump drive'],['V205','Valve','Outlet'],['DI33','DIN','Door switch'],['AI13','AIN','Pressure']];
RR.forEach((r,i)=>{const y=146+i*26;el('rect',{x:28,y:y-15,width:184,height:22,rx:4,fill:i%2?'#F5F9FF':'#fff'},rowsG);r.forEach((s,k)=>tx(rowsG,34+k*56,y,s,{'font-size':11.5,fill:'#23405F','font-family':k==0?'IBM Plex Mono, monospace':'Nunito Sans, sans-serif'}));});
// duplicate warning row flashing
const dup=el('rect',{x:28,y:146+3*26-15,width:184,height:22,rx:4,fill:'none',stroke:RD,'stroke-width':1.6,'stroke-dasharray':'3 3',opacity:0},pp);
// engine
el('rect',{x:306,y:120,width:228,height:190,rx:18,fill:BD},pp);
tx(pp,420,158,'Build-IT',{'text-anchor':'middle','font-size':22,'font-weight':700,fill:'#fff','font-family':'Poppins, sans-serif'});
const checks=['Columns verified','Control modules sorted','Duplicates found','Worksheet exported'];
const chk=checks.map((s,i)=>{const y=190+i*28;const c=el('circle',{cx:332,cy:y-4,r:8,fill:'#1C73BE'},pp);const m=el('path',{d:`M328 ${y-4}l3 3 5-6`,stroke:'#fff','stroke-width':1.8,fill:'none','stroke-linecap':'round',opacity:.35},pp);tx(pp,348,y,s,{'font-size':12.5,fill:'#DCEBFF','font-weight':600});return [c,m];});
el('path',{d:'M220 215H306',stroke:BL,'stroke-width':2},pp);
// outputs
const O=['PLC tags','Function blocks','Data blocks','Alarm texts','HMI tags','Text lists'];
const oN=O.map((s,i)=>{const y=40+i*60;const g=el('g',{},pp);el('rect',{x:620,y,width:170,height:42,rx:10,fill:'#fff',stroke:'#BCD4F5','stroke-width':1.5},g);
  el('rect',{x:632,y:y+11,width:20,height:20,rx:5,fill:'#EAF3FF'},g);el('path',{d:`M637 ${y+21}l3 3 6-7`,stroke:B,'stroke-width':1.8,fill:'none','stroke-linecap':'round'},g);
  tx(g,662,y+26,s,{'font-size':14,'font-weight':700,fill:'#0F2744'});el('path',{d:`M534 215C577 215 577 ${y+21} 620 ${y+21}`,stroke:BL,'stroke-width':1.6,fill:'none',id:'o'+i},pp);return g;});
// targets
const TG=[['Studio 5000','Rockwell'],['FactoryTalk View SE','Rockwell'],['TIA Portal V18','Siemens'],['WinCC','Siemens']];
TG.forEach((t,i)=>{const y=70+i*78;el('rect',{x:880,y,width:240,height:56,rx:12,fill:'#EAF3FF',stroke:'#CFE2FF'},pp);tx(pp,900,y+25,t[0],{'font-size':15,'font-weight':700,fill:BD,'font-family':'Poppins, sans-serif'});tx(pp,900,y+44,t[1].toUpperCase(),{'font-size':10.5,fill:'#5B6B82','font-family':'IBM Plex Mono, monospace','letter-spacing':1});});
el('path',{d:'M790 215H880',stroke:BL,'stroke-width':2,'stroke-dasharray':'5 5'},pp);
tx(pp,835,205,'IMPORT',{'text-anchor':'middle','font-size':10,fill:'#5B6B82','font-family':'IBM Plex Mono, monospace'});
tx(pp,120,395,'1 · IMPORT',{'text-anchor':'middle','font-size':11,fill:B,'font-family':'IBM Plex Mono, monospace','font-weight':600});
tx(pp,420,345,'2 · VERIFY   3 · WORKSHEET',{'text-anchor':'middle','font-size':11,fill:B,'font-family':'IBM Plex Mono, monospace','font-weight':600});
tx(pp,705,400,'4 · GENERATE',{'text-anchor':'middle','font-size':11,fill:B,'font-family':'IBM Plex Mono, monospace','font-weight':600});
tx(pp,1000,400,'READY FOR I/O TEST',{'text-anchor':'middle','font-size':11,fill:B,'font-family':'IBM Plex Mono, monospace','font-weight':600});
dotsOn(pp,['M220 215H306'],1.2);dotsOn(pp,O.map((_,i)=>`M534 215C577 215 577 ${61+i*60} 620 ${61+i*60}`),3);dotsOn(pp,['M790 215H880'],1.2);
const bs=[...document.querySelectorAll('.bstep')];let bstep=0;
function bset(i){bstep=i;bs.forEach((b,k)=>b.classList.toggle('on',k===i));
  rowsG.style.opacity=1;dup.setAttribute('opacity',i>=1?1:0);
  chk.forEach(([c,m],k)=>{const on=(i===1&&k<3)||(i===2&&k<4)||i===3;c.setAttribute('fill',on?B:'#1C73BE');m.setAttribute('opacity',on?1:.35);});
  oN.forEach((g,k)=>g.style.opacity=i===3?1:.35);}
bs.forEach((b,i)=>b.onclick=()=>{clearInterval(bt);bset(i)});bset(3);
let bt=null;if(!reduce){let k=0;bset(0);bt=setInterval(()=>{k=(k+1)%4;bset(k);},2200);}
}

/* CAPP loop */
if(document.getElementById('loop')){
const lp=document.getElementById('loop');const S=['Requirement','Select library','Read process','Import','Configure','Test','Backup','Reuse'];const cx=260,cy=260,R=170;
el('circle',{cx,cy,r:R,fill:'none',stroke:'#DCE6F2','stroke-width':2},lp);
const arc=el('circle',{cx,cy,r:R,fill:'none',stroke:B,'stroke-width':4,'stroke-linecap':'round','stroke-dasharray':`${2*Math.PI*R/8} ${2*Math.PI*R}`,transform:`rotate(-112.5 ${cx} ${cy})`},lp);
el('circle',{cx,cy,r:92,fill:BD},lp);tx(lp,cx,cy-2,'CAPP',{'text-anchor':'middle','font-size':30,'font-weight':800,fill:'#fff','font-family':'Poppins, sans-serif'});
const cs2=tx(lp,cx,cy+24,'STEP 1 / 8',{'text-anchor':'middle','font-size':12,fill:'#CFE2FF','font-family':'IBM Plex Mono, monospace'});
const nodes=S.map((s,i)=>{const a=-Math.PI/2+i*Math.PI/4,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);const c=el('circle',{cx:x,cy:y,r:20,fill:'#fff',stroke:BD,'stroke-width':2},lp);tx(lp,x,y+5,i+1,{'text-anchor':'middle','font-size':14,'font-weight':700,fill:BD,'font-family':'IBM Plex Mono, monospace'});
  const ca=Math.cos(a),sa=Math.sin(a),anc=Math.abs(ca)<.2?'middle':ca>0?'start':'end';tx(lp,x+(anc==='start'?30:anc==='end'?-30:0),y+(Math.abs(ca)<.2?(sa<0?-32:44):5+(sa<-.1?-12:sa>.1?12:0)),s,{'text-anchor':anc,'font-size':15,'font-weight':700,fill:'#0F2744','font-family':'Nunito Sans, sans-serif'});return c;});
let step=0;function tick(){nodes.forEach((c,k)=>{c.setAttribute('fill',k===step?'#EAF3FF':'#fff');c.setAttribute('stroke',k===step?B:BD);c.setAttribute('stroke-width',k===step?3:2);});arc.setAttribute('transform',`rotate(${-112.5+step*45} ${cx} ${cy})`);cs2.textContent='STEP '+(step+1)+' / 8';step=(step+1)%8;}
tick();if(!reduce)setInterval(tick,1600);
}
})();
