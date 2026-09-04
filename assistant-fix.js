(() => {
  const input = document.getElementById('chatInput');
  const oldButton = document.getElementById('chatSend');
  const log = document.getElementById('chatLog');
  if (!input || !oldButton || !log) return;

  const add = (text, cls) => {
    const d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  };

  const addRecipe = recipe => {
    const pageUrl = new URL('recipes.html?recipe=' + encodeURIComponent(recipe.slug), window.location.href).href;
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=' + encodeURIComponent(pageUrl);
    const box = document.createElement('div');
    box.className = 'msg msg-bot';
    const title = document.createElement('strong');
    title.textContent = '🍲 ' + recipe.name;
    const product = document.createElement('div');
    product.textContent = recipe.product + ' · ' + recipe.processing;
    product.style.margin = '5px 0 10px';
    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.name + ' prepared dish';
    image.style.cssText = 'display:block;width:100%;max-width:280px;aspect-ratio:1;object-fit:cover;border-radius:14px;margin:8px 0';
    const link = document.createElement('a');
    link.href = pageUrl;
    link.textContent = 'Open full recipe';
    link.style.cssText = 'display:inline-block;background:#173b2b;color:#fff;text-decoration:none;padding:9px 14px;border-radius:20px;font-weight:800;margin:4px 8px 8px 0';
    const qr = document.createElement('img');
    qr.src = qrUrl;
    qr.alt = 'QR code for ' + recipe.name;
    qr.style.cssText = 'display:block;width:150px;height:150px;background:#fff;padding:5px;border-radius:10px';
    const note = document.createElement('small');
    note.textContent = 'Scan the QR on another device, or tap Open full recipe on this phone.';
    note.style.cssText = 'display:block;margin-top:5px;color:#5e695f';
    box.append(title, product, image, link, qr, note);
    log.appendChild(box);
    log.scrollTop = log.scrollHeight;
  };

  const findRecipe = raw => {
    const recipes = window.SHAKTI_RECIPES || [];
    const q = raw.toLowerCase().replace(/\b(recipe|recipes|how to make|how do i make|cook|prepare|please|give me|show me)\b/g, ' ').replace(/\s+/g, ' ').trim();
    if (!q) return null;
    let best = null, bestScore = 0;
    recipes.forEach(recipe => {
      const hay = (recipe.name + ' ' + recipe.product).toLowerCase();
      const words = q.split(' ').filter(w => w.length > 2);
      const score = words.reduce((sum, word) => sum + (hay.includes(word) ? word.length : 0), 0);
      if (score > bestScore) { best = recipe; bestScore = score; }
    });
    return bestScore >= 4 ? best : null;
  };

  const answer = raw => {
    const m = raw.toLowerCase().trim();
    if (/what (do|can) you have for me|what have you for me|what can you offer|what do you offer|tell me about shakti|about shakti|what is shakti millets|who is shakti millets/.test(m))
      return '🌾 Welcome to Shakti Millets!\n\nShakti Millets brings quality millets and traditional grains for everyday meals and business requirements. Our catalogue includes Pearl Millet (Kambu), Kodo Millet, Barnyard Millet, Little Millet, Foxtail Millet, Browntop Millet, Proso Millet, Ragi, Sorghum, Horsegram and traditional red-rice varieties.\n\nWe offer retail packs, the 5 Little Millets Combo, and B2B/bulk supply for restaurants, hotels, cafés, cloud kitchens, retailers, supermarkets, food manufacturers and distributors.\n\nI can help you choose products, explain uses and nutrition, suggest recipes, share published MRP, compare products and guide you with bulk enquiries. What would you like to explore?';
    if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/.test(m)) return 'Hello! 👋 Welcome to Shakti Millets. I can tell you about our products, millet nutrition, recipes, prices and B2B supply. What would you like to know?';
    if (/who are you|what are you|your name/.test(m)) return 'I am Shakti AI, the website assistant for Shakti Millets. I help customers understand our millets and traditional grains, choose products, learn cooking and nutrition information, and enquire about retail or B2B supply.';
    if (/song|music|movie|film|actor|actress|lyrics|playlist/.test(m)) return 'I am the Shakti Millets website assistant, so I focus on Shakti Millets, food, millets, nutrition, recipes, products and business enquiries.';
    if (/\b(price|mrp|cost|rate)\b/.test(m)) return 'You can see the published MRP and pack size on each Shakti Millets product card. For current bulk pricing, use the B2B enquiry form or WhatsApp Shakti Millets.';
    if (/\b(product|products|catalog|catalogue)\b/.test(m)) return 'Shakti Millets currently has 20 individual millet/traditional-grain and rice products plus the 5 Little Millets Combo. Tell me a product name and I can explain it.';
    if (/\b(benefit|benefits|healthy|health|nutrition|nutrient|nutrients)\b/.test(m)) return 'Millets are whole grains that can provide fibre, complex carbohydrates, plant protein and minerals. Different varieties have different nutrition profiles. They work best as part of a varied, balanced diet.';
    if (/\b(diabet|blood sugar|sugar)\b/.test(m)) return 'Millets can be included in a balanced diet, but blood-sugar response depends on the variety, portion, preparation and the individual. If you have diabetes, follow advice from your doctor or dietitian.';
    if (/\b(weight|weight loss|lose weight)\b/.test(m)) return 'Millets can be part of a filling, fibre-rich eating pattern, but weight management depends on your overall diet, portions, activity and other factors—not one food alone.';
    if (/\b(recipe|recipes|cook|cooking|prepare|preparation|breakfast|lunch|dinner)\b/.test(m)) return 'You can make millet porridge, dosa, idli, upma, khichdi, roti and rice-style meals. Tell me which Shakti Millets product you have and I can suggest a simple recipe.';
    if (/\b(ragi|finger millet)\b/.test(m)) return 'Ragi (finger millet) is commonly used for porridge, dosa, roti and other dishes. It provides carbohydrates, fibre and minerals such as calcium.';
    if (/\bkodo\b/.test(m)) return 'Kodo millet is versatile for rice-style meals, upma and khichdi. Shakti Millets offers unpolished, semipolished and parboiled Kodo Millet options.';
    if (/\b(foxtail)\b/.test(m)) return 'Foxtail millet is suitable for rice-style meals, upma, dosa and other preparations. Shakti Millets lists a 500g unpolished Foxtail Millet pack.';
    if (/\bbarnyard\b/.test(m)) return 'Barnyard millet can be used in rice-style meals, upma and fasting-friendly dishes. Shakti Millets lists semipolished and parboiled 500g options.';
    if (/\b(gluten|celiac)\b/.test(m)) return 'Millets are naturally gluten-free. For celiac disease or gluten sensitivity, cross-contact during processing and preparation can still matter.';
    if (/\b(storage|store|shelf life)\b/.test(m)) return 'Store Shakti Millets in airtight containers in a cool, dry place away from moisture and direct sunlight. Clean, dry storage helps preserve quality.';
    if (/\b(bulk|wholesale|distributor|retailer|restaurant|hotel|cafe|manufacturer|ton|kg)\b/.test(m)) return 'Yes, Shakti Millets supports B2B enquiries. Tell me the products, approximate quantity and your city, or use the B2B enquiry form for current availability and pricing.';
    if (/\b(compare|comparison|difference)\b/.test(m)) return 'Sure. Tell me the two Shakti Millets products you want to compare. I can compare their variety, processing, pack size and published MRP.';
    return '🌾 I am Shakti AI, built specifically to help you with Shakti Millets. I can tell you about our products, millet nutrition and uses, recipes, MRP, product comparisons, storage and B2B/bulk supply. Ask me anything about Shakti Millets.';
  };

  const send = text => {
    text = (text || '').trim();
    if (!text) return;
    add(text, 'msg-user');
    input.value = '';
    button.disabled = true;
    button.textContent = '...';
    setTimeout(() => {
      const recipe = /\b(recipe|cook|prepare|khichdi|pulao|dosa|roti|upma|pongal|porridge|ladoo|rasam|sundal|adai|tikki|curd rice|lemon rice|sambar)\b/i.test(text) && findRecipe(text);
      if (recipe) addRecipe(recipe);
      else add(answer(text), 'msg-bot');
      button.disabled = false;
      button.textContent = 'Send';
    }, 120);
  };

  const button = oldButton.cloneNode(true);
  oldButton.replaceWith(button);
  button.addEventListener('click', e => { e.preventDefault(); e.stopImmediatePropagation(); send(input.value); }, true);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); send(input.value); }
  }, true);

  document.querySelectorAll('.quick button').forEach(q => {
    q.addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      send(q.getAttribute('data-q') || q.textContent);
    }, true);
  });
})();
