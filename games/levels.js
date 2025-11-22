// --- LEVEL 1 ---
const level1MainTemplate = {
    platforms: [{x: 0, y: 550, width: 500, height: 50},{x: 650, y: 550, width: 450, height: 50},{x: 1250, y: 550, width: 650, height: 50},{x: 2100, y: 550, width: 450, height: 50},{x: 2730, y: 550, width: 670, height: 50},{x: 3550, y: 550, width: 400, height: 50},{x: 4150, y: 550, width: 600, height: 50},{x: 400, y: 450, width: 100, height: 20},{x: 600, y: 400, width: 100, height: 20},{x: 850, y: 350, width: 120, height: 20},{x: 1000, y: 450, width: 150, height: 20},{x: 1300, y: 400, width: 100, height: 20},{x: 1400, y: 350, width: 100, height: 20},{x: 1600, y: 300, width: 120, height: 20},{x: 1700, y: 450, width: 100, height: 20},{x: 2000, y: 400, width: 100, height: 20},{x: 2200, y: 350, width: 150, height: 20},{x: 2400, y: 500, width: 100, height: 20},{x: 2700, y: 450, width: 120, height: 20},{x: 2900, y: 400, width: 100, height: 20},{x: 3200, y: 350, width: 150, height: 20},{x: 3500, y: 450, width: 100, height: 20},{x: 3800, y: 400, width: 120, height: 20},{x: 4100, y: 350, width: 100, height: 20}],
    blocks: [{x: 300, y: 350, width: 40, height: 40, hit: false, type: 'coin'},{x: 500, y: 300, width: 40, height: 40, hit: false, type: 'powerup'},{x: 800, y: 350, width: 40, height: 40, hit: false, type: 'coin'},{x: 1200, y: 250, width: 40, height: 40, hit: false, type: 'coin'},{x: 1550, y: 350, width: 40, height: 40, hit: false, type: 'coin'},{x: 2100, y: 300, width: 40, height: 40, hit: false, type: 'coin'},{x: 2500, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},{x: 2800, y: 300, width: 40, height: 40, hit: false, type: 'coin'},{x: 3100, y: 250, width: 40, height: 40, hit: false, type: 'coin'},{x: 3400, y: 350, width: 40, height: 40, hit: false, type: 'coin'},{x: 3700, y: 300, width: 40, height: 40, hit: false, type: 'coin'},{x: 4000, y: 250, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [{x: 750, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 780, exitY: 460},{x: 2980, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3010, exitY: 460}],
    enemies: [{x: 700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 1350, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 2150, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 2780, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 3100, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 3650, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 4300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 500, width: 150},{x: 1100, width: 150},{x: 1900, width: 200},{x: 2550, width: 180},{x: 3400, width: 150},{x: 3950, width: 200}],
    stairs: [{x: 2200, steps: 5},{x: 4400, steps: 6}], flagpole: {x: 4650, y: 250, height: 300}
};
const level1BonusTemplate = {
    platforms: [{x: 0, y: 550, width: 1200, height: 50},{x: 200, y: 450, width: 100, height: 20},{x: 400, y: 350, width: 100, height: 20},{x: 600, y: 450, width: 100, height: 20}],
    blocks: [{x: 300, y: 350, width: 40, height: 40, hit: false, type: 'coin'},{x: 500, y: 250, width: 40, height: 40, hit: false, type: 'coin'},{x: 700, y: 350, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [{x: 900, y: 470, width: 60, height: 80, dest: 'main'}], enemies: [], gaps: [], stairs: [], flagpole: null
};

// --- LEVELS 2-10 (Abbreviated to save space, logic remains the same) ---
const level2MainTemplate=JSON.parse(JSON.stringify(level1MainTemplate));level2MainTemplate.enemies[0].x=800;level2MainTemplate.blocks[1]={x:600,y:250,width:40,height:40,hit:false,type:'powerup'};const level2BonusTemplate=JSON.parse(JSON.stringify(level1BonusTemplate));
const level3MainTemplate={platforms:[{x:0,y:550,width:500,height:50},{x:750,y:550,width:250,height:50},{x:1300,y:550,width:500,height:50},{x:2000,y:550,width:500,height:50},{x:2800,y:550,width:600,height:50},{x:3800,y:550,width:950,height:50},{x:400,y:450,width:100,height:20},{x:800,y:400,width:150,height:20},{x:1400,y:350,width:100,height:20},{x:1600,y:300,width:100,height:20},{x:2100,y:450,width:100,height:20},{x:2300,y:400,width:100,height:20},{x:2900,y:350,width:100,height:20},{x:3200,y:300,width:100,height:20},{x:4000,y:450,width:100,height:20},{x:4200,y:400,width:100,height:20}],blocks:[{x:400,y:300,width:40,height:40,hit:false,type:'powerup'},{x:850,y:250,width:40,height:40,hit:false,type:'coin'},{x:1400,y:200,width:40,height:40,hit:false,type:'coin'},{x:2300,y:250,width:40,height:40,hit:false,type:'coin'},{x:2900,y:200,width:40,height:40,hit:false,type:'powerup'},{x:4100,y:250,width:40,height:40,hit:false,type:'coin'}],pipes:[{x:1450,y:470,width:60,height:80,dest:'bonus',exitX:1480,exitY:460},{x:3100,y:470,width:60,height:80,dest:'bonus',exitX:3130,exitY:460}],enemies:[{x:300,y:518,width:32,height:32,vx:2,type:'turtle'},{x:800,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1400,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2200,y:518,width:32,height:32,vx:2,type:'turtle'},{x:3000,y:518,width:32,height:32,vx:2,type:'turtle'},{x:4000,y:518,width:32,height:32,vx:2,type:'turtle'},{x:4300,y:518,width:32,height:32,vx:2,type:'turtle'}],gaps:[{x:500,width:250},{x:1000,width:300},{x:1800,width:200},{x:2500,width:300},{x:3400,width:400}],stairs:[{x:2200,steps:4},{x:4400,steps:6}],flagpole:{x:4650,y:250,height:300}};
const level3BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));
const level4MainTemplate={platforms:[{x:0,y:550,width:1000,height:50},{x:1200,y:550,width:1000,height:50},{x:2400,y:550,width:1000,height:50},{x:3600,y:550,width:1150,height:50},{x:300,y:450,width:100,height:20},{x:500,y:400,width:100,height:20},{x:700,y:350,width:100,height:20},{x:1050,y:450,width:100,height:20},{x:1300,y:350,width:100,height:20},{x:1500,y:300,width:100,height:20},{x:1700,y:250,width:100,height:20},{x:2250,y:450,width:100,height:20},{x:2500,y:450,width:100,height:20},{x:2700,y:400,width:100,height:20},{x:2900,y:350,width:100,height:20},{x:3450,y:450,width:100,height:20},{x:3700,y:400,width:100,height:20},{x:3900,y:350,width:100,height:20},{x:4100,y:300,width:100,height:20}],blocks:[{x:300,y:300,width:40,height:40,hit:false,type:'powerup'},{x:700,y:200,width:40,height:40,hit:false,type:'coin'},{x:1400,y:250,width:40,height:40,hit:false,type:'powerup'},{x:1700,y:150,width:40,height:40,hit:false,type:'coin'},{x:2900,y:200,width:40,height:40,hit:false,type:'coin'},{x:4100,y:200,width:40,height:40,hit:false,type:'coin'}],pipes:[{x:400,y:470,width:60,height:80,dest:'bonus',exitX:430,exitY:460},{x:2800,y:470,width:60,height:80,dest:'bonus',exitX:2830,exitY:460}],enemies:[{x:800,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1500,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2000,y:368,width:32,height:32,vx:2,type:'turtle'},{x:2600,y:518,width:32,height:32,vx:2,type:'turtle'},{x:3700,y:368,width:32,height:32,vx:2,type:'turtle'},{x:4000,y:518,width:32,height:32,vx:2,type:'turtle'}],gaps:[{x:1000,width:200},{x:2200,width:200},{x:3400,width:200}],stairs:[{x:1800,steps:6},{x:4400,steps:6}],flagpole:{x:4650,y:250,height:300}};
const level4BonusTemplate = JSON.parse(JSON.stringify(level2BonusTemplate));
const level5MainTemplate={platforms:[{x:0,y:550,width:2000,height:50},{x:2200,y:550,width:2550,height:50},{x:400,y:450,width:100,height:20},{x:600,y:400,width:100,height:20},{x:800,y:350,width:100,height:20},{x:1000,y:400,width:100,height:20},{x:1200,y:450,width:100,height:20},{x:2400,y:450,width:100,height:20},{x:2600,y:400,width:100,height:20},{x:2800,y:350,width:100,height:20},{x:3000,y:400,width:100,height:20},{x:3200,y:450,width:100,height:20},{x:3400,y:400,width:100,height:20},{x:3600,y:350,width:100,height:20}],blocks:[{x:400,y:350,width:40,height:40,hit:false,type:'powerup'},{x:800,y:250,width:40,height:40,hit:false,type:'coin'},{x:1200,y:350,width:40,height:40,hit:false,type:'coin'},{x:2400,y:350,width:40,height:40,hit:false,type:'powerup'},{x:2800,y:250,width:40,height:40,hit:false,type:'coin'},{x:3600,y:250,width:40,height:40,hit:false,type:'coin'}],pipes:[{x:1000,y:470,width:60,height:80,dest:'bonus',exitX:1030,exitY:460},{x:3000,y:470,width:60,height:80,dest:'bonus',exitX:3030,exitY:460}],enemies:[{x:700,y:518,width:32,height:32,vx:2,type:'turtle'},{x:800,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1200,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1300,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1700,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2400,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2500,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2600,y:518,width:32,height:32,vx:2,type:'turtle'},{x:3300,y:518,width:32,height:32,vx:2,type:'turtle'},{x:3400,y:518,width:32,height:32,vx:2,type:'turtle'},{x:3800,y:518,width:32,height:32,vx:2,type:'turtle'},{x:4000,y:518,width:32,height:32,vx:2,type:'turtle'}],gaps:[{x:2000,width:200}],stairs:[{x:1800,steps:3},{x:4400,steps:6}],flagpole:{x:4650,y:250,height:300}};
const level5BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));
const level6MainTemplate={platforms:[{x:0,y:550,width:500,height:50},{x:1000,y:550,width:500,height:50},{x:2000,y:550,width:500,height:50},{x:3000,y:550,width:500,height:50},{x:4000,y:550,width:800,height:50},{x:600,y:450,width:100,height:20,type:'moving',vx:100,vy:0,minX:500,maxX:900,minY:450,maxY:450},{x:1600,y:350,width:100,height:20,type:'moving',vx:0,vy:100,minX:1600,maxX:1600,minY:300,maxY:500},{x:2600,y:450,width:100,height:20,type:'moving',vx:150,vy:0,minX:2500,maxX:2900,minY:450,maxY:450},{x:3600,y:300,width:100,height:20,type:'moving',vx:0,vy:150,minX:3600,maxX:3600,minY:250,maxY:500},{x:1500,y:250,width:50,height:20},{x:2500,y:250,width:50,height:20}],blocks:[{x:200,y:350,width:40,height:40,hit:false,type:'powerup'},{x:1200,y:350,width:40,height:40,hit:false,type:'coin'},{x:2200,y:350,width:40,height:40,hit:false,type:'powerup'},{x:3200,y:350,width:40,height:40,hit:false,type:'coin'}],pipes:[],enemies:[{x:1200,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2200,y:518,width:32,height:32,vx:2,type:'turtle'},{x:3200,y:518,width:32,height:32,vx:2,type:'turtle'},{x:4200,y:518,width:32,height:32,vx:2,type:'turtle'}],gaps:[{x:500,width:500},{x:1500,width:500},{x:2500,width:500},{x:3500,width:500}],stairs:[],flagpole:{x:4650,y:250,height:300}};
const level6BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));
const level7MainTemplate={platforms:[{x:0,y:550,width:600,height:50},{x:700,y:450,width:120,height:20,type:'moving',vx:120,vy:0,minX:650,maxX:1200,minY:450,maxY:450},{x:1300,y:550,width:400,height:50},{x:1800,y:450,width:100,height:20,type:'moving',vx:0,vy:100,minX:1800,maxX:1800,minY:250,maxY:500},{x:2000,y:300,width:100,height:20,type:'moving',vx:0,vy:-100,minX:2000,maxX:2000,minY:250,maxY:500},{x:2200,y:250,width:300,height:20},{x:2700,y:250,width:100,height:20,type:'moving',vx:0,vy:150,minX:2700,maxX:2700,minY:250,maxY:500},{x:2900,y:550,width:600,height:50},{x:3600,y:450,width:100,height:20,type:'moving',vx:200,vy:0,minX:3500,maxX:4000,minY:450,maxY:450},{x:4200,y:400,width:100,height:20,type:'moving',vx:200,vy:0,minX:4100,maxX:4500,minY:400,maxY:400},{x:4600,y:550,width:400,height:50}],blocks:[{x:300,y:350,width:40,height:40,hit:false,type:'powerup'},{x:1400,y:350,width:40,height:40,hit:false,type:'coin'},{x:2300,y:150,width:40,height:40,hit:false,type:'powerup'},{x:3100,y:350,width:40,height:40,hit:false,type:'coin'}],pipes:[],enemies:[{x:800,y:400,width:24,height:20,vx:-4,type:'bullet'},{x:1200,y:420,width:24,height:20,vx:-4,type:'bullet'},{x:1500,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1900,y:350,width:24,height:20,vx:-5,type:'bullet'},{x:2100,y:300,width:24,height:20,vx:-5,type:'bullet'},{x:3200,y:450,width:24,height:20,vx:-6,type:'bullet'},{x:3800,y:350,width:24,height:20,vx:-6,type:'bullet'},{x:4300,y:350,width:24,height:20,vx:-6,type:'bullet'}],gaps:[{x:600,width:700},{x:1700,width:1200},{x:3500,width:1100}],stairs:[],flagpole:{x:4800,y:250,height:300}};
const level7BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));
const level8MainTemplate={platforms:[{x:0,y:550,width:400,height:50},{x:600,y:200,width:100,height:20,type:'moving',vx:0,vy:150,minX:600,maxX:600,minY:150,maxY:500},{x:900,y:550,width:300,height:50},{x:1300,y:200,width:100,height:20,type:'moving',vx:0,vy:-150,minX:1300,maxX:1300,minY:150,maxY:500},{x:1600,y:150,width:400,height:20},{x:2200,y:400,width:100,height:20,type:'moving',vx:0,vy:200,minX:2200,maxX:2200,minY:100,maxY:500},{x:2600,y:550,width:400,height:50},{x:3200,y:350,width:100,height:20},{x:3500,y:250,width:100,height:20},{x:3800,y:150,width:100,height:20},{x:4200,y:550,width:800,height:50}],blocks:[{x:200,y:350,width:40,height:40,hit:false,type:'coin'},{x:1700,y:100,width:40,height:40,hit:false,type:'powerup'},{x:2700,y:350,width:40,height:40,hit:false,type:'coin'},{x:3850,y:100,width:40,height:40,hit:false,type:'coin'}],pipes:[{x:2800,y:470,width:60,height:80,dest:'bonus',exitX:2830,exitY:460}],enemies:[{x:700,y:300,width:24,height:20,vx:-3,type:'bullet'},{x:1100,y:518,width:32,height:32,vx:2,type:'turtle'},{x:1400,y:300,width:24,height:20,vx:-4,type:'bullet'},{x:1800,y:100,width:32,height:32,vx:2,type:'turtle'},{x:2300,y:250,width:24,height:20,vx:-5,type:'bullet'},{x:3500,y:550,width:24,height:20,vx:-4,type:'bullet'},{x:4400,y:518,width:32,height:32,vx:2,type:'turtle'}],gaps:[{x:400,width:500},{x:1200,width:1400},{x:3000,width:1200}],stairs:[],flagpole:{x:4800,y:250,height:300}};
const level8BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));
const level9MainTemplate={platforms:[{x:0,y:550,width:400,height:50},{x:500,y:450,width:100,height:20},{x:700,y:450,width:100,height:20},{x:900,y:450,width:100,height:20},{x:1200,y:550,width:300,height:50},{x:1700,y:400,width:100,height:20,type:'moving',vx:100,vy:0,minX:1600,maxX:1900,minY:400,maxY:400},{x:2200,y:550,width:300,height:50},{x:2700,y:350,width:100,height:20},{x:3000,y:350,width:100,height:20},{x:3300,y:350,width:100,height:20},{x:3800,y:550,width:800,height:50}],blocks:[{x:200,y:350,width:40,height:40,hit:false,type:'powerup'},{x:1350,y:350,width:40,height:40,hit:false,type:'coin'},{x:2350,y:350,width:40,height:40,hit:false,type:'coin'}],pipes:[],enemies:[{x:600,y:420,width:24,height:20,vx:-4,type:'bullet'},{x:800,y:380,width:24,height:20,vx:-4,type:'bullet'},{x:1000,y:420,width:24,height:20,vx:-4,type:'bullet'},{x:1800,y:350,width:24,height:20,vx:-5,type:'bullet'},{x:1900,y:250,width:24,height:20,vx:-5,type:'bullet'},{x:2800,y:300,width:24,height:20,vx:-6,type:'bullet'},{x:3100,y:300,width:24,height:20,vx:-6,type:'bullet'},{x:3400,y:300,width:24,height:20,vx:-6,type:'bullet'},{x:4000,y:518,width:32,height:32,vx:3,type:'turtle'}],gaps:[{x:400,width:800},{x:1500,width:700},{x:2500,width:1300}],stairs:[],flagpole:{x:4400,y:250,height:300}};
const level9BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));
const level10MainTemplate={platforms:[{x:0,y:550,width:500,height:50},{x:600,y:400,width:100,height:20,type:'moving',vx:200,vy:0,minX:600,maxX:1100,minY:400,maxY:400},{x:1300,y:550,width:300,height:50},{x:1800,y:350,width:100,height:20,type:'moving',vx:250,vy:0,minX:1800,maxX:2400,minY:350,maxY:350},{x:2600,y:550,width:300,height:50},{x:3100,y:450,width:100,height:20,type:'moving',vx:0,vy:200,minX:3100,maxX:3100,minY:200,maxY:500},{x:3400,y:450,width:100,height:20,type:'moving',vx:0,vy:-200,minX:3400,maxX:3400,minY:200,maxY:500},{x:3800,y:550,width:800,height:50}],blocks:[{x:300,y:350,width:40,height:40,hit:false,type:'powerup'},{x:1450,y:350,width:40,height:40,hit:false,type:'coin'},{x:2750,y:350,width:40,height:40,hit:false,type:'powerup'}],pipes:[],enemies:[{x:1400,y:518,width:32,height:32,vx:2,type:'turtle'},{x:2700,y:518,width:32,height:32,vx:2,type:'turtle'},{x:900,y:350,width:24,height:20,vx:-4,type:'bullet'},{x:2100,y:300,width:24,height:20,vx:-5,type:'bullet'},{x:4000,y:518,width:32,height:32,vx:3,type:'turtle'}],gaps:[{x:500,width:800},{x:1600,width:1000},{x:2900,width:900}],stairs:[{x:3800,steps:5}],flagpole:{x:4500,y:250,height:300}};
const level10BonusTemplate = JSON.parse(JSON.stringify(level1BonusTemplate));

