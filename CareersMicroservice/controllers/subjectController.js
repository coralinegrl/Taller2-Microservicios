const Subject = require('../models/Subject');
const { publishEvent } = require('../eventPublisher');

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('career');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las asignaturas', error });
    }
};

exports.createSubject = async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();
        await publishEvent('subjects', { action: 'create', subject: savedSubject });
        res.status(201).json(savedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la asignatura', error });
    }
};
