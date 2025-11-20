// --- LEVEL 1 DATA ---
const level1MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50},
        {x: 650, y: 550, width: 450, height: 50},
        {x: 1250, y: 550, width: 650, height: 50},
        {x: 2100, y: 550, width: 450, height: 50},
        {x: 2730, y: 550, width: 670, height: 50},
        {x: 3550, y: 550, width: 400, height: 50},
        {x: 4150, y: 550, width: 600, height: 50},
        {x: 400, y: 450, width: 100, height: 20},
        {x: 600, y: 400, width: 100, height: 20},
        {x: 850, y: 350, width: 120, height: 20},
        {x: 1000, y: 450, width: 150, height: 20},
        {x: 1300, y: 400, width: 100, height: 20},
        {x: 1400, y: 350, width: 100, height: 20},
        {x: 1600, y: 300, width: 120, height: 20},
        {x: 1700, y: 450, width: 100, height: 20},
        {x: 2000, y: 400, width: 100, height: 20},
        {x: 2200, y: 350, width: 150, height: 20},
        {x: 2400, y: 500, width: 100, height: 20},
        {x: 2700, y: 450, width: 120, height: 20},
        {x: 2900, y: 400, width: 100, height: 20},
        {x: 3200, y: 350, width: 150, height: 20},
        {x: 3500, y: 450, width: 100, height: 20},
        {x: 3800, y: 400, width: 120, height: 20},
        {x: 4100, y: 350, width: 100, height: 20}
    ],
    blocks: [
        {x: 300, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 500, y: 300, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 800, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1200, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1550, y: 350, width: 40, height: 40, hit: false, type: 'coin'}, 
        {x: 2100, y: 300, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2500, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2800, y: 300, width: 40, height: 40, hit: false, type: 'coin'}, 
        {x: 3100, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3400, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3700, y: 300, width: 40, height: 40, hit: false, type: 'coin'}, 
        {x: 4000, y: 250, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 750, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 780, exitY: 460},
        {x: 2980, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3010, exitY: 460}
    ],
    enemies: [
        {x: 700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1350, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2150, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, 
        {x: 2780, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, 
        {x: 3100, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3650, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 4300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 500, width: 150},
        {x: 1100, width: 150},
        {x: 1900, width: 200},
        {x: 2550, width: 180},
        {x: 3400, width: 150},
        {x: 3950, width: 200}
    ],
    stairs: [
        {x: 2200, steps: 5},
        {x: 4400, steps: 6}
    ],
    flagpole: {x: 4650, y: 250, height: 300}
};
const level1BonusTemplate = {
    platforms: [
        {x: 0, y: 550, width: 1200, height: 50},
        {x: 200, y: 450, width: 100, height: 20},
        {x: 400, y: 350, width: 100, height: 20},
        {x: 600, y: 450, width: 100, height: 20}
    ],
    blocks: [
        {x: 300, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 500, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 700, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 900, y: 470, width: 60, height: 80, dest: 'main'}
    ],
    enemies: [],
    gaps: [],
    stairs: [],
    flagpole: null
};
// New "Hard" Bonus Room for later levels
const levelHardBonusTemplate = {
    platforms: [
        {x: 0, y: 550, width: 300, height: 50},
        {x: 900, y: 550, width: 300, height: 50},
        // Floating islands over a pit
        {x: 350, y: 450, width: 80, height: 20},
        {x: 550, y: 400, width: 80, height: 20},
        {x: 750, y: 450, width: 80, height: 20}
    ],
    blocks: [
        {x: 350, y: 300, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 550, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 550, y: 150, width: 40, height: 40, hit: false, type: 'powerup'}, // Rare powerup
        {x: 750, y: 300, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1000, y: 470, width: 60, height: 80, dest: 'main'}
    ],
    enemies: [],
    gaps: [{x: 300, width: 600}], // Death pit in bonus room!
    stairs: [],
    flagpole: null
};

// --- LEVEL 2-7 (PRESERVED) ---
const level2MainTemplate = JSON.parse(JSON.stringify(level1MainTemplate));
level2MainTemplate.enemies[0].x = 800; 
level2MainTemplate.blocks[1] = {x: 600, y: 250, width: 40, height: 40, hit: false, type: 'powerup'};
const level2BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));