// --- NEW LEVELS 11-20 (HARD MODE) ---

// Level 11: Moving Islands
const level11MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        {x: 500, y: 450, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 500, maxX: 800, minY: 450, maxY: 450},
        {x: 1000, y: 400, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 900, maxX: 1200, minY: 400, maxY: 400},
        {x: 1400, y: 350, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1300, maxX: 1600, minY: 350, maxY: 350},
        {x: 1900, y: 300, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1800, maxX: 2100, minY: 300, maxY: 300},
        {x: 2400, y: 550, width: 400, height: 50},
        {x: 2900, y: 450, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2900, maxX: 2900, minY: 200, maxY: 500},
        {x: 3200, y: 250, width: 100, height: 20, type: 'moving', vx: 0, vy: -150, minX: 3200, maxX: 3200, minY: 200, maxY: 500},
        {x: 3600, y: 550, width: 600, height: 50}
    ],
    blocks: [{x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}, {x: 2500, y: 350, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [],
    enemies: [{x: 700, y: 400, width: 24, height: 20, vx: -4, type: 'bullet'}, {x: 1100, y: 350, width: 24, height: 20, vx: -4, type: 'bullet'}, {x: 2600, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}, {x: 3000, y: 300, width: 24, height: 20, vx: -5, type: 'bullet'}, {x: 3900, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 400, width: 2000}, {x: 2800, width: 800}], stairs: [], flagpole: {x: 4100, y: 250, height: 300}
};
const level11BonusTemplate = {
    platforms: [{x: 0, y: 550, width: 300, height: 50},{x: 900, y: 550, width: 300, height: 50},{x: 350, y: 450, width: 80, height: 20},{x: 550, y: 400, width: 80, height: 20},{x: 750, y: 450, width: 80, height: 20}],
    blocks: [{x: 350, y: 300, width: 40, height: 40, hit: false, type: 'coin'},{x: 550, y: 250, width: 40, height: 40, hit: false, type: 'coin'},{x: 550, y: 150, width: 40, height: 40, hit: false, type: 'powerup'},{x: 750, y: 300, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [{x: 1000, y: 470, width: 60, height: 80, dest: 'main'}], enemies: [], gaps: [{x: 300, width: 600}], stairs: [], flagpole: null
};

// Level 12
const level12MainTemplate = {
    platforms: [{x: 0, y: 550, width: 400, height: 50},{x: 500, y: 550, width: 100, height: 50},{x: 750, y: 500, width: 100, height: 20},{x: 1000, y: 450, width: 100, height: 20},{x: 1250, y: 400, width: 100, height: 20},{x: 1500, y: 550, width: 200, height: 50},{x: 1800, y: 400, width: 100, height: 20},{x: 2100, y: 350, width: 100, height: 20},{x: 2400, y: 400, width: 100, height: 20},{x: 2800, y: 550, width: 800, height: 50}],
    blocks: [{x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},{x: 1550, y: 350, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [], enemies: [{x: 520, y: 518, width: 32, height: 32, vx: 1, type: 'turtle'},{x: 1020, y: 418, width: 32, height: 32, vx: 1, type: 'turtle'},{x: 1900, y: 380, width: 24, height: 20, vx: -5, type: 'bullet'},{x: 2200, y: 330, width: 24, height: 20, vx: -5, type: 'bullet'},{x: 3000, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'}],
    gaps: [{x: 400, width: 100}, {x: 600, width: 900}, {x: 1700, width: 1100}], stairs: [{x: 3200, steps: 4}], flagpole: {x: 3500, y: 250, height: 300}
};
const level12BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 13
const level13MainTemplate = {
    platforms: [{x: 0, y: 550, width: 600, height: 50},{x: 700, y: 450, width: 100, height: 20},{x: 850, y: 350, width: 100, height: 20},{x: 1000, y: 250, width: 100, height: 20},{x: 1200, y: 150, width: 100, height: 20, type: 'moving', vx: 100, vy: 0, minX: 1200, maxX: 1500, minY: 150, maxY: 150},{x: 1700, y: 150, width: 600, height: 20},{x: 2400, y: 200, width: 100, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2400, maxX: 2400, minY: 200, maxY: 500},{x: 2600, y: 550, width: 800, height: 50}],
    blocks: [{x: 300, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},{x: 1900, y: 80, width: 40, height: 40, hit: false, type: 'coin'},{x: 2100, y: 80, width: 40, height: 40, hit: false, type: 'powerup'}],
    pipes: [], enemies: [{x: 900, y: 300, width: 24, height: 20, vx: -4, type: 'bullet'},{x: 1100, y: 200, width: 24, height: 20, vx: -4, type: 'bullet'},{x: 1900, y: 118, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 2100, y: 118, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 2800, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}],
    gaps: [{x: 600, width: 2000}], stairs: [], flagpole: {x: 3300, y: 250, height: 300}
};
const level13BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 14
const level14MainTemplate = {
    platforms: [{x: 0, y: 550, width: 400, height: 50},{x: 600, y: 550, width: 400, height: 50},{x: 1200, y: 550, width: 400, height: 50},{x: 1800, y: 450, width: 100, height: 20},{x: 2100, y: 550, width: 400, height: 50},{x: 2700, y: 550, width: 1000, height: 50},{x: 3900, y: 550, width: 600, height: 50}],
    blocks: [{x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},{x: 2300, y: 350, width: 40, height: 40, hit: false, type: 'coin'}],
    pipes: [], enemies: [{x: 700, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 1300, y: 518, width: 32, height: 32, vx: 2, type: 'turtle'},{x: 2900, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},{x: 3200, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},{x: 2200, y: 400, width: 24, height: 20, vx: -7, type: 'bullet'}],
    gaps: [{x: 400, width: 200}, {x: 1000, width: 200}, {x: 1600, width: 500}, {x: 2500, width: 200}, {x: 3700, width: 200}], stairs: [{x: 4200, steps: 5}], flagpole: {x: 4450, y: 250, height: 300}
};
const level14BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 15 - MASTER PLATFORMING GAUNTLET
const level15MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        {x: 600, y: 450, width: 80, height: 20, type: 'moving', vx: 120, vy: 0, minX: 550, maxX: 900, minY: 450, maxY: 450},
        {x: 1100, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: 150, minX: 1100, maxX: 1100, minY: 200, maxY: 500},
        {x: 1400, y: 250, width: 80, height: 20, type: 'moving', vx: -120, vy: 0, minX: 1300, maxX: 1600, minY: 250, maxY: 250},
        {x: 1800, y: 400, width: 80, height: 20, type: 'moving', vx: 0, vy: -150, minX: 1800, maxX: 1800, minY: 200, maxY: 500},
        {x: 2100, y: 550, width: 350, height: 50},
        {x: 2650, y: 450, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 2600, maxX: 3000, minY: 450, maxY: 450},
        {x: 3200, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: 120, minX: 3200, maxX: 3200, minY: 250, maxY: 550},
        {x: 3500, y: 250, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 3450, maxX: 3850, minY: 250, maxY: 250},
        {x: 4050, y: 400, width: 80, height: 20, type: 'moving', vx: 0, vy: -150, minX: 4050, maxX: 4050, minY: 200, maxY: 550},
        {x: 4350, y: 550, width: 300, height: 50},
        {x: 4850, y: 450, width: 100, height: 20},
        {x: 5150, y: 350, width: 100, height: 20},
        {x: 5450, y: 250, width: 100, height: 20},
        {x: 5750, y: 550, width: 650, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1400, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2300, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3500, y: 150, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 4900, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 5450, y: 150, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [{x: 2250, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 2280, exitY: 460}],
    enemies: [
        {x: 300, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 700, y: 400, width: 24, height: 20, vx: -6, type: 'bullet'},
        {x: 1150, y: 300, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 1450, y: 200, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 1850, y: 350, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 2300, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 2700, y: 400, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 3250, y: 300, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 3550, y: 200, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 4100, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 4550, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 4700, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 5200, y: 300, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 5900, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 6050, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 650},
        {x: 1000, width: 800},
        {x: 2450, width: 750},
        {x: 3100, width: 950},
        {x: 4250, width: 600},
        {x: 5550, width: 200}
    ],
    stairs: [{x: 5850, steps: 6}],
    flagpole: {x: 6300, y: 250, height: 300}
};
const level15BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 16 - PRECISION MOVING PLATFORM HELL
const level16MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        {x: 600, y: 400, width: 70, height: 20, type: 'moving', vx: 0, vy: 150, minX: 600, maxX: 600, minY: 200, maxY: 550},
        {x: 850, y: 300, width: 70, height: 20, type: 'moving', vx: 0, vy: -150, minX: 850, maxX: 850, minY: 200, maxY: 550},
        {x: 1100, y: 450, width: 70, height: 20, type: 'moving', vx: 0, vy: 150, minX: 1100, maxX: 1100, minY: 200, maxY: 550},
        {x: 1350, y: 250, width: 70, height: 20, type: 'moving', vx: 0, vy: -150, minX: 1350, maxX: 1350, minY: 150, maxY: 550},
        {x: 1700, y: 550, width: 300, height: 50},
        {x: 2200, y: 450, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 2100, maxX: 2600, minY: 450, maxY: 450},
        {x: 2900, y: 350, width: 80, height: 20, type: 'moving', vx: -150, vy: 0, minX: 2700, maxX: 3100, minY: 350, maxY: 350},
        {x: 3400, y: 250, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 3300, maxX: 3700, minY: 250, maxY: 250},
        {x: 4000, y: 550, width: 350, height: 50},
        {x: 4550, y: 450, width: 70, height: 20, type: 'moving', vx: 0, vy: 120, minX: 4550, maxX: 4550, minY: 250, maxY: 550},
        {x: 4800, y: 350, width: 70, height: 20, type: 'moving', vx: 0, vy: -120, minX: 4800, maxX: 4800, minY: 250, maxY: 550},
        {x: 5050, y: 250, width: 70, height: 20, type: 'moving', vx: 0, vy: 120, minX: 5050, maxX: 5050, minY: 200, maxY: 550},
        {x: 5400, y: 550, width: 600, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1350, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1900, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3400, y: 150, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 4200, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 5050, y: 150, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [{x: 1850, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1880, exitY: 460}],
    enemies: [
        {x: 300, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 650, y: 350, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 900, y: 250, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 1150, y: 400, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 1400, y: 200, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 1900, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 2250, y: 400, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 2950, y: 300, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 3450, y: 200, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 4200, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 4350, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 4600, y: 400, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 4850, y: 300, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 5100, y: 200, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 5600, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 5750, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 650},
        {x: 1000, width: 700},
        {x: 1600, width: 800},
        {x: 2600, width: 1100},
        {x: 4350, width: 650},
        {x: 5300, width: 100}
    ],
    stairs: [{x: 5650, steps: 7}],
    flagpole: {x: 5950, y: 250, height: 300}
};
const level16BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 17 - BULLET STORM MARATHON
const level17MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 500, height: 50},
        {x: 700, y: 550, width: 400, height: 50},
        {x: 1300, y: 550, width: 350, height: 50},
        {x: 1850, y: 550, width: 400, height: 50},
        {x: 2450, y: 550, width: 500, height: 50},
        {x: 3150, y: 550, width: 400, height: 50},
        {x: 3750, y: 550, width: 500, height: 50},
        {x: 4450, y: 550, width: 600, height: 50},
        {x: 5250, y: 550, width: 750, height: 50},
        // Elevated platforms
        {x: 600, y: 400, width: 100, height: 20},
        {x: 900, y: 350, width: 100, height: 20},
        {x: 1200, y: 300, width: 100, height: 20},
        {x: 1500, y: 400, width: 100, height: 20},
        {x: 1750, y: 450, width: 100, height: 20},
        {x: 2100, y: 400, width: 100, height: 20},
        {x: 2400, y: 350, width: 100, height: 20},
        {x: 2700, y: 300, width: 100, height: 20},
        {x: 3000, y: 400, width: 100, height: 20},
        {x: 3400, y: 450, width: 100, height: 20},
        {x: 3700, y: 400, width: 100, height: 20},
        {x: 4000, y: 350, width: 100, height: 20},
        {x: 4300, y: 300, width: 100, height: 20},
        {x: 4700, y: 450, width: 100, height: 20},
        {x: 5000, y: 400, width: 100, height: 20}
    ],
    blocks: [
        {x: 300, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 900, y: 250, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1500, y: 300, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2100, y: 300, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 2700, y: 200, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3400, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 4000, y: 250, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 4700, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 5400, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1000, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 1030, exitY: 460},
        {x: 3300, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 3330, exitY: 460}
    ],
    enemies: [
        // Wave 1
        {x: 650, y: 350, width: 24, height: 20, vx: -7, type: 'bullet'},
        {x: 800, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 950, y: 300, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 1100, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        // Wave 2
        {x: 1250, y: 250, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 1400, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 1550, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 1800, y: 400, width: 24, height: 20, vx: -8, type: 'bullet'},
        // Wave 3
        {x: 2000, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 2150, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 2450, y: 300, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 2600, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 2750, y: 250, width: 24, height: 20, vx: -10, type: 'bullet'},
        // Wave 4
        {x: 2950, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 3050, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 3450, y: 400, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 3600, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        // Wave 5
        {x: 3750, y: 350, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 4050, y: 300, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 4250, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 4350, y: 250, width: 24, height: 20, vx: -10, type: 'bullet'},
        // Final wave
        {x: 4600, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 4750, y: 400, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 4900, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 5050, y: 350, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 5500, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 5650, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 5800, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'}
    ],
    gaps: [
        {x: 500, width: 200},
        {x: 1100, width: 200},
        {x: 1650, width: 200},
        {x: 2250, width: 200},
        {x: 2950, width: 200},
        {x: 3550, width: 200},
        {x: 4250, width: 200},
        {x: 5050, width: 200}
    ],
    stairs: [{x: 5700, steps: 7}],
    flagpole: {x: 5950, y: 250, height: 300}
};
const level17BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 18 - VERTICAL CHALLENGE
const level18MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        // First tower section
        {x: 600, y: 500, width: 80, height: 20, type: 'moving', vx: 0, vy: 120, minX: 600, maxX: 600, minY: 200, maxY: 550},
        {x: 850, y: 450, width: 80, height: 20, type: 'moving', vx: 0, vy: -120, minX: 850, maxX: 850, minY: 200, maxY: 550},
        {x: 1100, y: 400, width: 80, height: 20, type: 'moving', vx: 0, vy: 120, minX: 1100, maxX: 1100, minY: 150, maxY: 550},
        {x: 1350, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: -120, minX: 1350, maxX: 1350, minY: 150, maxY: 550},
        {x: 1600, y: 150, width: 400, height: 20},
        // Second tower section
        {x: 2200, y: 450, width: 80, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2200, maxX: 2200, minY: 150, maxY: 550},
        {x: 2450, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: -150, minX: 2450, maxX: 2450, minY: 150, maxY: 550},
        {x: 2700, y: 250, width: 80, height: 20, type: 'moving', vx: 0, vy: 150, minX: 2700, maxX: 2700, minY: 100, maxY: 550},
        {x: 2950, y: 150, width: 80, height: 20, type: 'moving', vx: 0, vy: -150, minX: 2950, maxX: 2950, minY: 100, maxY: 550},
        {x: 3200, y: 100, width: 300, height: 20},
        // Third tower section
        {x: 3700, y: 400, width: 80, height: 20, type: 'moving', vx: 0, vy: 120, minX: 3700, maxX: 3700, minY: 150, maxY: 550},
        {x: 3950, y: 300, width: 80, height: 20, type: 'moving', vx: 0, vy: -120, minX: 3950, maxX: 3950, minY: 150, maxY: 550},
        {x: 4200, y: 200, width: 80, height: 20, type: 'moving', vx: 0, vy: 120, minX: 4200, maxX: 4200, minY: 100, maxY: 550},
        {x: 4500, y: 550, width: 500, height: 50},
        {x: 5200, y: 450, width: 100, height: 20},
        {x: 5500, y: 350, width: 100, height: 20},
        {x: 5800, y: 250, width: 100, height: 20},
        {x: 6100, y: 550, width: 400, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1100, y: 300, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1750, y: 100, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2700, y: 150, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 3300, y: 50, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 4200, y: 100, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 5500, y: 250, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 5800, y: 150, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [{x: 4600, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 4630, exitY: 460}],
    enemies: [
        {x: 300, y: 518, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 650, y: 450, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 900, y: 400, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 1150, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 1400, y: 300, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 1800, y: 118, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 2250, y: 400, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 2500, y: 300, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 2750, y: 200, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 3000, y: 100, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 3300, y: 68, width: 32, height: 32, vx: 3, type: 'turtle'},
        {x: 3750, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 4000, y: 250, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 4250, y: 150, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 4700, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 4850, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 5250, y: 400, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 5550, y: 300, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 5850, y: 200, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 6200, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 850},
        {x: 2000, width: 1200},
        {x: 3500, width: 1000},
        {x: 5100, width: 100},
        {x: 6000, width: 100}
    ],
    stairs: [{x: 6200, steps: 7}],
    flagpole: {x: 6450, y: 250, height: 300}
};
const level18BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 19 - CHAOS COURSE
const level19MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 350, height: 50},
        {x: 500, y: 450, width: 80, height: 20, type: 'moving', vx: 120, vy: 0, minX: 450, maxX: 800, minY: 450, maxY: 450},
        {x: 1000, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: 150, minX: 1000, maxX: 1000, minY: 200, maxY: 550},
        {x: 1300, y: 250, width: 80, height: 20, type: 'moving', vx: -120, vy: 0, minX: 1200, maxX: 1600, minY: 250, maxY: 250},
        {x: 1800, y: 400, width: 80, height: 20, type: 'moving', vx: 0, vy: -150, minX: 1800, maxX: 1800, minY: 150, maxY: 550},
        {x: 2100, y: 550, width: 300, height: 50},
        {x: 2600, y: 450, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 2550, maxX: 2950, minY: 450, maxY: 450},
        {x: 3200, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: 120, minX: 3200, maxX: 3200, minY: 200, maxY: 550},
        {x: 3500, y: 250, width: 80, height: 20, type: 'moving', vx: -150, vy: 0, minX: 3400, maxX: 3800, minY: 250, maxY: 250},
        {x: 4000, y: 450, width: 80, height: 20, type: 'moving', vx: 0, vy: -120, minX: 4000, maxX: 4000, minY: 200, maxY: 550},
        {x: 4300, y: 550, width: 350, height: 50},
        {x: 4850, y: 450, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 4800, maxX: 5200, minY: 450, maxY: 450},
        {x: 5400, y: 350, width: 80, height: 20, type: 'moving', vx: 0, vy: 150, minX: 5400, maxX: 5400, minY: 200, maxY: 550},
        {x: 5700, y: 250, width: 80, height: 20, type: 'moving', vx: -150, vy: 0, minX: 5600, maxX: 6000, minY: 250, maxY: 250},
        {x: 6200, y: 400, width: 80, height: 20, type: 'moving', vx: 0, vy: -150, minX: 6200, maxX: 6200, minY: 150, maxY: 550},
        {x: 6500, y: 550, width: 500, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1300, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 2300, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3500, y: 150, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 4500, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 5700, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 6700, y: 350, width: 40, height: 40, hit: false, type: 'powerup'}
    ],
    pipes: [
        {x: 2200, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 2230, exitY: 460},
        {x: 4400, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 4430, exitY: 460}
    ],
    enemies: [
        {x: 250, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 550, y: 400, width: 24, height: 20, vx: -8, type: 'bullet'},
        {x: 1050, y: 300, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 1350, y: 200, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 1850, y: 350, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 2300, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 2650, y: 400, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 3250, y: 300, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 3550, y: 200, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 4050, y: 400, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 4500, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 4650, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 4900, y: 400, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 5450, y: 300, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 5750, y: 200, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 6250, y: 350, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 6700, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 6850, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'}
    ],
    gaps: [
        {x: 350, width: 650},
        {x: 900, width: 900},
        {x: 2400, width: 900},
        {x: 3900, width: 950},
        {x: 4650, width: 850},
        {x: 6100, width: 400}
    ],
    stairs: [{x: 6650, steps: 8}],
    flagpole: {x: 6950, y: 250, height: 300}
};
const level19BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));

// Level 20 - FINAL BOSS LEVEL
const level20MainTemplate = {
    platforms: [
        {x: 0, y: 550, width: 400, height: 50},
        // Zone 1: Moving platform maze
        {x: 600, y: 450, width: 70, height: 20, type: 'moving', vx: 0, vy: 150, minX: 600, maxX: 600, minY: 200, maxY: 550},
        {x: 850, y: 350, width: 70, height: 20, type: 'moving', vx: 0, vy: -150, minX: 850, maxX: 850, minY: 200, maxY: 550},
        {x: 1100, y: 450, width: 70, height: 20, type: 'moving', vx: 0, vy: 150, minX: 1100, maxX: 1100, minY: 150, maxY: 550},
        {x: 1350, y: 250, width: 70, height: 20, type: 'moving', vx: 0, vy: -150, minX: 1350, maxX: 1350, minY: 150, maxY: 550},
        {x: 1600, y: 150, width: 300, height: 20},
        // Zone 2: Horizontal moving platforms
        {x: 2100, y: 450, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 2000, maxX: 2500, minY: 450, maxY: 450},
        {x: 2800, y: 350, width: 80, height: 20, type: 'moving', vx: -150, vy: 0, minX: 2600, maxX: 3000, minY: 350, maxY: 350},
        {x: 3300, y: 250, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 3200, maxX: 3700, minY: 250, maxY: 250},
        {x: 4000, y: 400, width: 80, height: 20, type: 'moving', vx: -150, vy: 0, minX: 3900, maxX: 4300, minY: 400, maxY: 400},
        {x: 4600, y: 550, width: 300, height: 50},
        // Zone 3: Vertical challenge
        {x: 5100, y: 450, width: 70, height: 20, type: 'moving', vx: 0, vy: 120, minX: 5100, maxX: 5100, minY: 200, maxY: 550},
        {x: 5350, y: 350, width: 70, height: 20, type: 'moving', vx: 0, vy: -120, minX: 5350, maxX: 5350, minY: 150, maxY: 550},
        {x: 5600, y: 250, width: 70, height: 20, type: 'moving', vx: 0, vy: 120, minX: 5600, maxX: 5600, minY: 100, maxY: 550},
        {x: 5850, y: 150, width: 70, height: 20, type: 'moving', vx: 0, vy: -120, minX: 5850, maxX: 5850, minY: 100, maxY: 550},
        {x: 6100, y: 100, width: 400, height: 20},
        // Zone 4: Final gauntlet
        {x: 6700, y: 400, width: 80, height: 20, type: 'moving', vx: 150, vy: 0, minX: 6600, maxX: 7100, minY: 400, maxY: 400},
        {x: 7300, y: 300, width: 80, height: 20, type: 'moving', vx: 0, vy: 150, minX: 7300, maxX: 7300, minY: 150, maxY: 550},
        {x: 7600, y: 550, width: 400, height: 50}
    ],
    blocks: [
        {x: 200, y: 350, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 1350, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 1750, y: 100, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 3300, y: 150, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 4750, y: 350, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 5600, y: 150, width: 40, height: 40, hit: false, type: 'coin'},
        {x: 6250, y: 50, width: 40, height: 40, hit: false, type: 'powerup'},
        {x: 7100, y: 350, width: 40, height: 40, hit: false, type: 'coin'}
    ],
    pipes: [
        {x: 1750, y: 70, width: 60, height: 80, dest: 'bonus', exitX: 1780, exitY: 60},
        {x: 4700, y: 470, width: 60, height: 80, dest: 'bonus', exitX: 4730, exitY: 460}
    ],
    enemies: [
        // Zone 1
        {x: 300, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 650, y: 400, width: 24, height: 20, vx: -9, type: 'bullet'},
        {x: 900, y: 300, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 1150, y: 400, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 1400, y: 200, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 1800, y: 118, width: 32, height: 32, vx: 4, type: 'turtle'},
        // Zone 2
        {x: 2150, y: 400, width: 24, height: 20, vx: -10, type: 'bullet'},
        {x: 2850, y: 300, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 3350, y: 200, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 4050, y: 350, width: 24, height: 20, vx: -12, type: 'bullet'},
        {x: 4800, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 4950, y: 518, width: 32, height: 32, vx: 4, type: 'turtle'},
        // Zone 3
        {x: 5150, y: 400, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 5400, y: 300, width: 24, height: 20, vx: -11, type: 'bullet'},
        {x: 5650, y: 200, width: 24, height: 20, vx: -12, type: 'bullet'},
        {x: 5900, y: 100, width: 24, height: 20, vx: -12, type: 'bullet'},
        {x: 6250, y: 68, width: 32, height: 32, vx: 4, type: 'turtle'},
        {x: 6400, y: 68, width: 32, height: 32, vx: 4, type: 'turtle'},
        // Zone 4 - Final boss wave
        {x: 6750, y: 350, width: 24, height: 20, vx: -12, type: 'bullet'},
        {x: 6900, y: 350, width: 24, height: 20, vx: -12, type: 'bullet'},
        {x: 7350, y: 250, width: 24, height: 20, vx: -13, type: 'bullet'},
        {x: 7800, y: 518, width: 32, height: 32, vx: 5, type: 'turtle'},
        {x: 7950, y: 518, width: 32, height: 32, vx: 5, type: 'turtle'},
        {x: 8050, y: 518, width: 32, height: 32, vx: 5, type: 'turtle'}
    ],
    gaps: [
        {x: 400, width: 750},
        {x: 1250, width: 850},
        {x: 1900, width: 1100},
        {x: 3700, width: 900},
        {x: 4900, width: 1100},
        {x: 6500, width: 1100}
    ],
    stairs: [{x: 7700, steps: 8}],
    flagpole: {x: 8000, y: 250, height: 300}
};
const level20BonusTemplate = JSON.parse(JSON.stringify(level11BonusTemplate));


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
