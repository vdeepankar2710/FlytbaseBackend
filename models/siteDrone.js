const mongoose = require('mongoose');

const siteDroneSchema = new mongoose.Schema({
    userId: { type: Number, required: true , ref:'User'},
    droneId: { type: Number, required: true , ref:'Drone'},
    siteId: { type: Number, required: true, ref:'Site' },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});


const SiteDrone = mongoose.model('SiteDrone', siteDroneSchema);

module.exports = SiteDrone ;