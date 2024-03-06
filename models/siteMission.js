const mongoose = require('mongoose');

const siteMissionSchema = new mongoose.Schema({
    userId: { type: Number, required: true , ref:'User'},
    siteId: { type: Number, required: true, ref: 'Site' },
    missionId:{ type: Number, required: true, ref: 'Mission' },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

const SiteMission = mongoose.model('SiteMission', siteMissionSchema);

module.exports = SiteMission;