<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Ray-Ban Smart Wall</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    
    <!-- QR Code Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body>
    <div class="container">
        
        <!-- Welcome Screen -->
        <div id="welcome-screen" class="screen active screen-center">
            <h1 data-i18n="welcome_title">DISCOVER YOUR PERFECT RAY-BAN</h1>
            <p class="subtitle" data-i18n="welcome_subtitle">Let's find the perfect glasses for you</p>
            
            <div class="language-selector">
                <button class="lang-btn active" data-lang="en">English</button>
                <button class="lang-btn" data-lang="nl">Nederlands</button>
                <button class="lang-btn" data-lang="fr">Français</button>
            </div>
            
            <button class="btn btn-primary" data-action="start" style="margin-top: 64px;">
                <span data-i18n="start_button">Start Now</span>
            </button>
        </div>

        <!-- Face Scan Screen -->
        <div id="scan-screen" class="screen">
            <div class="screen-header">
                <h2 data-i18n="scan_title">FACE SCAN</h2>
                <p data-i18n="scan_subtitle">Position your face in the frame</p>
            </div>
            
            <div class="camera-container">
                <video id="camera" autoplay playsinline></video>
                <div class="camera-overlay"></div>
            </div>
            
            <div class="screen-footer">
                <button class="btn btn-secondary" data-action="back">
                    <span data-i18n="back">← Back</span>
                </button>
                <button class="btn btn-primary" data-action="capture">
                    <span data-i18n="scan_button">Capture</span>
                </button>
            </div>
        </div>

        <!-- Preferences Screen -->
        <div id="preferences-screen" class="screen">
            <div class="screen-header">
                <h2 data-i18n="preferences_title">YOUR STYLE</h2>
                <p data-i18n="preferences_subtitle">What are you looking for?</p>
            </div>
            
            <div class="screen-content">
                <h3 style="margin-bottom: 24px;">Style</h3>
                <div class="preferences-grid">
                    <button class="preference-btn" data-category="style" data-value="casual">
                        <span class="icon">👔</span>
                        <span data-i18n="style_casual">Casual</span>
                    </button>
                    <button class="preference-btn" data-category="style" data-value="sport">
                        <span class="icon">⚽</span>
                        <span data-i18n="style_sport">Sport</span>
                    </button>
                    <button class="preference-btn" data-category="style" data-value="elegant">
                        <span class="icon">💼</span>
                        <span data-i18n="style_elegant">Elegant</span>
                    </button>
                    <button class="preference-btn" data-category="style" data-value="vintage">
                        <span class="icon">🎭</span>
                        <span data-i18n="style_vintage">Vintage</span>
                    </button>
                </div>
                
                <h3 style="margin: 48px 0 24px;">Usage</h3>
                <div class="preferences-grid">
                    <button class="preference-btn" data-category="usage" data-value="everyday">
                        <span class="icon">☀️</span>
                        <span data-i18n="usage_everyday">Everyday</span>
                    </button>
                    <button class="preference-btn" data-category="usage" data-value="outdoor">
                        <span class="icon">🏔️</span>
                        <span data-i18n="usage_outdoor">Outdoor</span>
                    </button>
                    <button class="preference-btn" data-category="usage" data-value="fashion">
                        <span class="icon">✨</span>
                        <span data-i18n="usage_fashion">Fashion</span>
                    </button>
                    <button class="preference-btn" data-category="usage" data-value="work">
                        <span class="icon">💻</span>
                        <span data-i18n="usage_work">Work</span>
                    </button>
                </div>
            </div>
            
            <div class="screen-footer">
                <button class="btn btn-secondary" data-action="skip-preferences">
                    <span data-i18n="skip">Skip</span>
                </button>
                <button class="btn btn-primary" data-action="continue-preferences">
                    <span data-i18n="continue">Continue</span>
                </button>
            </div>
        </div>

        <!-- Results Screen -->
        <div id="results-screen" class="screen">
            <div class="screen-header">
                <h2 data-i18n="results_title">YOUR RECOMMENDATIONS</h2>
                <p data-i18n="results_subtitle">We found these perfect matches for you</p>
            </div>
            
            <div class="screen-content">
                <div id="recommendations-container" class="products-grid">
                    <!-- Products will be inserted here by JavaScript -->
                </div>
            </div>
            
            <div class="screen-footer">
                <button class="btn btn-secondary" data-action="back">
                    <span data-i18n="back">← Back</span>
                </button>
            </div>
        </div>

        <!-- Customization Screen -->
        <div id="customize-screen" class="screen">
            <div class="screen-header">
                <h2 data-i18n="customize_title">CUSTOMIZE YOUR RAY-BAN</h2>
                <div style="margin-top: 16px;">
                    <h3 id="custom-product-name" style="margin-bottom: 8px;">Wayfarer Classic</h3>
                    <p id="custom-product-model" style="color: #E8E8E8;">RB2140</p>
                </div>
            </div>
            
            <div class="screen-content">
                <!-- Product Preview -->
                <div id="custom-preview" class="product-image" style="margin: 24px auto; max-width: 600px; height: 400px; font-size: 200px; transition: transform 0.2s ease;">
                    🕶️
                </div>
                
                <!-- Customization Options -->
                <div class="customization-panel">
                    <!-- Frame Colors -->
                    <div class="color-selector">
                        <h3 data-i18n="frame_color">Frame Color</h3>
                        <div id="frame-colors" class="color-options">
                            <!-- Colors inserted by JavaScript -->
                        </div>
                    </div>
                    
                    <!-- Lens Colors -->
                    <div class="color-selector">
                        <h3 data-i18n="lens_color">Lens Color</h3>
                        <div id="lens-colors" class="color-options">
                            <!-- Colors inserted by JavaScript -->
                        </div>
                    </div>
                    
                    <!-- Price Display -->
                    <div style="text-align: center; margin-top: 32px; padding-top: 32px; border-top: 2px solid rgba(255,255,255,0.2);">
                        <p style="font-size: 24px; margin-bottom: 8px;" data-i18n="price">Price</p>
                        <h2 id="custom-price" style="font-size: 64px; color: #fff;">€169</h2>
                    </div>
                </div>
            </div>
            
            <div class="screen-footer">
                <button class="btn btn-secondary" data-action="back">
                    <span data-i18n="back">← Back</span>
                </button>
                <button class="btn btn-primary" data-action="save-config">
                    <span data-i18n="save_config">Save Configuration</span>
                </button>
            </div>
        </div>

        <!-- Email Screen -->
        <div id="email-screen" class="screen">
            <div class="screen-header">
                <h2 data-i18n="email_title">SAVE YOUR LOOK</h2>
                <p data-i18n="email_subtitle">We'll send you all the details</p>
            </div>
            
            <div class="screen-content flex-center flex-column">
                <div style="width: 100%; max-width: 700px; margin-top: 64px;">
                    <div class="input-group">
                        <label for="email-input" data-i18n="email_placeholder">Email Address</label>
                        <input type="email" id="email-input" placeholder="your@email.com" data-i18n="email_placeholder" autocomplete="email">
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); padding: 32px; border-radius: 16px; margin-top: 32px;">
                        <h3 style="margin-bottom: 16px; font-size: 28px;">What you'll receive:</h3>
                        <ul style="font-size: 22px; line-height: 2; list-style: none;">
                            <li>✓ Your customized configuration</li>
                            <li>✓ Product photos and details</li>
                            <li>✓ QR code to continue at home</li>
                            <li>✓ Direct link to order online</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="screen-footer">
                <button class="btn btn-secondary" data-action="back">
                    <span data-i18n="back">← Back</span>
                </button>
                <button class="btn btn-primary" data-action="send-email">
                    <span data-i18n="send_email">Send to Email</span>
                </button>
            </div>
        </div>

        <!-- Success Screen -->
        <div id="success-screen" class="screen screen-center">
            <h1 data-i18n="success_title">ALL SET!</h1>
            <p class="subtitle" data-i18n="success_subtitle">Check your email for your personalized configuration</p>
            
            <div style="margin: 64px 0;">
                <p style="font-size: 28px; margin-bottom: 24px;" data-i18n="scan_qr">Scan this QR code to continue at home</p>
                <div class="qr-container">
                    <div id="qrcode"></div>
                </div>
            </div>
            
            <button class="btn btn-primary" data-action="start-new" style="margin-top: 64px;">
                <span data-i18n="start_new">Start New Session</span>
            </button>
            
            <p style="margin-top: 32px; font-size: 20px; color: #999;">
                Session will reset automatically in <span id="countdown">60</span> seconds
            </p>
        </div>

    </div>

    <!-- Main Application Script -->
    <script src="assets/js/app.js"></script>
    
    <!-- Auto-reset timer for success screen -->
    <script>
        let countdownInterval;
        
        // Watch for success screen activation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const successScreen = document.getElementById('success-screen');
                    if (successScreen.classList.contains('active')) {
                        startCountdown();
                    } else {
                        stopCountdown();
                    }
                }
            });
        });
        
        observer.observe(document.getElementById('success-screen'), { attributes: true });
        
        function startCountdown() {
            let seconds = 60;
            const countdownEl = document.getElementById('countdown');
            
            countdownInterval = setInterval(() => {
                seconds--;
                countdownEl.textContent = seconds;
                
                if (seconds <= 0) {
                    stopCountdown();
                    if (window.smartWall) {
                        window.smartWall.resetSession();
                    }
                }
            }, 1000);
        }
        
        function stopCountdown() {
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = '60';
            }
        }
    </script>
</body>
</html>
