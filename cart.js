(function(){
  const CART_KEY='shaktiMilletsCartV1';
  let cart={};
  try{cart=JSON.parse(localStorage.getItem(CART_KEY)||'{}')||{};}catch(e){cart={};}

  const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
  const save=()=>localStorage.setItem(CART_KEY,JSON.stringify(cart));
  const getItems=()=>Object.keys(cart).map(id=>{const p=products.find(x=>String(x.id)===String(id));return p?{p,qty:Math.max(1,Number(cart[id])||1)}:null}).filter(Boolean);
  const count=()=>getItems().reduce((n,x)=>n+x.qty,0);
  const total=()=>getItems().reduce((n,x)=>n+x.p.mrp*x.qty,0);
  const makeOrderId=()=>{const d=new Date();const stamp=d.getFullYear().toString().slice(-2)+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');const rnd=Math.floor(1000+Math.random()*9000);return `SM-${stamp}-${rnd}`;};

  const style=document.createElement('style');
  style.textContent=`
  #shaktiCartBtn{position:fixed;right:24px;bottom:94px;z-index:300;width:58px;height:58px;border:0;border-radius:50%;background:#173b2b;color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.25);font-size:24px;cursor:pointer}
  #shaktiCartCount{position:absolute;right:-3px;top:-4px;min-width:22px;height:22px;padding:0 5px;border-radius:20px;background:#c4e6ad;color:#173b2b;font-size:12px;font-weight:900;display:flex;align-items:center;justify-content:center}
  #shaktiCartOverlay{position:fixed;inset:0;z-index:500;visibility:hidden;opacity:0;transition:.2s;background:rgba(8,25,17,.55);backdrop-filter:blur(3px)}
  #shaktiCartOverlay.open{visibility:visible;opacity:1}
  #shaktiCartDrawer{position:absolute;right:0;top:0;height:100%;width:min(440px,100%);background:#fffdf7;color:#263228;display:flex;flex-direction:column;box-shadow:-15px 0 50px rgba(0,0,0,.2)}
  .shakti-cart-head{display:flex;align-items:center;justify-content:space-between;padding:20px;border-bottom:1px solid #e8e1d6;background:#173b2b;color:#fff}
  .shakti-cart-head h2{font-size:22px}.shakti-cart-close{border:0;background:transparent;color:#fff;font-size:30px;cursor:pointer}
  #shaktiCartItems{flex:1;overflow:auto;padding:14px}
  .shakti-cart-item{display:grid;grid-template-columns:64px 1fr auto;gap:11px;align-items:center;padding:12px 0;border-bottom:1px solid #eee7dc}
  .shakti-cart-item img{width:64px;height:70px;object-fit:contain;background:#f2f5e9;border-radius:10px}.shakti-cart-name{font-weight:800;color:#173b2b;font-size:14px;line-height:1.25}.shakti-cart-meta{font-size:12px;color:#777266;margin-top:3px}.shakti-cart-line{font-weight:900;color:#173b2b;font-size:13px}
  .shakti-qty{display:flex;align-items:center;gap:7px;margin-top:7px}.shakti-qty button{width:26px;height:26px;border:1px solid #d9d2c7;background:#fff;border-radius:50%;cursor:pointer;font-weight:900}.shakti-qty span{min-width:18px;text-align:center;font-weight:800}.shakti-remove{border:0;background:none;color:#9a5145;font-size:11px;cursor:pointer;margin-top:4px;padding:0}
  .shakti-cart-empty{text-align:center;color:#777266;padding:50px 20px}.shakti-cart-empty strong{display:block;font-size:18px;color:#173b2b;margin-bottom:5px}
  .shakti-cart-foot{border-top:1px solid #e8e1d6;padding:17px 18px;background:#fff}.shakti-cart-total{display:flex;justify-content:space-between;font-size:20px;font-weight:900;color:#173b2b;margin-bottom:10px}.shakti-cart-note{font-size:11px;color:#777266;margin-bottom:12px}.shakti-checkout{display:block;width:100%;border:0;border-radius:25px;padding:13px;background:#25d366;color:#fff;font-weight:900;cursor:pointer;font-size:15px}.shakti-clear{display:block;margin:9px auto 0;border:0;background:none;color:#777266;font-size:12px;cursor:pointer}
  .add-cart{background:#173b2b!important;color:#fff!important}.cart-added{background:#c4e6ad!important;color:#173b2b!important}
  #shaktiCodOverlay{position:fixed;inset:0;z-index:700;visibility:hidden;opacity:0;transition:.2s;background:rgba(8,25,17,.62);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px}
  #shaktiCodOverlay.open{visibility:visible;opacity:1}
  .shakti-cod-modal{width:min(520px,100%);max-height:92vh;overflow:auto;background:#fffdf7;border-radius:20px;box-shadow:0 20px 70px rgba(0,0,0,.3);padding:22px}
  .shakti-cod-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}.shakti-cod-head h2{margin:0;color:#173b2b;font-size:22px}.shakti-cod-close{border:0;background:none;font-size:28px;cursor:pointer;color:#555}
  .shakti-cod-order{background:#eef6e8;border-radius:12px;padding:11px 13px;margin-bottom:14px;color:#173b2b;font-size:13px}.shakti-cod-order strong{font-size:16px}
  .shakti-cod-summary{background:#f7f4ec;border-radius:12px;padding:12px;margin-bottom:14px;font-size:13px}.shakti-cod-summary-row{display:flex;justify-content:space-between;gap:12px;margin:5px 0}.shakti-cod-summary-total{border-top:1px solid #ddd4c6;margin-top:9px;padding-top:9px;font-size:17px;font-weight:900;color:#173b2b}
  .shakti-cod-form{display:grid;gap:10px}.shakti-cod-form label{font-size:12px;font-weight:800;color:#4e554d}.shakti-cod-form input,.shakti-cod-form textarea{width:100%;box-sizing:border-box;border:1px solid #d8d2c7;border-radius:10px;padding:12px;background:#fff;font:inherit}.shakti-cod-form textarea{min-height:82px;resize:vertical}.shakti-cod-submit{border:0;border-radius:25px;padding:13px;background:#25d366;color:#fff;font-weight:900;font-size:15px;cursor:pointer;margin-top:3px}.shakti-cod-disclaimer{font-size:11px;color:#777266;line-height:1.45;margin:0}
  @media(max-width:600px){#shaktiCartBtn{right:18px;bottom:90px}.shakti-cart-item{grid-template-columns:56px 1fr auto}.shakti-cart-item img{width:56px;height:62px}}
  `;
  document.head.appendChild(style);

  const btn=document.createElement('button');btn.id='shaktiCartBtn';btn.type='button';btn.setAttribute('aria-label','Open shopping cart');btn.innerHTML='🛒<span id="shaktiCartCount">0</span>';document.body.appendChild(btn);
  const overlay=document.createElement('div');overlay.id='shaktiCartOverlay';overlay.innerHTML=`<aside id="shaktiCartDrawer" aria-label="Shopping cart"><div class="shakti-cart-head"><h2>🛒 Your Cart</h2><button class="shakti-cart-close" type="button" aria-label="Close cart">×</button></div><div id="shaktiCartItems"></div><div class="shakti-cart-foot"><div class="shakti-cart-total"><span>Subtotal</span><strong id="shaktiCartTotal">₹0</strong></div><div class="shakti-cart-note">Published MRP total. Delivery charges, if any, will be confirmed by Shakti Millets.</div><button class="shakti-checkout" type="button">Place COD Order</button><button class="shakti-clear" type="button">Clear cart</button></div></aside>`;document.body.appendChild(overlay);

  const cod=document.createElement('div');cod.id='shaktiCodOverlay';cod.innerHTML=`<div class="shakti-cod-modal" role="dialog" aria-modal="true" aria-labelledby="shaktiCodTitle"><div class="shakti-cod-head"><h2 id="shaktiCodTitle">📦 Confirm COD Order</h2><button class="shakti-cod-close" type="button" aria-label="Close">×</button></div><div class="shakti-cod-order">Order ID: <strong id="shaktiCodOrderId"></strong><br><span>Please keep this ID for order follow-up.</span></div><div class="shakti-cod-summary" id="shaktiCodSummary"></div><form class="shakti-cod-form" id="shaktiCodForm"><div><label for="codName">Customer name *</label><input id="codName" name="name" required autocomplete="name" placeholder="Your name"></div><div><label for="codPhone">Mobile / WhatsApp number *</label><input id="codPhone" name="phone" required inputmode="tel" autocomplete="tel" placeholder="10-digit mobile number"></div><div><label for="codAddress">Delivery address *</label><textarea id="codAddress" name="address" required autocomplete="street-address" placeholder="House / street / area"></textarea></div><div><label for="codCity">City & PIN code *</label><input id="codCity" name="city" required autocomplete="postal-code" placeholder="City, PIN code"></div><p class="shakti-cod-disclaimer">COD amount is calculated from the published product MRPs in your cart. Any applicable delivery charge will be confirmed by Shakti Millets before dispatch. WhatsApp is used to send the order details for confirmation.</p><button class="shakti-cod-submit" type="submit">Confirm COD & Open WhatsApp</button></form></div>`;document.body.appendChild(cod);

  const itemsEl=overlay.querySelector('#shaktiCartItems');
  function renderCart(){
    const items=getItems();
    document.getElementById('shaktiCartCount').textContent=count();
    document.getElementById('shaktiCartTotal').textContent=money(total());
    if(!items.length){itemsEl.innerHTML='<div class="shakti-cart-empty"><strong>Your cart is empty</strong>Add products from the catalogue to get started.</div>';return;}
    itemsEl.innerHTML=items.map(({p,qty})=>`<div class="shakti-cart-item"><img src="${p.image||''}" alt="${p.name}" onerror="this.style.display='none'"><div><div class="shakti-cart-name">${p.name}${p.processing?' — '+p.processing:''}</div><div class="shakti-cart-meta">${p.size} · ${money(p.mrp)} each</div><div class="shakti-qty"><button type="button" data-cart-action="minus" data-id="${p.id}">−</button><span>${qty}</span><button type="button" data-cart-action="plus" data-id="${p.id}">+</button></div><button class="shakti-remove" type="button" data-cart-action="remove" data-id="${p.id}">Remove</button></div><div class="shakti-cart-line">${money(p.mrp*qty)}</div></div>`).join('');
  }
  function add(id){cart[id]=(Number(cart[id])||0)+1;save();renderCart();openCart();}
  function change(id,delta){if(!cart[id])return;cart[id]=Number(cart[id])+delta;if(cart[id]<=0)delete cart[id];save();renderCart();}
  function remove(id){delete cart[id];save();renderCart();}
  function openCart(){overlay.classList.add('open');document.body.style.overflow='hidden';}
  function closeCart(){overlay.classList.remove('open');if(!cod.classList.contains('open'))document.body.style.overflow='';}
  function openCod(){
    const items=getItems();if(!items.length){alert('Your cart is empty.');return;}
    cod.querySelector('#shaktiCodOrderId').textContent=makeOrderId();
    cod.querySelector('#shaktiCodSummary').innerHTML=items.map(({p,qty})=>`<div class="shakti-cod-summary-row"><span>${p.name} × ${qty}</span><strong>${money(p.mrp*qty)}</strong></div>`).join('')+`<div class="shakti-cod-summary-row shakti-cod-summary-total"><span>COD product total</span><strong>${money(total())}</strong></div>`;
    cod.classList.add('open');overlay.classList.remove('open');document.body.style.overflow='hidden';
  }
  function closeCod(){cod.classList.remove('open');document.body.style.overflow='';}

  document.addEventListener('click',e=>{const b=e.target.closest('[data-add-cart]');if(b){add(b.dataset.addCart);return;}
    const q=e.target.closest('[data-cart-action]');if(q){const id=q.dataset.id;if(q.dataset.cartAction==='plus')change(id,1);if(q.dataset.cartAction==='minus')change(id,-1);if(q.dataset.cartAction==='remove')remove(id);}
  });
  btn.addEventListener('click',openCart);overlay.querySelector('.shakti-cart-close').addEventListener('click',closeCart);overlay.addEventListener('click',e=>{if(e.target===overlay)closeCart();});
  overlay.querySelector('.shakti-clear').addEventListener('click',()=>{cart={};save();renderCart();});
  overlay.querySelector('.shakti-checkout').addEventListener('click',openCod);
  cod.querySelector('.shakti-cod-close').addEventListener('click',closeCod);
  cod.addEventListener('click',e=>{if(e.target===cod)closeCod();});
  cod.querySelector('#shaktiCodForm').addEventListener('submit',e=>{
    e.preventDefault();
    const items=getItems();if(!items.length){closeCod();alert('Your cart is empty.');return;}
    const fd=new FormData(e.currentTarget);
    const orderId=cod.querySelector('#shaktiCodOrderId').textContent;
    const lines=items.map(({p,qty})=>`${p.name}${p.processing?' - '+p.processing:''} | ${p.size} | Qty: ${qty} | ${money(p.mrp*qty)}`);
    const message=`Hello Shakti Millets, I want to confirm a Cash on Delivery order.\n\nOrder ID: ${orderId}\n\n${lines.join('\n')}\n\nCOD product total: ${money(total())}\nDelivery charge: To be confirmed\n\nCustomer: ${fd.get('name')}\nMobile: ${fd.get('phone')}\nAddress: ${fd.get('address')}\nCity & PIN: ${fd.get('city')}\n\nPlease confirm availability, delivery charge and dispatch details. The website-generated Order ID and product total above are my requested order details.`;
    localStorage.setItem('shaktiLastCodOrder',JSON.stringify({orderId,createdAt:new Date().toISOString(),items:items.map(({p,qty})=>({id:p.id,name:p.name,sku:p.sku,size:p.size,mrp:p.mrp,qty})),productTotal:total(),customer:{name:fd.get('name'),phone:fd.get('phone'),address:fd.get('address'),city:fd.get('city')}}));
    window.open('https://wa.me/919760015078?text='+encodeURIComponent(message),'_blank');
  });

  function addButtons(){document.querySelectorAll('.product-card').forEach(card=>{if(card.querySelector('[data-add-cart]'))return;const sku=card.querySelector('.sku')?.textContent?.replace('SKU: ','').trim();const p=products.find(x=>x.sku===sku);if(!p)return;const actions=card.querySelector('.product-actions');if(!actions)return;const a=document.createElement('a');a.href='#';a.className='add-cart';a.dataset.addCart=p.id;a.textContent='Add to Cart';a.addEventListener('click',e=>e.preventDefault());actions.insertBefore(a,actions.firstChild);});}
  addButtons();
  const observer=new MutationObserver(addButtons);if(document.getElementById('productGrid'))observer.observe(document.getElementById('productGrid'),{childList:true});
  renderCart();
})();