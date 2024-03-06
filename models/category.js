const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required:true,  unique: true },
    categoryId:{ type: Number, required:true,  unique: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category ;