const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    sitename: { type: String, required: true, unique: true },
    siteId: { type:Number, required:true, unique:true},
    lattitude: { type: Number, required: true },
    longitude: {type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    // userId: { type: Number, required: true, ref: 'User'}
});


const Site = mongoose.model('Site', siteSchema);

module.exports = Site;