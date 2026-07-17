// ============================================================
// PRODUCT DATA
// ============================================================
const products = [
  { id: 1, name: 'Foxtail Millet', category: 'Single Grain', weight: '1 kg', price: 120, emoji: '🌾', benefit: 'Low GI, high fiber, rich in iron & magnesium.' },
  { id: 2, name: 'Barnyard Millet', category: 'Single Grain', weight: '1 kg', price: 130, emoji: '🌾', benefit: 'High fiber, rich in iron & antioxidants.' },
  { id: 3, name: 'Finger Millet (Ragi)', category: 'Single Grain', weight: '1 kg', price: 110, emoji: '🌾', benefit: 'Excellent calcium, iron & amino acids.' },
  { id: 4, name: 'Pearl Millet (Bajra)', category: 'Single Grain', weight: '1 kg', price: 100, emoji: '🌾', benefit: 'Rich in magnesium, phosphorus & fiber.' },
  { id: 5, name: 'Sorghum (Jowar)', category: 'Single Grain', weight: '1 kg', price: 105, emoji: '🌾', benefit: 'Rich antioxidants & dietary fiber.' },
  { id: 6, name: 'Ragi Atta (Flour)', category: 'Flour', weight: '1 kg', price: 140, emoji: '🌾', benefit: 'High calcium & fiber.' },
  { id: 7, name: 'Jowar Atta (Flour)', category: 'Flour', weight: '1 kg', price: 130, emoji: '🌾', benefit: 'High fiber, gluten-free.' },
  { id: 8, name: 'Millet Mix – Daily Health', category: 'Mix', weight: '1 kg', price: 150, emoji: '🌾', benefit: 'Balanced vitamins, minerals & fiber.' },
  { id: 9, name: 'Foxtail Millet Poha', category: 'Ready-to-Cook', weight: '500g', price: 80, emoji: '🥣', benefit: 'High fiber, slow-release carbs.' },
  { id: 10, name: 'Millet Upma Mix', category: 'Premix', weight: '250g', price: 90, emoji: '🍲', benefit: 'High fiber, complex carbs.' },
  { id: 11, name: 'Millet Dosa Mix', category: 'Premix', weight: '500g', price: 150, emoji: '🥞', benefit: 'Gluten-free, high protein.' },
  { id: 12, name: 'Millet Idli Mix', category: 'Premix', weight: '500g', price: 160, emoji: '🍚', benefit: 'Light, soft, gluten-free.' },
  { id: 13, name: 'Millet Pongal Mix', category: 'Premix', weight: '250g', price: 95, emoji: '🍛', benefit: 'Rich in fiber, plant protein.' },
  { id: 14, name: 'Millet Paniyaram Mix', category: 'Premix', weight: '500g', price: 140, emoji: '🧇', benefit: 'Healthy snack alternative.' },
  { id: 15, name: 'Millet Murukku Mix', category: 'Snack Mix', weight: '500g', price: 120, emoji: '🥨', benefit: 'Healthier alternative to fried snacks.' },
  { id: 16, name: 'Millet Rava Upma Mix', category: 'Premix', weight: '250g', price: 85, emoji: '🍲', benefit: 'Protein-rich & fiber-rich.' },
  { id: 17, name: 'Millet Sweet Pongal Mix', category: 'Sweet Mix', weight: '250g', price: 110, emoji: '🍬', benefit: 'Traditional dessert, less refined sugar.' },
  { id: 18, name: 'Millet Khichdi Mix', category: 'Premix', weight: '250g', price: 100, emoji: '🍲', benefit: 'Easy to digest, comforting.' },
  { id: 19, name: 'Millet Ragi Malt Mix', category: 'Instant Drink', weight: '100g', price: 90, emoji: '🥤', benefit: 'Rich in calcium, iron & minerals.' }
];

