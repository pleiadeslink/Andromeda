const level = [ 300, 400, 600, 800, 1000 ];
var nextLevel = level[1];

module.exports = {

    // Updates spawn every tick
    update: function(spawn) {

        // Updates spawn level
        this.updateLevel(spawn);

        // Spawns creeps when needed
        this.spawnCreeps(spawn);
    },

    // Updates spawner level depending on the room's total energy capacity available
    updateLevel: function(spawn) {

        // Updates spawner level
        spawn.memory.level = 0;
        if(spawn.room.energyCapacityAvailable > level[0] && spawn.room.energyCapacityAvailable < level[1]) {
            spawn.memory.level = 1;    
        } else if(spawn.room.energyCapacityAvailable > level[1] && spawn.room.energyCapacityAvailable < level[2]) {
            spawn.memory.level = 2;     
        } else if(spawn.room.energyCapacityAvailable >= level[2] && spawn.room.energyCapacityAvailable < level[3]) {
            spawn.memory.level = 3; 
        } else if(spawn.room.energyCapacityAvailable >= level[3] && spawn.room.energyCapacityAvailable < level[4]) {
            spawn.memory.level = 4; 
        } else if(spawn.room.energyCapacityAvailable >= level[4]) {
            spawn.memory.level = 5; 
        }         
    },

    // Spawns creeps when needed
    spawnCreeps: function(spawn) {

        var minHarvesters = 0;
        var minMiners = 0;
        var minChargers = 0;
        var minUpgraders = 0;
        var minEngineers = 0;
        var minArchitects = 0;
        var minExplorers = 0;
        var minClaimers = 0;
        var minHaulers = 0;

        // Count current active roles
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
        switch(spawn.memory.level) {

            case 0: // 300
            case 1:
                
                minHarvesters = 8;
                minUpgraders = 8;
                minEngineers = 8;

                // harvester - upgrader - repairer - engineer - upgrader
                if(currentHarvesters < minHarvesters) { 
                    name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'engineer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else {
                    name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                }
                break;
            
            case 2: // 400
                console.log("what");
                minMiners = 4;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 4;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    } else {
                        name = spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentMiners < minMiners) {
                    name = spawn.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentChargers < minChargers) { 
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'engineer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else {
                    name = spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                }
                break;

            case 3: // 600
                minMiners = 4;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 5;
                minExplorers = 6;
                minArchitects = 1;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        
                        name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    } else {
                        name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentMiners < minMiners) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentChargers < minChargers) { 
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'engineer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'architect', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentExplorers < minExplorers) {
                    name = spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: 'E16N31', home: spawn.room.name, target: 'E16N31', home: spawn.room.name});
                } else {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                }
                break;

            case 4: // 800
                minMiners = 3;
                minChargers = 2;
                minUpgraders = 4;
                minEngineers = 2;
                minExplorers = 4;
                minArchitects = 1;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        
                        name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    } else {
                        name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentMiners < minMiners) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentChargers < minChargers) { 
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'engineer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'architect', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentExplorers < minExplorers) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                }else {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                }
                break;

            case 5: // 1000
                minMiners = 2;
                minChargers = 1;
                minUpgraders = 3;
                minEngineers = 1;
                minExplorers = 6;
                minArchitects = 1;
                minHaulers = 0;

                // harvester - miner - charger - upgrader - engineer - upgrader
                if(currentMiners == 0) {
                    if(currentHarvesters == 0) {
                        name = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    } else {
                        name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    }
                } else if(currentMiners == 1 && currentChargers == 0) {
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentMiners < minMiners) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, { role: 'miner', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentChargers < minChargers) { 
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'charger', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentHaulers < minHaulers) { 
                    name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'hauler', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentUpgraders < minUpgraders) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentEngineers < minEngineers) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'engineer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentArchitects < minArchitects) {
                    name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'architect', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                } else if(currentExplorers < minExplorers) {
                    if(spawn.memory.flag == 0) {
                        name = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: 'E17N32', home: spawn.room.name});
                        spawn.memory.flag = 1;
                    } else {
                        name = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { role: 'explorer', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                        spawn.memory.flag = 0;
                    }
                } else {
                    if(currentUpgraders < 6) {
                        name = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'upgrader', working: false, level: level, target: 'E16N31', home: spawn.room.name});
                    }
                }
                break;
        }

        // Prints console log every tick
        console.log(spawn.name + " level " + spawn.memory.level + " | Energy: " + spawn.room.energyAvailable + "/" + spawn.room.energyCapacityAvailable)
        console.log(currentHarvesters + " harvesters, " + currentMiners + " miners, " + currentChargers + " chargers, "  
        + currentUpgraders + " upgraders, " + currentEngineers + " engineers, " + currentArchitects + " architects, " + currentExplorers + " explorers, " + currentClaimers + " claimers, " + currentHaulers + " haulers.");
        console.log("-----------------------------------------------------------------------------------------------------");
           
    }
};