const products = [
  {id:1,name:'Pearl Millet (Kambu)',group:'traditional',processing:'Unpolished',size:'500g',mrp:99,sku:'SHK-PML-500-UP',icon:'🌾',image:'images/products/01-pearl-millet-kambu.png'},
  {id:2,name:'White Sorghum',group:'traditional',processing:'',size:'500g',mrp:99,sku:'SHK-WSG-500-UP',icon:'🌾',image:'images/products/02-white-sorghum.png'},
  {id:3,name:'Red Sorghum (Desi)',group:'traditional',processing:'',size:'500g',mrp:99,sku:'SHK-RSG-500-UP',icon:'🌾',image:'images/products/03-red-sorghum-desi.png'},
  {id:4,name:'Kodo Millet',group:'little',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-KDM-500-UP',icon:'🌾',image:'images/products/04-kodo-millet-unpolished.png'},
  {id:5,name:'Kodo Millet',group:'little',processing:'Semipolished',size:'500g',mrp:149,sku:'SHK-KDM-500-SP',icon:'🌾',image:'images/products/05-kodo-millet-semipolished.png'},
  {id:6,name:'Kodo Millet',group:'little',processing:'Parboiled',size:'500g',mrp:149,sku:'SHK-KDM-500-PB',icon:'🌾',image:'images/products/06-kodo-millet-parboiled.png'},
  {id:7,name:'Barnyard Millet',group:'little',processing:'Semipolished',size:'500g',mrp:199,sku:'SHK-BYM-500-SP',icon:'🌾',image:'images/products/07-barnyard-millet-semipolished.png'},
  {id:8,name:'Barnyard Millet',group:'little',processing:'Parboiled',size:'500g',mrp:199,sku:'SHK-BYM-500-PB',icon:'🌾',image:'images/products/08-barnyard-millet-parboiled.png'},
  {id:9,name:'Little Millet',group:'little',processing:'Parboiled',size:'500g',mrp:249,sku:'SHK-LTM-500-PB',icon:'🌾',image:'images/products/09-little-millet-parboiled.png'},
  {id:10,name:'Finger Millet (Ragi)',group:'traditional',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-FRM-500-UP',icon:'🌾',image:'images/products/10-finger-millet-ragi.png'},
  {id:11,name:'Foxtail Millet',group:'little',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-FTM-500-UP',icon:'🌾',image:'images/products/11-foxtail-millet.png'},
  {id:12,name:'Browntop Millet',group:'little',processing:'Unpolished',size:'500g',mrp:249,sku:'SHK-BTM-500-UP',icon:'🌾',image:'images/products/12-browntop-millet.png'},
  {id:13,name:'Proso Millet',group:'little',processing:'Parboiled',size:'500g',mrp:199,sku:'SHK-PSM-500-PB',icon:'🌾',image:'images/products/13-proso-millet-parboiled.png'},
  {id:14,name:'Horsegram (Kollu)',group:'traditional',processing:'',size:'500g',mrp:199,sku:'SHK-HGM-500-WH',icon:'🌱',image:'images/products/14-horsegram-kollu.png'},
  {id:15,name:'Killankari Red Rice',group:'rice',processing:'Boiled',size:'500g',mrp:149,sku:'SHK-KKR-500-PB',icon:'🍚',image:'images/products/15-killankari-red-rice.png'},
  {id:16,name:'Poongar Red Rice',group:'rice',processing:'Boiled',size:'500g',mrp:149,sku:'SHK-PGR-500-PB',icon:'🍚',image:'images/products/16-poongar-red-rice.png'},
  {id:17,name:'Kerala Red Matta',group:'rice',processing:'Unpolished',size:'1kg',mrp:249,sku:'SHK-KRM-1000-UP',icon:'🍚',image:'images/products/17-kerala-red-matta-rice-unpolished.png'},
  {id:18,name:'Mappillaisamba Rice',group:'rice',processing:'Boiled',size:'500g',mrp:199,sku:'SHK-MPR-500-PB',icon:'🍚',image:'images/products/18-mappillaisamba-red-rice-bridegroom-rice.png'},
  {id:19,name:'Red Rice',group:'rice',processing:'Unpolished',size:'500g',mrp:149,sku:'SHK-RDR-500-UP',icon:'🍚',image:'images/products/19-red-rice.png'},
  {id:20,name:'Palakkadan Matta Rice',group:'rice',processing:'Semipolished',size:'500g',mrp:199,sku:'SHK-PDM-500-SP',icon:'🍚',image:'images/products/20-palakkadan-matta-rice-semipolished.png'},
  {id:21,name:'5 Little Millets Combo',group:'little',processing:'Mixed Combo',size:'5 × 500g',mrp:745,sku:'SHK-COMBO-5x500-MIX',icon:'📦'}
];

const grid=document.getElementById('productGrid');
function waText(p){return `Hello Shakti Millets, I am interested in ${p.name}${p.processing?' - '+p.processing:''} (${p.size}). SKU: ${p.sku}. Please share availability and bulk pricing.`}
function card(p){return `<article class="product-card"><div class="product-image">${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='${p.icon}'">`:p.icon}</div><div class="product-card-body"><span class="tag">${p.processing||'Traditional grain'}</span><h3>${p.name}</h3><div class="size">Available: ${p.size}</div><div class="sku">SKU: ${p.sku}</div><div class="price">MRP ₹${p.mrp}</div><div class="product-actions"><a class="order" target="_blank" href="https://wa.me/919760015078?text=${encodeURIComponent(waText(p))}">WhatsApp Enquiry</a><a class="quote-link" href="#quote">Bulk Price</a></div></div></article>`}
function render(filter='all'){if(!grid)return;grid.innerHTML=products.filter(p=>filter==='all'||p.group===filter).map(card).join('')}
render();
document.querySelectorAll('.category-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.category-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));

const AI_ASSISTANT_INSTRUCTIONS = `You are the official AI Assistant for Shakti Millets. Help website visitors with Shakti Millets products, ingredients when published, general millet information, preparation ideas, website navigation, published product information, availability and prices only when provided by the website/business, and WhatsApp/contact guidance. Never invent prices, ingredients, nutrition values, medical benefits, certifications or availability. Do not diagnose or claim products cure diseases. Keep replies friendly, simple and professional. Never request passwords, OTPs, payment PINs or other sensitive information. For orders, payments, complaints or matters requiring a human, direct visitors to the official Shakti Millets WhatsApp/contact channel. Primary goal: help visitors understand products, discover suitable products, learn about millets and confidently contact Shakti Millets.`;

const chatLog=document.getElementById('chatLog'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend');
function addMsg(text,cls){const d=document.createElement('div');d.className='msg '+cls;d.textContent=text;chatLog.appendChild(d);chatLog.scrollTop=chatLog.scrollHeight}
function ai(msg){
  const m=msg.toLowerCase();
  const requested=products.filter(p=>m.includes(p.name.toLowerCase()));
  if(requested.length){return requested.map(p=>`${p.name}${p.processing?' - '+p.processing:''}: ${p.size}, MRP ₹${p.mrp}. For availability or bulk pricing, please contact Shakti Millets on WhatsApp.`).join('\n')}
  if(m.includes('bulk')||m.includes('quote')||m.includes('kg')||m.includes('ton')||m.includes('distributor')||m.includes('restaurant')||m.includes('retailer'))return 'We would be happy to help with your bulk requirement. Please submit the B2B enquiry form so our team can contact you with availability and pricing.';
  if(m.includes('price')||m.includes('mrp'))return 'You can see the published MRP for every available product in the Products section. For bulk pricing, use Request B2B Quote.';
  if(m.includes('product')||m.includes('catalogue')||m.includes('catalog'))return 'We currently list 20 individual millet/rice products plus the 5 Little Millets Combo. Use the category filters to browse them.';
  if(m.includes('pack')||m.includes('size'))return 'Published retail pack sizes are shown on each product card. For business pack requirements, submit a B2B enquiry.';
  if(m.includes('recipe')||m.includes('cook')||m.includes('prepare'))return 'I can suggest simple millet recipe ideas. Tell me which millet or product you want to use, and I will suggest a preparation idea.';
  if(m.includes('benefit')||m.includes('nutrition'))return 'Millets are nutritious whole grains and can be part of a balanced diet. I can share general information, but I cannot make medical or disease-treatment claims.';
  if(m.includes('whatsapp')||m.includes('contact')||m.includes('order'))return 'You can contact Shakti Millets on WhatsApp at 9760015078 using the enquiry buttons on the website.';
  return 'Hello! I am the Shakti Millets AI Assistant. I can help with products, published MRP, pack sizes, general millet information, simple recipe ideas and B2B enquiries. Try: “Show products”, “What is the price of Kodo Millet?”, or “I need a bulk quotation”.';
}
function send(){const m=chatInput.value.trim();if(!m)return;addMsg(m,'msg-user');setTimeout(()=>addMsg(ai(m),'msg-bot'),250);chatInput.value=''}
if(chatSend)chatSend.addEventListener('click',send);if(chatInput)chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')send()});document.querySelectorAll('.quick button').forEach(b=>b.addEventListener('click',()=>{chatInput.value=b.dataset.q;send()}));

const form=document.getElementById('quoteForm');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Hello Shakti Millets, I would like to request a B2B quote.%0A%0AName: ${d.get('name')}%0ACompany: ${d.get('company')}%0ACity: ${d.get('city')}%0AWhatsApp: ${d.get('whatsapp')}%0ABusiness Type: ${d.get('business')}%0AProducts Required: ${d.get('products')}%0AMonthly Requirement: ${d.get('monthly')}%0APack Requirement: ${d.get('pack')}%0AMessage: ${d.get('message')}`;window.open(`https://wa.me/919760015078?text=${text}`,'_blank')});

/* ================= SHAKTI MILLETS OFFER POPUP ================= */
(function(){
  const popup=document.createElement('div');
  popup.id='shaktiOfferPopup';
  popup.innerHTML=`<div class="shakti-offer-backdrop"></div><div class="shakti-offer-modal" role="dialog" aria-modal="true" aria-labelledby="shaktiOfferTitle"><button class="shakti-offer-close" type="button" aria-label="Close offer">×</button><div class="shakti-offer-badge">SPECIAL COMBO OFFER</div><h2 id="shaktiOfferTitle">5 Little Millets Combo</h2><p class="shakti-offer-subtitle">A convenient combo of five little millet varieties from Shakti Millets.</p><div class="shakti-offer-products"><img src="images/products/04-kodo-millet-unpolished.png" alt="Kodo Millet"><img src="images/products/07-barnyard-millet-semipolished.png" alt="Barnyard Millet"><img src="images/products/09-little-millet-parboiled.png" alt="Little Millet"><img src="images/products/11-foxtail-millet.png" alt="Foxtail Millet"><img src="images/products/12-browntop-millet.png" alt="Browntop Millet"></div><div class="shakti-offer-price"><span>Published MRP</span><strong>₹745</strong></div><p class="shakti-offer-note">Want the current offer price or availability? Message us directly on WhatsApp.</p><a class="shakti-offer-cta" target="_blank" rel="noopener" href="https://wa.me/919760015078?text=Hello%20Shakti%20Millets%2C%20I%20am%20interested%20in%20the%205%20Little%20Millets%20Combo.%20Please%20share%20the%20current%20offer%20price%20and%20availability.">GET COMBO OFFER</a><button class="shakti-offer-later" type="button">Continue browsing</button></div>`;
  document.body.appendChild(popup);
  const close=()=>popup.classList.remove('is-visible');
  popup.querySelector('.shakti-offer-close').addEventListener('click',close);
  popup.querySelector('.shakti-offer-later').addEventListener('click',close);
  popup.querySelector('.shakti-offer-backdrop').addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  window.addEventListener('load',()=>setTimeout(()=>popup.classList.add('is-visible'),900));
})();
