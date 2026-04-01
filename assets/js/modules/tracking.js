/**
 * Ray-Ban Kiosk - Glasses Tracking System
 * Tracks user interactions with glasses throughout the experience
 */

class GlassesTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    this.currentGlass = null;
    this.viewedGlasses = new Set();
    this.selectedGlasses = new Set();
    
    this.init();
  }
  
  generateSessionId() {
    return 'rbk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  init() {
    console.log(`🕶️ Tracking initialized - Session: ${this.sessionId}`);
    this.trackEvent('session_start');
  }
  
  // Track generic event
  trackEvent(eventName, data = {}) {
    const event = {
      timestamp: Date.now(),
      session: this.sessionId,
      event: eventName,
      data: data,
      timeFromStart: Date.now() - this.startTime
    };
    
    this.events.push(event);
    console.log(`📊 Event: ${eventName}`, data);
    
    // Store in localStorage for persistence
    this.saveToStorage();
    
    return event;
  }
  
  // Track when user views a glass
  trackGlassView(glassData) {
    this.viewedGlasses.add(glassData.model);
    this.currentGlass = glassData;
    
    return this.trackEvent('glass_viewed', {
      name: glassData.name,
      model: glassData.model,
      price: glassData.price,
      shape: glassData.shape,
      totalViewed: this.viewedGlasses.size
    });
  }
  
  // Track when user selects/clicks a glass
  trackGlassSelection(glassData) {
    this.selectedGlasses.add(glassData.model);
    
    return this.trackEvent('glass_selected', {
      name: glassData.name,
      model: glassData.model,
      price: glassData.price,
      shape: glassData.shape,
      totalSelected: this.selectedGlasses.size
    });
  }
  
  // Track try-on interaction
  trackTryOn(glassData, duration = 0) {
    return this.trackEvent('glass_tryon', {
      name: glassData.name,
      model: glassData.model,
      duration: duration
    });
  }
  
  // Track face scan
  trackFaceScan(faceShape, confidence) {
    return this.trackEvent('face_scanned', {
      shape: faceShape,
      confidence: confidence
    });
  }
  
  // Track screen navigation
  trackScreen(screenName) {
    return this.trackEvent('screen_view', {
      screen: screenName
    });
  }
  
  // Get analytics summary
  getAnalytics() {
    const duration = Date.now() - this.startTime;
    
    return {
      sessionId: this.sessionId,
      duration: duration,
      durationFormatted: this.formatDuration(duration),
      totalEvents: this.events.length,
      glassesViewed: this.viewedGlasses.size,
      glassesSelected: this.selectedGlasses.size,
      viewedList: Array.from(this.viewedGlasses),
      selectedList: Array.from(this.selectedGlasses),
      events: this.events
    };
  }
  
  // Format duration to readable string
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  }
  
  // Save events to localStorage
  saveToStorage() {
    try {
      localStorage.setItem('rb_tracking_' + this.sessionId, JSON.stringify({
        sessionId: this.sessionId,
        startTime: this.startTime,
        events: this.events,
        viewedGlasses: Array.from(this.viewedGlasses),
        selectedGlasses: Array.from(this.selectedGlasses)
      }));
    } catch (e) {
      console.warn('Could not save tracking data:', e);
    }
  }
  
  // Export data for analytics
  exportData() {
    const analytics = this.getAnalytics();
    const blob = new Blob([JSON.stringify(analytics, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rayban-session-${this.sessionId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Print analytics to console
  printAnalytics() {
    const analytics = this.getAnalytics();
    
    console.log('%c📊 Ray-Ban Kiosk Analytics', 'font-size: 16px; font-weight: bold; color: #e8161b');
    console.log(`Session ID: ${analytics.sessionId}`);
    console.log(`Duration: ${analytics.durationFormatted}`);
    console.log(`Total Events: ${analytics.totalEvents}`);
    console.log(`Glasses Viewed: ${analytics.glassesViewed}`);
    console.log(`Glasses Selected: ${analytics.glassesSelected}`);
    
    if (analytics.viewedList.length > 0) {
      console.log('Viewed Models:', analytics.viewedList);
    }
    
    if (analytics.selectedList.length > 0) {
      console.log('Selected Models:', analytics.selectedList);
    }
    
    console.log('All Events:', analytics.events);
  }
  
  // Reset tracking (new session)
  reset() {
    this.trackEvent('session_end');
    this.printAnalytics();
    
    // Start new session
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    this.currentGlass = null;
    this.viewedGlasses = new Set();
    this.selectedGlasses = new Set();
    
    this.trackEvent('session_start');
  }
}

// Initialize global tracker
window.glassesTracker = new GlassesTracker();

// Add helper methods to window for easy access
window.trackGlassView = (glass) => window.glassesTracker.trackGlassView(glass);
window.trackGlassSelection = (glass) => window.glassesTracker.trackGlassSelection(glass);
window.trackTryOn = (glass, duration) => window.glassesTracker.trackTryOn(glass, duration);
window.trackScreen = (screen) => window.glassesTracker.trackScreen(screen);
window.getAnalytics = () => window.glassesTracker.getAnalytics();
window.printAnalytics = () => window.glassesTracker.printAnalytics();
window.exportAnalytics = () => window.glassesTracker.exportData();
