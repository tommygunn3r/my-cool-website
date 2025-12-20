# 📱 Mobile Integration Guide for Gunner's Games

This guide explains how to make your games mobile-friendly using the new touch control systems.

---

## 🎮 What's Been Implemented

### ✅ Completed Mobile Optimizations

1. **Square Hunt** - Fully responsive with accurate touch aiming
2. **Square Bird** - Fills screen on mobile, no pinch-zoom needed
3. **Arcade Hub** - Swipe navigation for game carousel
4. **Solitaire Hub** - Swipe navigation for game carousel
5. **Casino Hub** - Already had swipe support

### 🛠️ New Developer Tools

1. **arcade-touch-controls.js** - Reusable arcade-style D-pad and buttons
2. **orientation-helper.js** - Prompts users to rotate device

---

## 🎯 How to Make a Game Mobile-Friendly

### Step 1: Make the Game Canvas Responsive

**Before (Fixed Size):**
```css
#gameContainer {
    width: 800px;
    height: 600px;
}
```

**After (Responsive):**
```css
#gameContainer {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 0;
    padding-bottom: 75%; /* 4:3 aspect ratio (600/800) */
}

#gameCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Mobile full screen */
@media (max-width: 768px) {
    #gameContainer {
        max-width: 100vw;
        padding-bottom: 75vh;
        margin: 0;
    }
}

/* Landscape mode */
@media (max-width: 768px) and (orientation: landscape) {
    #gameContainer {
        max-width: 100vw;
        height: 100vh;
        padding-bottom: 0;
    }
}
```

---

### Step 2: Add Touch Event Support

**For Tap/Click Games (like Square Bird):**
```javascript
canvas.addEventListener('click', handleAction);

// Add touch support
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleAction();
}, { passive: false });
```

**For Cursor/Aiming Games (like Square Hunt):**
```javascript
// Helper to get pointer position for both mouse and touch
function getPointerPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches?.[0]?.clientX || 0);
    const clientY = e.clientY || (e.touches?.[0]?.clientY || 0);

    const x = ((clientX - rect.left) * canvas.width) / rect.width;
    const y = ((clientY - rect.top) * canvas.height) / rect.height;

    return { x, y };
}

// Mouse events
canvas.addEventListener('mousemove', (e) => {
    const pos = getPointerPosition(e);
    updateCursor(pos.x, pos.y);
});

// Touch events
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const pos = getPointerPosition(e);
    updateCursor(pos.x, pos.y);
}, { passive: false });

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const pos = getPointerPosition(e);
    handleShoot(pos.x, pos.y);
}, { passive: false });
```

---

### Step 3: Add Arcade Touch Controls (For Keyboard Games)

**For games using keyboard controls (Arrow keys, WASD, Space, etc.):**

1. Add the script to your HTML:
```html
<script src="/arcade-touch-controls.js"></script>
```

2. Initialize the controls:
```javascript
// Initialize arcade touch controls
const touchControls = new ArcadeTouchControls({
    showDPad: true,
    showButtons: true,
    buttons: ['A', 'B'], // Customize button names
    buttonLabels: {
        'A': 'JUMP',
        'B': 'FIRE'
    },
    onDPadChange: (state) => {
        // state = { up: false, down: false, left: true, right: false }
        // Update your game input state
        keys.left = state.left;
        keys.right = state.right;
        keys.up = state.up;
        keys.down = state.down;
    },
    onButtonPress: (button) => {
        if (button === 'A') {
            jump();
        } else if (button === 'B') {
            shoot();
        }
    },
    onButtonRelease: (button) => {
        // Handle button release if needed
    }
});
```

**Example Integration:**
```javascript
// Your game's input state
const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};

// Keyboard listeners (keep these for desktop)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'ArrowUp' || e.key === 'w') keys.up = true;
    if (e.key === 'ArrowDown' || e.key === 's') keys.down = true;
    if (e.key === ' ') keys.space = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === 'ArrowUp' || e.key === 'w') keys.up = false;
    if (e.key === 'ArrowDown' || e.key === 's') keys.down = false;
    if (e.key === ' ') keys.space = false;
});

// Touch controls (add these)
const touchControls = new ArcadeTouchControls({
    showDPad: true,
    showButtons: true,
    buttons: ['A'],
    buttonLabels: { 'A': 'JUMP' },
    onDPadChange: (state) => {
        keys.left = state.left;
        keys.right = state.right;
        keys.up = state.up;
        keys.down = state.down;
    },
    onButtonPress: (button) => {
        if (button === 'A') keys.space = true;
    },
    onButtonRelease: (button) => {
        if (button === 'A') keys.space = false;
    }
});

// Your game loop uses the same 'keys' object - works for both!
function gameLoop() {
    if (keys.left) player.x -= speed;
    if (keys.right) player.x += speed;
    if (keys.space) player.jump();
    // ... rest of game logic
}
```

