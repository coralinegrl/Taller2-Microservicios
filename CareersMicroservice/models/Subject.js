const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'El departamento es obligatorio'],
        trim: true
    },
    credits: {
        type: Number,
        required: [true, 'Los créditos son obligatorios'],
        min: [1, 'Los créditos deben ser al menos 1']
    },
    semester: {
        type: Number,
        required: [true, 'El semestre es obligatorio'],
        min: [1, 'El semestre debe ser al menos 1']
    },
    code: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true
    },
    prerequisites: [{
        code: { type: String },
        _id: mongoose.Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model('Subject', SubjectSchema);
