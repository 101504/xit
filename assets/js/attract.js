// Attract Loop - Auto-play demo when idle
class AttractLoop {
  constructor(smartWall) {
    this.smartWall = smartWall;
    this.idleTime = 0;
    this.idleTimeout = 30000; // 30 seconds
    this.attractInterval = null;
    this.isInAttractMode = false;
    
    this.init();
  }
  
  init() {
    // Reset idle timer on any user interaction
    ['mousedown', 'touchstart', 'keydown'].forEach(event => {
      document.addEventListener(event, () => this.resetIdle());
    });
    
    // Start checking for idle
    setInterval(() => this.checkIdle(), 1000);
  }
  
  resetIdle() {
    this.idleTime = 0;
    
    if (this.isInAttractMode) {
      this.stopAttractMode();
    }
  }
  
  checkIdle() {
    // Only track idle on welcome screen
    if (this.smartWall.currentScreen !== 'welcome') {
      this.idleTime = 0;
      return;
    }
    
    this.idleTime += 1000;
    
    if (this.idleTime >= this.idleTimeout && !this.isInAttractMode) {
      this.startAttractMode();
    }
  }
  
  startAttractMode() {
    this.isInAttractMode = true;
    const welcome = document.getElementById('welcome-screen');
    
    if (!welcome) return;
    
    // Add pulsing effect to start button
    const startBtn = welcome.querySelector('[data-action="start"]');
    if (startBtn) {
      startBtn.classList.add('pulse-attract');
    }
    
    // Cycle through language buttons
    let langIndex = 0;
    const langButtons = ['en', 'nl', 'fr'];
    
    this.attractInterval = setInterval(() => {
      if (!this.isInAttractMode) return;
      
      langIndex = (langIndex + 1) % langButtons.length;
      this.smartWall.setLanguage(langButtons[langIndex]);
    }, 3000);
  }
  
  stopAttractMode() {
    this.isInAttractMode = false;
    
    if (this.attractInterval) {
      clearInterval(this.attractInterval);
      this.attractInterval = null;
    }
    
    // Remove pulsing effect
    const startBtn = document.querySelector('[data-action="start"]');
    if (startBtn) {
      startBtn.classList.remove('pulse-attract');
    }
  }
}

// Initialize attract loop after SmartWall is ready
if (window.smartWall) {
  window.attractLoop = new AttractLoop(window.smartWall);
}
