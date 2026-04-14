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

function renderHeroSection(): string {
  return `
    <div class="hero-section animate-fade">
      <div class="hero-content">
        <div class="hero-logo">
          <div class="logo-icon" style="width: 48px; height: 48px; font-size: 24px;">🌿</div>
          <span style="text-transform: lowercase; font-weight: 800; font-size: 2.5rem; color: white;">detox lab.</span>
        </div>
        <h1 class="hero-title" style="color: white; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin: 2rem 0 1rem 0;">
          Revitalize Your Body with Nature's Best
        </h1>
        <p class="hero-subtitle" style="color: rgba(255,255,255,0.9); font-size: 1.25rem; margin-bottom: 2rem; max-width: 500px;">
          Experience the refreshing blend of Gond Katira & Mint. Handcrafted for your skin glow and gut health.
        </p>
        <div class="hero-actions">
          <button class="hero-btn primary" id="hero-order-btn">Order Now • Rs 300</button>
          <button class="hero-btn secondary" id="hero-track-btn">Track Existing Order</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="product-visual" style="max-width: 400px; margin: 0 auto; position: relative; aspect-ratio: 4/5; border-radius: 24px; overflow: hidden; background: #111;">
          <div class="hero-product-image"></div>
          <div class="product-overlay" style="position: relative; z-index: 10; background: transparent !important;">
            <p style="color: #a7f3d0; font-style: italic;">Detox with a refill</p>
            <h1 style="color: white; text-shadow: 0 4px 15px rgba(0,0,0,0.8);">Gond Katira & <br>Mint</h1>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOrderPage(): string {
  return `
    <div class="order-page animate-fade" style="
      padding: 2rem; 
      min-height: 100vh; 
      /* Try the relative path with ./ */
      background-image: url('./bg.jpg'); 
      background-size: cover; 
      background-position: center; 
      background-attachment: fixed;
      display: flex; 
      flex-wrap: wrap; 
      gap: 3rem; 
      justify-content: center; 
      align-items: flex-start;">
      
      <div class="product-preview" style="flex: 1; min-width: 300px; max-width: 450px;">
        <div style="border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); background: #111; aspect-ratio: 1/1;">
          <img src="./ordersection.jpg" 
               alt="Order Preview" 
               style="width: 100%; height: 100%; object-fit: cover; display: block;">
        </div>
      </div>

      <div class="customize-container" style="
        flex: 1.2; 
        min-width: 320px; 
        max-width: 500px; 
        background: #1a1a1a; 
        padding: 2.5rem; 
        border-radius: 30px; 
        border: 1px solid rgba(255,255,255,0.1);
        color: white;">
        
        <h2 style="margin: 0 0 2rem 0; font-size: 2.2rem; font-weight: 700; color: white;">Customize Order</h2>

        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
          <input type="text" placeholder="Full Name" style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid #333; background: #000; color: white;">
          <input type="text" placeholder="WhatsApp Number" style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid #333; background: #000; color: white;">
          <textarea placeholder="Delivery Address" style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid #333; background: #000; color: white; height: 120px; resize: none;"></textarea>
        </div>

        <button class="hero-btn primary" id="confirm-order" style="width: 100%; margin-top: 2rem; padding: 1.25rem; background: #22c55e; color: white; border: none; border-radius: 16px; font-weight: 700; cursor: pointer; font-size: 1.2rem;">
          Confirm via WhatsApp
        </button>
      </div>
    </div>
  `;
}function renderTrackingSection() {
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

// Add these lines at the very end of your file
document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    // This handles the "Order Now" button click
    if (target && target.id === 'hero-order-btn') {
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = renderOrderPage();
            // Scroll to top so they see the new image
            window.scrollTo(0, 0);
        }
    }

    // This handles the "Confirm Order" button on the second page
    if (target && target.id === 'confirm-order') {
        alert("Connecting to WhatsApp...");
        // You can add your WhatsApp link logic here later!
    }
});
