const products=[
{id:1,name:"Mie Ayam Special",cat:"Makanan",price:18000,emoji:"🍜",desc:"Mie kenyal, ayam gurih, sawi dan pangsit."},
{id:2,name:"Nasi Goreng",cat:"Makanan",price:22000,emoji:"🍚",desc:"Nasi goreng spesial dengan telur dan ayam."},
{id:3,name:"Ayam Geprek",cat:"Makanan",price:23000,emoji:"🍗",desc:"Ayam crispy dengan sambal pilihan."},
{id:4,name:"Es Kopi Susu",cat:"Minuman",price:15000,emoji:"🧋",desc:"Kopi susu creamy dengan rasa seimbang."},
{id:5,name:"Es Teh Manis",cat:"Minuman",price:6000,emoji:"🥤",desc:"Teh manis dingin yang menyegarkan."},
{id:6,name:"Jus Alpukat",cat:"Minuman",price:14000,emoji:"🥑",desc:"Alpukat segar dengan susu dan es."},
{id:7,name:"Pisang Coklat",cat:"Snack",price:12000,emoji:"🍌",desc:"Pisang crispy dengan coklat leleh."},
{id:8,name:"Kentang Goreng",cat:"Snack",price:13000,emoji:"🍟",desc:"Kentang renyah dengan saus pilihan."}
];
let cart={};let activeCat="Semua";
const money=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const menuItems=document.getElementById('menuItems');
function renderMenu(){const q=document.getElementById('search').value.toLowerCase();const list=products.filter(p=>(activeCat==="Semua"||p.cat===activeCat)&&p.name.toLowerCase().includes(q));menuItems.innerHTML=list.map(p=>`<article class="menu-item"><div class="menu-photo">${p.emoji}</div><div class="menu-info"><h3>${p.name}</h3><p>${p.desc}</p><span class="menu-price">${money(p.price)}</span></div><button class="add-btn" onclick="add(${p.id})">+</button></article>`).join('')||'<p style="color:#8993a3;font-size:12px">Menu tidak ditemukan.</p>'}
function add(id){cart[id]=(cart[id]||0)+1;renderCart();toast("Menu ditambahkan ke pesanan");}
function change(id,n){cart[id]=(cart[id]||0)+n;if(cart[id]<=0)delete cart[id];renderCart()}
function renderCart(){const ids=Object.keys(cart);document.getElementById('cartEmpty').style.display=ids.length?'none':'flex';document.getElementById('cartList').innerHTML=ids.map(id=>{const p=products.find(x=>x.id==id);return `<div class="cart-row"><div><b>${p.name}</b><small>${money(p.price)} / item</small><div class="qty"><button onclick="change(${p.id},-1)">−</button><span>${cart[id]}</span><button onclick="change(${p.id},1)">+</button></div></div><b>${money(p.price*cart[id])}</b></div>`}).join('');const total=ids.reduce((s,id)=>s+products.find(p=>p.id==id).price*cart[id],0);document.getElementById('total').textContent=money(total);document.getElementById('count').textContent=ids.reduce((s,id)=>s+cart[id],0)}
document.querySelectorAll('.demo-tabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.demo-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeCat=b.dataset.cat;renderMenu()}));
document.getElementById('search').addEventListener('input',renderMenu);
document.getElementById('checkout').addEventListener('click',()=>{if(!Object.keys(cart).length){toast("Pilih menu terlebih dahulu");return}toast("Pesanan demo berhasil dikirim ✓");cart={};renderCart()});
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
renderMenu();renderCart();