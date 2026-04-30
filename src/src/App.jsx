import { useState, useEffect, useRef } from "react";

const FONTS_URL = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@400;500;600&family=Dancing+Script:wght@600;700&display=swap";

const CSS = `
@import url('${FONTS_URL}');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:#FAF3E8;color:#2C1A0E}
:root{
  --or:#E8710A;--orl:#F5A143;--ors:#FDF0E3;
  --co:#3B1F0A;--cm:#7B4A1E;
  --cr:#FAF3E8;--crd:#EDE0CA;
  --r:16px
}
h1,h2,h3,h4{font-family:'Playfair Display',serif}
.sc{font-family:'Dancing Script',cursive}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(250,243,232,.96);backdrop-filter:blur(10px);border-bottom:1px solid #EDE0CA;padding:12px 32px;display:flex;align-items:center;justify-content:space-between;transition:box-shadow .3s}
.nav.s{box-shadow:0 2px 20px rgba(59,31,10,.12)}
.nl{display:flex;gap:20px}
.nl button{background:none;border:none;font:500 14px 'DM Sans',sans-serif;color:#7B4A1E;cursor:pointer;transition:color .2s}
.nl button:hover{color:#E8710A}
.crtbtn{background:#E8710A;color:#fff;border:none;border-radius:100px;padding:8px 18px;font:600 14px 'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .2s}
.crtbtn:hover{background:#c95e08;transform:translateY(-1px)}
.cbdg{display:inline-flex;align-items:center;justify-content:center;background:#fff;color:#E8710A;border-radius:50%;width:20px;height:20px;font-size:12px;font-weight:700}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:100px;font:600 15px 'DM Sans',sans-serif;cursor:pointer;transition:all .2s;padding:12px 24px;border:2px solid transparent}
.bp{background:#E8710A;color:#fff;border-color:#E8710A}
.bp:hover{background:#c95e08;border-color:#c95e08;transform:translateY(-2px);box-shadow:0 6px 20px rgba(232,113,10,.35)}
.bo{background:transparent;color:#3B1F0A;border-color:#3B1F0A}
.bo:hover{background:#3B1F0A;color:#fff;transform:translateY(-2px)}
.bsm{padding:8px 16px;font-size:13px}
.bw{background:#25D366;color:#fff;border-color:#25D366}
.bw:hover{background:#1da956;border-color:#1da956;transform:translateY(-2px)}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none!important}
.card{background:#fff;border-radius:var(--r);box-shadow:0 4px 20px rgba(59,31,10,.10);overflow:hidden;transition:all .2s}
.card:hover{box-shadow:0 8px 32px rgba(59,31,10,.18);transform:translateY(-3px)}
.sel{border:2px solid transparent;border-radius:var(--r);padding:12px;cursor:pointer;transition:all .2s;background:#fff}
.sel:hover{border-color:#F5A143}
.sel.on{border-color:#E8710A;background:#FFF8F2}
.tab{padding:10px 20px;border-radius:100px;border:none;font:500 14px 'DM Sans',sans-serif;cursor:pointer;transition:all .2s;background:#EDE0CA;color:#7B4A1E}
.tab.on{background:#E8710A;color:#fff}
.tab:hover:not(.on){color:#3B1F0A}
.sec{padding:80px 32px;max-width:1100px;margin:0 auto}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.ctr{display:flex;align-items:center;gap:12px}
.cb{width:32px;height:32px;border-radius:50%;border:2px solid #E8710A;background:#fff;color:#E8710A;font-size:18px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;line-height:1}
.cb:hover{background:#E8710A;color:#fff}
.cv{font-size:18px;font-weight:700;min-width:28px;text-align:center}
.dvd{display:flex;align-items:center;gap:16px;margin:40px 0}
.dvd::before,.dvd::after{content:'';flex:1;height:1px;background:#EDE0CA}
.dvd span{color:#E8710A;font-size:22px}
.inp{width:100%;padding:12px 16px;border-radius:12px;border:2px solid #EDE0CA;font:400 15px 'DM Sans',sans-serif;background:#fff;color:#2C1A0E;transition:border-color .2s;outline:none}
.inp:focus{border-color:#E8710A}
select.inp{cursor:pointer}
.sb{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:100px;font-size:13px;font-weight:600}
.sbg{background:#D1FAE5;color:#065F46}
.sbr{background:#FEE2E2;color:#991B1B}
.sbo{background:#FEF3C7;color:#92400E}
.sbi{background:#EDE0CA;color:#7B4A1E}
.cart-ov{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;display:flex;justify-content:flex-end;animation:fIn .2s}
.cart-sb{width:min(440px,100vw);background:#fff;height:100%;overflow-y:auto;display:flex;flex-direction:column;animation:sIn .3s;box-shadow:-4px 0 40px rgba(0,0,0,.15)}
@keyframes fIn{from{opacity:0}to{opacity:1}}
@keyframes sIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.stog{display:flex;border-radius:100px;overflow:hidden;border:2px solid #EDE0CA}
.stb{flex:1;padding:6px 14px;border:none;cursor:pointer;font:600 12px 'DM Sans',sans-serif;transition:all .2s;background:#fff;color:#7B4A1E}
.stb.on{background:#E8710A;color:#fff}
.dk{background:#3B1F0A;color:#FAF3E8}
.fab{position:fixed;bottom:24px;right:24px;background:#E8710A;color:#fff;border:none;border-radius:100px;padding:14px 22px;font:600 15px 'DM Sans',sans-serif;cursor:pointer;box-shadow:0 4px 20px rgba(232,113,10,.4);display:flex;align-items:center;gap:8px;z-index:99;transition:all .2s}
.fab:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(232,113,10,.5)}
.fp{background:linear-gradient(135deg,#F5A143,#E8710A);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;aspect-ratio:1;gap:4px}
@media(max-width:768px){
  .g2,.g3,.g4{grid-template-columns:1fr 1fr}
  .nl{display:none}
  .sec{padding:60px 16px}
  .nav{padding:12px 16px}
}
@media(max-width:440px){.g3,.g4{grid-template-columns:1fr 1fr}}
`;

