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

exports.getPrerequisitesObjects = async (req, res) => {
    try {
        // Lógica para obtener el mapa de prerrequisitos (objetos)
        res.json({ message: 'Mapa de prerrequisitos (objetos)' });
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo prerrequisitos', error });
    }
};

exports.getPrerequisitesMap = async (req, res) => {
    try {
        // Lógica para obtener el mapa de prerrequisitos
        res.json({ message: 'Mapa de prerrequisitos' });
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo prerrequisitos', error });
    }
};

exports.getPostrequisitesMap = async (req, res) => {
    try {
        // Lógica para obtener el mapa de postrequisitos
        res.json({ message: 'Mapa de postrequisitos' });
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo postrequisitos', error });
    }
};

exports.publishEvent = async (req, res) => {
    try {
        await publishEvent('subject_created', req.body);
        res.json({ message: 'Evento publicado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al publicar el evento', error });
    }
};