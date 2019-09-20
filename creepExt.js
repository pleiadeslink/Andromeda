module.exports = {

    update: function(creep) {

        if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.say("!");
            creep.memory.working = false;
        } else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if(creep.memory.working == true) {

            // Do task
            switch(creep.memory.role) {
                
                // HARVESTER
                case 'harvester':

                    // Find spawn / extension
                    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                        || s.structureType == STRUCTURE_EXTENSION)
                                        && s.energy < s.energyCapacity
                    });

                    // Transfer / move to structure
                    if(structure) {
                        if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }
                    return;

                // MINER
                case 'miner':

                    // If no more miners and charger, turn into harvester
                    if(_.sum(Game.creeps, (c) => c.memory.role == 'miner') > 1 && _.sum(Game.creeps, (c) => c.memory.role == 'charger') == 0) {
                        creep.memory.role = 'harvester';
                    }

                    // Find container
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                                        //&& s.store < s.storeCapacity
                    });

                    // Transfer / move to container
                    if(structure) {
                        if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }
                    return;

                // CHARGER
                case 'charger':

                    // Find low-charged tower
                    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                    && s.energy < (s.energyCapacity / 2)
                    }); 
                    if(structure) {
                        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                        return;
                    }

                    // Find structure that needs to be recharged
                    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                    || s.structureType == STRUCTURE_EXTENSION)
                                    && s.energy < s.energyCapacity
                    });
                    if(structure) {
                        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                        return;
                    }

                    return;

                // UPGRADER
                case 'upgrader':

                    // Upgrade / move to controller
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                    return;

                // ENGINEER
                case 'engineer':

                    // If no more miners and chargers, turn into harvester
                    if(_.sum(Game.creeps, (c) => c.memory.role == 'miner') == 0 && _.sum(Game.creeps, (c) => c.memory.role == 'charger') == 0) {
                        creep.memory.role = 'harvester';
                    }

                    // Find something to build
                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(constructionSite) {
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite);
                        }
                        return;
                    }

                    // Find structure to repair
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL });
                    if(structure) {
                        if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                        return;
                    }

                    // Find tower
                    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                    && s.energy < s.energyCapacity
                    });
                    if(structure) {
                        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }

                    // Upgrade controller
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                    return;
            
                // ARCHITECT
                case 'architect':

                    // Find wall to repair
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.hits < 100000 && s.structureType == STRUCTURE_WALL
                    });
                    if (structure) {
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }

                    // Find something to build
                    else {
                        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        if(constructionSite) {
                            if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(constructionSite);
                            }
                            return;
                        }

                        // Upgrade controller
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                    return;

                // EXPLORER
                case 'explorer':

                    // Home Room
                    if (creep.room.name == creep.memory.home) {
                        
                        var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                        || s.structureType == STRUCTURE_EXTENSION)
                                        && s.energy < s.energyCapacity
                        });
                        if (structure == undefined) {
                            structure = creep.room.storage;
                        }
                        if (structure != undefined) {
                            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(structure);
                            }
                        }
                    }

                    // External room
                    else {
                        
                        // find exit to home room
                        var exit = creep.room.findExitTo(creep.memory.home);
                        // and move to exit
                        creep.moveTo(creep.pos.findClosestByRange(exit));
                    }
                    return;
            }

        // Get energy
        } else {
            switch(creep.memory.role) {
                case 'harvester':
                    this.getEnergy(creep, true, false);
                    return;
                case 'miner':
                    this.getEnergy(creep, true, false);
                    return;
                case 'charger':
                    this.getEnergy(creep, true, true);
                    return;
                case 'upgrader':
                    this.getEnergy(creep, true, true);
                    return;
                case 'engineer':
                    this.getEnergy(creep, true, true);
                    return;
                case 'architect':
                    this.getEnergy(creep, true, true);
                    return;
                case 'explorer':
                    this.getExtEnergy(creep);
                    return;
            }
        }
    },

    // Get energy from sources and containers
    getEnergy: function(creep, fromSource, fromContainer) {

        // Look for container
        if(fromContainer == true) {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] > 0
            });
            if(container) {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }                        
                return;
            }
        }

        // Look for source
        if(fromSource == true) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },

    // Get energy from sources in room specified in creeper's memory
    getExtEnergy: function(creep) {

        // If in target room, harvest source
        if(creep.room.name == creep.memory.target) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            return;
        }

        // Move to target room
        var exit = creep.room.findExitTo(creep.memory.target);
        creep.moveTo(creep.pos.findClosestByRange(exit));
    }
};