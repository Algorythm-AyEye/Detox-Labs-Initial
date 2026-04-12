const PRODUCT_PRICE = 300;
const WHATSAPP_NUMBER = "923259229093"; // Updated to international format for WhatsApp compatibility

interface OrderState {
  view: 'hero' | 'order' | 'track';
  quantity: number;
  sweetness: string;
  addons: string[];
  name: string;
  phone: string;
  address: string;
}

let state: OrderState = {
  view: 'hero',
  quantity: 1,
  sweetness: 'Regular',
  addons: [],
  name: '',
  phone: '',
  address: ''
};

function render() {
  const app = document.getElementById('app');
  if (!app) return;

  // Initial structure if not present
  if (!document.getElementById('leaves-container')) {
    app.innerHTML = `
      <div class="leaf-bg"></div>
      <div class="falling-leaves-container" id="leaves-container"></div>
      <div id="nav-wrapper"></div>
      <main id="main-content" class="container animate-fade"></main>
      <div id="footer-wrapper"></div>
    `;
    initFallingLeaves();
  }

  const navWrapper = document.getElementById('nav-wrapper');
  const mainContent = document.getElementById('main-content');
  const footerWrapper = document.getElementById('footer-wrapper');

  if (navWrapper) {
    navWrapper.innerHTML = state.view !== 'hero' ? `
      <nav>
        <div class="container nav-content">
          <div class="logo" style="cursor: pointer;" id="nav-logo">
            <div class="logo-icon">🌿</div>
            <span style="text-transform: lowercase; font-weight: 800;">detox lab.</span>
          </div>
          <div class="tabs">
            <button class="tab-btn ${state.view === 'order' ? 'active' : ''}" id="order-tab">Order Now</button>
            <button class="tab-btn ${state.view === 'track' ? 'active' : ''}" id="track-tab">Track Order</button>
          </div>
        </div>
      </nav>
    ` : '';
  }

  if (mainContent) {
    mainContent.innerHTML = state.view === 'hero' ? renderHeroSection() : 
                           state.view === 'order' ? renderOrderSection() : 
                           renderTrackingSection();
    // Re-trigger animation
    mainContent.classList.remove('animate-fade');
    void mainContent.offsetWidth; // trigger reflow
    mainContent.classList.add('animate-fade');
  }

  if (footerWrapper) {
    footerWrapper.innerHTML = state.view !== 'hero' ? `
      <footer>
        <div class="container">
          <div class="footer-logo" style="text-transform: lowercase; font-weight: 800;">🌿 detox lab.</div>
          <p class="footer-text">Detox with a refill. Natural ingredients for skin glow and gut health.</p>
          <p class="copyright">&copy; ${new Date().getFullYear()} DETOX LAB. All rights reserved.</p>
        </div>
      </footer>
    ` : '';
  }

  setupEventListeners();
}

