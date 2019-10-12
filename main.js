//require('prototype.spawn')();
var spawnExt = require('prototype.spawn');
var creepExt = require('prototype.creep');
var towerExt = require('prototype.tower');

// room.energyAvailable
//room.energyCapacityAvailable

module.exports.loop = function () {

    // Update memory once in a while
    if(Game.time % 20 === 0) {
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    }

    // Update spawns
    for(let name in Game.spawns) {
         Game.spawns[name].update();
    }

    // Update creeps
    for(let name in Game.creeps) {
        Game.creeps[name].update();
        //creepExt.update(creep);
        //Memory.room[creep.room.name].containerA = ['5d8406e2ec18233c4ea3311c', '5d8407fee9930148a560f2d7'];
        //Memory.room[creep.room.name].containerA = ['5d85686dbcb9d00d2569e637'];
    }

    // Update towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for(let tower of towers) {
        tower.update();
    }
};
