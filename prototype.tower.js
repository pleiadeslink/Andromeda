StructureTower.prototype.update =
    function() {
        // Attack target
        const target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target && target.owner != "Thecloudff7") { // <----
            this.attack(target);
            return;
        }

        // Repair buildings
        const closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
        if(closestDamagedStructure) {
             this.repair(closestDamagedStructure);
        }
    };
