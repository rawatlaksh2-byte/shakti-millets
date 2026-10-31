const products = [
  {id:1,name:'Pearl Millet (Kambu)',group:'traditional',processing:'Unpolished',size:'500g',mrp:99,sku:'SHK-PML-500-UP',icon:'🌾',image:'images/products/packaging-20260912/11-pearl-millet-kambu-unpolished-500g.webp'},
  {id:2,name:'White Sorghum',group:'traditional',processing:'',size:'500g',mrp:99,sku:'SHK-WSG-500-UP',icon:'🌾',image:'images/products/packaging-20260912/12-white-sorghum-unpolished-500g.webp'},
  {id:3,name:'Red Sorghum (Desi)',group:'traditional',processing:'',size:'500g',mrp:99,sku:'SHK-RSG-500-UP',icon:'🌾',image:'images/products/packaging-20260912/13-red-sorghum-desi-unpolished-500g.webp'},
  {id:4,name:'Kodo Millet',group:'little',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-KDM-500-UP',icon:'🌾',image:'images/products/packaging-20260912/01-kodo-millet-unpolished-500g.webp'},
  {id:5,name:'Kodo Millet',group:'little',processing:'Semipolished',size:'500g',mrp:149,sku:'SHK-KDM-500-SP',icon:'🌾',image:'images/products/packaging-20260912/02-kodo-millet-semipolished-500g.webp'},
  {id:6,name:'Kodo Millet',group:'little',processing:'Parboiled',size:'500g',mrp:149,sku:'SHK-KDM-500-PB',icon:'🌾',image:'images/products/packaging-20260912/03-kodo-millet-parboiled-500g.webp'},
  {id:7,name:'Barnyard Millet',group:'little',processing:'Semipolished',size:'500g',mrp:199,sku:'SHK-BYM-500-SP',icon:'🌾',image:'images/products/packaging-20260912/04-barnyard-millet-semipolished-500g.webp'},
  {id:8,name:'Barnyard Millet',group:'little',processing:'Parboiled',size:'500g',mrp:199,sku:'SHK-BYM-500-PB',icon:'🌾',image:'images/products/packaging-20260912/05-barnyard-millet-parboiled-500g.webp'},
  {id:9,name:'Little Millet',group:'little',processing:'Parboiled',size:'500g',mrp:249,sku:'SHK-LTM-500-PB',icon:'🌾',image:'images/products/packaging-20260912/06-little-millet-parboiled-500g.webp'},
  {id:10,name:'Finger Millet (Ragi)',group:'traditional',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-FRM-500-UP',icon:'🌾',image:'images/products/packaging-20260912/07-finger-millet-ragi-unpolished-500g.webp'},
  {id:11,name:'Foxtail Millet',group:'little',processing:'Unpolished',size:'500g',mrp:129,sku:'SHK-FTM-500-UP',icon:'🌾',image:'images/products/packaging-20260912/08-foxtail-millet-unpolished-500g.webp'},
  {id:12,name:'Browntop Millet',group:'little',processing:'Unpolished',size:'500g',mrp:249,sku:'SHK-BTM-500-UP',icon:'🌾',image:'images/products/packaging-20260912/09-browntop-millet-unpolished-500g.webp'},
  {id:13,name:'Proso Millet',group:'little',processing:'Parboiled',size:'500g',mrp:199,sku:'SHK-PSM-500-PB',icon:'🌾',image:'images/products/packaging-20260912/10-proso-millet-parboiled-500g.webp'},
  {id:14,name:'Horsegram (Kollu)',group:'traditional',processing:'',size:'500g',mrp:199,sku:'SHK-HGM-500-WH',icon:'🌱',image:'images/products/packaging-20260912/14-horsegram-kollu-whole-500g.webp'},
  {id:15,name:'Kullankar Red Rice',group:'rice',processing:'Boiled',size:'500g',mrp:149,sku:'SHK-KKR-500-PB',icon:'🍚',image:'images/products/packaging-20260912/16-kullankar-red-rice-boiled-500g.webp'},
  {id:16,name:'Poongar Red Rice',group:'rice',processing:'Boiled',size:'500g',mrp:149,sku:'SHK-PGR-500-PB',icon:'🍚',image:'images/products/packaging-20260912/17-poongar-red-rice-boiled-500g.webp'},
  {id:17,name:'Kerala Red Matta',group:'rice',processing:'Unpolished',size:'1kg',mrp:249,sku:'SHK-KRM-1000-UP',icon:'🍚',image:'images/products/packaging-20260912/15-kerala-matta-rice-unpolished-1kg.webp'},
  {id:18,name:'Mappillaisamba Rice',group:'rice',processing:'Boiled',size:'500g',mrp:199,sku:'SHK-MPR-500-PB',icon:'🍚',image:'images/products/packaging-20260912/18-mappillaisamba-rice-boiled-500g.webp'},
  {id:19,name:'Red Rice',group:'rice',processing:'Unpolished',size:'500g',mrp:149,sku:'SHK-RDR-500-UP',icon:'🍚',image:'images/products/packaging-20260912/19-red-rice-unpolished-500g.webp'},
  {id:20,name:'Palakkadan Matta Rice',group:'rice',processing:'Semipolished',size:'500g',mrp:199,sku:'SHK-PDM-500-SP',icon:'🍚',image:'images/products/packaging-20260912/20-palakkadan-matta-rice-semipolished-500g.webp'},
  {id:21,name:'5 Little Millets Combo',group:'little',processing:'Mixed Combo',size:'5 × 500g',mrp:745,sku:'SHK-COMBO-5x500-MIX',icon:'📦',comboImage:true}
];

const comboImages=['images/products/packaging-20260912/01-kodo-millet-unpolished-500g.webp','images/products/packaging-20260912/04-barnyard-millet-semipolished-500g.webp','images/products/packaging-20260912/06-little-millet-parboiled-500g.webp','images/products/packaging-20260912/08-foxtail-millet-unpolished-500g.webp','images/products/packaging-20260912/09-browntop-millet-unpolished-500g.webp'];
const grid=document.getElementById('productGrid');
function waText(p){return `Hello Shakti Millets, I am interested in ${p.name}${p.processing?' - '+p.processing:''} (${p.size}). SKU: ${p.sku}. Please share availability and bulk pricing.`}
const productStories={
'Kodo Millet':'A familiar traditional grain for comforting khichdi, pulao and everyday home-cooked meals.',
'Barnyard Millet':'Bring this much-loved millet to your table in pulao, upma and simple family meals.',
'Little Millet':'A versatile little grain for homely pulao, upma and other everyday favourites.',
'Finger Millet (Ragi)':'From ragi roti to dosa and porridge, rediscover a grain woven into Indian food traditions.',
'Foxtail Millet':'A traditional grain that works beautifully in upma, pulao and familiar family recipes.',
'Browntop Millet':'Explore a traditional millet and find a new favourite for your home-cooked meals.',
'Proso Millet':'A simple, versatile grain to try in a range of comforting everyday preparations.',
'Pearl Millet (Kambu)':'A beloved traditional grain for hearty rotis and familiar regional dishes.',
'White Sorghum':'Bring jowar’s traditional goodness to rotis and other home-style meals.',
'Red Sorghum (Desi)':'A desi grain with a place in traditional kitchens and regional recipes.',
'Horsegram (Kollu)':'A much-loved traditional pulse for rasam, sundal and hearty home-style cooking.',
'Kullankar Red Rice':'Discover a traditional red rice variety for meals rooted in regional food culture.',
'Poongar Red Rice':'A heritage rice variety to bring more regional grain traditions to your table.',
'Kerala Red Matta':'A distinctive Kerala rice variety for satisfying everyday meals.',
'Mappillaisamba Rice':'Rediscover a traditional Tamil rice variety and its place in heritage cooking.',
'Red Rice':'A familiar whole-grain rice choice for everyday meals.',
'Palakkadan Matta Rice':'A traditional Kerala rice variety for the family table.',
'5 Little Millets Combo':'Explore five little millet varieties in one convenient family combo.'
};
function card(p){
 const visual=p.comboImage ? '<div class="combo-product-image">'+comboImages.map(src=>'<img src="'+src+'" alt="Five little millet varieties" loading="lazy">').join('')+'</div>' : '<img src="'+p.image+'" alt="'+p.name+'" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'🌾\'">';
 const process=p.processing ? p.processing.replace('Semipolished','Semi-polished') : 'Traditional grain';
 const story=productStories[p.name] || 'A traditional grain to explore in everyday home cooking.';
 return '<article class="product-card"><div class="product-image">'+visual+'</div><div class="product-card-body"><span class="tag">'+process+'</span><h3>'+p.name+'</h3><p class="product-story">'+story+'</p><div class="product-meta"><span>Pack</span><b>'+p.size+'</b></div><div class="price">₹'+p.mrp+'</div><details class="product-details"><summary>Know your grain</summary><div><p><b>Grain:</b> '+p.name+'</p><p><b>Processing:</b> '+(p.processing||'Please enquire for details')+'</p><p><b>Pack size:</b> '+p.size+'</p><p><b>Published price:</b> ₹'+p.mrp+'</p></div></details><div class="product-actions"><a class="order" target="_blank" rel="noopener" href="https://wa.me/919760015078?text='+encodeURIComponent(waText(p))+'">ASK ON WHATSAPP</a><a class="quote-link" href="#quote">BULK ENQUIRY</a></div></div></article>';
}
function render(filter='all'){if(!grid)return;grid.innerHTML=products.filter(p=>filter==='all'||p.group===filter).map(card).join('')}
render();
document.querySelectorAll('.category-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.category-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));

const chatLog=document.getElementById('chatLog'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend');
function addMsg(text,cls){const d=document.createElement('div');d.className='msg '+cls;d.textContent=text;chatLog.appendChild(d);chatLog.scrollTop=chatLog.scrollHeight}
function localAI(msg){const m=msg.toLowerCase().trim();
  const requested=products.filter(p=>m.includes(p.name.toLowerCase()));
  if(requested.length)return requested.map(p=>`${p.name}${p.processing?' - '+p.processing:''}: ${p.size}, MRP ₹${p.mrp}. For availability or bulk pricing, please contact Shakti Millets on WhatsApp.`).join('\n');
  if(/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/.test(m))return 'Hello! 👋 I am Shakti AI. I can answer general questions, explain millets and nutrition, suggest simple recipes, and help with Shakti Millets products and B2B enquiries.';
  if(m.includes('who are you')||m.includes('what can you do')||m.includes('help'))return 'I am Shakti AI, the website assistant for Shakti Millets. I can help with product details, MRP, pack sizes, millet nutrition, cooking ideas, comparisons, storage, B2B supply and general questions.';
  if(m.includes('bulk')||m.includes('quote')||m.includes('kg')||m.includes('ton')||m.includes('distributor')||m.includes('restaurant')||m.includes('retailer'))return 'We would be happy to help with your bulk requirement. Please submit the B2B enquiry form or WhatsApp Shakti Millets for current availability and pricing.';
  if(m.includes('price')||m.includes('mrp'))return 'You can see the published MRP for every available product in the Products section. For bulk pricing, use Request B2B Quote.';
  if(m.includes('product')||m.includes('catalogue')||m.includes('catalog'))return 'We currently list 20 individual millet/rice products plus the 5 Little Millets Combo. Use the category filters to browse them.';
  if(m.includes('benefit')||m.includes('healthy')||m.includes('nutrition')||m.includes('nutrient'))return 'Millets are whole grains that can provide fibre, complex carbohydrates, minerals and plant protein. Their nutrition varies by variety and preparation. They can be part of a balanced diet, but no single grain is a cure for a disease.';
  if(m.includes('diabet')||m.includes('blood sugar'))return 'Millets can fit into a balanced diet, but blood-sugar response depends on the millet, portion size, preparation and the individual. If you have diabetes, follow your clinician or dietitian’s advice rather than relying on one food alone.';
  if(m.includes('weight')||m.includes('weight loss'))return 'Millets can be useful in a balanced eating pattern because many provide fibre and are filling. Weight management depends on overall food intake, activity, sleep and other factors—not one particular grain.';
  if(m.includes('protein'))return 'Millets provide plant protein, although the amount varies by variety. For a higher-protein meal, combine millet with dal, beans, curd, paneer, eggs or another protein source.';
  if(m.includes('recipe')||m.includes('cook')||m.includes('prepare'))return 'You can use millets for porridge, dosa, idli, upma, khichdi, rotis and rice-style meals. A simple starting point is to wash the millet, soak it if your recipe calls for it, then cook it with the appropriate water ratio until tender.';
  if(m.includes('store')||m.includes('storage')||m.includes('shelf'))return 'Keep millets and rice sealed in a cool, dry place away from moisture and direct sunlight. For longer storage, an airtight container helps protect quality.';
  if(m.includes('gluten'))return 'Millets are naturally gluten-free grains. For someone with celiac disease or gluten sensitivity, however, cross-contact during processing and preparation can still matter.';
  if(m.includes('ragi')||m.includes('finger millet'))return 'Ragi (finger millet) is commonly used for porridge, dosa, roti and other dishes. It provides carbohydrates, fibre and minerals such as calcium.';
  if(m.includes('kodo'))return 'Kodo millet is a traditional millet that can be used in rice-style dishes, upma, khichdi and other recipes. It is available here in unpolished, semipolished and parboiled versions.';
  if(m.includes('foxtail'))return 'Foxtail millet is a versatile millet suitable for rice-style dishes, upma, dosa and other preparations. Shakti Millets lists a 500g unpolished pack.';
  if(m.includes('barnyard'))return 'Barnyard millet is commonly used in rice-style meals, upma and fasting-friendly dishes. Shakti Millets lists semipolished and parboiled 500g options.';
  if(m.includes('compare')||m.includes('difference'))return 'I can compare Shakti Millets products by variety, processing, pack size and published MRP. Tell me the two products you want to compare.';
  return null;
}
async function ai(msg){
  const local=localAI(msg); if(local)return local;
  const q=encodeURIComponent(msg.replace(/[?!.]+$/,'').trim());
  try{
    const res=await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${q}&srlimit=1&format=json&origin=*`);
    if(!res.ok)throw new Error('search failed');
    const data=await res.json();
    const hit=data?.query?.search?.[0];
    if(!hit)return 'I could not find a reliable answer for that question. Try asking it in a little more detail, or ask me about millets, nutrition, recipes, Shakti products or B2B supply.';
    const title=encodeURIComponent(hit.title);
    const summary=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    if(summary.ok){const s=await summary.json();if(s.extract)return `${s.extract}\n\nSource: Wikipedia — ${hit.title}`;}
    return `I found information about ${hit.title}, but I could not load the full summary right now. Please try asking your question again.`;
  }catch(e){return 'I can answer Shakti Millets, millet and common nutrition questions directly. For other general questions, please try again when an internet connection is available.';}
}
async function send(){const m=chatInput.value.trim();if(!m)return;addMsg(m,'msg-user');chatInput.value='';chatSend.disabled=true;chatSend.textContent='...';try{addMsg(await ai(m),'msg-bot')}finally{chatSend.disabled=false;chatSend.textContent='Send'}}
if(chatSend)chatSend.addEventListener('click',send);if(chatInput)chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')send()});document.querySelectorAll('.quick button').forEach(b=>b.addEventListener('click',()=>{chatInput.value=b.dataset.q;send()}));

const form=document.getElementById('quoteForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Hello Shakti Millets, I would like to request a B2B quote.%0A%0AName: ${d.get('name')}%0ACompany: ${d.get('company')}%0ACity: ${d.get('city')}%0AWhatsApp: ${d.get('whatsapp')}%0ABusiness Type: ${d.get('business')}%0AProducts Required: ${d.get('products')}%0AMonthly Requirement: ${d.get('monthly')}%0APack Requirement: ${d.get('pack')}%0AMessage: ${d.get('message')}`;window.open(`https://wa.me/919760015078?text=${text}`,'_blank')});

(function(){const popup=document.createElement('div');popup.id='shaktiOfferPopup';popup.innerHTML=`<div class="shakti-offer-backdrop"></div><div class="shakti-offer-modal" role="dialog" aria-modal="true" aria-labelledby="shaktiOfferTitle"><button class="shakti-offer-close" type="button" aria-label="Close offer">×</button><div class="shakti-offer-badge">SPECIAL COMBO OFFER</div><h2 id="shaktiOfferTitle">5 Little Millets Combo</h2><p class="shakti-offer-subtitle">A convenient combo of five little millet varieties from Shakti Millets.</p><div class="shakti-offer-products">${comboImages.map((src,i)=>`<img src="${src}" alt="${['Kodo Millet','Barnyard Millet','Little Millet','Foxtail Millet','Browntop Millet'][i]}">`).join('')}</div><div class="shakti-offer-price"><span>Published MRP</span><strong>₹745</strong></div><p class="shakti-offer-note">Want the current offer price or availability? Message us directly on WhatsApp.</p><a class="shakti-offer-cta" target="_blank" rel="noopener" href="https://wa.me/919760015078?text=Hello%20Shakti%20Millets%2C%20I%20am%20interested%20in%20the%205%20Little%20Millets%20Combo.%20Please%20share%20the%20current%20offer%20price%20and%20availability.">GET COMBO OFFER</a><button class="shakti-offer-later" type="button">Continue browsing</button></div>`;document.body.appendChild(popup);const close=()=>popup.classList.remove('is-visible');popup.querySelector('.shakti-offer-close').addEventListener('click',close);popup.querySelector('.shakti-offer-later').addEventListener('click',close);popup.querySelector('.shakti-offer-backdrop').addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('load',()=>setTimeout(()=>popup.classList.add('is-visible'),30000))})();