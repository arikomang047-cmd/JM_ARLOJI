import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Search, Menu, X, Instagram, ArrowRight, MessageCircle,
  ChevronRight, Plus, Minus, Trash2, CheckCircle2, AlertCircle,
  ArrowLeft, LayoutDashboard, Package, Edit, PlusCircle, SlidersHorizontal,
  ExternalLink, Tag, TikTok
} from "lucide-react";

const siteConfig = {
  name: "JM ARLOJI",
  tagline: "Timeless Style. Signature Detail.",
  whatsappNumber: "6281274203647",
  instagramUrl: "https://www.instagram.com/jm_arloji?igsi=OGRvdml6Z3Rma2wy",
  tiktokUrl: "https://www.tiktok.com/@jm_arlojii?_r=1&_t=ZS-998Q2XBBTOB",
};

const demoProducts = [
  {id:"w-01",sku:"JM-WCH-001",name:"Chronograph Obsidian Master",category:"WATCHES",brand:"JM Signature",price:8500000,originalPrice:10000000,stock:5,minStock:2,image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=900&auto=format&fit=crop",description:"Chronograph premium dengan karakter hitam obsidian dan aksen champagne gold.",bestSeller:true,newArrival:false,sale:true},
  {id:"w-02",sku:"JM-WCH-002",name:"Classic Minimalist Gold",category:"WATCHES",brand:"Aura Luxe",price:6200000,originalPrice:6200000,stock:2,minStock:3,image:"https://images.unsplash.com/photo-1524592094714-0f0654ece975?q=80&w=900&auto=format&fit=crop",description:"Desain minimalis modern untuk tampilan formal maupun casual.",bestSeller:false,newArrival:true,sale:false},
  {id:"e-01",sku:"JM-EYE-001",name:"Aura Signature Shades",category:"EYEWEAR",brand:"JM Optics",price:3400000,originalPrice:4200000,stock:8,minStock:2,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=900&auto=format&fit=crop",description:"Kacamata premium dengan frame ringan dan tampilan eksklusif.",bestSeller:true,newArrival:false,sale:true},
  {id:"w-03",sku:"JM-WCH-003",name:"Nocturne Diver Pro",category:"WATCHES",brand:"JM Signature",price:12500000,originalPrice:12500000,stock:0,minStock:2,image:"https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=900&auto=format&fit=crop",description:"Diver watch berkarakter kuat untuk pecinta gaya sporty-luxury.",bestSeller:true,newArrival:false,sale:false},
  {id:"e-02",sku:"JM-EYE-002",name:"Eclipse Aviator Gold",category:"EYEWEAR",brand:"Aura Luxe",price:4100000,originalPrice:4100000,stock:3,minStock:3,image:"https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=900&auto=format&fit=crop",description:"Aviator klasik dengan sentuhan gold modern.",bestSeller:true,newArrival:true,sale:false},
  {id:"w-04",sku:"JM-WCH-004",name:"Royal Heritage Skeleton",category:"WATCHES",brand:"JM Signature",price:15800000,originalPrice:18500000,stock:1,minStock:2,image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",description:"Skeleton watch elegan yang menonjolkan detail mekanis.",bestSeller:false,newArrival:true,sale:true},
  {id:"e-03",sku:"JM-EYE-003",name:"Vogue Round Tortoiseshell",category:"EYEWEAR",brand:"JM Optics",price:2900000,originalPrice:2900000,stock:6,minStock:2,image:"https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=900&auto=format&fit=crop",description:"Frame round klasik untuk gaya artistik.",bestSeller:false,newArrival:true,sale:false}
];

const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);
const stockInfo = (stock,minStock=2) => {
  const s=Number(stock)||0, m=Number(minStock)||2;
  if(s===0) return {label:"HABIS",tone:"red",available:false};
  if(s<=m) return {label:"STOK TERBATAS",tone:"amber",available:true};
  return {label:"READY STOCK",tone:"green",available:true};
};
const discount = (price,original) => original>price ? Math.round((1-price/original)*100) : 0;
const wa = message => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

function Button({children,onClick,href,variant="primary",disabled=false,className=""}) {
  const styles = {
    primary:"bg-[#D4AF37] text-black hover:bg-[#f3d36a]",
    secondary:"border border-white/15 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]",
    ghost:"text-white hover:text-[#D4AF37]",
    danger:"bg-red-600 text-white hover:bg-red-500"
  };
  const cls=`inline-flex items-center justify-center gap-2 px-5 py-3 text-xs tracking-[.18em] uppercase transition rounded-sm ${disabled?"bg-[#222] text-[#666] cursor-not-allowed":styles[variant]} ${className}`;
  if(href) return <a className={cls} href={disabled?undefined:href} target="_blank" rel="noreferrer">{children}</a>;
  return <button className={cls} onClick={onClick} disabled={disabled}>{children}</button>;
}

function ProductCard({p,onOpen,onAdd}) {
  const st=stockInfo(p.stock,p.minStock), d=discount(p.price,p.originalPrice);
  return <motion.article whileHover={{y:-6}} className="group bg-[#111] border border-white/8 rounded-xl overflow-hidden">
    <div className="relative aspect-[4/5] overflow-hidden">
      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>
      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
        {p.sale && d>0 && <span className="px-2 py-1 text-[9px] tracking-widest bg-[#D4AF37] text-black">SALE {d}%</span>}
        <span className={`px-2 py-1 text-[9px] tracking-widest border ${st.tone==="red"?"bg-red-500/20 text-red-300 border-red-400/20":st.tone==="amber"?"bg-amber-500/20 text-amber-200 border-amber-400/20":"bg-emerald-500/20 text-emerald-200 border-emerald-400/20"}`}>{st.label}</span>
      </div>
      <button onClick={()=>onOpen(p)} className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition">
        <ArrowRight size={18}/>
      </button>
    </div>
    <div className="p-5">
      <p className="text-[10px] tracking-[.2em] text-[#D4AF37]">{p.category} · {p.brand}</p>
      <h3 className="font-serif text-2xl mt-2">{p.name}</h3>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-semibold">{rupiah(p.price)}</span>
        {d>0 && <span className="text-xs text-white/35 line-through">{rupiah(p.originalPrice)}</span>}
      </div>
      <Button className="w-full mt-5" disabled={!st.available} onClick={()=>onAdd(p)}>
        {st.available ? "Tambah ke Keranjang" : "Stok Habis"}
      </Button>
    </div>
  </motion.article>
}

function Admin({products,setProducts,toast}) {
  const blank={id:"",sku:"",name:"",category:"WATCHES",brand:"",price:0,originalPrice:0,stock:0,minStock:2,image:"",description:"",bestSeller:false,newArrival:false,sale:false};
  const [editing,setEditing]=useState(null), [form,setForm]=useState(blank), [q,setQ]=useState("");
  const filtered=useMemo(()=>products.filter(p=>(p.name+" "+p.sku+" "+p.brand).toLowerCase().includes(q.toLowerCase())),[products,q]);
  const save=()=>{
    if(!form.name.trim()||!form.sku.trim()||Number(form.price)<0) return toast("Lengkapi nama, SKU, dan harga.");
    const item={...form,id:form.id||`jm-${Date.now()}`,price:Number(form.price),originalPrice:Number(form.originalPrice||form.price),stock:Math.max(0,Number(form.stock)||0),minStock:Math.max(0,Number(form.minStock)||0)};
    setProducts(prev=>form.id?prev.map(x=>x.id===form.id?item:x):[...prev,item]);
    toast(form.id?"Produk diperbarui":"Produk ditambahkan"); setEditing(null); setForm(blank);
  };
  const edit=p=>{setForm(p);setEditing(p.id)};
  const remove=id=>{if(confirm("Hapus produk ini?")){setProducts(prev=>prev.filter(p=>p.id!==id));toast("Produk dihapus")}};
  const stats={total:products.length,ready:products.filter(p=>stockInfo(p.stock,p.minStock).tone==="green").length,limited:products.filter(p=>stockInfo(p.stock,p.minStock).tone==="amber").length,out:products.filter(p=>!p.stock).length};
  return <div className="max-w-7xl mx-auto px-5 md:px-10 py-28">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
      <div><p className="text-[#D4AF37] text-xs tracking-[.2em]">BACK OFFICE</p><h1 className="font-serif text-5xl">Admin Produk</h1></div>
      <Button onClick={()=>{setEditing("new");setForm(blank)}}><PlusCircle size={16}/> Tambah Produk</Button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {[["TOTAL",stats.total],["READY",stats.ready],["TERBATAS",stats.limited],["HABIS",stats.out]].map(([a,b])=><div key={a} className="bg-[#111] border border-white/8 rounded-xl p-5"><p className="text-[10px] tracking-widest text-white/40">{a}</p><p className="text-3xl font-serif mt-2">{b}</p></div>)}
    </div>
    <div className="flex gap-3 mb-6"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari nama, SKU, brand..." className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#D4AF37]"/></div></div>
    <div className="space-y-3">
      {filtered.map(p=>{const s=stockInfo(p.stock,p.minStock);return <div key={p.id} className="bg-[#111] border border-white/8 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
        <img src={p.image} className="w-20 h-20 object-cover rounded-lg" alt=""/>
        <div className="flex-1"><p className="text-[10px] text-[#D4AF37] tracking-widest">{p.sku} · {p.category}</p><h3 className="font-serif text-xl">{p.name}</h3><p className="text-sm text-white/55">{rupiah(p.price)} · Stok {p.stock}</p></div>
        <span className="text-[9px] tracking-widest px-2 py-1 border rounded">{s.label}</span>
        <div className="flex gap-2"><Button variant="secondary" onClick={()=>edit(p)}><Edit size={14}/> Edit</Button><Button variant="danger" onClick={()=>remove(p.id)}><Trash2 size={14}/></Button></div>
      </div>})}
    </div>
    <AnimatePresence>{editing&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur p-4 flex items-center justify-center">
      <motion.div initial={{y:30,scale:.98}} animate={{y:0,scale:1}} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6"><h2 className="font-serif text-3xl">{editing==="new"?"Tambah Produk":"Edit Produk"}</h2><button onClick={()=>setEditing(null)}><X/></button></div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["name","Nama Produk","text"],["sku","SKU","text"],["brand","Brand","text"],["price","Harga Jual","number"],["originalPrice","Harga Normal","number"],["stock","Stok","number"],["minStock","Minimum Stok","number"],["image","URL Gambar","text"]
          ].map(([k,l,t])=><label key={k} className="text-xs text-white/60">{l}<input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="mt-2 w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-3 text-white outline-none focus:border-[#D4AF37]"/></label>)}
          <label className="text-xs text-white/60">Kategori<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="mt-2 w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-3"><option>WATCHES</option><option>EYEWEAR</option></select></label>
          <label className="text-xs text-white/60 md:col-span-2">Deskripsi<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="mt-2 w-full h-24 bg-[#181818] border border-white/10 rounded-lg px-3 py-3"/></label>
          <div className="md:col-span-2 flex flex-wrap gap-4 text-sm">{["bestSeller","newArrival","sale"].map(k=><label key={k} className="flex items-center gap-2"><input type="checkbox" checked={!!form[k]} onChange={e=>setForm({...form,[k]:e.target.checked})}/>{k}</label>)}</div>
        </div>
        <Button className="w-full mt-6" onClick={save}>Simpan Produk</Button>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </div>
}

function Cart({cart,setCart,onClose,onCheckout}) {
  const total=cart.reduce((s,i)=>s+i.price*i.quantity,0);
  const change=(id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,quantity:Math.max(1,i.quantity+d)}:i));
  return <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed right-0 top-0 bottom-0 z-[90] w-full sm:max-w-md bg-[#0c0c0c] border-l border-white/10 p-6 overflow-y-auto">
    <div className="flex justify-between items-center mb-8"><h2 className="font-serif text-3xl">Keranjang</h2><button onClick={onClose}><X/></button></div>
    {!cart.length?<div className="text-center py-20 text-white/45"><ShoppingBag className="mx-auto mb-4" size={38}/><p>Keranjang masih kosong.</p></div>:
      <><div className="space-y-5">{cart.map(i=><div key={i.id} className="flex gap-3 border-b border-white/8 pb-5"><img src={i.image} className="w-20 h-24 object-cover rounded-lg" alt=""/><div className="flex-1"><h3 className="font-serif text-lg">{i.name}</h3><p className="text-sm">{rupiah(i.price)}</p><div className="flex items-center gap-3 mt-3"><button onClick={()=>change(i.id,-1)}><Minus size={15}/></button><span>{i.quantity}</span><button onClick={()=>change(i.id,1)}><Plus size={15}/></button><button onClick={()=>setCart(prev=>prev.filter(x=>x.id!==i.id))} className="ml-auto text-red-400"><Trash2 size={15}/></button></div></div></div>)}</div>
      <div className="mt-8 border-t border-white/10 pt-5 flex justify-between text-lg"><span>Total</span><strong>{rupiah(total)}</strong></div>
      <Button className="w-full mt-5" onClick={onCheckout}>Checkout via WhatsApp</Button></>}
  </motion.aside>
}

