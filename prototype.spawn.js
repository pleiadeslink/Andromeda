var body = require('body');
const level = [ 300, 400, 600, 800, 1000, 1500 ];
var nextLevel = level[1];

// Updates spawn every tick
StructureSpawn.prototype.update =
    function() {
        // Updates spawn level
        this.updateLevel();

        // Spawns creeps when needed
        this.spawnCreeps();
    };

// Updates spawner level depending on the room's total energy capacity available
StructureSpawn.prototype.updateLevel =
    function() {
        this.memory.level = 0;
        if(this.room.energyCapacityAvailable > level[0] && this.room.energyCapacityAvailable < level[1]) {
            this.memory.level = 1;
        } else if(this.room.energyCapacityAvailable > level[1] && this.room.energyCapacityAvailable < level[2]) {
            this.memory.level = 2;
        } else if(this.room.energyCapacityAvailable >= level[2] && this.room.energyCapacityAvailable < level[3]) {
            this.memory.level = 3;
        } else if(this.room.energyCapacityAvailable >= level[3] && this.room.energyCapacityAvailable < level[4]) {
            this.memory.level = 4;
        } else if(this.room.energyCapacityAvailable >= level[4] && this.room.energyCapacityAvailable < level[5]) {
            this.memory.level = 5;
        } else if(this.room.energyCapacityAvailable >= level[5]) {
            this.memory.level = 5;
        }
    };

// Spawns creeps when needed
StructureSpawn.prototype.spawnCreeps =
    function() {

        // Count current creeps
        var currentHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var currentMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
        var currentChargers = _.sum(Game.creeps, (c) => c.memory.role == 'charger');
        var currentUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var currentEngineers = _.sum(Game.creeps, (c) => c.memory.role == 'engineer');
        var currentArchitects = _.sum(Game.creeps, (c) => c.memory.role == 'architect');
        var currentExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'explorer');
        var currentClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
        var currentHaulers = _.sum(Game.creeps, (c) => c.memory.role == 'hauler');

        // Calculate minimum creeps
        var minHarvesters = 0;
        var minMiners = 0;
        var minChargers = 0;
        var minUpgraders = 0;
        var minEngineers = 0;
        var minArchitects = 0;
        var minExplorers = 0;
        var minClaimers = 0;
        var minHaulers = 0;
        switch(this.memory.level) {
            case 0: // 300
            case 1:
                minHarvesters = 4;
                minUpgraders = 8;
                minEngineers = 8;
                break;

            case 2: // 400
                minMiners = 3;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 6;
                break;

            case 3: // 600
                minMiners = 4;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 5;
                minExplorers = 0;
                minArchitects = 1;
                break;

            case 4: // 800
                minMiners = 4;
                minChargers = 1;
                minUpgraders = 4;
                minEngineers = 1;
                minExplorers = 0;
                minArchitects = 2;
                break;

            case 5: // 1000
                minMiners = 2;
                minChargers = 1;
                minUpgraders = 4;
                minEngineers = 1;
                minExplorers = 1;
                minArchitects = 1;
                minHaulers = 0;
                minClaimers = 0;
                break;
        }

        // Create creeps
        if(this.memory.level < 2) {
            if(currentHarvesters < minHarvesters) {
                name = this.createCreep(body.harvester, undefined, { role: 'harvester', working: false, target: this.room.name, home: this.room.name});
            } else if(currentUpgraders < minUpgraders) {
                name = this.createCreep(body.upgrader[this.memory.level], undefined, { role: 'upgrader', working: false, target:  this.room.name, home: this.room.name});
            } else if(currentEngineers < minEngineers) {
                name = this.createCreep(body.engineer[this.memory.level], undefined, { role: 'engineer', working: false, target: this.room.name, home: this.room.name});
            } else {
                name = this.createCreep(body.upgrader[this.memory.level], undefined, { role: 'upgrader', working: false, target:  this.room.name, home: this.room.name});
            }
        } else {
            if(currentMiners == 0) {
                if(currentHarvesters == 0) {
                    name = this.createCreep(body.harvester, undefined, { role: 'harvester', working: false, target: this.room.name, home: this.room.name});
                } else {
                    name = this.createCreep(body.miner[this.memory.level], undefined, { role: 'miner', working: false, target: this.room.name, home: this.room.name});
                }
            } else if(currentMiners == 1 && currentChargers == 0) {
                name = this.createCreep(body.charger[this.memory.level], undefined, { role: 'charger', working: false, target: this.room.name, home: this.room.name});
            } else if(currentMiners < minMiners) {
                name = this.createCreep(body.miner[this.memory.level], undefined, { role: 'miner', working: false, target: this.room.name, home: this.room.name});
            } else if(currentChargers < minChargers) {
                name = this.createCreep(body.charger[this.memory.level], undefined, { role: 'charger', working: false, target: this.room.name, home: this.room.name});
            } else if(currentUpgraders < minUpgraders) {
                name = this.createCreep(body.upgrader[this.memory.level], undefined, { role: 'upgrader', working: false, target: this.room.name, home: this.room.name});
            } else if(currentExplorers < minExplorers) {
                name = this.createCreep(body.explorer[this.memory.level], undefined, { role: 'explorer', working: false, target: "W21N47", home: this.room.name});
            } else if(currentEngineers < minEngineers) {
                name = this.createCreep(body.engineer[this.memory.level], undefined, { role: 'engineer', working: false, target: this.room.name, home: this.room.name});
            } else if(currentArchitects < minArchitects) {
                name = this.createCreep(body.architect[this.memory.level], undefined, { role: 'architect', working: false, target: this.room.name, home: this.room.name});
            }
        }

        // Prints console log every tick
        console.log(this.name + " lvl " + this.memory.level + " | Energy: " + this.room.energyAvailable + "/" + this.room.energyCapacityAvailable + " | CPU: " + Game.cpu.getUsed().toFixed(2))
        console.log(currentHarvesters + " harvesters, " + currentMiners + " miners, " + currentChargers + " chargers, "
        + currentUpgraders + " upgraders, " + currentEngineers + " engineers, " + currentArchitects + " architects, " + currentExplorers + " explorers, " + currentClaimers + " claimers, " + currentHaulers + " haulers.");
        console.log("-----------------------------------------------------------------------------------------------------");

    };
