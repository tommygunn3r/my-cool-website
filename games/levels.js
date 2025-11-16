// --- LEVEL 1 DATA ---
const level1MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50}, // ground sections
        {x: 650, y: 550, width: 450, height: 50},
        {x: 1250, y: 550, width: 650, height: 50},
        {x: 2100, y: 550, width: 450, height: 50},
        {x: 2730, y: 550, width: 670, height: 50},
        {x: 3550, y: 550, width: 400, height: 50},
        {x: 4150, y: 550, width: 600, height: 50},
        {x: 400, y: 450, width: 100, height: 20}, // floating platforms
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
        {x: 500, y: 300, width: 40, height: 40, hit: false, type: 'powerup'}, // First power-up
        {x: 800, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1200, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1550, y: 350, width: 40, height: 40, hit: false, type: 'coin'}, 
        {x: 2100, y: 300, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2500, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, // Second power-up
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

// --- LEVEL 2 DATA (NEW "Stair" Level) ---
const level2MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 700, height: 50},
        {x: 900, y: 550, width: 1000, height: 50},
        {x: 2100, y: 550, width: 800, height: 50},
        {x: 3100, y: 550, width: 1650, height: 50},
        // Floating platforms
        {x: 300, y: 450, width: 150, height: 20},
        {x: 550, y: 400, width: 150, height: 20},
        {x: 1000, y: 450, width: 100, height: 20},
        {x: 1200, y: 400, width: 100, height: 20},
        {x: 1400, y: 350, width: 100, height: 20},
        {x: 1600, y: 300, width: 100, height: 20},
        {x: 2200, y: 450, width: 150, height: 20},
        {x: 2500, y: 400, width: 150, height: 20},
        {x: 3300, y: 450, width: 100, height: 20},
        {x: 3500, y: 400, width: 100, height: 20},
        {x: 3700, y: 350, width: 100, height: 20}
    ],
    blocks: [
        {x: 350, y: 300, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 600, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1400, y: 200, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1600, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2550, y: 250, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 3700, y: 200, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1050, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1080, exitY: 460},
        {x: 3400, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3430, exitY: 460}
    ],
    enemies: [
        {x: 400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1100, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 700, width: 200},
        {x: 1900, width: 200},
        {x: 2900, width: 200}
    ],
    stairs: [
        {x: 1700, steps: 4},
        {x: 4000, steps: 8}
    ],
    flagpole: {x: 4650, y: 250, height: 300}
};
const level2BonusTemplate = {
    platforms: [
        {x: 0, y: 550, width: 1200, height: 50},
        {x: 100, y: 450, width: 100, height: 20},
        {x: 300, y: 400, width: 100, height: 20},
        {x: 500, y: 350, width: 100, height: 20},
        {x: 700, y: 400, width: 100, height: 20}
    ],
    blocks: [
        {x: 100, y: 300, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 300, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 500, y: 200, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 700, y: 250, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1000, y: 470, width: 60, height: 80, dest: 'main'}
    ],
    enemies: [],
    gaps: [],
    stairs: [],
    flagpole: null
};


// --- LEVEL 3 DATA ("Pit" Level) ---
const level3MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50},
        {x: 750, y: 550, width: 250, height: 50},
        {x: 1300, y: 550, width: 500, height: 50},
        {x: 2000, y: 550, width: 500, height: 50},
        {x: 2800, y: 550, width: 600, height: 50},
        {x: 3800, y: 550, width: 950, height: 50},
        // Floating platforms
        {x: 400, y: 450, width: 100, height: 20},
        {x: 800, y: 400, width: 150, height: 20},
        {x: 1400, y: 350, width: 100, height: 20},
        {x: 1600, y: 300, width: 100, height: 20},
        {x: 2100, y: 450, width: 100, height: 20},
        {x: 2300, y: 400, width: 100, height: 20},
        {x: 2900, y: 350, width: 100, height: 20},
        {x: 3200, y: 300, width: 100, height: 20},
        {x: 4000, y: 450, width: 100, height: 20},
        {x: 4200, y: 400, width: 100, height: 20}
    ],
    blocks: [
        {x: 400, y: 300, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 850, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1400, y: 200, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2300, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2900, y: 200, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 4100, y: 250, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1450, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1480, exitY: 460},
        {x: 3100, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3130, exitY: 460}
    ],
    enemies: [
        {x: 300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 4000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 4300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 500, width: 250},
        {x: 1000, width: 300},
        {x: 1800, width: 200},
        {x: 2500, width: 300},
        {x: 3400, width: 400}
    ],
    stairs: [
        {x: 2200, steps: 4},
        {x: 4400, steps: 6}
    ],
    flagpole: {x: 4650, y: 250, height: 300}
};
const level3BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));