/* DATA */
const PROTS=[
  {id:"p1",n:"Lomito de Cerdo",d:"en salsa de hongos",e:"🥩"},
  {id:"p2",n:"Filete de Pollo",d:"en salsa blanca",e:"🍗"},
  {id:"p3",n:"Filete Mignón de Cerdo",d:"en salsa oriental",e:"🥩"},
  {id:"p4",n:"Costillitas de Cerdo",d:"al horno en salsa barbacoa",e:"🍖"},
  {id:"p5",n:"Picaña de Cerdo",d:"en salsa de tamarindo",e:"🥩"},
  {id:"p6",n:"Pechugas Rellenas",d:"en salsa al vino",e:"🍗"},
];
const GUAR=[
  {id:"g1",n:"Arroz Blanco"},{id:"g2",n:"Arroz Jardinero"},{id:"g3",n:"Arroz con Almendras"},
  {id:"g4",n:"Puré de Papa"},{id:"g5",n:"Mini Papitas al Romero"},
  {id:"g6",n:"Vegetales Mixtos al Vapor"},{id:"g7",n:"Bastoncitos de Zanahoria y Vainicas"},
];
const POSTM=[
  {id:"m1",n:"Tres Leches Tradicional"},{id:"m2",n:"Tres Leches Churchill"},
  {id:"m3",n:"Pie de Limón"},{id:"m4",n:"Mousse de Nutella"},
  {id:"m5",n:"Mousse de Maracuyá"},{id:"m6",n:"Mousse de Chocolate"},
  {id:"m7",n:"Arrollado de Nueces"},{id:"m8",n:"Arrollado de Higos"},
];
const VARIOS=[
  {id:"v1",n:"Arroz con Pollo / Arroz Oriental",d:"Ensalada verde y papitas tostadas",p:3000,e:"🍛"},
  {id:"v2",n:"Lasagna de Pollo o Carne",d:"Ensalada verde y pancito de ajo",p:4000,e:"🍝"},
  {id:"v3",n:"Pastel de Pollo",d:"Ensalada verde",p:3500,e:"🥧"},
];
const BS=[
  {id:"bs1",n:"Empanadita de pollo (tradicional)",pq:300,md:400},
  {id:"bs2",n:"Empanadita de pollo en crema blanca",pq:325,md:475},
  {id:"bs3",n:"Rollitos de jamón y queso",pq:300,md:400},
  {id:"bs4",n:"Cangrejitos de queso",pq:300,md:400},
  {id:"bs5",n:"Cangrejitos de jamón y queso",pq:325,md:425},
  {id:"bs6",n:"Rollitos de pizza",pq:300,md:425},
  {id:"bs7",n:"Enchilada de papa",pq:300,md:400},
  {id:"bs8",n:"Pastelitos de carne",pq:300,md:400},
  {id:"bs9",n:"Canastitas de hongos y cebolla",pq:325,md:450},
  {id:"bs10",n:"Canastitas de espárragos",pq:350,md:475},
];
const BD=[
  {id:"d1",n:"Arrollado",pq:500,md:700,vs:["Leche condensada e higos","Nueces y leche condensada","Piña colada y leche condensada"]},
  {id:"d2",n:"Pudín de elote",pq:300,md:400},
  {id:"d3",n:"Alfajor",pq:425,md:675,vs:["Tradicional","Menta","Nutella","Maracuyá","Fresa","Manjar Blanco","Marplatense"]},
  {id:"d4",n:"Budín con cobertura de crema Baileys",pq:325,md:450},
  {id:"d5",n:"Rollito de canela / caramelo",pq:325,md:450},
  {id:"d6",n:"Rollito de fresa / limón",pq:400,md:550},
  {id:"d7",n:"Brownie nevado",pq:325,md:425},
  {id:"d8",n:"Cuadrito torta chilena tradicional",pq:400,md:575},
  {id:"d9",n:"Cuadrito torta chilena y nueces",pq:425,md:750},
];
const PC=[
  {id:"c1",n:"Tres Leches Tradicional",d:"Torta completa"},
  {id:"c2",n:"Tres Leches Churchill",d:"Torta completa"},
  {id:"c3",n:"Pie de Limón",d:"Tamaño completo"},
  {id:"c4",n:"Mousse de Nutella",d:"Porción grande"},
  {id:"c5",n:"Mousse de Maracuyá",d:"Porción grande"},
  {id:"c6",n:"Mousse de Chocolate",d:"Porción grande"},
  {id:"c7",n:"Arrollado de Nueces",d:"Tamaño completo"},
  {id:"c8",n:"Arrollado de Higos",d:"Tamaño completo"},
];
const PRE=[
  {id:"r1",n:"Empanaditas de pollo",p:700,u:"c/u",e:"🥟"},
  {id:"r2",n:"Artolladitos de nueces y leche condensada",p:700,u:"c/u",e:"🍥"},
  {id:"r3",n:"Brownies",p:700,u:"c/u",e:"🍫"},
  {id:"r4",n:"Cajita de 6 alfajores",p:4000,u:"por cajita",e:"🍪",d:"2 choco menta · 2 maracuyá · 2 tradicional"},
  {id:"r5",n:"Rollos de canela, caramelo y nueces",p:3000,u:"x3",e:"🌀"},
];
const CTS=[
  {v:"agustin",l:"Agustín Leandro",r:"INS"},
  {v:"valeska",l:"Valeska Leandro",r:"Colegio"},
  {v:"jose",l:"José Leandro",r:""},
  {v:"luis",l:"Luis Leandro",r:""},
  {v:"evelyn",l:"Evelyn Vargas",r:""},
];

/* HELPERS */
const fmt=n=>`¢${Number(n).toLocaleString("es-CR")}`;
const uid=()=>Math.random().toString(36).slice(2,9);
const newId=(pfx="KP")=>`${pfx}-${new Date().getFullYear()}-${Math.floor(1000+Math.random()*9000)}`;
const wa=msg=>window.open(`https://wa.me/50688833575?text=${encodeURIComponent(msg)}`,"_blank");
const preOpen=()=>{const d=new Date(),day=d.getDay(),h=d.getHours();return(day>=1&&day<=3)||(day===4&&h<17);};
const scr=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

