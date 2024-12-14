const Subject = require('../models/Subject');
const { publishEvent } = require('../eventPublisher');

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las asignaturas', error: error.message });
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

exports.getPrerequisitesMapObjects = (req, res) => {
    res.json({ message: 'Mapa de prerrequisitos con objetos' });
};

exports.getPrerequisitesMap = (req, res) => {
    res.json({ message: 'Mapa de prerrequisitos' });
};

exports.getPostrequisitesMap = (req, res) => {
    res.json({ message: 'Mapa de postrequisitos' });
};

exports.publishEvent = async (req, res) => {
    try {
        await publishEvent('subject_created', req.body);
        res.json({ message: 'Evento publicado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al publicar el evento', error });
    }
};