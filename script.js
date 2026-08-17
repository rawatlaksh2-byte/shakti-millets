const products = [
  {id:1,name:'Pearl Millet (Kambu)',group:'traditional',processing:'Unpolished',size:'500g',mrp:99,sku:'SHK-PML-500-UP',icon:'🌾'},
  {id:2,name:'White Sorghum',group:'traditional',processing:'',size:'500g',mrp:99,sku:'SHK-WSG-500-UP',icon:'🌾'},
  {id:3,name:'Red Sorghum (Desi)',group:'traditional',processing:'',size:'500g',mrp:99,sku:'SHK-RSG-500-UP',icon:'🌾'},
  {id:4,name:'Kodo Millet',group:'little',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-KDM-500-UP',icon:'🌾'},
  {id:5,name:'Kodo Millet',group:'little',processing:'Semipolished',size:'500g',mrp:149,sku:'SHK-KDM-500-SP',icon:'🌾'},
  {id:6,name:'Kodo Millet',group:'little',processing:'Parboiled',size:'500g',mrp:149,sku:'SHK-KDM-500-PB',icon:'🌾'},
  {id:7,name:'Barnyard Millet',group:'little',processing:'Semipolished',size:'500g',mrp:199,sku:'SHK-BYM-500-SP',icon:'🌾'},
  {id:8,name:'Barnyard Millet',group:'little',processing:'Parboiled',size:'500g',mrp:199,sku:'SHK-BYM-500-PB',icon:'🌾'},
  {id:9,name:'Little Millet',group:'little',processing:'Parboiled',size:'500g',mrp:249,sku:'SHK-LTM-500-PB',icon:'🌾'},
  {id:10,name:'Finger Millet (Ragi)',group:'traditional',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-FRM-500-UP',icon:'🌾'},
  {id:11,name:'Foxtail Millet',group:'little',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-FTM-500-UP',icon:'🌾'},
  {id:12,name:'Browntop Millet',group:'little',processing:'Unpolished',size:'500g',mrp:249,sku:'SHK-BTM-500-UP',icon:'🌾'},
  {id:13,name:'Proso Millet',group:'little',processing:'Parboiled',size:'500g',mrp:199,sku:'SHK-PSM-500-PB',icon:'🌾'},
  {id:14,name:'Horsegram (Kollu)',group:'traditional',processing:'',size:'500g',mrp:199,sku:'SHK-HGM-500-WH',icon:'🌱'},
  {id:15,name:'Killankari Red Rice',group:'rice',processing:'Boiled',size:'500g',mrp:149,sku:'SHK-KKR-500-PB',icon:'🍚'},
  {id:16,name:'Poongar Red Rice',group:'rice',processing:'Boiled',size:'500g',mrp:149,sku:'SHK-PGR-500-PB',icon:'🍚'},
  {id:17,name:'Kerala Red Matta',group:'rice',processing:'Unpolished',size:'1kg',mrp:249,sku:'SHK-KRM-1000-UP',icon:'🍚'},
  {id:18,name:'Mappillaisamba Rice',group:'rice',processing:'Boiled',size:'500g',mrp:199,sku:'SHK-MPR-500-PB',icon:'🍚'},
  {id:19,name:'Red Rice',group:'rice',processing:'Unpolished',size:'500g',mrp:149,sku:'SHK-RDR-500-UP',icon:'🍚'},
  {id:20,name:'Palakkadan Matta Rice',group:'rice',processing:'Semipolished',size:'500g',mrp:199,sku:'SHK-PDM-500-SP',icon:'🍚'},
  {id:21,name:'5 Little Millets Combo',group:'little',processing:'Mixed Combo',size:'5 × 500g',mrp:745,sku:'SHK-COMBO-5x500-MIX',icon:'📦'}
];

const grid=document.getElementById('productGrid');
function waText(p){return `Hello Shakti Millets, I am interested in ${p.name}${p.processing?' - '+p.processing:''} (${p.size}). SKU: ${p.sku}. Please share availability and bulk pricing.`}
function card(p){return `<article class="product-card"><div class="product-image">${p.icon}</div><div class="product-card-body"><span class="tag">${p.processing||'Traditional grain'}</span><h3>${p.name}</h3><div class="size">Available: ${p.size}</div><div class="sku">SKU: ${p.sku}</div><div class="price">MRP ₹${p.mrp}</div><div class="product-actions"><a class="order" target="_blank" href="https://wa.me/919760015078?text=${encodeURIComponent(waText(p))}">WhatsApp Enquiry</a><a class="quote-link" href="#quote">Bulk Price</a></div></div></article>`}
function render(filter='all'){if(!grid)return;grid.innerHTML=products.filter(p=>filter==='all'||p.group===filter).map(card).join('')}
render();
document.querySelectorAll('.category-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.category-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));

const chatLog=document.getElementById('chatLog'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend');
function addMsg(text,cls){const d=document.createElement('div');d.className='msg '+cls;d.textContent=text;chatLog.appendChild(d);chatLog.scrollTop=chatLog.scrollHeight}
function ai(msg){const m=msg.toLowerCase();if(m.includes('bulk')||m.includes('quote')||m.includes('kg')||m.includes('ton')||m.includes('distributor')||m.includes('restaurant')||m.includes('retailer'))return 'We would be happy to help with your bulk requirement. Please submit the B2B enquiry form so our team can contact you with availability and pricing.';if(m.includes('price')||m.includes('mrp'))return 'You can see the published MRP for every available product in the Products section. For bulk pricing, use Request B2B Quote.';if(m.includes('product')||m.includes('catalogue'))return 'We currently list 20 individual millet/rice products plus the 5 Little Millets Combo. Use the category filters to browse them.';if(m.includes('pack')||m.includes('size'))return 'Published retail pack sizes are shown on each product card. For business pack requirements, submit a B2B enquiry.';if(m.includes('whatsapp'))return 'You can contact Shakti Millets on WhatsApp at 9760015078 using the enquiry buttons.';return 'I can help with available products, MRP, pack information and B2B enquiries. Try: “Show products”, “I need 100 kg of Kodo Millet”, or “I need a bulk quotation”.'}
function send(){const m=chatInput.value.trim();if(!m)return;addMsg(m,'msg-user');setTimeout(()=>addMsg(ai(m),'msg-bot'),250);chatInput.value=''}
if(chatSend)chatSend.addEventListener('click',send);if(chatInput)chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')send()});document.querySelectorAll('.quick button').forEach(b=>b.addEventListener('click',()=>{chatInput.value=b.dataset.q;send()}));

const form=document.getElementById('quoteForm');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Hello Shakti Millets, I would like to request a B2B quote.%0A%0AName: ${d.get('name')}%0ACompany: ${d.get('company')}%0ACity: ${d.get('city')}%0AWhatsApp: ${d.get('whatsapp')}%0ABusiness Type: ${d.get('business')}%0AProducts Required: ${d.get('products')}%0AMonthly Requirement: ${d.get('monthly')}%0APack Requirement: ${d.get('pack')}%0AMessage: ${d.get('message')}`;window.open(`https://wa.me/919760015078?text=${text}`,'_blank')});