/* ── LOGO ── */
const Logo=({size="md"})=>{
  const lg=size==="lg";
  return(
    <div style={{display:"flex",alignItems:"center",gap:lg?12:8}}>
      <svg width={lg?50:36} height={lg?55:40} viewBox="0 0 60 66" fill="none">
        <ellipse cx="36" cy="17" rx="12" ry="5.5" fill="white" opacity=".9"/>
        <rect x="26" y="14" width="19" height="10" rx="2" fill="white" opacity=".9"/>
        <rect x="23" y="22" width="23" height="5" rx="2.5" fill="white" opacity=".9"/>
        <text x="3" y="60" fontFamily="Dancing Script,cursive" fontSize="50" fontWeight="700" fill="#E8710A">K</text>
      </svg>
      <div>
        <div className="sc" style={{fontSize:lg?28:20,color:"#E8710A",fontWeight:700,lineHeight:1}}>K-Prichos</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:lg?11:9,color:"#7B4A1E",letterSpacing:1.5,textTransform:"uppercase"}}>Repostería y Más</div>
      </div>
    </div>
  );
};

/* ── COUNTER ── */
const Ctr=({val,onChange,min=0})=>(
  <div className="ctr">
    <button className="cb" onClick={()=>onChange(Math.max(min,val-1))}>−</button>
    <span className="cv">{val}</span>
    <button className="cb" onClick={()=>onChange(val+1)}>+</button>
  </div>
);

/* ── FP (food placeholder) ── */
const FP=({e="🍽️"})=>(
  <div className="fp">
    <span style={{fontSize:38}}>{e}</span>
  </div>
);

/* ── NAVBAR ── */
function Navbar({count,onCart}){
  const [sc,setSc]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>20);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  return(
    <nav className={`nav${sc?" s":""}`}>
      <Logo/>
      <div className="nl">
        {[["menu","Menú"],["preorden","Pre-Orden"],["cotizador","Cotizar"],["nosotros","Nosotros"],["contacto","Contacto"]].map(([id,l])=>(
          <button key={id} onClick={()=>scr(id)}>{l}</button>
        ))}
      </div>
      <button className="crtbtn" onClick={onCart}>
        🛒 Carrito {count>0&&<span className="cbdg">{count}</span>}
      </button>
    </nav>
  );
}

