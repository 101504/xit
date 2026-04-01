// Smart Wall Application - Main JavaScript
class SmartWall {
  constructor() {
    this.currentScreen = 'welcome';
    this.language = 'en';
    this.cameraStream = null;
    this.session = {
      faceShape: null,
      preferences: {
        style: [],
        usage: []
      },
      recommendations: [],
      selectedProduct: null,
      customization: {
        frameColor: null,
        lensColor: null
      },
      capturedImage: null,
      timestamp: null
    };
    this.products = [];
    this.translations = {};
    this.isProcessing = false;
    
    this.init();
  }

  async init() {
    await this.loadProducts();
    await this.loadTranslations();
    this.setupEventListeners();
    this.showScreen('welcome');
    this.checkForSessionRestore();
  }

  async loadProducts() {
    try {
      const response = await fetch('data/products.json');
      const data = await response.json();
      this.products = data.glasses;
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }

  async loadTranslations() {
    this.translations = {
      en: {
        welcome_title: "DISCOVER YOUR PERFECT RAY-BAN",
        welcome_subtitle: "Let's find the perfect glasses for you",
        start_button: "Start Now",
        select_language: "Select Language",
        scan_title: "FACE SCAN",
        scan_subtitle: "Position your face in the frame",
        align_face: "Align your face with the oval",
        scan_button: "Capture",
        scanning: "Analyzing...",
        preferences_title: "YOUR STYLE",
        preferences_subtitle: "What are you looking for?",
        style_casual: "Casual",
        style_sport: "Sport",
        style_elegant: "Elegant",
        style_vintage: "Vintage",
        usage_everyday: "Everyday",
        usage_outdoor: "Outdoor",
        usage_fashion: "Fashion",
        usage_work: "Work",
        continue: "Continue",
        skip: "Skip",
        results_title: "YOUR RECOMMENDATIONS",
        results_subtitle: "We found these perfect matches for you",
        customize: "Customize",
        try_on: "Try This One",
        customize_title: "CUSTOMIZE YOUR RAY-BAN",
        frame_color: "Frame Color",
        lens_color: "Lens Color",
        price: "Price",
        total_price: "Total Price",
        save_config: "Save Configuration",
        email_title: "SAVE YOUR LOOK",
        email_subtitle: "We'll send you all the details",
        email_placeholder: "your@email.com",
        send_email: "Send to Email",
        success_title: "ALL SET!",
        success_subtitle: "Check your email for your personalized configuration",
        scan_qr: "Scan this QR code to continue at home",
        start_new: "Start New Session",
        sustainability: "Eco-Friendly",
        back: "Back"
      },
      nl: {
        welcome_title: "ONTDEK JE PERFECTE RAY-BAN",
        welcome_subtitle: "Laten we de perfecte bril voor jou vinden",
        start_button: "Start Nu",
        select_language: "Kies Taal",
        scan_title: "GEZICHTSSCAN",
        scan_subtitle: "Plaats je gezicht in het kader",
        align_face: "Plaats je gezicht in het ovaal",
        scan_button: "Vastleggen",
        scanning: "Analyseren...",
        preferences_title: "JOUW STIJL",
        preferences_subtitle: "Waar ben je naar op zoek?",
        style_casual: "Casual",
        style_sport: "Sport",
        style_elegant: "Elegant",
        style_vintage: "Vintage",
        usage_everyday: "Dagelijks",
        usage_outdoor: "Outdoor",
        usage_fashion: "Fashion",
        usage_work: "Werk",
        continue: "Verder",
        skip: "Overslaan",
        results_title: "JOUW AANBEVELINGEN",
        results_subtitle: "We hebben deze perfecte matches voor je gevonden",
        customize: "Aanpassen",
        try_on: "Probeer Deze",
        customize_title: "PAS JE RAY-BAN AAN",
        frame_color: "Montuur Kleur",
        lens_color: "Glas Kleur",
        price: "Prijs",
        total_price: "Totale Prijs",
        save_config: "Configuratie Opslaan",
        email_title: "BEWAAR JE LOOK",
        email_subtitle: "We sturen je alle details",
        email_placeholder: "jouw@email.com",
        send_email: "Stuur naar Email",
        success_title: "KLAAR!",
        success_subtitle: "Check je email voor je persoonlijke configuratie",
        scan_qr: "Scan deze QR-code om thuis verder te gaan",
        start_new: "Nieuwe Sessie",
        sustainability: "Duurzaam",
        back: "Terug"
      },
      fr: {
        welcome_title: "DÉCOUVREZ VOS RAY-BAN PARFAITES",
        welcome_subtitle: "Trouvons les lunettes parfaites pour vous",
        start_button: "Commencer",
        select_language: "Choisir la Langue",
        scan_title: "SCAN DU VISAGE",
        scan_subtitle: "Positionnez votre visage dans le cadre",
        align_face: "Alignez votre visage dans l'ovale",
        scan_button: "Capturer",
        scanning: "Analyse...",
        preferences_title: "VOTRE STYLE",
        preferences_subtitle: "Que recherchez-vous?",
        style_casual: "Décontracté",
        style_sport: "Sport",
        style_elegant: "Élégant",
        style_vintage: "Vintage",
        usage_everyday: "Quotidien",
        usage_outdoor: "Extérieur",
        usage_fashion: "Mode",
        usage_work: "Travail",
        continue: "Continuer",
        skip: "Passer",
        results_title: "VOS RECOMMANDATIONS",
        results_subtitle: "Nous avons trouvé ces correspondances parfaites",
        customize: "Personnaliser",
        try_on: "Essayer",
        customize_title: "PERSONNALISEZ VOS RAY-BAN",
        frame_color: "Couleur Monture",
        lens_color: "Couleur Verre",
        price: "Prix",
        total_price: "Prix Total",
        save_config: "Sauvegarder",
        email_title: "SAUVEGARDEZ VOTRE LOOK",
        email_subtitle: "Nous vous enverrons tous les détails",
        email_placeholder: "votre@email.com",
        send_email: "Envoyer par Email",
        success_title: "C'EST FAIT!",
        success_subtitle: "Consultez votre email pour votre configuration personnalisée",
        scan_qr: "Scannez ce QR code pour continuer à la maison",
        start_new: "Nouvelle Session",
        sustainability: "Écologique",
        back: "Retour"
      }
    };
  }

  t(key) {
    return this.translations[this.language]?.[key] || key;
  }

  setupEventListeners() {
    // Language selection
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setLanguage(e.target.dataset.lang);
      });
    });

    // Navigation buttons
    document.addEventListener('click', (e) => {
      if (e.target.dataset.action) {
        this.handleAction(e.target.dataset.action, e.target);
      }
    });

    // Preference selection
    document.querySelectorAll('.preference-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.togglePreference(e.currentTarget);
      });
    });
  }

  setLanguage(lang) {
    this.language = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    this.updateTranslations();
  }

  updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (el.tagName === 'INPUT') {
        el.placeholder = this.t(key);
      } else {
        el.textContent = this.t(key);
      }
    });
  }

  showScreen(screenId) {
    // Prevent navigation during processing
    if (this.isProcessing && screenId !== this.currentScreen) {
      return;
    }
    
    const prevScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(`${screenId}-screen`);
    
    if (!nextScreen) {
      console.error(`Screen not found: ${screenId}`);
      return;
    }
    
    // Fade out current screen
    if (prevScreen) {
      prevScreen.classList.add('fade-out');
    }
    
    setTimeout(() => {
      // Remove all active classes
      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active', 'fade-out');
      });
      
      // Activate new screen
      nextScreen.classList.add('active');
      this.currentScreen = screenId;
      
      // Screen-specific initialization
      if (screenId === 'scan') {
        this.initCamera();
      } else if (screenId === 'results') {
        this.displayRecommendations();
      } else if (screenId === 'customize') {
        this.initCustomization();
      } else if (screenId === 'welcome') {
        this.stopCamera();
      }
      
      // Update progress if applicable
      this.updateProgress(screenId);
    }, 200);
  }
  
  updateProgress(screenId) {
    const progressBar = document.querySelector('.progress-fill');
    if (!progressBar) return;
    
    const screens = ['welcome', 'scan', 'preferences', 'results', 'customize', 'email', 'success'];
    const index = screens.indexOf(screenId);
    const progress = ((index + 1) / screens.length) * 100;
    
    progressBar.style.width = `${progress}%`;
  }

  async handleAction(action, element) {
    switch(action) {
      case 'start':
        this.showScreen('scan');
        break;
      case 'capture':
        await this.captureAndAnalyze();
        break;
      case 'skip-preferences':
        this.generateRecommendations();
        this.showScreen('results');
        break;
      case 'continue-preferences':
        this.generateRecommendations();
        this.showScreen('results');
        break;
      case 'customize':
        const productId = element.dataset.product;
        this.selectProduct(productId);
        this.showScreen('customize');
        break;
      case 'select-product':
        const id = element.dataset.product;
        this.highlightProduct(id);
        break;
      case 'save-config':
        this.showScreen('email');
        break;
      case 'send-email':
        await this.sendEmail();
        break;
      case 'start-new':
        this.resetSession();
        break;
      case 'back':
        this.navigateBack();
        break;
    }
  }

  async initCamera() {
    try {
      const video = document.getElementById('camera');
      
      // Stop any existing stream
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach(track => track.stop());
      }
      
      // Request camera with optimal settings
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      
      this.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = this.cameraStream;
      
      // Wait for video to be ready
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve();
        };
      });
      
      // Add visual feedback
      document.querySelector('.camera-overlay').classList.add('active');
      
    } catch (error) {
      console.error('Camera access denied:', error);
      
      // Show user-friendly error
      const errorMsg = error.name === 'NotAllowedError' 
        ? 'Camera access was denied. Please allow camera access and try again.'
        : error.name === 'NotFoundError'
        ? 'No camera found. Please connect a camera and try again.'
        : 'Unable to access camera. Please check your settings.';
      
      this.showNotification(errorMsg, 'error');
      
      // Go back to welcome after error
      setTimeout(() => this.showScreen('welcome'), 3000);
    }
  }
  
  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-icon">${type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  async captureAndAnalyze() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Draw video frame with enhanced quality
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Store captured image
    this.session.capturedImage = canvas.toDataURL('image/jpeg', 0.95);
    this.session.timestamp = new Date().toISOString();
    
    // Show analyzing state with animation
    const btn = document.querySelector('[data-action="capture"]');
    const overlay = document.querySelector('.camera-overlay');
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loading"></div> <span data-i18n="scanning">' + this.t('scanning') + '</span>';
    
    // Flash effect on capture
    overlay.classList.add('flash');
    setTimeout(() => overlay.classList.remove('flash'), 200);
    
    // Simulate AI analysis with progress
    await this.analyzeFace();
    
    // Stop camera
    this.stopCamera();
    
    // Show success message
    this.showNotification('Face scan complete!', 'success');
    
    // Move to preferences
    setTimeout(() => {
      this.isProcessing = false;
      this.showScreen('preferences');
    }, 1000);
  }

  async analyzeFace() {
    // Simulate face shape detection
    return new Promise(resolve => {
      setTimeout(() => {
        const shapes = ['oval', 'round', 'square', 'heart', 'diamond'];
        this.session.faceShape = shapes[Math.floor(Math.random() * shapes.length)];
        resolve();
      }, 2000);
    });
  }

  togglePreference(button) {
    button.classList.toggle('active');
    
    const category = button.dataset.category;
    const value = button.dataset.value;
    
    if (!this.session.preferences[category]) {
      this.session.preferences[category] = [];
    }
    
    const index = this.session.preferences[category].indexOf(value);
    if (index > -1) {
      this.session.preferences[category].splice(index, 1);
    } else {
      this.session.preferences[category].push(value);
    }
  }

  generateRecommendations() {
    let scored = this.products.map(product => {
      let score = 0;
      
      // Face shape matching
      if (this.session.faceShape && product.faceShapes.includes(this.session.faceShape)) {
        score += 50;
      }
      
      // Style preferences
      const stylePrefs = this.session.preferences.style || [];
      const styleMatches = product.style.filter(s => stylePrefs.includes(s)).length;
      score += styleMatches * 20;
      
      // Usage preferences  
      const usagePrefs = this.session.preferences.usage || [];
      const usageMatch = usagePrefs.some(u => product.style.includes(u));
      if (usageMatch) score += 15;
      
      // Sustainability bonus
      if (product.sustainability) score += 10;
      
      // Random factor for variety
      score += Math.random() * 10;
      
      return { product, score };
    });
    
    // Sort by score and take top 3
    scored.sort((a, b) => b.score - a.score);
    this.session.recommendations = scored.slice(0, 3).map(item => item.product);
  }

  displayRecommendations() {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';
    
    this.session.recommendations.forEach(product => {
      const card = this.createProductCard(product);
      container.appendChild(card);
    });
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    // Calculate default price
    const defaultPrice = product.price;
    
    card.innerHTML = `
      ${product.sustainability ? '<div class="sustainability-badge">♻️ ' + this.t('sustainability') + '</div>' : ''}
      <div class="product-image">
        <div class="product-icon">🕶️</div>
        <div class="product-badge">${product.model}</div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-model">${product.model}</div>
        <div class="product-price">€${defaultPrice}</div>
      </div>
      <button class="btn btn-primary product-cta" 
              data-action="customize" data-product="${product.id}">
        ✨ ${this.t('customize')}
      </button>
    `;
    
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.highlightProduct(product.id);
      }
    });
    
    return card;
  }

  highlightProduct(productId) {
    // Visual feedback - simulate store lighting
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.remove('selected', 'lighting');
    });
    
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (card) {
      card.classList.add('selected', 'lighting');
      setTimeout(() => card.classList.remove('lighting'), 1000);
    }
  }

  selectProduct(productId) {
    this.session.selectedProduct = this.products.find(p => p.id === productId);
    this.session.customization = {
      frameColor: this.session.selectedProduct.defaultColor.frame,
      lensColor: this.session.selectedProduct.defaultColor.lens
    };
  }

  initCustomization() {
    const product = this.session.selectedProduct;
    if (!product) return;
    
    // Display product info
    document.getElementById('custom-product-name').textContent = product.name;
    document.getElementById('custom-product-model').textContent = product.model;
    this.updateCustomizationPrice();
    
    // Frame colors
    const frameContainer = document.getElementById('frame-colors');
    frameContainer.innerHTML = '';
    product.colors.frame.forEach(color => {
      const option = this.createColorOption(color, 'frame');
      frameContainer.appendChild(option);
    });
    
    // Lens colors
    const lensContainer = document.getElementById('lens-colors');
    lensContainer.innerHTML = '';
    product.colors.lens.forEach(color => {
      const option = this.createColorOption(color, 'lens');
      lensContainer.appendChild(option);
    });
    
    // Set active colors
    this.updateColorSelection();
  }

  createColorOption(color, type) {
    const option = document.createElement('div');
    option.className = 'color-option';
    option.style.background = color.hex;
    option.dataset.colorId = color.id;
    option.dataset.type = type;
    option.dataset.name = color.name;
    option.setAttribute('data-name', color.name);
    
    option.addEventListener('click', () => {
      this.selectColor(type, color.id);
    });
    
    return option;
  }

  selectColor(type, colorId) {
    if (type === 'frame') {
      this.session.customization.frameColor = colorId;
    } else {
      this.session.customization.lensColor = colorId;
    }
    
    this.updateColorSelection();
    this.updateCustomizationPrice();
    this.updateProductPreview();
  }

  updateColorSelection() {
    document.querySelectorAll('.color-option').forEach(option => {
      const isActive = (option.dataset.type === 'frame' && 
                       option.dataset.colorId === this.session.customization.frameColor) ||
                      (option.dataset.type === 'lens' && 
                       option.dataset.colorId === this.session.customization.lensColor);
      option.classList.toggle('active', isActive);
    });
  }

  updateCustomizationPrice() {
    const product = this.session.selectedProduct;
    const frameColor = product.colors.frame.find(c => c.id === this.session.customization.frameColor);
    const lensColor = product.colors.lens.find(c => c.id === this.session.customization.lensColor);
    
    const total = product.price + (frameColor?.price || 0) + (lensColor?.price || 0);
    document.getElementById('custom-price').textContent = `€${total}`;
  }

  updateProductPreview() {
    // In a real app, this would swap product images
    // For now, we'll just show visual feedback
    const preview = document.getElementById('custom-preview');
    preview.style.transform = 'scale(1.05)';
    setTimeout(() => {
      preview.style.transform = 'scale(1)';
    }, 200);
  }

  async sendEmail() {
    const email = document.getElementById('email-input').value;
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    this.session.email = email;
    
    // Generate shareable configuration
    const config = this.generateShareableConfig();
    
    // Generate QR code
    this.generateQRCode(config);
    
    // Save to localStorage for restoration
    localStorage.setItem('rayban_session', JSON.stringify(this.session));
    
    // Show success
    this.showScreen('success');
  }

  generateShareableConfig() {
    const config = {
      product: this.session.selectedProduct.id,
      frame: this.session.customization.frameColor,
      lens: this.session.customization.lensColor,
      email: this.session.email
    };
    
    return btoa(JSON.stringify(config));
  }

  generateQRCode(config) {
    const url = window.location.origin + window.location.pathname + '?config=' + config;
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    
    // Using QRCode.js library (loaded in HTML)
    new QRCode(qrContainer, {
      text: url,
      width: 400,
      height: 400,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });
  }

  checkForSessionRestore() {
    const urlParams = new URLSearchParams(window.location.search);
    const config = urlParams.get('config');
    
    if (config) {
      this.restoreSession(config);
    }
  }

  restoreSession(configString) {
    try {
      const config = JSON.parse(atob(configString));
      
      // Find product
      const product = this.products.find(p => p.id === config.product);
      if (!product) return;
      
      // Restore session
      this.session.selectedProduct = product;
      this.session.customization = {
        frameColor: config.frame,
        lensColor: config.lens
      };
      
      // Show customization screen
      this.showScreen('customize');
    } catch (error) {
      console.error('Failed to restore session:', error);
    }
  }

  resetSession() {
    // Stop camera if active
    this.stopCamera();
    
    // Reset session data
    this.session = {
      faceShape: null,
      preferences: { style: [], usage: [] },
      recommendations: [],
      selectedProduct: null,
      customization: { frameColor: null, lensColor: null },
      capturedImage: null,
      timestamp: null
    };
    
    // Reset processing flag
    this.isProcessing = false;
    
    // Clear localStorage
    localStorage.removeItem('rayban_session');
    
    // Show welcome screen
    this.showScreen('welcome');
    
    // Show notification
    this.showNotification('Session reset - ready for new customer!', 'success');
  }

  navigateBack() {
    // Stop camera if going back from scan screen
    if (this.currentScreen === 'scan') {
      this.stopCamera();
    }
    
    const flow = ['welcome', 'scan', 'preferences', 'results', 'customize', 'email', 'success'];
    const currentIndex = flow.indexOf(this.currentScreen);
    
    if (currentIndex > 0) {
      this.showScreen(flow[currentIndex - 1]);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.smartWall = new SmartWall();
  console.log('🕶️ Ray-Ban Smart Wall initialized');
});