const level3MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50}, {x: 750, y: 550, width: 250, height: 50}, {x: 1300, y: 550, width: 500, height: 50}, {x: 2000, y: 550, width: 500, height: 50}, {x: 2800, y: 550, width: 600, height: 50}, {x: 3800, y: 550, width: 950, height: 50},
        {x: 400, y: 450, width: 100, height: 20}, {x: 800, y: 400, width: 150, height: 20}, {x: 1400, y: 350, width: 100, height: 20}, {x: 1600, y: 300, width: 100, height: 20}, {x: 2100, y: 450, width: 100, height: 20}, {x: 2300, y: 400, width: 100, height: 20}, {x: 2900, y: 350, width: 100, height: 20}, {x: 3200, y: 300, width: 100, height: 20}, {x: 4000, y: 450, width: 100, height: 20}, {x: 4200, y: 400, width: 100, height: 20}
    ],
    blocks: [{x: 400, y: 300, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 850, y: 250, width: 40, height: 40, hit: false, type: 'coin'}, {x: 1400, y: 200, width: 40, height: 40, hit: false, type: 'coin'}, {x: 2300, y: 250, width: 40, height: 40, hit: false, type: 'coin'}, {x: 2900, y: 200, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 4100, y: 250, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [{x: 1450, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1480, exitY: 460}, {x: 3100, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3130, exitY: 460}],
    enemies: [{x: 300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 1400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 4000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 4300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 500, width: 250}, {x: 1000, width: 300}, {x: 1800, width: 200}, {x: 2500, width: 300}, {x: 3400, width: 400}],
    stairs: [{x: 2200, steps: 4}, {x: 4400, steps: 6}], flagpole: {x: 4650, y: 250, height: 300}
};
const level3BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));