// ============================================================
// RECIPE DATABASE
// ============================================================
const recipes = {
  foxtail: {
    name: 'Foxtail Millet Pulao',
    ingredients: '1 cup Foxtail Millet, 2 cups water, Mixed vegetables, Spices, Salt',
    method: '1. Rinse millet. 2. Heat oil, add spices and vegetables. 3. Add millet and water. 4. Cook for 15-20 minutes.',
    time: '30 mins'
  },
  barnyard: {
    name: 'Barnyard Millet Khichdi',
    ingredients: '1 cup Barnyard Millet, 1/2 cup Moong Dal, Vegetables, Ginger, Spices',
    method: '1. Wash millet and dal. 2. Pressure cook with vegetables and spices. 3. Serve hot.',
    time: '25 mins'
  },
  ragi: {
    name: 'Ragi Malt (Porridge)',
    ingredients: '2 tbsp Ragi flour, 1 cup milk/water, Jaggery, Cardamom',
    method: '1. Mix ragi flour with water. 2. Cook until thick. 3. Add milk, jaggery, cardamom. 4. Simmer for 2-3 mins.',
    time: '10 mins'
  },
  bajra: {
    name: 'Bajra Roti',
    ingredients: '2 cups Bajra flour, Hot water, Salt',
    method: '1. Mix flour with hot water and salt. 2. Knead into soft dough. 3. Roll into rotis. 4. Cook on tawa.',
    time: '20 mins'
  },
  jowar: {
    name: 'Jowar Bhakri',
    ingredients: '2 cups Jowar flour, Hot water, Salt',
    method: '1. Mix flour with hot water and salt. 2. Knead into firm dough. 3. Flatten into bhakris. 4. Cook on tawa.',
    time: '20 mins'
  },
  idli: {
    name: 'Millet Idli',
    ingredients: '1 cup Millet Idli Mix, Water',
    method: '1. Mix powder with water to make batter. 2. Pour into idli molds. 3. Steam for 10-12 minutes.',
    time: '15 mins'
  },
  dosa: {
    name: 'Millet Dosa',
    ingredients: '1 cup Millet Dosa Mix, Water',
    method: '1. Mix powder with water to make batter. 2. Heat dosa tawa. 3. Pour batter and spread. 4. Cook until crispy.',
    time: '10 mins'
  },
  khichdi: {
    name: 'Millet Khichdi',
    ingredients: '1 cup Millet Khichdi Mix, Water',
    method: '1. Mix powder with water. 2. Cook in pressure cooker for 2 whistles. 3. Serve hot.',
    time: '15 mins'
  },
  upma: {
    name: 'Millet Upma',
    ingredients: '1 cup Millet Upma Mix, Water, Vegetables (optional)',
    method: '1. Boil water. 2. Add mix and stir. 3. Cook for 5-7 minutes. 4. Serve hot.',
    time: '10 mins'
  },
  paniyaram: {
    name: 'Millet Paniyaram',
    ingredients: '1 cup Millet Paniyaram Mix, Water',
    method: '1. Mix powder with water. 2. Pour into paniyaram pan. 3. Cook until golden on both sides.',
    time: '15 mins'
  },
  murukku: {
    name: 'Millet Murukku',
    ingredients: '1 cup Millet Murukku Mix, Water, Oil for frying',
    method: '1. Mix with water to form dough. 2. Press through murukku maker. 3. Fry until golden.',
    time: '30 mins'
  },
  'ragi malt': {
    name: 'Ragi Malt (Instant Drink)',
    ingredients: '2 tbsp Ragi Malt Mix, 1 cup hot milk or water',
    method: '1. Mix powder with hot milk or water. 2. Stir well. 3. Serve warm.',
    time: '5 mins'
  },
  'sweet pongal': {
    name: 'Sweet Millet Pongal',
    ingredients: '1 cup Sweet Pongal Mix, Water, Ghee, Dry fruits',
    method: '1. Mix with water. 2. Cook in pressure cooker for 2 whistles. 3. Add ghee and dry fruits.',
    time: '20 mins'
  }
};

// ============================================================
// RENDER PRODUCTS
// ============================================================
const grid = document.getElementById('productGrid');
if (grid) {
  products.forEach(function(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = 
      '<div class="emoji">' + p.emoji + '</div>' +
      '<h3>' + p.name + '</h3>' +
      '<div class="category">' + p.category + '</div>' +
      '<div class="price">₹' + p.price + ' <span>/' + p.weight + '</span></div>' +
      '<div class="benefit">' + p.benefit + '</div>' +
      '<a href="https://wa.me/919760015078?text=Hi%20Shakti%20Millets!%20I%20want%20to%20order%20' + encodeURIComponent(p.name) + '%20(' + p.weight + ')%20-%20₹' + p.price + '" class="btn-whatsapp" target="_blank">📱 Order on WhatsApp</a>';
    grid.appendChild(card);
  });
}

// ============================================================
// AI ASSISTANT
// ============================================================
var chatLog = document.getElementById('chatLog');
var chatInput = document.getElementById('chatInput');
var chatSend = document.getElementById('chatSend');

function sendRecipe(recipeKey) {
  var r = recipes[recipeKey];
  if (!r) return null;
  return '🍽️ **' + r.name + '**\n⏱️ Time: ' + r.time + '\n\n🛒 **Ingredients:**\n' + r.ingredients + '\n\n👨‍🍳 **Method:**\n' + r.method + '\n\n💡 Try this recipe and share your dish for 50 reward points! 📸';
}

