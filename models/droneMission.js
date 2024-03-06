const mongoose = require('mongoose');

const droneMissionSchema = new mongoose.Schema({
    missionId: { type:Number, required:true, ref:'Mission' },
    droneId:{ type:Number, required:true, ref:'Drone' },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

const DroneMission = mongoose.model('DroneMission', droneMissionSchema);

module.exports = DroneMission;