const level4MainTemplate = {
    platforms: [{x: 0, y: 550, width: 1000, height: 50}, {x: 1200, y: 550, width: 1000, height: 50}, {x: 2400, y: 550, width: 1000, height: 50}, {x: 3600, y: 550, width: 1150, height: 50}, {x: 300, y: 450, width: 100, height: 20}, {x: 500, y: 400, width: 100, height: 20}, {x: 700, y: 350, width: 100, height: 20}, {x: 1050, y: 450, width: 100, height: 20}, {x: 1300, y: 350, width: 100, height: 20}, {x: 1500, y: 300, width: 100, height: 20}, {x: 1700, y: 250, width: 100, height: 20}, {x: 2250, y: 450, width: 100, height: 20}, {x: 2500, y: 450, width: 100, height: 20}, {x: 2700, y: 400, width: 100, height: 20}, {x: 2900, y: 350, width: 100, height: 20}, {x: 3450, y: 450, width: 100, height: 20}, {x: 3700, y: 400, width: 100, height: 20}, {x: 3900, y: 350, width: 100, height: 20}, {x: 4100, y: 300, width: 100, height: 20}],
    blocks: [{x: 300, y: 300, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 700, y: 200, width: 40, height: 40, hit: false, type: 'coin'}, {x: 1400, y: 250, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 1700, y: 150, width: 40, height: 40, hit: false, type: 'coin'}, {x: 2900, y: 200, width: 40, height: 40, hit: false, type: 'coin'}, {x: 4100, y: 200, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [{x: 400, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 430, exitY: 460}, {x: 2800, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 2830, exitY: 460}],
    enemies: [{x: 800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 1500, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2000, y: 368, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2600, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3700, y: 368, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 4000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 1000, width: 200}, {x: 2200, width: 200}, {x: 3400, width: 200}], stairs: [{x: 1800, steps: 6}, {x: 4400, steps: 6}], flagpole: {x: 4650, y: 250, height: 300}
};
const level4BonusTemplate = JSON.parse(JSON.stringify(level2BonusTemplate));

const level5MainTemplate = {
    platforms: [{x: 0, y: 550, width: 2000, height: 50}, {x: 2200, y: 550, width: 2550, height: 50}, {x: 400, y: 450, width: 100, height: 20}, {x: 600, y: 400, width: 100, height: 20}, {x: 800, y: 350, width: 100, height: 20}, {x: 1000, y: 400, width: 100, height: 20}, {x: 1200, y: 450, width: 100, height: 20}, {x: 2400, y: 450, width: 100, height: 20}, {x: 2600, y: 400, width: 100, height: 20}, {x: 2800, y: 350, width: 100, height: 20}, {x: 3000, y: 400, width: 100, height: 20}, {x: 3200, y: 450, width: 100, height: 20}, {x: 3400, y: 400, width: 100, height: 20}, {x: 3600, y: 350, width: 100, height: 20}],
    blocks: [{x: 400, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 800, y: 250, width: 40, height: 40, hit: false, type: 'coin'}, {x: 1200, y: 350, width: 40, height: 40, hit: false, type: 'coin'}, {x: 2400, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 2800, y: 250, width: 40, height: 40, hit: false, type: 'coin'}, {x: 3600, y: 250, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [{x: 1000, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1030, exitY: 460}, {x: 3000, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3030, exitY: 460}],
    enemies: [{x: 700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 1200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 1300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 1700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2500, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2600, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 4000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 2000, width: 200}], stairs: [{x: 1800, steps: 3}, {x: 4400, steps: 6}], flagpole: {x: 4650, y: 250, height: 300}
};
const level5BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));

const level6MainTemplate = {
    platforms: [{x: 0, y: 550, width: 500, height: 50}, {x: 1000, y: 550, width: 500, height: 50}, {x: 2000, y: 550, width: 500, height: 50}, {x: 3000, y: 550, width: 500, height: 50}, {x: 4000, y: 550, width: 800, height: 50}, {x: 600, y: 450, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 500, maxX: 900, minY: 450, maxY: 450}, {x: 1600, y: 350, width: 100, height: 20, type: 'moving', vx: 0, vy: 100, minX: 1600, maxX: 1600, minY: 300, maxY: 500}, {x: 2600, y: 450, width: 100, height: 20, type: 'moving', vx: 150, vy: 0, minX: 2500, maxX: 2900, minY: 450, maxY: 450}, {x: 3600, y: 300, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 3600, maxX: 3600, minY: 250, maxY: 500}, {x: 1500, y: 250, width: 50, height: 20}, {x: 2500, y: 250, width: 50, height: 20}],
    blocks: [{x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 1200, y: 350, width: 40, height: 40, hit: false, type: 'coin'}, {x: 2200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 3200, y: 350, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [],
    enemies: [{x: 1200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 2200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 4200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 500, width: 500}, {x: 1500, width: 500}, {x: 2500, width: 500}, {x: 3500, width: 500}], stairs: [], flagpole: {x: 4650, y: 250, height: 300}
};
const level6BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));

const level7MainTemplate = {
    platforms: [{x: 0, y: 550, width: 600, height: 50}, {x: 700, y: 450, width: 120, height: 20, type: 'moving', vx: 120, vy: 0, minX: 650, maxX: 1200, minY: 450, maxY: 450}, {x: 1300, y: 550, width: 400, height: 50}, {x: 1800, y: 450, width: 100, height: 20, type: 'moving', vx: 0, vy: 100, minX: 1800, maxX: 1800, minY: 250, maxY: 500}, {x: 2000, y: 300, width: 100, height: 20, type: 'moving', vx: 0, vy: -100, minX: 2000, maxX: 2000, minY: 250, maxY: 500}, {x: 2200, y: 250, width: 300, height: 20}, {x: 2700, y: 250, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2700, maxX: 2700, minY: 250, maxY: 500}, {x: 2900, y: 550, width: 600, height: 50}, {x: 3600, y: 450, width: 100, height: 20, type: 'moving', vx: 200, vy: 0, minX: 3500, maxX: 4000, minY: 450, maxY: 450}, {x: 4200, y: 400, width: 100, height: 20, type: 'moving', vx: 200, vy: 0, minX: 4100, maxX: 4500, minY: 400, maxY: 400}, {x: 4600, y: 550, width: 400, height: 50}],
    blocks: [{x: 300, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 1400, y: 350, width: 40, height: 40, hit: false, type: 'coin'}, {x: 2300, y: 150, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 3100, y: 350, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [],
    enemies: [{x: 800, y: 400, width: 24, height: 20, vx: -4, type: 'bullet'}, {x: 1200, y: 420, width: 24, height: 20, vx: -4, type: 'bullet'}, {x: 1500, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 1900, y: 350, width: 24, height: 20, vx: -5, type: 'bullet'}, {x: 2100, y: 300, width: 24, height: 20, vx: -5, type: 'bullet'}, {x: 3200, y: 450, width: 24, height: 20, vx: -6, type: 'bullet'}, {x: 3800, y: 350, width: 24, height: 20, vx: -6, type: 'bullet'}, {x: 4300, y: 350, width: 24, height: 20, vx: -6, type: 'bullet'}],
    gaps: [{x: 600, width: 700}, {x: 1700, width: 1200}, {x: 3500, width: 1100}], stairs: [], flagpole: {x: 4800, y: 250, height: 300}
};
const level7BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));


// --- NEW LEVEL 8: "The Elevator Shaft" ---
// Focus: Vertical movement, bullets coming from above/below.
const level8MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        {x: 600, y: 200, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 600, maxX: 600, minY: 150, maxY: 500}, // Elevator 1
        {x: 900, y: 550, width: 300, height: 50},
        {x: 1300, y: 200, width: 100, height: 20, type: 'moving', vx: 0, vy: -150, minX: 1300, maxX: 1300, minY: 150, maxY: 500}, // Elevator 2
        {x: 1600, y: 150, width: 400, height: 20}, // High path
        {x: 2200, y: 400, width: 100, height: 20, type: 'moving', vx: 0, vy: 200, minX: 2200, maxX: 2200, minY: 100, maxY: 500}, // Fast Elevator
        {x: 2600, y: 550, width: 400, height: 50},
        {x: 3200, y: 350, width: 100, height: 20},
        {x: 3500, y: 250, width: 100, height: 20},
        {x: 3800, y: 150, width: 100, height: 20},
        {x: 4200, y: 550, width: 800, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1700, y: 100, width: 40, height: 40, hit: false, type: 'powerup'}, // High reward
        {x: 2700, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3850, y: 100, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 2800, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 2830, exitY: 460}
    ],
    enemies: [
        {x: 700, y: 300, width: 24, height: 20, vx: -3, type: 'bullet'}, // Bullet in shaft
        {x: 1100, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1400, y: 300, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 1800, y: 100, width: 32, height: 32, vx: 2, type: 'turtle'}, // Turtle high up
        {x: 2300, y: 250, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 3500, y: 550, width: 24, height: 20, vx: -4, type: 'bullet'}, // Low bullets
        {x: 4400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 500},
        {x: 1200, width: 1400}, // Huge gap under high path
        {x: 3000, width: 1200}
    ],
    stairs: [],
    flagpole: {x: 4800, y: 250, height: 300}
};
const level8BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 9: "Bullet Bridges" ---
// Focus: Lots of bullets flying at different heights while crossing platforms.
const level9MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        {x: 500, y: 450, width: 100, height: 20},
        {x: 700, y: 450, width: 100, height: 20},
        {x: 900, y: 450, width: 100, height: 20},
        {x: 1200, y: 550, width: 300, height: 50},
        {x: 1700, y: 400, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1600, maxX: 1900, minY: 400, maxY: 400},
        {x: 2200, y: 550, width: 300, height: 50},
        {x: 2700, y: 350, width: 100, height: 20},
        {x: 3000, y: 350, width: 100, height: 20},
        {x: 3300, y: 350, width: 100, height: 20},
        {x: 3800, y: 550, width: 800, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1350, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2350, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        // Waves of bullets
        {x: 600, y: 420, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 800, y: 380, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 1000, y: 420, width: 24, height: 20, vx: -4, type: 'bullet'},
        
        {x: 1800, y: 350, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 1900, y: 250, width: 24, height: 20, vx: -5, type: 'bullet'},

        {x: 2800, y: 300, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 3100, y: 300, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 3400, y: 300, width: 24, height: 20, vx: -6, type: 'bullet'},
        
        {x: 4000, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 800},
        {x: 1500, width: 700},
        {x: 2500, width: 1300}
    ],
    stairs: [],
    flagpole: {x: 4400, y: 250, height: 300}
};
const level9BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 10: "The Long Jump" ---
// Focus: Wide gaps and high speed moving platforms.
const level10MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50},
        {x: 600, y: 400, width: 100, height: 20, type: 'moving', vx: 200, vy: 0, minX: 600, maxX: 1100, minY: 400, maxY: 400}, // Long mover
        {x: 1300, y: 550, width: 300, height: 50},
        {x: 1800, y: 350, width: 100, height: 20, type: 'moving', vx: 250, vy: 0, minX: 1800, maxX: 2400, minY: 350, maxY: 350}, // Faster mover
        {x: 2600, y: 550, width: 300, height: 50},
        {x: 3100, y: 450, width: 100, height: 20, type: 'moving', vx: 0, vy: 200, minX: 3100, maxX: 3100, minY: 200, maxY: 500}, // Fast vertical
        {x: 3400, y: 450, width: 100, height: 20, type: 'moving', vx: 0, vy: -200, minX: 3400, maxX: 3400, minY: 200, maxY: 500}, // Fast vertical
        {x: 3800, y: 550, width: 800, height: 50}
    ],
    blocks: [
        {x: 300, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1450, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2750, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}
    ],
    pipes: [],
    enemies: [
        {x: 1400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 900, y: 350, width: 24, height: 20, vx: -4, type: 'bullet'}, // Mid-air hazard
        {x: 2100, y: 300, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 4000, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [
        {x: 500, width: 800},
        {x: 1600, width: 1000},
        {x: 2900, width: 900}
    ],
    stairs: [{x: 3800, steps: 5}],
    flagpole: {x: 4500, y: 250, height: 300}
};
const level10BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 11: "Moving Islands" ---
const level11MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        // Chain of moving platforms over a huge pit
        {x: 500, y: 450, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 500, maxX: 800, minY: 450, maxY: 450},
        {x: 1000, y: 400, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 900, maxX: 1200, minY: 400, maxY: 400},
        {x: 1400, y: 350, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1300, maxX: 1600, minY: 350, maxY: 350},
        {x: 1900, y: 300, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1800, maxX: 2100, minY: 300, maxY: 300},
        {x: 2400, y: 550, width: 400, height: 50}, // Rest
        // Vertical sequence
        {x: 2900, y: 450, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2900, maxX: 2900, minY: 200, maxY: 500},
        {x: 3200, y: 250, width: 100, height: 20, type: 'moving', vx: 0, vy: -150, minX: 3200, maxX: 3200, minY: 200, maxY: 500},
        {x: 3600, y: 550, width: 600, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2500, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        {x: 700, y: 400, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 1100, y: 350, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 2600, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3000, y: 300, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 3900, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 2000},
        {x: 2800, width: 800}
    ],
    stairs: [],
    flagpole: {x: 4100, y: 250, height: 300}
};
const level11BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 12: "Precision" ---
const level12MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        // Small static platforms with turtles
        {x: 500, y: 550, width: 100, height: 50},
        {x: 750, y: 500, width: 100, height: 20},
        {x: 1000, y: 450, width: 100, height: 20},
        {x: 1250, y: 400, width: 100, height: 20},
        {x: 1500, y: 550, width: 200, height: 50},
        // Bullets weaving
        {x: 1800, y: 400, width: 100, height: 20},
        {x: 2100, y: 350, width: 100, height: 20},
        {x: 2400, y: 400, width: 100, height: 20},
        {x: 2800, y: 550, width: 800, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1550, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        {x: 520, y: 518, width: 32, height: 32, vx: 1, type: 'turtle'}, // Tiny platform patrol
        {x: 1020, y: 418, width: 32, height: 32, vx: 1, type: 'turtle'},
        {x: 1900, y: 380, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 2200, y: 330, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 3000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 100}, {x: 600, width: 900}, {x: 1700, width: 1100}
    ],
    stairs: [{x: 3200, steps: 4}],
    flagpole: {x: 3500, y: 250, height: 300}
};
const level12BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 13: "The Tower" ---
const level13MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 600, height: 50},
        // Climb up
        {x: 700, y: 450, width: 100, height: 20},
        {x: 850, y: 350, width: 100, height: 20},
        {x: 1000, y: 250, width: 100, height: 20},
        {x: 1200, y: 150, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1200, maxX: 1500, minY: 150, maxY: 150},
        // Stay high
        {x: 1700, y: 150, width: 600, height: 20},
        {x: 2400, y: 200, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2400, maxX: 2400, minY: 200, maxY: 500}, // Down elevator
        {x: 2600, y: 550, width: 800, height: 50}
    ],
    blocks: [
        {x: 300, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1900, y: 80, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2100, y: 80, width: 40, height: 40, hit: false, type: 'powerup'}
    ],
    pipes: [],
    enemies: [
        {x: 900, y: 300, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 1100, y: 200, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 1900, y: 118, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2100, y: 118, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2800, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [{x: 600, width: 2000}],
    stairs: [],
    flagpole: {x: 3300, y: 250, height: 300}
};
const level13BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 14: "Speedrun" ---
const level14MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        {x: 600, y: 550, width: 400, height: 50},
        {x: 1200, y: 550, width: 400, height: 50},
        {x: 1800, y: 450, width: 100, height: 20}, // High jump
        {x: 2100, y: 550, width: 400, height: 50},
        {x: 2700, y: 550, width: 1000, height: 50},
        {x: 3900, y: 550, width: 600, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2300, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        {x: 700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2900, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'}, // Fast turtle
        {x: 3200, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 2200, y: 400, width: 24, height: 20, vx: -7, type: 'bullet'} // Fast bullet
    ],
    gaps: [
        {x: 400, width: 200}, {x: 1000, width: 200}, {x: 1600, width: 500}, {x: 2500, width: 200}, {x: 3700, width: 200}
    ],
    stairs: [{x: 4200, steps: 5}],
    flagpole: {x: 4450, y: 250, height: 300}
};
const level14BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 15: "The Gauntlet 2.0" ---
const level15MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50},
        {x: 600, y: 450, width: 100, height: 20, type: 'moving', vx: 150, vy: 0, minX: 600, maxX: 900, minY: 450, maxY: 450},
        {x: 1100, y: 550, width: 200, height: 50},
        {x: 1400, y: 350, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 1400, maxX: 1400, minY: 200, maxY: 500},
        {x: 1700, y: 550, width: 200, height: 50},
        {x: 2100, y: 450, width: 100, height: 20},
        {x: 2400, y: 350, width: 100, height: 20},
        {x: 2700, y: 250, width: 100, height: 20},
        {x: 3000, y: 550, width: 1000, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1150, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3300, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}
    ],
    pipes: [],
    enemies: [
        {x: 750, y: 400, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 1500, y: 300, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 2200, y: 400, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 2500, y: 300, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 3500, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [{x: 500, width: 600}, {x: 1300, width: 1700}],
    stairs: [{x: 3700, steps: 4}],
    flagpole: {x: 3950, y: 250, height: 300}
};
const level15BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 16: "Sky High" ---
const level16MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 300, height: 50},
        {x: 400, y: 400, width: 100, height: 20},
        {x: 600, y: 300, width: 100, height: 20},
        {x: 800, y: 200, width: 500, height: 20}, // High walkway
        {x: 1400, y: 300, width: 100, height: 20},
        {x: 1600, y: 400, width: 100, height: 20},
        {x: 1800, y: 550, width: 300, height: 50},
        {x: 2200, y: 450, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 2200, maxX: 2500, minY: 450, maxY: 450},
        {x: 2700, y: 550, width: 600, height: 50}
    ],
    blocks: [
        {x: 100, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1000, y: 100, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        {x: 900, y: 168, width: 32, height: 32, vx: 2, type: 'turtle'}, // High turtle
        {x: 1100, y: 168, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 500, y: 350, width: 24, height: 20, vx: -4, type: 'bullet'}, // Diagonal intercept
        {x: 1500, y: 350, width: 24, height: 20, vx: -4, type: 'bullet'}
    ],
    gaps: [{x: 300, width: 1500}, {x: 2100, width: 600}],
    stairs: [{x: 2900, steps: 6}],
    flagpole: {x: 3250, y: 250, height: 300}
};
const level16BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 17: "Tunnel Vision" ---
const level17MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 3000, height: 50}, // Long floor
        // Ceiling
        {x: 300, y: 350, width: 1000, height: 50},
        {x: 1500, y: 350, width: 1000, height: 50},
        {x: 3100, y: 550, width: 500, height: 50}
    ],
    blocks: [
        {x: 200, y: 450, width: 40, height: 40, hit: false, type: 'powerup'}, // Low block
        {x: 1400, y: 450, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        // Many low bullets
        {x: 800, y: 450, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 1200, y: 450, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 1800, y: 450, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 2200, y: 450, width: 24, height: 20, vx: -6, type: 'bullet'},
        // Turtles on ceiling? No, just ground
        {x: 1000, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [{x: 3000, width: 100}],
    stairs: [{x: 3200, steps: 3}],
    flagpole: {x: 3500, y: 250, height: 300}
};
const level17BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 18: "Rhythm Jump" ---
const level18MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        // Moving platforms that require timing
        {x: 500, y: 450, width: 80, height: 20, type: 'moving', vx: 0, vy: 100, minX: 500, maxX: 500, minY: 250, maxY: 500},
        {x: 700, y: 450, width: 80, height: 20, type: 'moving', vx: 0, vy: -100, minX: 700, maxX: 700, minY: 250, maxY: 500},
        {x: 900, y: 450, width: 80, height: 20, type: 'moving', vx: 0, vy: 100, minX: 900, maxX: 900, minY: 250, maxY: 500},
        {x: 1200, y: 550, width: 400, height: 50},
        {x: 1700, y: 450, width: 80, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1700, maxX: 2000, minY: 450, maxY: 450},
        {x: 2300, y: 550, width: 600, height: 50}
    ],
    blocks: [{x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}],
    pipes: [],
    enemies: [
        {x: 600, y: 300, width: 24, height: 20, vx: -4, type: 'bullet'}, // Crossing bullets
        {x: 800, y: 350, width: 24, height: 20, vx: -4, type: 'bullet'},
        {x: 1400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [{x: 400, width: 800}, {x: 1600, width: 700}],
    stairs: [{x: 2500, steps: 5}],
    flagpole: {x: 2850, y: 250, height: 300}
};
const level18BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 19: "Bullet Hell" ---
const level19MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 4000, height: 50}, // Flat run
        {x: 500, y: 400, width: 100, height: 20}, // Dodge blocks
        {x: 1000, y: 400, width: 100, height: 20},
        {x: 1500, y: 400, width: 100, height: 20},
        {x: 2000, y: 400, width: 100, height: 20}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2500, y: 350, width: 40, height: 40, hit: false, type: 'powerup'} // You'll need it
    ],
    pipes: [],
    enemies: [
        {x: 600, y: 500, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 800, y: 450, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 1000, y: 500, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 1200, y: 400, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 1500, y: 500, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 1800, y: 450, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 2200, y: 500, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 3000, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [],
    stairs: [{x: 3500, steps: 5}],
    flagpole: {x: 3800, y: 250, height: 300}
};
const level19BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));

