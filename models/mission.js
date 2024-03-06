const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    missionId:{type:Number, required:true, unique:true},
    // userId: {type: Number,  required: true, ref: 'User'},
    alt: { type: String, required: true },
    speed: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    waypoints:[{type: Number, ref: 'Site'}],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});


const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission ;