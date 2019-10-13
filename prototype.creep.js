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
                    this.transferToSpawn();
                    return;

                // MINER
                case 'miner':
                    if(_.sum(Game.creeps, (c) => c.memory.role == 'miner') == 1
                    && _.sum(Game.creeps, (c) => c.memory.role == 'charger') == 0
                    && _.sum(Game.creeps, (c) => c.memory.role == 'harvester') == 0) {
                        this.memory.role = 'harvester';
                        return;
                    }
                    if(this.transferToContainer() == true) {
                        return;
                    }
                    if(this.transferToSpawn() == true) {
                        return;
                    }
                    return;

                // CHARGER
                case 'charger':
                    if(this.transferToTower() == true) {
                        return;
                    }
                    if(this.transferToSpawn() == true) {
                        return;
                    }
                    if(this.transferToStorage() == true) {
                        return;
                    }
                    return;

                // HAULER
                case 'hauler':
                    if(this.transferToStorage() == true) {
                        return;
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
                    if(this.transferToController() == true) {
                        return;
                    }
                    return;

                // ENGINEER
                case 'engineer':
                    if(this.buildStructure() == true) {
                        return;
                    }
                    if(this.transferToController() == true) {
                        return;
                    }
                    return;

                // ARCHITECT
                case 'architect':
                    if(this.repairDefense(100000) == true) {
                        return;
                    }
                    if(this.repairDefense(300000) == true) {
                        return;
                    }
                    if(this.buildStructure() == true) {
                        return;
                    }
                    if(this.transferToController() == true) {
                        return;
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

// Transfer energy to spawn/extension or move to it
Creep.prototype.transferToSpawn =
    function() {
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION)
                        && s.energy < s.energyCapacity
        });
        if(structure) {
            switch(this.transfer(structure, RESOURCE_ENERGY)) {
                case ERR_NOT_IN_RANGE:
                    if(this.moveTo(structure) == OK) {
                        return true;
                    }
                    break;
                case OK:
                    return true;
                    break;
            }
        }
        return false;
    };

// Transfer energy to container or move to it
Creep.prototype.transferToContainer =
    function() {
      var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                          && s.store.energy < s.storeCapacity)
      });
      if(structure) {
          switch(this.transfer(structure, RESOURCE_ENERGY)) {
              case ERR_NOT_IN_RANGE:
                  if(this.moveTo(structure) == OK) {
                      return true;
                  }
                  break;
              case OK:
                  return true;
                  break;
          }
      }
      return false;
    };

// Transfer energy to storage or move to it
Creep.prototype.transferToStorage =
    function() {
      var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => (s.structureType == STRUCTURE_STORAGE
                          && s.store.energy < s.storeCapacity)
      });
      if(structure) {
          switch(this.transfer(structure, RESOURCE_ENERGY)) {
              case ERR_NOT_IN_RANGE:
                  if(this.moveTo(structure) == OK) {
                      return true;
                  }
                  break;
              case OK:
                  return true;
                  break;
          }
      }
      return false;
    };

// Transfer energy to controller or move to it
Creep.prototype.transferToController =
    function() {
        switch(this.upgradeController(this.room.controller)) {
            case ERR_NOT_IN_RANGE:
                if(this.moveTo(this.room.controller) == OK) {
                    return true;
                }
                return false;
                break;
            case OK:
                return true;
                break;
        }
        return false;
    };

// Transfer energy to tower or move to it
Creep.prototype.transferToTower =
    function() {
        var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_TOWER)
                        && s.energy < (s.energyCapacity / 2)
        });
        if(structure) {
            switch(this.transfer(structure, RESOURCE_ENERGY)) {
                case ERR_NOT_IN_RANGE:
                    if(this.moveTo(structure) == OK) {
                        return true;
                    }
                    break;
                case OK:
                    return true;
                    break;
            }
        }
        return false;
    };

// Build structure or move to it
Creep.prototype.buildStructure =
    function() {
        var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(constructionSite) {
            switch(this.build(constructionSite)) {
                case ERR_NOT_IN_RANGE:
                    if(this.moveTo(constructionSite) == OK) {
                        return true;
                    }
                    break;
                case OK:
                    return true;
                    break;
            }
        }
        return false;
    };

// Repair structure or move to it
Creep.prototype.repairStructure =
    function() {
        var structure = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax
                                                                                && s.structureType != STRUCTURE_WALL
                                                                                && s.structureType != STRUCTURE_RAMPART });
        if(structure) {
            switch(this.repair(structure)) {
                case ERR_NOT_IN_RANGE:
                    if(this.moveTo(structure) == OK) {
                        return true;
                    }
                    break;
                case OK:
                    return true;
                    break;
            }
        }
        return false;
    };

// Repair wall / rampart that has less than given health or move to it
Creep.prototype.repairDefense =
    function(health) {
        var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < health && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
        });
        if(structure) {
            switch(this.repair(structure)) {
                case ERR_NOT_IN_RANGE:
                    if(this.moveTo(structure) == OK) {
                        return true;
                    }
                    break;
                case OK:
                    return true;
                    break;
            }
        }
        return false;
    };