// --- LEVEL 20: "The Final Test" ---
const level20MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50},
        {x: 600, y: 400, width: 100, height: 20, type: 'moving', vx: 150, vy: 0, minX: 600, maxX: 900, minY: 400, maxY: 400},
        {x: 1100, y: 550, width: 200, height: 50},
        {x: 1400, y: 300, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 1400, maxX: 1400, minY: 200, maxY: 500},
        {x: 1800, y: 200, width: 500, height: 20}, // High wire
        {x: 2500, y: 400, width: 100, height: 20, type: 'moving', vx: 200, vy: 0, minX: 2500, maxX: 3000, minY: 400, maxY: 400},
        {x: 3200, y: 550, width: 800, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2000, y: 150, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [],
    enemies: [
        {x: 700, y: 350, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 1500, y: 200, width: 24, height: 20, vx: -5, type: 'bullet'},
        {x: 2000, y: 168, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2200, y: 168, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2700, y: 350, width: 24, height: 20, vx: -7, type: 'bullet'}, // Fast
        {x: 3400, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'}
    ],
    gaps: [{x: 500, width: 600}, {x: 1300, width: 1900}],
    stairs: [{x: 3500, steps: 6}],
    flagpole: {x: 3800, y: 250, height: 300}
};
const level20BonusTemplate = JSON.parse(JSON.stringify(levelHardBonusTemplate));


// The main array holding all level templates
const levelTemplates = [
    { main: level1MainTemplate, bonus: level1BonusTemplate },
    { main: level2MainTemplate, bonus: level2BonusTemplate },
    { main: level3MainTemplate, bonus: level3BonusTemplate },
    { main: level4MainTemplate, bonus: level4BonusTemplate },
    { main: level5MainTemplate, bonus: level5BonusTemplate },
    { main: level6MainTemplate, bonus: level6BonusTemplate },
    { main: level7MainTemplate, bonus: level7BonusTemplate },
    { main: level8MainTemplate, bonus: level8BonusTemplate },
    { main: level9MainTemplate, bonus: level9BonusTemplate },
    { main: level10MainTemplate, bonus: level10BonusTemplate },
    { main: level11MainTemplate, bonus: level11BonusTemplate },
    { main: level12MainTemplate, bonus: level12BonusTemplate },
    { main: level13MainTemplate, bonus: level13BonusTemplate },
    { main: level14MainTemplate, bonus: level14BonusTemplate },
    { main: level15MainTemplate, bonus: level15BonusTemplate },
    { main: level16MainTemplate, bonus: level16BonusTemplate },
    { main: level17MainTemplate, bonus: level17BonusTemplate },
    { main: level18MainTemplate, bonus: level18BonusTemplate },
    { main: level19MainTemplate, bonus: level19BonusTemplate },
    { main: level20MainTemplate, bonus: level20BonusTemplate }
];
