(() => {
  const assistantSection = document.querySelector('section.assistant');
  const chat = assistantSection && assistantSection.querySelector('.ai-chat');
  if (assistantSection && chat) {
    const popup = document.createElement('aside');
    popup.id = 'shaktiAssistantPopup';
    popup.className = 'shakti-assistant-popup';
    popup.setAttribute('aria-label', 'Shakti AI customer assistant');
    popup.setAttribute('aria-hidden', 'true');
    popup.innerHTML = '<div class="shakti-model-panel"><img src="images/brand-ambassador-4.png" alt="Shakti Millets brand ambassador"><div class="shakti-model-shade"></div><div class="shakti-popup-tools"><button id="shaktiSpeak" type="button" aria-label="Start spoken assistance">🔊 Talk</button><button id="shaktiClose" type="button" aria-label="Close assistant">✕</button></div><div class="shakti-model-copy"><strong>Namaste! I’m Shakti AI.</strong><span>What are you looking for today?</span></div></div><div class="shakti-guide-actions"><button type="button" data-guide="Show me your available products.">🛍 Products</button><button type="button" data-guide="Show me millet recipes.">🍲 Recipes</button><button type="button" data-guide="Help me choose a millet for my needs.">🌾 Choose millet</button><button type="button" data-guide="I need a bulk quotation.">📦 Bulk order</button></div>';
    popup.appendChild(chat);
    document.body.appendChild(popup);

    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'shakti-assistant-launcher';
    launcher.innerHTML = '🌾 Ask Shakti AI';
    launcher.setAttribute('aria-label', 'Open Shakti AI');
    document.body.appendChild(launcher);

    const sectionOpen = document.createElement('button');
    sectionOpen.type = 'button';
    sectionOpen.className = 'shakti-section-open';
    sectionOpen.textContent = 'TALK TO SHAKTI AI';
    assistantSection.querySelector('.container')?.appendChild(sectionOpen);

    const openPopup = () => {
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
      launcher.classList.remove('is-visible');
    };
    const closePopup = () => {
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      launcher.classList.add('is-visible');
      window.speechSynthesis?.cancel();
    };
    popup.querySelector('#shaktiClose').addEventListener('click', closePopup);
    launcher.addEventListener('click', openPopup);
    sectionOpen.addEventListener('click', openPopup);
    window.shaktiOpenAssistant = openPopup;
    try {
      if (!sessionStorage.getItem('shaktiAssistantWelcomed')) {
        sessionStorage.setItem('shaktiAssistantWelcomed', '1');
        setTimeout(openPopup, 900);
      } else {
        launcher.classList.add('is-visible');
      }
    } catch (_) { setTimeout(openPopup, 900); }
  }

  const input = document.getElementById('chatInput');
  const oldButton = document.getElementById('chatSend');
  const log = document.getElementById('chatLog');
  if (!input || !oldButton || !log) return;
  let lastTopic = '';
  let voiceEnabled = false;

  const speak = text => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text).replace(/[🌾🍲👋]/g, ''));
    utterance.lang = 'en-IN';
    utterance.rate = .96;
    window.speechSynthesis.speak(utterance);
  };

  const add = (text, cls) => {
    const d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    if (cls === 'msg-bot') speak(text);
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
    speak(recipe.name + '. I have shown the prepared dish, full recipe link and mobile QR code.');
  };

  const addRecipeChoices = (recipes, topic) => {
    const box = document.createElement('div');
    box.className = 'msg msg-bot';
    const heading = document.createElement('strong');
    heading.textContent = '🍲 Choose a ' + topic + ' recipe:';
    const choices = document.createElement('div');
    choices.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:10px';
    recipes.slice(0, 6).forEach(recipe => {
      const choice = document.createElement('button');
      choice.type = 'button';
      choice.textContent = recipe.name;
      choice.style.cssText = 'border:1px solid #b9cfaa;background:#fff;color:#173b2b;padding:9px 12px;border-radius:20px;font-weight:700;cursor:pointer';
      choice.addEventListener('click', () => {
        add(recipe.name, 'msg-user');
        addRecipe(recipe);
      });
      choices.appendChild(choice);
    });
    box.append(heading, choices);
    log.appendChild(box);
    log.scrollTop = log.scrollHeight;
    speak('Choose a ' + topic + ' recipe.');
  };

  const detectTopic = raw => {
    const m = raw.toLowerCase();
    const aliases = [
      ['ragi', /\b(ragi|finger millet)\b/],
      ['kodo', /\bkodo\b/],
      ['foxtail', /\bfoxtail\b/],
      ['barnyard', /\bbarnyard\b/],
      ['little millet', /\blittle millet\b/],
      ['browntop', /\bbrowntop\b/],
      ['proso', /\bproso\b/],
      ['horsegram', /\b(horsegram|kollu)\b/],
      ['pearl millet', /\b(pearl millet|kambu|bajra)\b/],
      ['white sorghum', /\b(white sorghum|jowar)\b/],
      ['red sorghum', /\b(red sorghum|red jowar)\b/],
      ['kerala matta', /\b(kerala matta|red matta)\b/],
      ['killankari', /\bkillankari\b/],
      ['poongar', /\bpoongar\b/],
      ['mappillaisamba', /\b(mappillaisamba|mappillai samba)\b/],
      ['red rice', /\bred rice\b/],
      ['palakkadan matta', /\bpalakkadan matta\b/]
    ];
    return aliases.find(([, pattern]) => pattern.test(m))?.[0] || '';
  };

  const recipesForTopic = topic => (window.SHAKTI_RECIPES || []).filter(recipe =>
    (recipe.name + ' ' + recipe.product).toLowerCase().includes(topic)
  );

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
      const newTopic = detectTopic(text);
      if (newTopic) lastTopic = newTopic;
      const recipeIntent = /\b(recipe|recipes|cook|cooking|prepare|preparation|make|khichdi|pulao|dosa|roti|upma|pongal|porridge|ladoo|rasam|sundal|adai|tikki|curd rice|lemon rice|sambar)\b/i.test(text);
      const dishNamed = /\b(khichdi|pulao|dosa|roti|upma|pongal|porridge|ladoo|rasam|sundal|adai|tikki|curd rice|lemon rice|sambar|dal|kanji|coconut rice|tomato rice|ghee rice)\b/i.test(text);
      const recipe = recipeIntent && dishNamed ? findRecipe((lastTopic ? lastTopic + ' ' : '') + text) : null;
      const choices = recipeIntent && lastTopic ? recipesForTopic(lastTopic) : [];
      if (recipe) addRecipe(recipe);
      else if (choices.length) addRecipeChoices(choices, lastTopic);
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

  document.querySelectorAll('[data-guide]').forEach(choice => {
    choice.addEventListener('click', () => send(choice.getAttribute('data-guide')));
  });

  const inputGroup = input.closest('.input-group');
  if (inputGroup) {
    const mic = document.createElement('button');
    mic.type = 'button';
    mic.className = 'shakti-mic';
    mic.textContent = '🎙️';
    mic.setAttribute('aria-label', 'Speak your question');
    inputGroup.insertBefore(mic, button);
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      mic.hidden = true;
    } else {
      const recognition = new Recognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.onstart = () => { mic.classList.add('is-listening'); mic.setAttribute('aria-label', 'Listening'); };
      recognition.onend = () => { mic.classList.remove('is-listening'); mic.setAttribute('aria-label', 'Speak your question'); };
      recognition.onerror = () => add('I could not hear that clearly. Please try the microphone again or type your question.', 'msg-bot');
      recognition.onresult = event => {
        const words = event.results[0][0].transcript;
        input.value = words;
        send(words);
      };
      mic.addEventListener('click', () => { voiceEnabled = true; recognition.start(); });
    }
  }

  const speakButton = document.getElementById('shaktiSpeak');
  if (speakButton) speakButton.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    speakButton.textContent = voiceEnabled ? '🔇 Mute' : '🔊 Talk';
    speakButton.setAttribute('aria-label', voiceEnabled ? 'Mute spoken replies' : 'Start spoken assistance');
    if (voiceEnabled) speak('Namaste. I am Shakti AI. What are you looking for today? You can ask about products, recipes, choosing a millet, or bulk orders.');
    else window.speechSynthesis?.cancel();
  });
})();
