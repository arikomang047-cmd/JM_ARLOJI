import React, { useMemo, useState } from "react";
import { Search, ShoppingBag, Menu, X, ArrowRight, MessageCircle, Trash2, Plus, Minus, Instagram, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const CONFIG = {
  name: "JM ARLOJI",
  tagline: "Timeless Style. Signature Detail.",
  whatsapp: "6281274203647",
  instagram: "https://www.instagram.com/jm_arloji?igsi=OGRvdml6Z3Rma2wy",
  tiktok: "https://www.tiktok.com/@jm_arlojii?_r=1&_t=ZS-998Q2XBBTOB"
};

const PRODUCTS = [
  ["w-01","JM-WCH-001","Chronograph Obsidian Master","WATCHES","JM Signature",8500000,10000000,5,"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=900&auto=format&fit=crop","Jam tangan chronograph mewah dengan balutan hitam obsidian dan aksen champagne gold."],
  ["w-02","JM-WCH-002","Classic Minimalist Gold","WATCHES","Aura Luxe",6200000,6200000,2,"https://images.unsplash.com/photo-1524592094714-0f0654ece975?q=80&w=900&auto=format&fit=crop","Desain minimalis modern dengan nuansa emas dan strap kulit premium."],
  ["e-01","JM-EYE-001","Aura Signature Shades","EYEWEAR","JM Optics",3400000,4200000,8,"https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=900&auto=format&fit=crop","Kacamata eksklusif dengan bingkai ringan dan lensa terpolarisasi."],
  ["w-03","JM-WCH-003","Nocturne Diver Pro","WATCHES","JM Signature",12500000,12500000,0,"https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=900&auto=format&fit=crop","Jam tangan diver profesional dengan karakter sporty dan elegan."],
  ["e-02","JM-EYE-002","Eclipse Aviator Gold","EYEWEAR","Aura Luxe",4100000,4100000,3,"https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=900&auto=format&fit=crop","Model aviator klasik dengan sentuhan mewah modern."],
  ["w-04","JM-WCH-004","Royal Heritage Skeleton","WATCHES","JM Signature",15800000,18500000,1,"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop","Jam skeleton elegan yang menonjolkan keindahan mekanis."],
  ["e-03","JM-EYE-003","Vogue Round Tortoiseshell","EYEWEAR","JM Optics",2900000,2900000,6,"https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=900&auto=format&fit=crop","Kacamata bundar bergaya klasik dengan karakter artistik."]
].map(([id,sku,name,category,brand,price,originalPrice,stock,image,description]) => ({id,sku,name,category,brand,price,originalPrice,stock,image,description}));

const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
const wa = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function ProductCard({p,onOpen,onAdd}) {
  const discount = p.originalPrice > p.price ? Math.round((1-p.price/p.originalPrice)*100) : 0;
  return <motion.article layout whileHover={{y:-5}} className="card">
    <div className="image-wrap" onClick={()=>onOpen(p)}>
      <img src={p.image} alt={p.name}/>
      {discount>0 && <span className="badge">-{discount}%</span>}
      <span className={`stock ${p.stock===0?"out":p.stock<=2?"limited":""}`}>{p.stock===0?"HABIS":p.stock<=2?"STOK TERBATAS":"READY STOCK"}</span>
    </div>
    <div className="card-body">
      <small>{p.category} · {p.brand}</small>
      <h3 onClick={()=>onOpen(p)}>{p.name}</h3>
      <div className="price">{rupiah(p.price)} {p.originalPrice>p.price && <del>{rupiah(p.originalPrice)}</del>}</div>
      <button className="gold-btn" disabled={!p.stock} onClick={()=>onAdd(p)}>{p.stock?"TAMBAH KE TAS":"CEK KETERSEDIAAN"}</button>
    </div>
  </motion.article>
}

function App(){
  const [page,setPage]=useState("home");
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("ALL");
  const [cart,setCart]=useState([]);
  const [selected,setSelected]=useState(null);
  const [menu,setMenu]=useState(false);

  const visible=useMemo(()=>PRODUCTS.filter(p=>
    (category==="ALL"||p.category===category) &&
    (!query||`${p.name} ${p.brand} ${p.sku} ${p.category}`.toLowerCase().includes(query.toLowerCase()))
  ),[category,query]);

  const add=p=>setCart(c=>{const x=c.find(i=>i.id===p.id); return x?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]});
  const change=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty));
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);

  return <div>
    <header className="nav">
      <button className="logo" onClick={()=>setPage("home")}>JM <b>ARLOJI</b></button>
      <nav>
        {["home","watches","eyewear","collection"].map(x=><button key={x} className={page===x?"active":""} onClick={()=>{setPage(x);setCategory(x==="watches"?"WATCHES":x==="eyewear"?"EYEWEAR":"ALL")}}>{x==="home"?"HOME":x.toUpperCase()}</button>)}
      </nav>
      <div className="nav-actions">
        <input aria-label="Cari produk" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari..."/>
        <button onClick={()=>setCart(c=>c)} className="cart-btn"><ShoppingBag size={21}/><span>{cart.reduce((s,i)=>s+i.qty,0)}</span></button>
        <button className="mobile-menu" onClick={()=>setMenu(true)}><Menu/></button>
      </div>
    </header>

    <AnimatePresence>{menu&&<motion.div className="mobile-panel" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}>
      <button onClick={()=>setMenu(false)}><X/></button>
      {["home","watches","eyewear","collection"].map(x=><button key={x} onClick={()=>{setPage(x);setCategory(x==="watches"?"WATCHES":x==="eyewear"?"EYEWEAR":"ALL");setMenu(false)}}>{x.toUpperCase()}</button>)}
      <a href={CONFIG.instagram} target="_blank">INSTAGRAM <ExternalLink size={15}/></a>
      <a href={CONFIG.tiktok} target="_blank">TIKTOK <ExternalLink size={15}/></a>
    </motion.div>}</AnimatePresence>

    {page==="home" && <section className="hero">
      <div className="hero-overlay"/>
      <div className="hero-content">
        <p>EST. JM ARLOJI</p><h1>TIMELESS<br/><em>STYLE.</em></h1>
        <p className="tagline">{CONFIG.tagline}</p>
        <button className="gold-btn wide" onClick={()=>{setPage("collection");setCategory("ALL")}}>EXPLORE COLLECTION <ArrowRight size={17}/></button>
      </div>
    </section>}

    <main>
      {page==="home" && <section className="intro"><p className="eyebrow">CURATED FOR YOU</p><h2>Signature Collection</h2><p>Jam tangan dan eyewear pilihan untuk melengkapi karakter dan gaya Anda.</p></section>}
      <section className="products">
        <div className="section-head"><div><p className="eyebrow">{page==="home"?"FEATURED":"COLLECTION"}</p><h2>{category==="ALL"?"Semua Koleksi":category}</h2></div>
          <div className="filters"><button className={category==="ALL"?"selected":""} onClick={()=>setCategory("ALL")}>ALL</button><button className={category==="WATCHES"?"selected":""} onClick={()=>setCategory("WATCHES")}>WATCHES</button><button className={category==="EYEWEAR"?"selected":""} onClick={()=>setCategory("EYEWEAR")}>EYEWEAR</button></div>
        </div>
        <div className="grid">{visible.map(p=><ProductCard key={p.id} p={p} onOpen={setSelected} onAdd={add}/>)}</div>
      </section>
    </main>

    <footer><div><div className="logo">JM <b>ARLOJI</b></div><p>{CONFIG.tagline}</p></div><div className="social"><a href={CONFIG.instagram} target="_blank"><Instagram/></a><a href={CONFIG.tiktok} target="_blank">TikTok</a><a href={wa("Halo JM ARLOJI, saya ingin bertanya tentang koleksi.")} target="_blank"><MessageCircle/></a></div><small>© {new Date().getFullYear()} JM ARLOJI. All rights reserved.</small></footer>

    <AnimatePresence>{selected&&<motion.div className="modal-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="modal" onClick={e=>e.stopPropagation()} initial={{y:30}} animate={{y:0}}>
      <button className="close" onClick={()=>setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-info"><small>{selected.category} · {selected.brand}</small><h2>{selected.name}</h2><div className="price">{rupiah(selected.price)}</div><p>{selected.description}</p><p className="stockline">Stok: <b>{selected.stock>0?selected.stock+" unit":"Habis"}</b></p>{selected.stock>0?<button className="gold-btn wide" onClick={()=>{add(selected);setSelected(null)}}>TAMBAH KE TAS</button>:<a className="gold-btn wide center" href={wa(`Halo JM ARLOJI, saya tertarik dengan ${selected.name}. Apakah akan tersedia kembali?`)} target="_blank">TANYAKAN KETERSEDIAAN</a>}</div>
    </motion.div></motion.div>}</AnimatePresence>

    <div className="cart-drawer"><input type="checkbox" id="cartToggle"/><label htmlFor="cartToggle" className="cart-fab"><ShoppingBag/><span>{cart.reduce((s,i)=>s+i.qty,0)}</span></label><label htmlFor="cartToggle" className="cart-backdrop"></label><aside><label htmlFor="cartToggle" className="drawer-close"><X/></label><h2>Tas Belanja</h2>{cart.length===0?<p className="empty">Tas masih kosong.</p>:<>{cart.map(i=><div className="cart-item" key={i.id}><img src={i.image} alt=""/><div><b>{i.name}</b><small>{rupiah(i.price)}</small><div><button onClick={()=>change(i.id,-1)}><Minus/></button><span>{i.qty}</span><button onClick={()=>change(i.id,1)}><Plus/></button><button onClick={()=>setCart(c=>c.filter(x=>x.id!==i.id))}><Trash2/></button></div></div></div>)}<div className="cart-total"><span>Total</span><b>{rupiah(total)}</b></div><a className="gold-btn wide center" href={wa(`Halo JM ARLOJI,\n\nSaya ingin order:\n${cart.map(i=>`- ${i.name} x${i.qty} = ${rupiah(i.price*i.qty)}`).join("\n")}\n\nTotal: ${rupiah(total)}`)} target="_blank">ORDER VIA WHATSAPP</a></>}</aside></div>
  </div>
}
export default App;
