const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    missionId:{type:Number, required:true, unique:true},
    categoryId: {type: Number,  required: true, ref: 'Category'},
    alt: { type: String, required: true },
    speed: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    waypoints:[{type: Number, ref: 'Site'}],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});


const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission ;