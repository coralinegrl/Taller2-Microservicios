const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Career', CareerSchema);
 