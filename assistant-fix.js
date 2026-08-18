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

  const answer = (raw) => {
    const m = raw.toLowerCase().trim();
    if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/.test(m))
      return 'Hello! 👋 I am Shakti AI. I can help with Shakti Millets, general questions, millet nutrition, recipes, product comparisons, cooking, storage and B2B enquiries. What would you like to know?';

    if (/what (do|can) you have for me|what have you for me|what can you offer|what do you offer|how can you help|what can you help/.test(m))
      return 'I can help you with quite a lot! 🌾\n\n• Explore Shakti Millets products and MRP\n• Compare different millets and rice varieties\n• Explain millet nutrition and common benefits\n• Suggest simple millet recipes and cooking ideas\n• Answer general food and grain questions\n• Explain storage and preparation\n• Help with bulk orders, distributors and B2B enquiries\n\nJust ask me your question in your own words.';

    if (/who are you|what are you|your name/.test(m))
      return 'I am Shakti AI, the website assistant for Shakti Millets. I am here to help with products, millets, food-related questions, recipes, general information and B2B enquiries.';

    if (/song|music|movie|film|actor|actress|lyrics|playlist/.test(m))
      return 'I am the Shakti Millets website assistant, so I focus on millets, food, nutrition, recipes, products and business enquiries. Ask me anything related to those topics and I will help.';

    if (/\b(price|mrp|cost|rate)\b/.test(m))
      return 'You can see the published MRP and pack size on each product card. For current bulk pricing, use the B2B enquiry form or WhatsApp Shakti Millets.';

    if (/\b(product|products|catalog|catalogue)\b/.test(m))
      return 'Shakti Millets currently has 20 individual millet/rice products plus the 5 Little Millets Combo. Use the product filters to browse the catalogue.';

    if (/\b(benefit|benefits|healthy|health|nutrition|nutrient|nutrients)\b/.test(m))
      return 'Millets are whole grains that can provide fibre, complex carbohydrates, plant protein and minerals. Different varieties have different nutrition profiles. They work best as part of a varied, balanced diet.';

    if (/\b(diabet|blood sugar|sugar)\b/.test(m))
      return 'Millets can be included in a balanced diet, but blood-sugar response depends on the variety, portion, preparation and the individual. If you have diabetes, follow advice from your doctor or dietitian.';

    if (/\b(weight|weight loss|lose weight)\b/.test(m))
      return 'Millets can be part of a filling, fibre-rich eating pattern, but weight management depends on your overall diet, portions, activity and other factors—not one food alone.';

    if (/\b(recipe|recipes|cook|cooking|prepare|preparation|breakfast|lunch|dinner)\b/.test(m))
      return 'You can make millet porridge, dosa, idli, upma, khichdi, roti and rice-style meals. Tell me which millet you have and I can suggest a simple recipe.';

    if (/\b(ragi|finger millet)\b/.test(m))
      return 'Ragi (finger millet) is commonly used for porridge, dosa, roti and other dishes. It provides carbohydrates, fibre and minerals such as calcium.';

    if (/\bkodo\b/.test(m))
      return 'Kodo millet is versatile for rice-style meals, upma and khichdi. Shakti Millets offers unpolished, semipolished and parboiled Kodo Millet options.';

    if (/\b(foxtail)\b/.test(m))
      return 'Foxtail millet is suitable for rice-style meals, upma, dosa and other preparations. Shakti Millets lists a 500g unpolished Foxtail Millet pack.';

    if (/\bbarnyard\b/.test(m))
      return 'Barnyard millet can be used in rice-style meals, upma and fasting-friendly dishes. Shakti Millets lists semipolished and parboiled 500g options.';

    if (/\b(gluten|celiac)\b/.test(m))
      return 'Millets are naturally gluten-free. For celiac disease or gluten sensitivity, cross-contact during processing and preparation can still matter.';

    if (/\b(storage|store|shelf life)\b/.test(m))
      return 'Store millets and rice in airtight containers in a cool, dry place away from moisture and direct sunlight. Clean, dry storage helps preserve quality.';

    if (/\b(bulk|wholesale|distributor|distributor|retailer|restaurant|hotel|cafe|manufacturer|ton|kg)\b/.test(m))
      return 'Yes, Shakti Millets supports B2B enquiries. Tell me the products, approximate quantity and your city, or use the B2B enquiry form for current availability and pricing.';

    if (/\b(compare|comparison|difference)\b/.test(m))
      return 'Sure. Tell me the two products you want to compare. I can compare their variety, processing, pack size and published MRP.';

    return 'I can help with Shakti Millets products, millet and food questions, nutrition, recipes, cooking, storage, comparisons and B2B enquiries. Please ask me your question directly—for example, “Which millet is good for breakfast?” or “Compare Kodo and Foxtail millet.”';
  };

  // Replace the original button so its old listener cannot also answer.
  const button = oldButton.cloneNode(true);
  oldButton.replaceWith(button);

  const send = () => {
    const text = input.value.trim();
    if (!text) return;
    add(text, 'msg-user');
    input.value = '';
    button.disabled = true;
    button.textContent = '...';
    setTimeout(() => {
      add(answer(text), 'msg-bot');
      button.disabled = false;
      button.textContent = 'Send';
    }, 180);
  };

  button.addEventListener('click', send);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
})();
