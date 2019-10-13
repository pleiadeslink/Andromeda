Creep.prototype.update =
    function () {
        if(this.memory.working == true && this.carry.energy == 0) {
            this.say("⚡");
            this.memory.working = false;
        } else if(this.memory.working == false && this.carry.energy == this.carryCapacity) {
            this.memory.working = true;
        }
        if(this.memory.working == true) {

            // Do task
            switch(this.memory.role) {

                // HARVESTER
                case 'harvester':

                    // Find spawn / extension
                    var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                        || s.structureType == STRUCTURE_EXTENSION)
                                        && s.energy < s.energyCapacity
                    });

                    // Transfer / move to structure
                    if(structure) {
                        if(this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    }
                    return;

                // MINER
                case 'miner':

                    // If no more miners and charger, turn into harvester
                    if(_.sum(Game.creeps, (c) => c.memory.role == 'miner') > 1 && _.sum(Game.creeps, (c) => c.memory.role == 'charger') == 0) {
                        this.memory.role = 'harvester';
                    }

                    // Find container
                    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                        && s.store.energy < s.storeCapacity)
                    });

                    // Transfer / move to container
                    if(structure) {
                        if(this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                        return;
                    }

                    // Find spawn / extension
                    var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                        || s.structureType == STRUCTURE_EXTENSION)
                                        && s.energy < s.energyCapacity
                    });

                    // Transfer / move to structure
                    if(structure) {
                        if(this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    }
                    return;

                // CHARGER
                case 'charger':

                    if(this.room.energyAvailable < (this.room.energyCapacityAvailable / 4)) {
                        this.say("💦");
                    }

                    // Find low-charged tower
                    var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                    && s.energy < (s.energyCapacity / 2)
                    });
                    if(structure) {
                        if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                        return;
                    }

                    // Find structure that needs to be recharged
                    var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                    || s.structureType == STRUCTURE_EXTENSION)
                                    && s.energy < s.energyCapacity
                    });
                    if(structure) {
                        if(this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                        return;
                    }

                    // Find storage
                    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                        && s.store.energy < s.storeCapacity)
                    });

                    // Transfer / move to container
                    if(structure) {
                        if(this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    }
                    return;

                // HAULER
                case 'hauler':

                    // Find storage
                    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                        && s.store.energy < s.storeCapacity)
                    });

                    // Transfer / move to container
                    if(structure) {
                        if(this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                    }
                    return;

                // UPGRADER
                case 'upgrader':

                    // Move to target room
                    if(this.room.name != this.memory.target) {
                        var targetPos = new RoomPosition(25,25, this.memory.target);
                        this.moveTo(targetPos);
                        return;
                    }

                    // Upgrade / move to controller
                    if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                        this.moveTo(this.room.controller);
                    }
                    return;

                // ENGINEER
                case 'engineer':

                    // If no more miners and chargers, turn into harvester
                    //if(_.sum(Game.creeps, (c) => c.memory.role == 'miner') == 0 && _.sum(Game.creeps, (c) => c.memory.role == 'charger') == 0) {
                    //    creep.memory.role = 'harvester';
                    //}

                    // Find something to build
                    var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(constructionSite) {
                        if (this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            this.moveTo(constructionSite);
                        }
                        return;
                    }

                    // Find structure to repair
                    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax
                                                                                            && s.structureType != STRUCTURE_WALL
                                                                                            && s.structureType != STRUCTURE_RAMPART });
                    if(structure) {
                        if(this.repair(structure) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                        return;
                    }

                    // Upgrade controller
                    if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                        this.moveTo(this.room.controller);
                    }
                    return;

                // ARCHITECT
                case 'architect':

                    // Find defense structure < 100000 health
                    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.hits < 100000 && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                    });
                    if(structure) {
                        if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                        return;
                    }

                    // Find defense structure < 200000 health
                    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.hits < 300000 && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                    });
                    if(structure) {
                        if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                            this.moveTo(structure);
                        }
                        return;
                    }

                    // Find something to build
                    var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(constructionSite) {
                        if(this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            this.moveTo(constructionSite);
                        }
                        return;
                    }

                    // Upgrade controller
                    if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                        this.moveTo(this.room.controller);
                    }
                    return;

                // CLAIMER
                case 'claimer':

                    // If at home room, go to target room
                    if (this.room.name == this.memory.home) {
                        var targetPos = new RoomPosition(25,25, this.memory.target);
                        this.moveTo(targetPos);
                        return;
                    }

                    if(this.claimController(this.room.controller) == ERR_NOT_IN_RANGE) {
                        this.moveTo(this.room.controller);
                    }
                    return;

                // EXPLORER
                case 'explorer':

                    // Home Room
                    if (this.room.name == this.memory.home) {

                        // Look for container
                        var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                        && s.store[RESOURCE_ENERGY] < s.storeCapacity
                        });
                        if(container) {
                            if(this.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                this.moveTo(container);
                            }
                            return;
                        }

                        // Look for spawn / extensions
                        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                        || s.structureType == STRUCTURE_EXTENSION)
                                        && s.energy < s.energyCapacity
                        });
                        if (structure == undefined) {
                            structure = this.room.storage;
                        }
                        if (structure != undefined) {
                            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                this.moveTo(structure);
                            }
                        }
                        return;
                    }

                    // Find something to build
                    var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(constructionSite) {
                        if (this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            this.moveTo(constructionSite);
                        }
                        return;
                    }

                    // Repair buildings
                    var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
                    if(closestDamagedStructure) {
                        this.repair(closestDamagedStructure);
                    }

                    // Go to home room
                    var targetPos = new RoomPosition(25,25, this.memory.home);
                    this.moveTo(targetPos);
                    return;
            }

        // Get energy
        } else {
            switch(this.memory.role) {
                case 'harvester':
                    this.getEnergy(true, false, false);
                    return;
                case 'miner':
                    this.getEnergy(true, false, false);
                    return;
                case 'charger':
                    this.getEnergy(false, true, false);
                    return;
                case 'hauler':
                    this.getEnergy(false, true, false);
                    return;
                case 'upgrader':
                    this.getEnergy(false, true, true);
                    return;
                case 'engineer':
                    this.getEnergy(false, true, false);
                    return;
                case 'architect':
                    this.getEnergy(false, true, false);
                    return;
                case 'explorer':
                    //this.getExtEnergy();
                    return;
                case 'claimer':
                        this.getEnergy(true, true, false)
                    return;
                case 'hauler':
                    /*var container;
                    container = Game.getObjectById('5d8407fee9930148a560f2d7');
                    if(container && ) {
                    }
                    var container2 = Game.getObjectById('5d8406e2ec18233c4ea3311c');
                    if(container1.store != 0 && container1.store > container2.store) {
                        if(creep.withdraw(container1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container1);
                        }
                    } else if(container2.store != 0) {
                        if(creep.withdraw(container2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container2);
                        }
                    }*/
                    return;
            }
        }
    };

Creep.prototype.getEnergy =
    function(fromSource, fromContainer, fromStorage) {
        // Look for storage
        if(fromStorage == true) {
            var storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
                            && s.store[RESOURCE_ENERGY] > 0
            });
            if(storage) {
                if(this.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(storage);
                }
                return;
            }
        }

        // Look for container
        if(fromContainer == true) {
            var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] > 0
            });
            if(container) {
                if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(container);
                }
                return;
            }
        }

        // Look for source
        if(fromSource == true) {
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        }
    };

// Upgrade controller or moves to it
Creep.prototype.getEnergy =
    function(fromSource, fromContainer, fromStorage) {
        // Look for storage
        if(fromStorage == true) {
            var storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
                            && s.store[RESOURCE_ENERGY] > 0
            });
            if(storage) {
                if(this.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(storage);
                }
                return;
            }
        }

        // Look for container
        if(fromContainer == true) {
            var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] > 0
            });
            if(container) {
                if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(container);
                }
                return;
            }
        }

        // Look for source
        if(fromSource == true) {
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        }
    };
