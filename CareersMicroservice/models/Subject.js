const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    credits: { type: Number, required: true },
    semester: { type: Number, required: true },
    career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
});

module.exports = mongoose.model('Subject', SubjectSchema);
