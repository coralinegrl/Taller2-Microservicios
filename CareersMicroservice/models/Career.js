const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('Career', CareerSchema);
