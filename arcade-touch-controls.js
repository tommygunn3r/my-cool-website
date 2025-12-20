/**
 * ARCADE TOUCH CONTROLS
 * Vintage arcade-style touch overlay for mobile gameplay
 * Adds a "standup arcade" look with D-pad and action buttons
 */

class ArcadeTouchControls {
    constructor(config = {}) {
        this.config = {
            showDPad: config.showDPad !== false,
            showButtons: config.showButtons !== false,
            buttons: config.buttons || ['A', 'B'],
            buttonLabels: config.buttonLabels || {},
            onDPadChange: config.onDPadChange || (() => {}),
            onButtonPress: config.onButtonPress || (() => {}),
            onButtonRelease: config.onButtonRelease || (() => {}),
            style: config.style || 'classic', // 'classic' or 'neon'
        };

        this.dpadState = { up: false, down: false, left: false, right: false };
        this.buttonState = {};
        this.touchIds = new Map(); // Track which touch controls what

        this.init();
    }

    init() {
        // Create overlay container
        this.overlay = document.createElement('div');
        this.overlay.id = 'arcade-touch-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 240px;
            pointer-events: none;
            z-index: 9999;
            display: none;
        `;

        // Add arcade cabinet border/frame
        this.addArcadeFrame();

        // Add D-Pad if enabled
        if (this.config.showDPad) {
            this.createDPad();
        }

        // Add action buttons if enabled
        if (this.config.showButtons) {
            this.createActionButtons();
        }

        document.body.appendChild(this.overlay);

        // Show on mobile devices
        this.checkMobile();
        window.addEventListener('resize', () => this.checkMobile());
    }

    addArcadeFrame() {
        const frame = document.createElement('div');
        frame.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top,
                rgba(20, 20, 20, 0.95) 0%,
                rgba(30, 30, 30, 0.9) 80%,
                transparent 100%);
            border-top: 4px solid #FF6B00;
            box-shadow:
                inset 0 3px 0 rgba(255, 107, 0, 0.3),
                0 -10px 30px rgba(0, 0, 0, 0.5);
        `;

        // Add wood grain texture effect
        const grain = document.createElement('div');
        grain.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background-image:
                repeating-linear-gradient(
                    90deg,
                    rgba(255, 107, 0, 0.03) 0px,
                    transparent 2px,
                    transparent 4px
                );
            opacity: 0.5;
        `;
        frame.appendChild(grain);

        this.overlay.appendChild(frame);
    }

    createDPad() {
        const dpadContainer = document.createElement('div');
        dpadContainer.style.cssText = `
            position: absolute;
            bottom: 40px;
            left: 40px;
            width: 160px;
            height: 160px;
            pointer-events: auto;
        `;

        // Create cross-shaped D-pad
        const directions = [
            { name: 'up', path: 'M 60,0 L 100,0 L 100,60 L 60,60 Z', x: 0, y: 0 },
            { name: 'right', path: 'M 100,60 L 160,60 L 160,100 L 100,100 Z', x: 100, y: 60 },
            { name: 'down', path: 'M 60,100 L 100,100 L 100,160 L 60,160 Z', x: 0, y: 100 },
            { name: 'left', path: 'M 0,60 L 60,60 L 60,100 L 0,100 Z', x: 0, y: 60 },
        ];

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '160');
        svg.setAttribute('height', '160');
        svg.style.cssText = 'filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));';

        directions.forEach(dir => {
            const button = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            button.setAttribute('d', dir.path);
            button.setAttribute('fill', '#2a2a2a');
            button.setAttribute('stroke', '#FF6B00');
            button.setAttribute('stroke-width', '3');
            button.setAttribute('data-direction', dir.name);
            button.style.cursor = 'pointer';
            button.style.transition = 'fill 0.1s';

            // Touch events
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleDPadPress(dir.name, true, e.touches[0].identifier);
                button.setAttribute('fill', '#FF6B00');
            });

            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleDPadPress(dir.name, false);
                button.setAttribute('fill', '#2a2a2a');
            });

            button.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                this.handleDPadPress(dir.name, false);
                button.setAttribute('fill', '#2a2a2a');
            });

            svg.appendChild(button);

            // Add directional arrow
            const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            arrow.setAttribute('fill', '#FF6B00');
            arrow.setAttribute('font-size', '24');
            arrow.setAttribute('font-weight', 'bold');
            arrow.setAttribute('text-anchor', 'middle');
            arrow.setAttribute('pointer-events', 'none');

            const arrowSymbols = { up: '▲', right: '▶', down: '▼', left: '◀' };
            const arrowPositions = {
                up: { x: 80, y: 40 },
                right: { x: 130, y: 85 },
                down: { x: 80, y: 140 },
                left: { x: 30, y: 85 }
            };

            arrow.setAttribute('x', arrowPositions[dir.name].x);
            arrow.setAttribute('y', arrowPositions[dir.name].y);
            arrow.textContent = arrowSymbols[dir.name];
            svg.appendChild(arrow);
        });

        // Center circle
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', '80');
        center.setAttribute('cy', '80');
        center.setAttribute('r', '20');
        center.setAttribute('fill', '#1a1a1a');
        center.setAttribute('stroke', '#FF6B00');
        center.setAttribute('stroke-width', '2');
        svg.appendChild(center);

        dpadContainer.appendChild(svg);
        this.overlay.appendChild(dpadContainer);
    }

    createActionButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            position: absolute;
            bottom: 60px;
            right: 40px;
            display: flex;
            gap: 20px;
            pointer-events: auto;
        `;

        this.config.buttons.forEach((btnName, index) => {
            const button = document.createElement('div');
            button.className = 'arcade-action-button';
            button.dataset.button = btnName;

            const size = index === 0 ? '80px' : '70px'; // First button slightly bigger
            const label = this.config.buttonLabels[btnName] || btnName;

            button.style.cssText = `
                width: ${size};
                height: ${size};
                border-radius: 50%;
                background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
                border: 4px solid #FF6B00;
                box-shadow:
                    0 6px 12px rgba(0,0,0,0.6),
                    inset 0 2px 4px rgba(255,107,0,0.3),
                    0 0 20px rgba(255,107,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Orbitron', 'Courier New', monospace;
                font-size: 24px;
                font-weight: bold;
                color: #FF6B00;
                text-shadow: 0 0 10px rgba(255,107,0,0.5);
                cursor: pointer;
                user-select: none;
                transition: all 0.1s;
                position: relative;
            `;

            // Button label
            const labelDiv = document.createElement('div');
            labelDiv.textContent = label;
            labelDiv.style.cssText = 'pointer-events: none;';
            button.appendChild(labelDiv);

            // Touch events
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleButtonPress(btnName, true, e.touches[0].identifier);
                button.style.transform = 'scale(0.9)';
                button.style.boxShadow = `
                    0 2px 6px rgba(0,0,0,0.6),
                    inset 0 4px 8px rgba(0,0,0,0.6),
                    0 0 30px rgba(255,107,0,0.6)
                `;
                button.style.background = 'linear-gradient(145deg, #FF6B00, #CC5500)';
            });

            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleButtonPress(btnName, false);
                button.style.transform = 'scale(1)';
                button.style.boxShadow = `
                    0 6px 12px rgba(0,0,0,0.6),
                    inset 0 2px 4px rgba(255,107,0,0.3),
                    0 0 20px rgba(255,107,0,0.2)
                `;
                button.style.background = 'linear-gradient(145deg, #3a3a3a, #1a1a1a)';
            });

            button.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                this.handleButtonPress(btnName, false);
                button.style.transform = 'scale(1)';
                button.style.background = 'linear-gradient(145deg, #3a3a3a, #1a1a1a)';
            });

            buttonContainer.appendChild(button);
        });

        this.overlay.appendChild(buttonContainer);
    }

    handleDPadPress(direction, pressed, touchId = null) {
        this.dpadState[direction] = pressed;

        if (pressed && touchId !== null) {
            this.touchIds.set(touchId, `dpad-${direction}`);
        } else if (!pressed && touchId !== null) {
            this.touchIds.delete(touchId);
        }

        this.config.onDPadChange(this.dpadState);
    }

    handleButtonPress(button, pressed, touchId = null) {
        this.buttonState[button] = pressed;

        if (pressed && touchId !== null) {
            this.touchIds.set(touchId, `button-${button}`);
        } else if (!pressed && touchId !== null) {
            this.touchIds.delete(touchId);
        }

        if (pressed) {
            this.config.onButtonPress(button);
        } else {
            this.config.onButtonRelease(button);
        }
    }

    checkMobile() {
        const isMobile = window.innerWidth <= 768 ||
                        ('ontouchstart' in window) ||
                        (navigator.maxTouchPoints > 0);

        this.overlay.style.display = isMobile ? 'block' : 'none';
    }

    // Public API
    getDPadState() {
        return { ...this.dpadState };
    }

    getButtonState(button) {
        return this.buttonState[button] || false;
    }

    destroy() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
    }
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArcadeTouchControls;
}