// --- LEVEL 4 DATA ("Climbing" Level) ---
const level4MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 1000, height: 50},
        {x: 1200, y: 550, width: 1000, height: 50},
        {x: 2400, y: 550, width: 1000, height: 50},
        {x: 3600, y: 550, width: 1150, height: 50},
        // Floating platforms
        {x: 300, y: 450, width: 100, height: 20},
        {x: 500, y: 400, width: 100, height: 20},
        {x: 700, y: 350, width: 100, height: 20},
        {x: 1050, y: 450, width: 100, height: 20}, // Over gap
        {x: 1300, y: 350, width: 100, height: 20},
        {x: 1500, y: 300, width: 100, height: 20},
        {x: 1700, y: 250, width: 100, height: 20},
        {x: 2250, y: 450, width: 100, height: 20}, // Over gap
        {x: 2500, y: 450, width: 100, height: 20},
        {x: 2700, y: 400, width: 100, height: 20},
        {x: 2900, y: 350, width: 100, height: 20},
        {x: 3450, y: 450, width: 100, height: 20}, // Over gap
        {x: 3700, y: 400, width: 100, height: 20},
        {x: 3900, y: 350, width: 100, height: 20},
        {x: 4100, y: 300, width: 100, height: 20}
    ],
    blocks: [
        {x: 300, y: 300, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 700, y: 200, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1400, y: 250, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1700, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2900, y: 200, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 4100, y: 200, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 400, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 430, exitY: 460},
        {x: 2800, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 2830, exitY: 460}
    ],
    enemies: [
        {x: 800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1500, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2000, y: 368, width: 32, height: 32, vx: 2, type: 'turtle'}, // On floating platform
        {x: 2600, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3700, y: 368, width: 32, height: 32, vx: 2, type: 'turtle'}, // On floating platform
        {x: 4000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 1000, width: 200},
        {x: 2200, width: 200},
        {x: 3400, width: 200}
    ],
    stairs: [
        {x: 1800, steps: 6},
        {x: 4400, steps: 6}
    ],
    flagpole: {x: 4650, y: 250, height: 300}
};
const level4BonusTemplate = JSON.parse(JSON.stringify(level2BonusTemplate));

// --- LEVEL 5 DATA ("Gauntlet" Level) ---
const level5MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 2000, height: 50},
        {x: 2200, y: 550, width: 2550, height: 50},
        // Floating platforms
        {x: 400, y: 450, width: 100, height: 20},
        {x: 600, y: 400, width: 100, height: 20},
        {x: 800, y: 350, width: 100, height: 20},
        {x: 1000, y: 400, width: 100, height: 20},
        {x: 1200, y: 450, width: 100, height: 20},
        {x: 2400, y: 450, width: 100, height: 20},
        {x: 2600, y: 400, width: 100, height: 20},
        {x: 2800, y: 350, width: 100, height: 20},
        {x: 3000, y: 400, width: 100, height: 20},
        {x: 3200, y: 450, width: 100, height: 20},
        {x: 3400, y: 400, width: 100, height: 20},
        {x: 3600, y: 350, width: 100, height: 20}
    ],
    blocks: [
        {x: 400, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 800, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1200, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2400, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2800, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3600, y: 250, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1000, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1030, exitY: 460},
        {x: 3000, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3030, exitY: 460}
    ],
    enemies: [
        {x: 700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1200, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 1700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2500, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 2600, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3400, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 3800, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},
        {x: 4000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}
    ],
    gaps: [
        {x: 2000, width: 200}
    ],
    stairs: [
        {x: 1800, steps: 3},
        {x: 4400, steps: 6}
    ],
    flagpole: {x: 4650, y: 250, height: 300}
};
const level5BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));


// The main array holding all level templates
const levelTemplates = [
    { main: level1MainTemplate, bonus: level1BonusTemplate },
    { main: level2MainTemplate, bonus: level2BonusTemplate },
    { main: level3MainTemplate, bonus: level3BonusTemplate },
    { main: level4MainTemplate, bonus: level4BonusTemplate },
    { main: level5MainTemplate, bonus: level5BonusTemplate }
];