function renderHeroSection() {
  return `
    <div class="hero-section animate-fade">
      <div class="hero-content">
        <div class="hero-logo">
          <div class="logo-icon" style="width: 48px; height: 48px; font-size: 24px;">🌿</div>
          <span style="text-transform: lowercase; font-weight: 800; font-size: 2rem;">detox lab.</span>
        </div>
        <h1 class="hero-title">Revitalize Your Body with Nature's Best</h1>
        <p class="hero-subtitle">Experience the refreshing blend of Gond Katira & Mint. Handcrafted for your skin glow and gut health.</p>
        <div class="hero-actions">
          <button class="hero-btn primary" id="hero-order-btn">Order Now • Rs 300</button>
          <button class="hero-btn secondary" id="hero-track-btn">Track Existing Order</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="product-visual" style="max-width: 400px; margin: 0 auto;">
          <img src="https://gorgeous-coral-prr1snrdjb.edgeone.app/1776014531981.png">
          <div class="product-overlay">
            <p>Detox with a refill</p>
            <h1>Gond Katira & <br>Mint</h1>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOrderSection() {
  return `
    <div class="grid">
      <div class="product-info">
        <div class="product-visual">
          <img src="https://fragile-indigo-j2oym73ra5.edgeone.app/37581.png">
          <div class="product-overlay">
            <p>Detox with a refill</p>
            <h1>Gond Katira & <br>Mint</h1>
            <div class="product-meta">
              <span>✨ Skin Glow</span>
              <span>•</span>
              <span>Revitalizing</span>
              <span>•</span>
              <span>330ml</span>
            </div>
          </div>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🌿</div>
            <span>Natural<br>Ingredients</span>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💧</div>
            <span>Hydrating<br>Formula</span>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🕒</div>
            <span>Keep<br>Refrigerated</span>
          </div>
        </div>
      </div>

      <div class="order-form">
        <div class="form-header">
          <h2>Customize Order</h2>
          <div class="price-tag">Rs ${PRODUCT_PRICE}</div>
        </div>

        <div class="control-group">
          <label class="control-label">Quantity</label>
          <div class="qty-controls">
            <button class="qty-btn" id="qty-minus">-</button>
            <span class="qty-val">${state.quantity}</span>
            <button class="qty-btn" id="qty-plus">+</button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label">Sweetness Level</label>
          <div class="options-grid">
            ${['None', 'Low', 'Regular'].map(level => `
              <button class="option-btn ${state.sweetness === level ? 'active' : ''}" data-level="${level}">${level}</button>
            `).join('')}
          </div>
        </div>

        <div class="control-group">
          <label class="control-label">Free Add-ons</label>
          <div class="addons-flex">
            ${['Extra Mint', 'Extra Lemon', 'Chia Seeds', 'No Black Salt'].map(addon => `
              <button class="addon-pill ${state.addons.includes(addon) ? 'active' : ''}" data-addon="${addon}">${addon}</button>
            `).join('')}
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--stone-200); margin: 1rem 0;">

        <div class="control-group">
          <label class="control-label">Delivery Details</label>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div>
              <input type="text" placeholder="Full Name" class="input-field" id="name-input" value="${state.name}">
              <div class="error-msg" id="name-error">Please enter your full name (min 2 characters).</div>
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" class="input-field" id="phone-input" value="${state.phone}">
              <div class="error-msg" id="phone-error">Please enter a valid phone number (min 10 digits).</div>
            </div>
            <div>
              <textarea placeholder="Complete Delivery Address" rows="3" class="input-field" id="address-input">${state.address}</textarea>
              <div class="error-msg" id="address-error">Please enter a complete address (min 10 characters).</div>
            </div>
          </div>
        </div>

        <button class="checkout-btn" id="checkout-btn">
          ORDER NOw • Rs ${PRODUCT_PRICE * state.quantity}
        </button>
      </div>
    </div>
  `;
}

function renderTrackingSection() {
  return `
    <div class="tracking-container animate-fade">
      <div class="tracking-header">
        <h2>Track Your Order</h2>
        <p style="color: var(--stone-500)">Enter your phone number to see updates.</p>
      </div>

      <div class="track-form">
        <input type="tel" placeholder="Enter phone number" class="input-field" id="track-phone">
        <button class="track-btn" id="track-submit">Track</button>
      </div>

      <div id="tracking-result" class="hidden">
        <div class="tracking-card">
          <div class="tracking-info">
            <div>
              <div class="info-label">Order ID</div>
              <div class="info-val">#SN-4829</div>
            </div>
            <div style="text-align: right">
              <div class="info-label">Estimated Delivery</div>
              <div class="info-val">Today, 4:30 PM</div>
            </div>
          </div>

          <div class="steps">
            <div class="step active">
              <div class="step-icon">📦</div>
              <div class="step-content">
                <h4>Order Placed</h4>
                <p>We have received your order</p>
              </div>
            </div>
            <div class="step active">
              <div class="step-icon">🌿</div>
              <div class="step-content">
                <h4>Preparing</h4>
                <p>Freshly making your detox water</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">🚚</div>
              <div class="step-content">
                <h4>Out for Delivery</h4>
                <p>Rider is on the way</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">✅</div>
              <div class="step-content">
                <h4>Delivered</h4>
                <p>Enjoy your drink!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupEventListeners() {
  // Nav Logo
  document.getElementById('nav-logo')?.addEventListener('click', () => {
    state.view = 'hero';
    render();
  });

  // Hero Actions
  document.getElementById('hero-order-btn')?.addEventListener('click', () => {
    state.view = 'order';
    render();
  });

  document.getElementById('hero-track-btn')?.addEventListener('click', () => {
    state.view = 'track';
    render();
  });

  // Tabs
  document.getElementById('order-tab')?.addEventListener('click', () => {
    state.view = 'order';
    render();
  });

  document.getElementById('track-tab')?.addEventListener('click', () => {
    state.view = 'track';
    render();
  });

  // Quantity
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    state.quantity++;
    updateOrderUI();
  });

  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (state.quantity > 1) {
      state.quantity--;
      updateOrderUI();
    }
  });

  // Sweetness
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const level = (e.target as HTMLElement).dataset.level;
      if (level) {
        state.sweetness = level;
        updateOrderUI();
      }
    });
  });

  // Addons
  document.querySelectorAll('.addon-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const addon = (e.target as HTMLElement).dataset.addon;
      if (addon) {
        if (state.addons.includes(addon)) {
          state.addons = state.addons.filter(a => a !== addon);
        } else {
          state.addons.push(addon);
        }
        updateOrderUI();
      }
    });
  });

  // Inputs
  document.getElementById('name-input')?.addEventListener('input', (e) => {
    state.name = (e.target as HTMLInputElement).value;
    if (state.name.length >= 2) {
      document.getElementById('name-input')?.classList.remove('error');
      document.getElementById('name-error')?.classList.remove('visible');
    }
  });
  document.getElementById('phone-input')?.addEventListener('input', (e) => {
    state.phone = (e.target as HTMLInputElement).value;
    if (state.phone.replace(/\D/g, '').length >= 10) {
      document.getElementById('phone-input')?.classList.remove('error');
      document.getElementById('phone-error')?.classList.remove('visible');
    }
  });
  document.getElementById('address-input')?.addEventListener('input', (e) => {
    state.address = (e.target as HTMLTextAreaElement).value;
    if (state.address.length >= 10) {
      document.getElementById('address-input')?.classList.remove('error');
      document.getElementById('address-error')?.classList.remove('visible');
    }
  });

  // Checkout
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    let isValid = true;

    if (state.name.length < 2) {
      document.getElementById('name-input')?.classList.add('error');
      document.getElementById('name-error')?.classList.add('visible');
      isValid = false;
    }

    if (state.phone.replace(/\D/g, '').length < 10) {
      document.getElementById('phone-input')?.classList.add('error');
      document.getElementById('phone-error')?.classList.add('visible');
      isValid = false;
    }

    if (state.address.length < 10) {
      document.getElementById('address-input')?.classList.add('error');
      document.getElementById('address-error')?.classList.add('visible');
      isValid = false;
    }

    if (!isValid) return;

    const message = `*New Order: Gond Katira & Mint* 🌿
    
*Quantity:* ${state.quantity}
*Sweetness:* ${state.sweetness}
*Add-ons:* ${state.addons.length > 0 ? state.addons.join(', ') : 'None'}

*Total Amount:* Rs ${PRODUCT_PRICE * state.quantity}

*Delivery Details:*
Name: ${state.name || 'Not provided'}
Phone: ${state.phone || 'Not provided'}
Address: ${state.address || 'Not provided'}

Please confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
  });

  // Tracking
  document.getElementById('track-submit')?.addEventListener('click', () => {
    const phone = (document.getElementById('track-phone') as HTMLInputElement).value;
    if (phone) {
      document.getElementById('tracking-result')?.classList.remove('hidden');
    }
  });
}

function updateOrderUI() {
  if (state.view === 'order') {
    render();
  }
}

// Initial render
render();

function initFallingLeaves() {
  const container = document.getElementById('leaves-container');
  if (!container) return;

  const leafEmojis = ['🍃', '🌿', '🌱', '🍀'];
  const leafCount = 20;

  for (let i = 0; i < leafCount; i++) {
    createLeaf(container, leafEmojis);
  }
}

function createLeaf(container: HTMLElement, emojis: string[]) {
  const leaf = document.createElement('div');
  leaf.className = 'falling-leaf';
  leaf.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  
  const startLeft = Math.random() * 100;
  const duration = 10 + Math.random() * 20;
  const delay = Math.random() * 20;
  const size = 16 + Math.random() * 20;

  leaf.style.left = `${startLeft}%`;
  leaf.style.animationDuration = `${duration}s`;
  leaf.style.animationDelay = `-${delay}s`; // Negative delay so they start at different positions
  leaf.style.fontSize = `${size}px`;

  container.appendChild(leaf);
}
