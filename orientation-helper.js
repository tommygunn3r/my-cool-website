/**
 * ORIENTATION HELPER
 * Prompts users to rotate their device for optimal gameplay
 * Shows a friendly overlay when device is in wrong orientation
 */

class OrientationHelper {
    constructor(config = {}) {
        this.config = {
            preferredOrientation: config.preferredOrientation || 'landscape', // 'landscape' or 'portrait'
            showPrompt: config.showPrompt !== false,
            message: config.message || null,
            minWidth: config.minWidth || 768, // Only show on mobile (below this width)
            onOrientationChange: config.onOrientationChange || (() => {}),
        };

        this.currentOrientation = this.getOrientation();
        this.isCorrectOrientation = this.checkOrientation();

        if (this.config.showPrompt) {
            this.init();
        }
    }

    init() {
        // Create overlay
        this.createOverlay();

        // Listen for orientation changes
        window.addEventListener('resize', () => this.handleOrientationChange());
        window.addEventListener('orientationchange', () => this.handleOrientationChange());

        // Initial check
        this.handleOrientationChange();
    }

    getOrientation() {
        if (window.innerWidth > window.innerHeight) {
            return 'landscape';
        } else {
            return 'portrait';
        }
    }

    checkOrientation() {
        const current = this.getOrientation();
        const isMobile = window.innerWidth < this.config.minWidth;

        // Only enforce orientation on mobile devices
        if (!isMobile) {
            return true;
        }

        return current === this.config.preferredOrientation;
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'orientation-prompt';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
        `;

        // Rotation icon
        const icon = document.createElement('div');
        icon.style.cssText = `
            font-size: 80px;
            margin-bottom: 30px;
            animation: rotate-pulse 2s ease-in-out infinite;
        `;
        icon.textContent = this.config.preferredOrientation === 'landscape' ? '📱→' : '📱↻';

        // Message
        const message = document.createElement('div');
        message.style.cssText = `
            color: #FF6B00;
            font-family: 'Orbitron', 'Courier New', monospace;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            text-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
            margin-bottom: 20px;
        `;

        const defaultMessage = this.config.preferredOrientation === 'landscape'
            ? 'Please Rotate Your Device'
            : 'Please Rotate to Portrait';

        message.textContent = this.config.message || defaultMessage;

        // Subtitle
        const subtitle = document.createElement('div');
        subtitle.style.cssText = `
            color: #aaa;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            text-align: center;
            max-width: 300px;
        `;
        subtitle.textContent = this.config.preferredOrientation === 'landscape'
            ? 'Landscape mode provides the best gaming experience'
            : 'Portrait mode is recommended for this game';

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate-pulse {
                0%, 100% {
                    transform: rotate(0deg) scale(1);
                }
                25% {
                    transform: rotate(-10deg) scale(1.1);
                }
                50% {
                    transform: rotate(0deg) scale(1);
                }
                75% {
                    transform: rotate(10deg) scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);

        this.overlay.appendChild(icon);
        this.overlay.appendChild(message);
        this.overlay.appendChild(subtitle);
        document.body.appendChild(this.overlay);
    }

    handleOrientationChange() {
        const oldOrientation = this.currentOrientation;
        this.currentOrientation = this.getOrientation();
        this.isCorrectOrientation = this.checkOrientation();

        // Show/hide overlay
        if (this.overlay) {
            this.overlay.style.display = this.isCorrectOrientation ? 'none' : 'flex';
        }

        // Callback if orientation actually changed
        if (oldOrientation !== this.currentOrientation) {
            this.config.onOrientationChange({
                orientation: this.currentOrientation,
                isCorrect: this.isCorrectOrientation,
            });
        }
    }

    // Public API
    destroy() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        window.removeEventListener('resize', this.handleOrientationChange);
        window.removeEventListener('orientationchange', this.handleOrientationChange);
    }

    getCurrentOrientation() {
        return this.currentOrientation;
    }

    isOrientationCorrect() {
        return this.isCorrectOrientation;
    }
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrientationHelper;
}
