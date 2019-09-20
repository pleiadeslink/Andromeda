module.exports = {

    update: function(tower) {

        // Attack target
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            tower.attack(target);
            return;
        }

        // Repair buildings
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
        if(closestDamagedStructure) {
             tower.repair(closestDamagedStructure);
        }
    }
};