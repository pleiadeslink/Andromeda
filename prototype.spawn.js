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

        var minHarvesters = 0;
        var minMiners = 0;
        var minChargers = 0;
        var minUpgraders = 0;
        var minEngineers = 0;
        var minArchitects = 0;
        var minExplorers = 0;
        var minClaimers = 0;
        var minHaulers = 0;
        var currentHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var currentMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
        var currentChargers = _.sum(Game.creeps, (c) => c.memory.role == 'charger');
        var currentUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var currentEngineers = _.sum(Game.creeps, (c) => c.memory.role == 'engineer');
        var currentArchitects = _.sum(Game.creeps, (c) => c.memory.role == 'architect');
        var currentExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'explorer');
        var currentClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
        var currentHaulers = _.sum(Game.creeps, (c) => c.memory.role == 'hauler');
        var name = undefined;

        switch(this.memory.level) {

            case 0: // 300
            case 1:

                minHarvesters = 4;
                minUpgraders = 8;
                minEngineers = 8;

                // harvester - upgrader - repairer - engineer - upgrader
                if(currentHarvesters < minHarvesters) {
                    name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target:  this.room.name, home: this.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'engineer', working: false, level: level, target: this.room.name, home: this.room.name});
                } else {
                    name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target:  this.room.name, home: this.room.name});
                }
                break;

            case 2: // 400

                minMiners = 3;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 6;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: this.room.name, home: this.room.name});
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentMiners < minMiners) {
                    name = this.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentChargers < minChargers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = this.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target:  this.room.name, home: this.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = this.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'engineer', working: false, level: level, target: this.room.name, home: this.room.name});
                } else {
                    name = this.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: this.room.name, home: this.room.name});
                }
                break;

            case 3: // 600
                minMiners = 4;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 5;
                minExplorers = 0;
                minArchitects = 1;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {

                        name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: this.room.name, home: this.room.name});
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentMiners < minMiners) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentChargers < minChargers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target:  this.room.name, home: this.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'engineer', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'architect', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentExplorers < minExplorers) {
                    name = this.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: this.room.name, home: this.room.name, target: this.room.name, home: this.room.name});
                } else {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: this.room.name, home: this.room.name});
                }
                break;

            case 4: // 800
                minMiners = 4;
                minChargers = 1;
                minUpgraders = 4;
                minEngineers = 1;
                minExplorers = 0;
                minArchitects = 2;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {

                        name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: this.room.name, home: this.room.name});
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentMiners < minMiners) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: this.room.name});
                } else if(currentChargers < minChargers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target:  this.room.name, home: this.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'engineer', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'architect', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentExplorers < minExplorers) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: this.room.name, home: this.room.name});
                }
                break;

            case 5: // 1000
                minMiners = 3;
                minChargers = 1;
                minUpgraders = 4;
                minEngineers = 2;
                minExplorers = 0;
                minArchitects = 1;
                minHaulers = 0;
                minClaimers = 0;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: this.room.name, home: this.room.name});
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentMiners < minMiners) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentChargers < minChargers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentHaulers < minHaulers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'hauler', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'engineer', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'architect', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentExplorers < minExplorers) {
                    if(this.memory.flag == 0) {
                        name = this.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: this.room.name, home: this.room.name});
                        this.memory.flag = 1;
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: this.room.name, home: this.room.name});
                        this.memory.flag = 0;
                    }
                } else if(currentClaimers < minClaimers) {
                    name = this.createCreep([CLAIM,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'claimer', working: false, level: level, target: this.room.name, home: this.room.name});
                }// else if(currentUpgraders < (minUpgraders + 1)) { // External upgraders (dirty)
                //    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: 'E16N31'});
                //}
                break;

            case 6: // 1500
                minMiners = 3;
                minChargers = 1;
                minUpgraders = 4;
                minEngineers = 1;
                minExplorers = 0;
                minArchitects = 1;
                minHaulers = 0;
                minClaimers = 0;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        name = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: this.room.name, home: this.room.name});
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentMiners < minMiners) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentChargers < minChargers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentHaulers < minHaulers) {
                    name = this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'hauler', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'engineer', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'architect', working: false, level: level, target: this.room.name, home: this.room.name});
                } else if(currentExplorers < minExplorers) {
                    if(this.memory.flag == 0) {
                        name = this.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: this.room.name, home: this.room.name});
                        this.memory.flag = 1;
                    } else {
                        name = this.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: this.room.name, home: this.room.name});
                        this.memory.flag = 0;
                    }
                } else if(currentClaimers < minClaimers) {
                    name = this.createCreep([CLAIM,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'claimer', working: false, level: level, target: this.room.name, home: this.room.name});
                }// else if(currentUpgraders < (minUpgraders + 1)) { // External upgraders (dirty)
                //    name = this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: 'E16N31'});
                //}
                break;
        }

        // Prints console log every tick
        console.log(this.name + " level " + this.memory.level + " | Energy: " + this.room.energyAvailable + "/" + this.room.energyCapacityAvailable)
        console.log(currentHarvesters + " harvesters, " + currentMiners + " miners, " + currentChargers + " chargers, "
        + currentUpgraders + " upgraders, " + currentEngineers + " engineers, " + currentArchitects + " architects, " + currentExplorers + " explorers, " + currentClaimers + " claimers, " + currentHaulers + " haulers.");
        console.log("-----------------------------------------------------------------------------------------------------");

    };