---

### Step 4: Add Orientation Prompt (Optional)

Some games play better in landscape. Add orientation detection:

```html
<script src="/orientation-helper.js"></script>
<script>
    const orientationHelper = new OrientationHelper({
        preferredOrientation: 'landscape', // or 'portrait'
        showPrompt: true,
        message: 'Please Rotate Your Device',
        onOrientationChange: (info) => {
            console.log('Orientation:', info.orientation);
            if (info.isCorrect) {
                // Resume game
            } else {
                // Pause game
            }
        }
    });
</script>
```

---

## 🎨 Styling Best Practices

### Font Sizes
```css
/* Use responsive font sizes */
.score {
    font-size: clamp(16px, 4vw, 24px);
}
```

### Touch Target Sizes
```css
/* Buttons should be at least 48px × 48px */
.button {
    min-width: 48px;
    min-height: 48px;
    padding: 12px 24px;
}
```

### Hide Mouse Cursor on Touch Devices
```css
/* Desktop - hide cursor in game area */
#gameCanvas {
    cursor: none;
}

/* Mobile - show cursor for UI interaction */
@media (max-width: 768px) {
    #gameCanvas {
        cursor: auto;
    }
}
```

---

## 📋 Game-Specific Recommendations

### Platform Games (Square Kong, Squario)
- Use arcade touch controls with D-pad + jump button
- Recommend landscape orientation
- Make platforms 20% larger on mobile (easier to land)

### Shooting Games (Square Hunt, Shooter)
- Use touch drag for aiming
- Show visual crosshair at touch point
- Increase enemy hitboxes by 10-15% on mobile

### Puzzle Games (Squartris, Square Breaker)
- Add swipe gestures (swipe = move, tap = rotate/action)
- Bigger pieces on mobile
- Can work in portrait mode

### Tap Games (Square Bird)
- Already perfect for mobile!
- Just make responsive

---

## 🧪 Testing Checklist

Before deploying a mobile-optimized game:

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test in portrait mode
- [ ] Test in landscape mode
- [ ] Verify no horizontal scrolling
- [ ] Verify no pinch-zoom needed
- [ ] Touch targets are at least 44px × 44px
- [ ] Game loads in under 3 seconds on 4G
- [ ] Audio works on mobile (requires user interaction first)
- [ ] Test with fingers, not mouse cursor!

---

## 🚀 Quick Start Templates

### Template: Simple Tap Game
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Tap Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #000;
            overflow: hidden;
        }
        #gameContainer {
            position: relative;
            width: 100vw;
            max-width: 400px;
            height: 100vh;
            max-height: 600px;
            background: #87CEEB;
        }
        #gameCanvas {
            display: block;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas"></canvas>
    </div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 400;
        canvas.height = 600;

        // Touch/Click handler
        function handleTap() {
            // Your game action
        }

        canvas.addEventListener('click', handleTap);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleTap();
        }, { passive: false });

        // Game loop
        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw game
            requestAnimationFrame(gameLoop);
        }
        gameLoop();
    </script>
</body>
</html>
```

---

## 🆘 Common Issues & Solutions

### Issue: Touch not working
**Solution:** Make sure you're using `{ passive: false }` and calling `e.preventDefault()`

### Issue: Game too small on mobile
**Solution:** Use viewport units (vw/vh) instead of fixed pixels

### Issue: Crosshair offset on touch
**Solution:** Use `getBoundingClientRect()` to get accurate canvas position

### Issue: Audio not playing on mobile
**Solution:** Initialize audio context on first user interaction (touch/click)

### Issue: Controls overlap game UI
**Solution:** Add bottom padding to game container (240px for touch controls)

---

## 📚 Additional Resources

- See [square-hunt.html](games/arcade/square-hunt.html) for touch aiming example
- See [square-bird.html](games/arcade/square-bird.html) for responsive canvas example
- See [arcade.html](arcade.html) for swipe carousel example

---

**Questions?** Check out the implemented games or open an issue on GitHub!