export default function App(){
  const [products,setProducts]=useState(()=>{try{return JSON.parse(localStorage.getItem("jm-arloji-products"))||demoProducts}catch{return demoProducts}});
  const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem("jm-arloji-cart"))||[]}catch{return []}});
  const [page,setPage]=useState("home"), [selected,setSelected]=useState(null), [cartOpen,setCartOpen]=useState(false), [search,setSearch]=useState(""), [toastMsg,setToastMsg]=useState("");

  useEffect(()=>localStorage.setItem("jm-arloji-products",JSON.stringify(products)),[products]);
  useEffect(()=>localStorage.setItem("jm-arloji-cart",JSON.stringify(cart)),[cart]);

  const toast=m=>{setToastMsg(m);setTimeout(()=>setToastMsg(""),2600)};
  const add=p=>{
    const s=stockInfo(p.stock,p.minStock); if(!s.available)return toast("Produk sedang habis.");
    setCart(prev=>{const old=prev.find(i=>i.id===p.id);if(old&&old.quantity>=p.stock){toast("Jumlah melebihi stok tersedia.");return prev}return old?prev.map(i=>i.id===p.id?{...i,quantity:i.quantity+1,price:p.price}:i):[...prev,{id:p.id,name:p.name,image:p.image,price:p.price,quantity:1,sku:p.sku}]});
    toast("Produk masuk keranjang");
  };
  const checkout=()=>{
    if(!cart.length)return;
    const total=cart.reduce((s,i)=>s+i.price*i.quantity,0);
    const id=`JM-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${Math.floor(1000+Math.random()*9000)}`;
    const lines=cart.map(i=>`${i.name}\nSKU: ${i.sku}\nQty: ${i.quantity}\nHarga: ${rupiah(i.price)}\nSubtotal: ${rupiah(i.price*i.quantity)}`).join("\n\n");
    window.open(wa(`Halo JM ARLOJI,\n\nSaya ingin melakukan pemesanan.\nOrder ID: ${id}\n\n${lines}\n\nTOTAL: ${rupiah(total)}\n\nMohon konfirmasi ketersediaannya. Terima kasih.`),"_blank");
  };

  const categories=["ALL","WATCHES","EYEWEAR","BEST SELLER","NEW ARRIVAL","SALE"];
  const visible=products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.brand.toLowerCase().includes(search.toLowerCase())||p.sku.toLowerCase().includes(search.toLowerCase()));
  const featured=visible.filter(p=>p.stock>0);

  return <div className="min-h-screen bg-[#080808] text-white">
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');body{margin:0;background:#080808;color:white;font-family:Inter,sans-serif}h1,h2,h3,h4{font-family:'Cormorant Garamond',serif}button,input,textarea,select{font:inherit}*{box-sizing:border-box}`}</style>
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/85 backdrop-blur-xl border-b border-white/8">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
        <button onClick={()=>setPage("home")} className="font-serif text-2xl tracking-[.15em]">JM <span className="text-[#D4AF37]">ARLOJI</span></button>
        <nav className="hidden md:flex gap-7 text-xs tracking-[.15em] text-white/60">
          {["home","watches","eyewear","collection","admin"].map(x=><button key={x} onClick={()=>setPage(x)} className={page===x?"text-[#D4AF37]":""}>{x==="home"?"HOME":x==="admin"?"ADMIN":x.toUpperCase()}</button>)}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={()=>setSearch(search?"":" ")}><Search size={20}/></button>
          <button onClick={()=>setCartOpen(true)} className="relative"><ShoppingBag size={20}/>{cart.length>0&&<span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[9px] flex items-center justify-center">{cart.reduce((s,i)=>s+i.quantity,0)}</span>}</button>
          <button className="md:hidden" onClick={()=>setPage("collection")}><Menu size={22}/></button>
        </div>
      </div>
    </header>

    {page==="admin"?<Admin products={products} setProducts={setProducts} toast={toast}/>:selected?
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-32">
        <button onClick={()=>setSelected(null)} className="flex items-center gap-2 text-white/60 hover:text-white mb-8"><ArrowLeft size={16}/> Kembali</button>
        <div className="grid md:grid-cols-2 gap-10">
          <img src={selected.image} className="w-full aspect-square object-cover rounded-2xl border border-white/10" alt=""/>
          <div className="flex flex-col justify-center"><p className="text-[#D4AF37] text-xs tracking-[.2em]">{selected.category} · {selected.brand}</p><h1 className="text-5xl md:text-6xl mt-3">{selected.name}</h1><p className="text-white/60 mt-5 leading-7">{selected.description}</p><div className="text-2xl mt-7">{rupiah(selected.price)} {discount(selected.price,selected.originalPrice)>0&&<span className="text-sm text-white/30 line-through">{rupiah(selected.originalPrice)}</span>}</div><div className="flex gap-3 mt-7"><Button disabled={!stockInfo(selected.stock,selected.minStock).available} onClick={()=>add(selected)}>Tambah ke Keranjang</Button><Button variant="secondary" href={wa(`Halo JM ARLOJI, saya tertarik dengan ${selected.name} (${selected.sku}) seharga ${rupiah(selected.price)}. Apakah masih tersedia?`)}><MessageCircle size={16}/> WhatsApp</Button></div></div>
        </div>
      </div>:
      <main className="pt-20">
        {page==="home"&&<section className="min-h-[78vh] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(212,175,55,.16),transparent_35%),linear-gradient(120deg,#080808,#12100b,#080808)]"/>
          <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-28 grid md:grid-cols-2 gap-10 items-center">
            <div><p className="text-[#D4AF37] text-xs tracking-[.3em] mb-5">JM ARLOJI · PREMIUM COLLECTION</p><h1 className="text-6xl md:text-8xl leading-[.85]">Timeless<br/><span className="gold-gradient-text">Elegance.</span></h1><p className="mt-7 max-w-lg text-white/55 leading-7">{siteConfig.tagline} Koleksi jam tangan dan kacamata dengan karakter elegan untuk setiap momen.</p><div className="flex flex-wrap gap-3 mt-8"><Button onClick={()=>setPage("watches")}>Explore Watches <ArrowRight size={16}/></Button><Button variant="secondary" onClick={()=>setPage("eyewear")}>Explore Eyewear</Button></div></div>
            <div className="relative"><div className="absolute inset-5 rounded-full bg-[#D4AF37]/10 blur-3xl"/><motion.img animate={{y:[0,-10,0],rotate:[0,1,-1,0]}} transition={{duration:6,repeat:Infinity}} src={products[0]?.image} className="relative w-full max-w-xl mx-auto rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,.8)] border border-white/10" alt="JM ARLOJI"/></div>
          </div>
        </section>}
        {page!=="home"&&<section className="max-w-7xl mx-auto px-5 md:px-10 py-20"><div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10"><div><p className="text-[#D4AF37] text-xs tracking-[.2em]">JM ARLOJI</p><h1 className="text-5xl">{page==="collection"?"The Collection":page==="watches"?"Watches":"Eyewear"}</h1></div><div className="flex gap-2 overflow-x-auto">{categories.map(c=><button key={c} onClick={()=>setSearch(c==="ALL"?"":c==="WATCHES"?"":c==="EYEWEAR"?"":c==="SALE"?"sale":c==="BEST SELLER"?"best":"new")} className="px-4 py-2 text-[10px] tracking-widest border border-white/10 rounded-full whitespace-nowrap">{c}</button>)}</div></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{products.filter(p=>page==="watches"?p.category==="WATCHES":page==="eyewear"?p.category==="EYEWEAR":true).map(p=><ProductCard key={p.id} p={p} onOpen={setSelected} onAdd={add}/>)}</div></section>}
        {page==="home"&&<section className="max-w-7xl mx-auto px-5 md:px-10 py-20"><div className="flex justify-between items-end mb-8"><div><p className="text-[#D4AF37] text-xs tracking-[.2em]">CURATED FOR YOU</p><h2 className="text-4xl">Featured Collection</h2></div><button onClick={()=>setPage("collection")} className="text-xs tracking-widest text-white/50 hover:text-[#D4AF37]">VIEW ALL <ChevronRight size={14} className="inline"/></button></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{featured.slice(0,4).map(p=><ProductCard key={p.id} p={p} onOpen={setSelected} onAdd={add}/>)}</div></section>}
      </main>}

    <footer className="border-t border-white/8 mt-20"><div className="max-w-7xl mx-auto px-5 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-8"><div><div className="font-serif text-2xl">JM <span className="text-[#D4AF37]">ARLOJI</span></div><p className="text-white/40 text-sm mt-2">{siteConfig.tagline}</p></div><div className="flex gap-4"><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Instagram/></a><a href={siteConfig.tiktokUrl} target="_blank" rel="noreferrer"><span className="text-xl">♪</span></a><a href={wa("Halo JM ARLOJI, saya ingin bertanya tentang koleksi.")} target="_blank" rel="noreferrer"><MessageCircle/></a></div></div></footer>

    <AnimatePresence>{cartOpen&&<Cart cart={cart} setCart={setCart} onClose={()=>setCartOpen(false)} onCheckout={checkout}/>}</AnimatePresence>
    <AnimatePresence>{toastMsg&&<motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] bg-[#151515] border border-[#D4AF37]/30 px-5 py-3 rounded-lg flex items-center gap-3 shadow-2xl"><CheckCircle2 size={18} className="text-[#D4AF37]"/><span className="text-sm">{toastMsg}</span></motion.div>}</AnimatePresence>
  </div>
}