function getAIResponse(msg) {
  var m = msg.toLowerCase().trim();

  // === RECIPE REQUESTS ===
  if (m.indexOf('recipe') !== -1 || m.indexOf('cook') !== -1 || m.indexOf('how to make') !== -1 || m.indexOf('how to prepare') !== -1) {
    if (m.indexOf('foxtail') !== -1) return sendRecipe('foxtail');
    if (m.indexOf('barnyard') !== -1) return sendRecipe('barnyard');
    if (m.indexOf('ragi') !== -1 && m.indexOf('ragi malt') === -1) return sendRecipe('ragi');
    if (m.indexOf('bajra') !== -1) return sendRecipe('bajra');
    if (m.indexOf('jowar') !== -1) return sendRecipe('jowar');
    if (m.indexOf('idli') !== -1) return sendRecipe('idli');
    if (m.indexOf('dosa') !== -1) return sendRecipe('dosa');
    if (m.indexOf('khichdi') !== -1) return sendRecipe('khichdi');
    if (m.indexOf('upma') !== -1) return sendRecipe('upma');
    if (m.indexOf('paniyaram') !== -1) return sendRecipe('paniyaram');
    if (m.indexOf('murukku') !== -1) return sendRecipe('murukku');
    if (m.indexOf('ragi malt') !== -1) return sendRecipe('ragi malt');
    if (m.indexOf('sweet pongal') !== -1) return sendRecipe('sweet pongal');
    return '🌾 I have recipes for:\n• Foxtail Millet\n• Barnyard Millet\n• Ragi\n• Bajra\n• Jowar\n• Idli\n• Dosa\n• Khichdi\n• Upma\n• Paniyaram\n• Murukku\n• Ragi Malt\n• Sweet Pongal\n\nJust say: **"Recipe for [name]"** 😊';
  }

  // === HEALTH RECOMMENDATIONS ===
  if (m.indexOf('diabetes') !== -1 || m.indexOf('sugar') !== -1) {
    return '🌾 For diabetes, I recommend **Foxtail Millet** or **Barnyard Millet**. Both have a low glycemic index and help manage blood sugar. Would you like a recipe? 😊';
  }
  if (m.indexOf('weight loss') !== -1 || m.indexOf('lose weight') !== -1) {
    return '🌾 For weight loss, **Barnyard Millet** and **Pearl Millet (Bajra)** are excellent. High in fiber, they keep you full longer. 😊';
  }
  if (m.indexOf('bone') !== -1 || m.indexOf('calcium') !== -1) {
    return '🌾 For bone health, **Finger Millet (Ragi)** is the best! It has 10x more calcium than wheat. 😊';
  }
  if (m.indexOf('heart') !== -1) {
    return '❤️ For heart health, **Foxtail Millet** and **Pearl Millet (Bajra)** are great choices. Rich in magnesium and antioxidants. 😊';
  }
  if (m.indexOf('gluten') !== -1) {
    return '🌾 All our millets are **100% gluten-free**! Safe for celiac and gluten-sensitive people. 😊';
  }

  // === PRICE INQUIRIES ===
  if (m.indexOf('price') !== -1 || m.indexOf('cost') !== -1 || m.indexOf('rate') !== -1) {
    return '💰 **Our Prices:**\n• Foxtail Millet: ₹120/kg\n• Barnyard Millet: ₹130/kg\n• Ragi: ₹110/kg\n• Bajra: ₹100/kg\n• Jowar: ₹105/kg\n• Ragi Atta: ₹140/kg\n• Jowar Atta: ₹130/kg\n\nSee all products in our Products section! 🛒';
  }

  // === ORDER INQUIRIES ===
  if (m.indexOf('order') !== -1 || m.indexOf('buy') !== -1 || m.indexOf('purchase') !== -1) {
    return '🛒 You can order directly via WhatsApp!\n\n📱 Click the **"Order on WhatsApp"** button on any product card, or use the floating WhatsApp icon at the bottom right.\n\n📞 WhatsApp: 9760015078';
  }

  // === DEFAULT RESPONSE ===
  return '🌾 I can help you with:\n\n1️⃣ **Recipes** – "Recipe for Ragi"\n2️⃣ **Health** – "Which millet for diabetes?"\n3️⃣ **Prices** – "Price of Barnyard"\n4️⃣ **Orders** – "How to order?"\n\nTry it now! 😊';
}

// ============================================================
// CHAT UI FUNCTIONS
// ============================================================
function addMessage(text, isUser) {
  var div = document.createElement('div');
  div.className = 'msg ' + (isUser ? 'msg-user' : 'msg-bot');
  div.innerHTML = text.replace(/\n/g, '<br>');
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleSend() {
  var text = chatInput.value.trim();
  if (text === '') return;
  addMessage(text, true);
  chatInput.value = '';
  setTimeout(function() {
    var reply = getAIResponse(text);
    addMessage(reply, false);
  }, 500);
}

// ============================================================
// EVENT LISTENERS
// ============================================================
if (chatSend) {
  chatSend.addEventListener('click', handleSend);
}
if (chatInput) {
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      handleSend();
    }
  });
}