module.exports = {

    harvester: [WORK,WORK,CARRY,MOVE],

    claimer: [CLAIM,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],

    miner: [
        [MOVE], // 0
        [MOVE], // 1
        [WORK,WORK,WORK,CARRY,MOVE], // 2
        [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], // 3
        [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], // 4
        [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE] // 5
    ],

    charger: [
        [MOVE], // 0
        [MOVE], // 1
        [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], // 2
        [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], // 3
        [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], // 4
        [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] // 5
    ],

    hauler: [
        [MOVE], // 0
        [MOVE], // 1
        [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], // 2
        [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], // 3
        [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], // 4
        [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] // 5
    ],

    upgrader: [
        [WORK,WORK,CARRY,MOVE], // 0
        [WORK,WORK,CARRY,MOVE], // 1
        [WORK,WORK,WORK,CARRY,MOVE], // 2
        [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], // 3
        [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], // 4
        [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE] // 5
    ],

    engineer: [
        [WORK,WORK,CARRY,MOVE], // 0
        [WORK,WORK,CARRY,MOVE], // 1
        [WORK,WORK,WORK,CARRY,MOVE], // 2
        [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], // 3
        [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], // 4
        [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] // 5
    ],

    architect: [
        [MOVE], // 0
        [MOVE], // 1
        [MOVE], // 2
        [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], // 3
        [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], // 4
        [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] // 5
    ],

    explorer: [
        [MOVE], // 0
        [MOVE], // 1
        [MOVE], // 2
        [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], // 3
        [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], // 4
        [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE] // 5
    ]
};
