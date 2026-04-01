# 🕶️ Ray-Ban Smart Wall

An interactive in-store kiosk application that helps customers find their perfect Ray-Ban glasses through face scanning, personalized recommendations, and real-time customization.

## ✨ Features

### 🎯 Core Functionality
- **Face Scanning**: Uses device camera to analyze face shape
- **AI Recommendations**: Suggests 3 perfect glasses based on face shape and preferences
- **Live Customization**: Real-time preview of frame and lens color changes with dynamic pricing
- **Store Integration**: Visual lighting simulation to highlight physical products
- **Multi-language**: Supports English, Nederlands, and Français
- **Session Persistence**: Save and restore configurations via QR codes

### 🎨 Design
- **Optimized for 1080x1920 portrait displays**
- Ray-Ban authentic brand colors and styling
- Oswald font for headings, Lato for body text
- Touch-optimized interface for kiosk use
- Smooth animations and transitions

### 🔒 Privacy First
- Completely anonymous - no data stored
- Camera access only when needed
- Single user sessions
- Auto-reset after 60 seconds

## 🚀 Quick Start

### Requirements
- Web server with PHP support (Apache, Nginx, or PHP built-in server)
- Modern browser with camera access
- HTTPS (required for camera) or localhost

### Installation

1. **Start a web server**:
   ```bash
   php -S localhost:8000
   ```

2. **Open in browser**:
   ```
   http://localhost:8000
   ```

3. **For testing**: Use browser DevTools (F12) responsive mode to simulate 1080x1920 portrait display

### Camera Access

⚠️ **Important**: Camera access requires HTTPS or localhost

## 🎮 User Flow

1. **Welcome** → Language selection
2. **Face Scan** → Camera capture & analysis
3. **Preferences** → Style & usage (optional)
4. **Recommendations** → 3 AI-selected glasses
5. **Customization** → Colors & live preview
6. **Save** → Email & QR code
7. **Success** → Auto-reset countdown

## 🛠️ Technical Stack

- Vanilla JavaScript (ES6+)
- Pure CSS3 with CSS Variables
- WebRTC Camera API
- QRCode.js
- localStorage
- No backend required

## 📁 Project Structure

```
├── index.php              # Main application
├── assets/
│   ├── css/style.css     # Ray-Ban branded styles
│   └── js/app.js         # Application logic
└── data/
    └── products.json     # 8 Ray-Ban models
```

## 🎯 Ray-Ban Presentation Ready

### Key Features for Demo
✅ Multi-language (EN/NL/FR)  
✅ Real camera face scanning  
✅ 8 authentic Ray-Ban models  
✅ Live customization with pricing  
✅ Store lighting simulation  
✅ QR code session continuity  
✅ Privacy-first (anonymous)  
✅ Auto-reset (60s timeout)  

### Demo Tips
1. Show language selector
2. Demonstrate face scan
3. Select preferences
4. Highlight lighting effect on product selection
5. Customize colors and show price updates
6. Generate QR code
7. Emphasize privacy and seamless experience

---

**Built for Ray-Ban** | 1080x1920 Portrait Optimized