/* ── HERO ── */
function Hero(){
  const cards=[["🥟","Bocadillos",-1.5],["🍗","Platos",1.2],["🎂","Postres",-1],["🌀","Repostería",1.8]];
  return(
    <section style={{minHeight:"100vh",background:"linear-gradient(135deg,#FAF3E8 0%,#FDE8C8 100%)",display:"flex",alignItems:"center",padding:"100px 32px 60px",position:"relative",overflow:"hidden"}} id="inicio">
      <div style={{position:"absolute",right:-60,top:"50%",transform:"translateY(-50%)",fontSize:300,opacity:.04,fontFamily:"'Dancing Script',cursive",color:"#E8710A",userSelect:"none",pointerEvents:"none",lineHeight:1}}>K</div>
      <div style={{maxWidth:1100,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr auto",gap:40,alignItems:"center"}}>
        <div>
          <div className="sb sbo" style={{marginBottom:20}}>🧡 Cocina familiar desde el corazón</div>
          <h1 style={{fontSize:"clamp(32px,5vw,60px)",color:"#3B1F0A",lineHeight:1.1,marginBottom:16}}>
            Hecho con amor,<br/><em style={{color:"#E8710A"}}>servido con sazón</em>
          </h1>
          <p style={{fontSize:17,color:"#7B4A1E",marginBottom:36,lineHeight:1.75,maxWidth:500}}>
            Comidas por encargo y repostería artesanal. Todo lo que tu paladar necesita, listo cuando vos lo pedís.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="btn bp" onClick={()=>scr("menu")}>Ver Menú →</button>
            <button className="btn bo" onClick={()=>scr("cotizador")}>Cotizar un evento</button>
          </div>
          <div style={{display:"flex",gap:32,marginTop:48,flexWrap:"wrap"}}>
            {[["🍽️","Platos","por encargo"],["🎂","Repostería","artesanal"],["💬","Pedidos","por WhatsApp"]].map(([e,t,s])=>(
              <div key={t}>
                <div style={{fontSize:22}}>{e}</div>
                <div style={{fontWeight:700,color:"#3B1F0A",fontSize:15}}>{t}</div>
                <div style={{fontSize:12,color:"#7B4A1E"}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,width:220,flexShrink:0}}>
          {cards.map(([e,l,r])=>(
            <div key={l} className="card" style={{padding:14,textAlign:"center",transform:`rotate(${r}deg)`}}>
              <div style={{fontSize:30,marginBottom:4}}>{e}</div>
              <div style={{fontSize:11,fontWeight:600,color:"#7B4A1E"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MENU BUILDER ── */
function MenuBuilder({onAdd}){
  const [op,setOp]=useState(1);
  const [pts,setPts]=useState([]);
  const [gs,setGs]=useState([]);
  const [post,setPost]=useState(null);
  const [pers,setPers]=useState(6);
  const maxP=op===1?1:2;
  const ppu=op===1?5800:7300;
  const total=ppu*pers;
  const togP=id=>pts.includes(id)?setPts(pts.filter(x=>x!==id)):(pts.length<maxP&&setPts([...pts,id]));
  const togG=id=>gs.includes(id)?setGs(gs.filter(x=>x!==id)):(gs.length<2&&setGs([...gs,id]));
  const ready=pts.length===maxP&&gs.length===2&&post&&pers>=6;
  const doAdd=()=>{
    if(!ready)return;
    const pn=PROTS.filter(x=>pts.includes(x.id)).map(x=>x.n).join(" · ");
    const gn=GUAR.filter(x=>gs.includes(x.id)).map(x=>x.n).join(" · ");
    const po=POSTM.find(x=>x.id===post)?.n||"";
    onAdd({id:uid(),type:"menu",name:`Arma tu Menú — Opción ${op}`,details:`${pers} personas · ${pn} · ${gn} · ${po}`,unitPrice:ppu,qty:pers,total});
    setPts([]);setGs([]);setPost(null);setPers(6);
  };
  const Step=({n,t,ok,ch})=>(
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:28,height:28,borderRadius:"50%",background:ok?"#E8710A":"#EDE0CA",color:ok?"white":"#7B4A1E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>{n}</div>
        <h4 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"#3B1F0A",fontSize:15}}>{t}</h4>
      </div>
      {ch}
    </div>
  );
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:28,alignItems:"start"}}>
      <div>
        <Step n="1" t="Elegí tu opción" ok>
          <div className="g2">
            {[1,2].map(o=>(
              <div key={o} className={`sel${op===o?" on":""}`} onClick={()=>{setOp(o);setPts([])}}>
                <div style={{fontWeight:700,fontSize:15,color:"#3B1F0A",marginBottom:3}}>Opción {o}</div>
                <div style={{fontSize:12,color:"#7B4A1E",marginBottom:8}}>{o===1?"1 Proteína":"2 Proteínas"} + 2 Guarniciones + Ensalada + Postre</div>
                <div style={{fontWeight:700,color:"#E8710A",fontSize:17}}>{fmt(o===1?5800:7300)}<span style={{fontSize:11,fontWeight:400,color:"#7B4A1E"}}>/persona</span></div>
              </div>
            ))}
          </div>
        </Step>
        <Step n="2" t={`Proteína${maxP>1?"s":""} (${pts.length}/${maxP})`} ok={pts.length===maxP}>
          <div className="g3" style={{gap:10}}>
            {PROTS.map(p=>(
              <div key={p.id} className={`sel${pts.includes(p.id)?" on":""}`} onClick={()=>togP(p.id)} style={{textAlign:"center",padding:10}}>
                <div style={{fontSize:26,marginBottom:3}}>{p.e}</div>
                <div style={{fontSize:11,fontWeight:600,color:"#3B1F0A",lineHeight:1.3}}>{p.n}</div>
                <div style={{fontSize:10,color:"#7B4A1E"}}>{p.d}</div>
              </div>
            ))}
          </div>
        </Step>
        <Step n="3" t={`Guarniciones (${gs.length}/2)`} ok={gs.length===2}>
          <div className="g2" style={{gap:10}}>
            {GUAR.map(g=>(
              <div key={g.id} className={`sel${gs.includes(g.id)?" on":""}`} onClick={()=>togG(g.id)} style={{padding:"8px 12px"}}>
                <span style={{fontSize:13,fontWeight:500}}>🌿 {g.n}</span>
              </div>
            ))}
          </div>
        </Step>
        <Step n="4" t="Postre" ok={!!post}>
          <div className="g4" style={{gap:10}}>
            {POSTM.map(p=>(
              <div key={p.id} className={`sel${post===p.id?" on":""}`} onClick={()=>setPost(p.id)} style={{textAlign:"center",padding:10}}>
                <div style={{fontSize:20,marginBottom:3}}>🍰</div>
                <div style={{fontSize:11,fontWeight:600,color:"#3B1F0A",lineHeight:1.3}}>{p.n}</div>
              </div>
            ))}
          </div>
        </Step>
        <Step n="5" t="Cantidad de personas (mín. 6)" ok={pers>=6}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <Ctr val={pers} onChange={v=>setPers(Math.max(6,v))} min={6}/>
            <span style={{color:"#7B4A1E",fontSize:14}}>{pers} persona{pers!==1?"s":""}</span>
          </div>
        </Step>
      </div>
      <div style={{position:"sticky",top:80}}>
        <div className="card" style={{padding:22}}>
          <h4 style={{marginBottom:14,color:"#3B1F0A",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Tu selección</h4>
          <div style={{fontSize:13,color:"#7B4A1E",lineHeight:2,marginBottom:18}}>
            <div>📋 Opción {op} · {fmt(ppu)}/pers.</div>
            <div>🥩 {pts.length>0?PROTS.filter(x=>pts.includes(x.id)).map(x=>x.n).join(", "):<em>Pendiente</em>}</div>
            <div>🌿 {gs.length>0?GUAR.filter(x=>gs.includes(x.id)).map(x=>x.n).join(", "):<em>Pendiente</em>}</div>
            <div>🍰 {post?POSTM.find(x=>x.id===post)?.n:<em>Pendiente</em>}</div>
            <div>👥 {pers} personas</div>
          </div>
          <div style={{borderTop:"1px solid #EDE0CA",paddingTop:14,marginBottom:14}}>
            <div style={{fontSize:12,color:"#7B4A1E"}}>Total estimado</div>
            <div style={{fontSize:26,fontWeight:700,color:"#E8710A"}}>{fmt(total)}</div>
          </div>
          <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={doAdd} disabled={!ready}>
            {ready?"✅ Agregar al pedido":"Completá los pasos"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── VARIOS PLATOS ── */
function VariosPlatos({onAdd}){
  const [qs,setQs]=useState({});
  const total=VARIOS.reduce((s,v)=>s+(qs[v.id]||0)*v.p,0);
  const tot=Object.values(qs).reduce((s,v)=>s+v,0);
  return(
    <div>
      <div className="sb sbo" style={{marginBottom:20}}>📋 Pedido mínimo: 6 platos en total</div>
      <div className="g3" style={{marginBottom:24}}>
        {VARIOS.map(v=>(
          <div key={v.id} className="card">
            <div style={{position:"relative",paddingTop:"60%",overflow:"hidden",background:"linear-gradient(135deg,#F5A143,#E8710A)"}}>
              <span style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:42}}>{v.e}</span>
            </div>
            <div style={{padding:16}}>
              <div style={{fontWeight:700,fontSize:14,color:"#3B1F0A",marginBottom:4}}>{v.n}</div>
              <div style={{fontSize:12,color:"#7B4A1E",marginBottom:12}}>{v.d}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:700,color:"#E8710A"}}>{fmt(v.p)}</span>
                <Ctr val={qs[v.id]||0} onChange={n=>setQs({...qs,[v.id]:n})}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      {tot>0&&(
        <div className="card" style={{padding:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:13,color:"#7B4A1E"}}>{tot} plato{tot!==1?"s":""}{tot<6&&<span style={{color:"#991B1B"}}> (mín. 6)</span>}</div>
            <div style={{fontSize:24,fontWeight:700,color:"#E8710A"}}>{fmt(total)}</div>
          </div>
          <button className="btn bp" disabled={tot<6}
            onClick={()=>{VARIOS.forEach(v=>{if(qs[v.id]>0)onAdd({id:uid(),type:"plato",name:v.n,details:v.d,unitPrice:v.p,qty:qs[v.id],total:v.p*qs[v.id]})});setQs({});}}>
            🛒 Agregar al pedido
          </button>
        </div>
      )}
    </div>
  );
}

/* ── BOC CARD ── */
function BocCard({item,dulce,onAdd}){
  const [sz,setSz]=useState("pq");
  const [qty,setQty]=useState(0);
  const [vr,setVr]=useState(item.vs?item.vs[0]:"");
  const price=sz==="pq"?item.pq:item.md;
  return(
    <div className="card" style={{display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",paddingTop:"65%",overflow:"hidden",background:"linear-gradient(135deg,#F5A143,#E8710A)"}}>
        <span style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:38}}>{dulce?"🍮":"🥟"}</span>
      </div>
      <div style={{padding:14,flex:1,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{fontWeight:700,fontSize:12,color:"#3B1F0A",lineHeight:1.3}}>{item.n}</div>
        {item.vs&&(
          <select className="inp" style={{fontSize:11,padding:"5px 8px"}} value={vr} onChange={e=>setVr(e.target.value)}>
            {item.vs.map(v=><option key={v}>{v}</option>)}
          </select>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div className="stog">
            <button className={`stb${sz==="pq"?" on":""}`} onClick={()=>setSz("pq")}>Pqño</button>
            <button className={`stb${sz==="md"?" on":""}`} onClick={()=>setSz("md")}>Med</button>
          </div>
          <span style={{fontWeight:700,color:"#E8710A",fontSize:13}}>{fmt(price)}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"auto"}}>
          <Ctr val={qty} onChange={setQty}/>
          <button className="btn bp bsm" disabled={qty===0}
            onClick={()=>{onAdd({id:uid(),type:"bocadillo",name:item.n+(vr?` (${vr})`:""),details:`Tamaño: ${sz==="pq"?"Pequeño":"Mediano"}`,unitPrice:price,qty,total:price*qty});setQty(0);}}>
            + Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── BOCADILLOS TAB ── */
function BocTab({onAdd}){
  const [sub,setSub]=useState("s");
  const list=sub==="s"?BS:BD;
  return(
    <div>
      <div className="sb sbo" style={{marginBottom:20}}>📋 Pedido mínimo: 20 piezas</div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {[["s","🧂 Salados"],["d","🍮 Dulces"]].map(([k,l])=>(
          <button key={k} className={`tab${sub===k?" on":""}`} onClick={()=>setSub(k)}>{l}</button>
        ))}
      </div>
      <div className="g4">{list.map(i=><BocCard key={i.id} item={i} dulce={sub==="d"} onAdd={onAdd}/>)}</div>
    </div>
  );
}

/* ── POSTRES COMPLETOS ── */
function PostresC(){
  return(
    <div>
      <div className="sb sbi" style={{marginBottom:20}}>🎂 Para eventos y pedidos especiales — precio a consultar</div>
      <div className="g4">
        {PC.map(p=>(
          <div key={p.id} className="card">
            <div style={{position:"relative",paddingTop:"70%",background:"linear-gradient(135deg,#F5A143,#E8710A)"}}>
              <span style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:40}}>🎂</span>
            </div>
            <div style={{padding:14}}>
              <div style={{fontWeight:700,fontSize:12,color:"#3B1F0A",marginBottom:3}}>{p.n}</div>
              <div style={{fontSize:11,color:"#7B4A1E",marginBottom:12}}>{p.d}</div>
              <button className="btn bw bsm" style={{width:"100%",justifyContent:"center",fontSize:11}}
                onClick={()=>wa(`Hola! Me interesa cotizar: *${p.n}* (${p.d}) de K-Prichos 🎂`)}>
                💬 Consultar precio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MENU STORE ── */
function MenuStore({onAdd}){
  const [tab,setTab]=useState("alm");
  const [sub,setSub]=useState("arma");
  return(
    <section id="menu" style={{background:"#FAF3E8",padding:"80px 0"}}>
      <div className="sec" style={{paddingTop:0,paddingBottom:0}}>
        <h2 style={{fontSize:"clamp(26px,4vw,40px)",color:"#3B1F0A",marginBottom:8}}>Nuestro Menú</h2>
        <p style={{color:"#7B4A1E",fontSize:16,marginBottom:32,lineHeight:1.6}}>Todo hecho con ingredientes de calidad, sazón de verdad y amor de familia.</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32}}>
          {[["alm","🍽️ Almuerzos y Comidas"],["boc","🥟 Bocadillos"],["post","🎂 Postres Completos"]].map(([k,l])=>(
            <button key={k} className={`tab${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        {tab==="alm"&&(
          <div>
            <div className="sb sbo" style={{marginBottom:22}}>📋 Pedido mínimo: 6 platos — solo por encargo</div>
            <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
              {[["arma","✨ Arma tu Menú"],["varios","🍛 Varios Platos"]].map(([k,l])=>(
                <button key={k} className={`tab${sub===k?" on":""}`} onClick={()=>setSub(k)}>{l}</button>
              ))}
            </div>
            {sub==="arma"?<MenuBuilder onAdd={onAdd}/>:<VariosPlatos onAdd={onAdd}/>}
          </div>
        )}
        {tab==="boc"&&<BocTab onAdd={onAdd}/>}
        {tab==="post"&&<PostresC/>}
      </div>
    </section>
  );
}

/* ── PRE-ORDEN SEMANAL ── */
function PreOrden(){
  const [qs,setQs]=useState({});
  const [ct,setCt]=useState("");
  const [ok,setOk]=useState(false);
  const isOpen=preOpen();
  const total=PRE.reduce((s,p)=>s+(qs[p.id]||0)*p.p,0);
  const hasItems=PRE.some(p=>qs[p.id]>0);
  const send=()=>{
    const id=newId("KP-S");
    const who=CTS.find(c=>c.v===ct);
    const lines=PRE.filter(p=>qs[p.id]>0).map(p=>`  • ${p.n} x${qs[p.id]} — ${fmt(qs[p.id]*p.p)}`).join("\n");
    wa(`🧁 *Pre-Orden Semanal K-Prichos*\n*ID:* ${id}\n*Para:* ${who?`${who.l}${who.r?` (${who.r})`:""}`:"Sin especificar"}\n\n*Detalle:*\n${lines}\n\n*Total: ${fmt(total)}*`);
    setQs({});setCt("");setOk(true);setTimeout(()=>setOk(false),4000);
  };
  return(
    <section id="preorden" className="dk" style={{padding:"80px 0"}}>
      <div className="sec" style={{paddingTop:0,paddingBottom:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16,marginBottom:36}}>
          <div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",color:"#FAF3E8",marginBottom:8}}>🧁 Pre-Orden Semanal</h2>
            <p style={{color:"#EDE0CA",fontSize:16,lineHeight:1.6}}>Hacé tu pedido antes del jueves a las 5PM y lo coordinamos para el viernes.</p>
          </div>
          <div className={`sb ${isOpen?"sbg":"sbr"}`}>
            {isOpen?"✅ Pedidos abiertos — cerramos el jueves 5PM":"🔒 Pre-órdenes cerradas — volvemos el lunes"}
          </div>
        </div>
        {ok&&<div style={{background:"#D1FAE5",color:"#065F46",padding:"12px 20px",borderRadius:12,marginBottom:20,fontWeight:600}}>✅ ¡Pre-orden enviada! Revisá WhatsApp para confirmar.</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:28,alignItems:"start"}}>
          <div className="g2">
            {PRE.map(p=>(
              <div key={p.id} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:18}}>
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                  <span style={{fontSize:30}}>{p.e}</span>
                  <div>
                    <div style={{fontWeight:700,color:"#FAF3E8",fontSize:14,lineHeight:1.3}}>{p.n}</div>
                    {p.d&&<div style={{fontSize:11,color:"#EDE0CA",marginTop:2}}>{p.d}</div>}
                    <div style={{color:"#F5A143",fontWeight:700,marginTop:2}}>{fmt(p.p)} <span style={{fontSize:11,fontWeight:400,color:"#EDE0CA"}}>{p.u}</span></div>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Ctr val={qs[p.id]||0} onChange={n=>setQs({...qs,[p.id]:n})}/>
                  {qs[p.id]>0&&<span style={{color:"#F5A143",fontWeight:600,fontSize:13}}>{fmt(qs[p.id]*p.p)}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{position:"sticky",top:80,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.14)",borderRadius:16,padding:22}}>
            <h4 style={{color:"#FAF3E8",marginBottom:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Resumen</h4>
            {!hasItems?(
              <p style={{color:"#EDE0CA",fontSize:13,marginBottom:16}}>Aún no seleccionaste productos</p>
            ):(
              PRE.filter(p=>qs[p.id]>0).map(p=>(
                <div key={p.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#EDE0CA",marginBottom:7}}>
                  <span>{p.n} ×{qs[p.id]}</span>
                  <span style={{color:"#F5A143",fontWeight:600}}>{fmt(qs[p.id]*p.p)}</span>
                </div>
              ))
            )}
            <div style={{borderTop:"1px solid rgba(255,255,255,.15)",paddingTop:12,marginBottom:16,marginTop:8}}>
              <div style={{fontSize:12,color:"#EDE0CA"}}>Total</div>
              <div style={{fontSize:26,fontWeight:700,color:"#F5A143"}}>{fmt(total)}</div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:"#EDE0CA",display:"block",marginBottom:6}}>¿Para quién es el pedido?</label>
              <select className="inp" value={ct} onChange={e=>setCt(e.target.value)}>
                <option value="">Seleccioná...</option>
                {CTS.map(c=><option key={c.v} value={c.v}>{c.l}{c.r?` — ${c.r}`:""}</option>)}
              </select>
            </div>
            <button className="btn bw" style={{width:"100%",justifyContent:"center"}} disabled={!isOpen||!hasItems||!ct} onClick={send}>
              📱 Enviar pre-orden
            </button>
            {!isOpen&&<div style={{fontSize:11,color:"#EDE0CA",textAlign:"center",marginTop:8}}>Los pedidos están cerrados por ahora</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── COTIZADOR ── */
function Cotizador(){
  const [op,setOp]=useState(1);
  const [pts,setPts]=useState([]);
  const [pers,setPers]=useState(20);
  const ppu=op===1?5800:7300;
  const total=ppu*pers;
  const togP=id=>pts.includes(id)?setPts(pts.filter(x=>x!==id)):setPts([...pts,id]);
  const send=()=>{
    const pn=pts.length>0?PROTS.filter(x=>pts.includes(x.id)).map(x=>x.n).join(", "):"Por definir";
    wa(`Hola! Quiero cotizar un evento en K-Prichos 🍽️\n\n• Opción elegida: Opción ${op} (${fmt(ppu)}/persona)\n• Personas: ${pers}\n• Proteína(s) de interés: ${pn}\n• Total estimado: ${fmt(total)}\n\n¿Podemos coordinar los detalles?`);
  };
  return(
    <section id="cotizador" style={{background:"#FDF0E3",padding:"80px 0"}}>
      <div className="sec" style={{paddingTop:0,paddingBottom:0}}>
        <h2 style={{fontSize:"clamp(26px,4vw,40px)",color:"#3B1F0A",marginBottom:8}}>Cotizá tu evento</h2>
        <p style={{color:"#7B4A1E",fontSize:16,marginBottom:36,lineHeight:1.6}}>Decime cuántos son y qué se les antoja — yo hago los números.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:32,alignItems:"start"}}>
          <div>
            <div style={{marginBottom:28}}>
              <h4 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"#3B1F0A",marginBottom:14}}>1. Tipo de menú</h4>
              <div className="g2">
                {[1,2].map(o=>(
                  <div key={o} className={`sel${op===o?" on":""}`} onClick={()=>{setOp(o);setPts([])}}>
                    <div style={{fontWeight:700,color:"#3B1F0A",marginBottom:4}}>Opción {o}</div>
                    <div style={{fontSize:12,color:"#7B4A1E",marginBottom:6}}>{o===1?"1 Proteína + 2 Guarniciones":"2 Proteínas + 2 Guarniciones"} + Ensalada + Postre</div>
                    <div style={{fontWeight:700,color:"#E8710A"}}>{fmt(o===1?5800:7300)}/persona</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:28}}>
              <h4 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"#3B1F0A",marginBottom:14}}>2. Proteína(s) de interés <span style={{fontWeight:400,color:"#7B4A1E",fontSize:13}}>(opcional)</span></h4>
              <div className="g3" style={{gap:10}}>
                {PROTS.map(p=>(
                  <div key={p.id} className={`sel${pts.includes(p.id)?" on":""}`} onClick={()=>togP(p.id)} style={{textAlign:"center",padding:10}}>
                    <div style={{fontSize:22,marginBottom:2}}>{p.e}</div>
                    <div style={{fontSize:11,fontWeight:600,color:"#3B1F0A",lineHeight:1.3}}>{p.n}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"#3B1F0A",marginBottom:14}}>3. Cantidad de personas</h4>
              <div style={{display:"flex",alignItems:"center",gap:18}}>
                <Ctr val={pers} onChange={v=>setPers(Math.max(6,v))} min={6}/>
                <span style={{color:"#7B4A1E"}}>{pers} personas</span>
              </div>
            </div>
          </div>
          <div style={{position:"sticky",top:80}}>
            <div style={{background:"linear-gradient(135deg,#E8710A,#F5A143)",borderRadius:16,padding:28,color:"white",marginBottom:14}}>
              <div style={{fontSize:13,opacity:.85,marginBottom:4}}>Estimado para {pers} personas</div>
              <div style={{fontSize:42,fontWeight:900,fontFamily:"'Playfair Display',serif",lineHeight:1}}>{fmt(total)}</div>
              <div style={{fontSize:12,opacity:.75,marginTop:8}}>Opción {op} · {fmt(ppu)}/persona</div>
              <div style={{borderTop:"1px solid rgba(255,255,255,.3)",paddingTop:12,marginTop:16,fontSize:12,opacity:.8,lineHeight:1.6}}>
                Incluye {op===1?"1 proteína":"2 proteínas"} + 2 guarniciones + ensalada + postre
              </div>
            </div>
            <div className="card" style={{padding:14,fontSize:12,color:"#7B4A1E",marginBottom:14}}>
              💡 Precios sujetos a confirmación. El costo puede variar según disponibilidad y ajustes especiales.
            </div>
            <button className="btn bw" style={{width:"100%",justifyContent:"center"}} onClick={send}>
              📱 Enviar cotización por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── NOSOTROS ── */
function Nosotros(){
  return(
    <section id="nosotros" style={{background:"#FAF3E8",padding:"80px 0"}}>
      <div className="sec" style={{paddingTop:0,paddingBottom:0}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <div className="sb sbo" style={{marginBottom:20}}>👨‍👩‍🍳 Familia Leandro</div>
            <h2 style={{fontSize:"clamp(26px,4vw,40px)",color:"#3B1F0A",marginBottom:8}}>Una familia que cocina con alma</h2>
            <div className="dvd"><span>❧</span></div>
            <p style={{color:"#7B4A1E",lineHeight:1.8,marginBottom:18,fontSize:16}}>K-Prichos nació de lo que toda familia tiene de sobra: amor y buena sazón. Cada plato que preparamos lleva ingredientes de verdad, recetas de toda la vida y ese sabor que te hace volver.</p>
            <p style={{color:"#7B4A1E",lineHeight:1.8,marginBottom:32,fontSize:16}}>No somos una fábrica de comida barata. Somos una cocina familiar donde la calidad importa, el precio es justo y el sabor habla por sí solo.</p>
            <div className="g2">
              {[["🧡","Ingredientes de calidad","Sin atajos. Solo lo mejor."],["👩‍🍳","Recetas de familia","Sazón que no se aprende, se hereda."],["✅","Precio justo","Calidad real a un costo honesto."],["💬","Atención directa","Hablás con quien cocina."]].map(([e,t,d])=>(
                <div key={t} style={{background:"white",borderRadius:12,padding:16,boxShadow:"0 2px 10px rgba(59,31,10,.06)"}}>
                  <div style={{fontSize:22,marginBottom:4}}>{e}</div>
                  <div style={{fontWeight:700,fontSize:13,color:"#3B1F0A",marginBottom:2}}>{t}</div>
                  <div style={{fontSize:12,color:"#7B4A1E"}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderRadius:24,overflow:"hidden",aspectRatio:"4/5",background:"linear-gradient(160deg,#F5A143 0%,#E8710A 50%,#7B4A1E 100%)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10,boxShadow:"0 20px 60px rgba(232,113,10,.22)"}}>
            <span style={{fontSize:68}}>👨‍👩‍🍳</span>
            <div className="sc" style={{color:"white",fontSize:22,opacity:.9}}>La familia Leandro</div>
            <div style={{color:"rgba(255,255,255,.55)",fontSize:11,letterSpacing:2,textTransform:"uppercase"}}>Foto próximamente</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACTO ── */
function Contacto(){
  return(
    <section id="contacto" style={{background:"#FDF0E3",padding:"80px 0"}}>
      <div className="sec" style={{paddingTop:0,paddingBottom:0,textAlign:"center",maxWidth:580,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(26px,4vw,40px)",color:"#3B1F0A",marginBottom:8}}>¿Listo para pedir?</h2>
        <p style={{color:"#7B4A1E",fontSize:16,marginBottom:36,lineHeight:1.6}}>Para pedidos personalizados, postres de eventos especiales o cualquier consulta — Agustín te responde.</p>
        <div className="card" style={{padding:40,width:"100%",display:"inline-block"}}>
          <div style={{fontSize:46,marginBottom:14}}>📱</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,color:"#3B1F0A",marginBottom:4}}>+506 8883-3575</div>
          <div style={{color:"#7B4A1E",fontSize:14,marginBottom:28}}>Agustín Leandro · Lunes a Viernes · 7AM – 7PM</div>
          <button className="btn bw" style={{fontSize:16,padding:"14px 32px"}} onClick={()=>wa("Hola! Vengo desde K-Prichos.com y quisiera hacer un pedido 🧡")}>
            💬 Abrir WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer(){
  return(
    <footer style={{background:"#3B1F0A",color:"#EDE0CA",padding:"48px 32px 28px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40,marginBottom:36}}>
          <div>
            <Logo/>
            <p style={{marginTop:14,fontSize:14,lineHeight:1.7,color:"#EDE0CA",maxWidth:280}}>Repostería artesanal y comidas por encargo. Cocina familiar con sazón de verdad.</p>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:12,letterSpacing:1.5,textTransform:"uppercase",color:"#F5A143",marginBottom:14}}>Menú</div>
            {[["menu","Almuerzos"],["menu","Bocadillos"],["menu","Postres"],["preorden","Pre-Orden"],["cotizador","Cotizar evento"]].map(([id,l],i)=>(
              <button key={i} onClick={()=>scr(id)} style={{display:"block",background:"none",border:"none",color:"#EDE0CA",cursor:"pointer",fontSize:13,padding:"4px 0"}}>{l}</button>
            ))}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:12,letterSpacing:1.5,textTransform:"uppercase",color:"#F5A143",marginBottom:14}}>Contacto</div>
            <div style={{fontSize:13,lineHeight:2.1}}>
              <div>📱 +506 8883-3575</div>
              <div>📍 Costa Rica</div>
              <div>⏰ Lun–Vie · 7AM–7PM</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:22,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,fontSize:12,color:"rgba(237,224,202,.45)"}}>
          <span>© {new Date().getFullYear()} K-Prichos · Repostería y Más</span>
          <span>Hecho con 🧡 para los que saben comer</span>
        </div>
      </div>
    </footer>
  );
}

/* ── CART SIDEBAR ── */
function CartSB({cart,onClose,onUpdate,onRemove}){
  const [nombre,setNombre]=useState("");
  const total=cart.reduce((s,i)=>s+i.total,0);
  const bocTot=cart.filter(i=>i.type==="bocadillo").reduce((s,i)=>s+i.qty,0);
  const platTot=cart.filter(i=>i.type==="plato").reduce((s,i)=>s+i.qty,0);
  const send=()=>{
    if(!nombre.trim())return;
    const id=newId("KP");
    const lines=cart.map(i=>`  • ${i.name}${i.details?` (${i.details})`:""} ×${i.qty} — ${fmt(i.total)}`).join("\n");
    wa(`🧡 *Nuevo pedido K-Prichos*\n*ID:* ${id}\n*Cliente:* ${nombre}\n\n*Detalle del pedido:*\n${lines}\n\n*Total estimado: ${fmt(total)}*\n\n_(Sujeto a confirmación de disponibilidad)_`);
  };
  return(
    <div className="cart-ov" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="cart-sb">
        <div style={{padding:"18px 22px",borderBottom:"1px solid #EDE0CA",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <h3 style={{color:"#3B1F0A",fontFamily:"'Playfair Display',serif"}}>🛒 Tu pedido</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:26,cursor:"pointer",color:"#7B4A1E",lineHeight:1}}>×</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 22px"}}>
          {cart.length===0?(
            <div style={{textAlign:"center",padding:"60px 20px",color:"#7B4A1E"}}>
              <div style={{fontSize:44,marginBottom:12}}>🍽️</div>
              <div style={{fontWeight:600,marginBottom:4}}>Tu carrito está vacío</div>
              <div style={{fontSize:13}}>Explorá el menú y agregá algo rico</div>
            </div>
          ):(
            <>
              {bocTot>0&&bocTot<20&&<div className="sb sbr" style={{marginBottom:14,width:"100%",borderRadius:10,fontSize:12}}>⚠️ Bocadillos requieren mín. 20 piezas ({bocTot} actualmente)</div>}
              {platTot>0&&platTot<6&&<div className="sb sbr" style={{marginBottom:14,width:"100%",borderRadius:10,fontSize:12}}>⚠️ Platos requieren mín. 6 ({platTot} actualmente)</div>}
              {cart.map(item=>(
                <div key={item.id} style={{borderBottom:"1px solid #EDE0CA",paddingBottom:14,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:"#3B1F0A",marginBottom:2}}>{item.name}</div>
                      {item.details&&<div style={{fontSize:11,color:"#7B4A1E",marginBottom:8}}>{item.details}</div>}
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div className="ctr">
                          <button className="cb" style={{width:26,height:26,fontSize:14}} onClick={()=>onUpdate(item.id,item.qty-1)}>−</button>
                          <span style={{fontSize:14,fontWeight:700,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                          <button className="cb" style={{width:26,height:26,fontSize:14}} onClick={()=>onUpdate(item.id,item.qty+1)}>+</button>
                        </div>
                        <span style={{fontSize:12,color:"#7B4A1E"}}>× {fmt(item.unitPrice)}</span>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontWeight:700,color:"#E8710A",fontSize:14}}>{fmt(item.total)}</div>
                      <button onClick={()=>onRemove(item.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:"#991B1B",marginTop:4}}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {cart.length>0&&(
          <div style={{padding:"18px 22px",borderTop:"1px solid #EDE0CA",flexShrink:0,background:"#FAF3E8"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <span style={{fontWeight:600,color:"#3B1F0A"}}>Total estimado</span>
              <span style={{fontWeight:700,fontSize:20,color:"#E8710A"}}>{fmt(total)}</span>
            </div>
            <input className="inp" placeholder="Tu nombre *" value={nombre} onChange={e=>setNombre(e.target.value)} style={{marginBottom:10}}/>
            <button className="btn bw" style={{width:"100%",justifyContent:"center"}} disabled={!nombre.trim()} onClick={send}>
              📱 Enviar pedido por WhatsApp
            </button>
            <div style={{fontSize:11,color:"#7B4A1E",textAlign:"center",marginTop:8,lineHeight:1.5}}>Se abrirá WhatsApp con el detalle completo para coordinar con Agustín.</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── APP ── */
export default function App(){
  const [cart,setCart]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);

  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=CSS;
    document.head.appendChild(s);
    return()=>{try{document.head.removeChild(s)}catch(e){}};
  },[]);

  const addItem=item=>setCart(p=>[...p,item]);
  const updItem=(id,qty)=>{
    if(qty<=0)setCart(p=>p.filter(i=>i.id!==id));
    else setCart(p=>p.map(i=>i.id===id?{...i,qty,total:i.unitPrice*qty}:i));
  };
  const remItem=id=>setCart(p=>p.filter(i=>i.id!==id));
  const count=cart.length;
  const cartTotal=cart.reduce((s,i)=>s+i.total,0);

  return(
    <div>
      <Navbar count={count} onCart={()=>setCartOpen(true)}/>
      <Hero/>
      <MenuStore onAdd={addItem}/>
      <PreOrden/>
      <Cotizador/>
      <Nosotros/>
      <Contacto/>
      <Footer/>
      {count>0&&!cartOpen&&(
        <button className="fab" onClick={()=>setCartOpen(true)}>
          🛒 {count} item{count!==1?"s":""} · {fmt(cartTotal)}
        </button>
      )}
      {cartOpen&&(
        <CartSB cart={cart} onClose={()=>setCartOpen(false)} onUpdate={updItem} onRemove={remItem}/>
      )}
    </div>
  );
}
