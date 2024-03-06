const mongoose = require('mongoose');

const siteUserSchema = new mongoose.Schema({
    siteId: { type:Number, required:true,ref: 'Site'},
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    userId: { type: Number, required: true, ref: 'User'}
});


const SiteUser = mongoose.model('SiteUser', siteUserSchema);

module.exports = SiteUser;