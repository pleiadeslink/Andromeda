StructureTower.prototype.update =
    function() {
        // Attack target
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            this.attack(target);
            return;
        }

        // Repair buildings
        var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
        if(closestDamagedStructure) {
             this.repair(closestDamagedStructure);
        }
    };
