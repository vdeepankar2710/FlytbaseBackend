const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    droneId: { type: Number, required: true, unique: true },
    deletedBy: { type: String, required: false, default: null },
    deletedOn: { type: Date, required: false, default: null }, 
    droneType: { type: String, required: false },
    makeName: { type: String, required: false },
    name: { type: String, required:true,  unique: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});


const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone ;