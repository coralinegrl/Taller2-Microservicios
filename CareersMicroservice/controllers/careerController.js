const Career = require('../models/Career');
const { publishEvent } = require('../eventPublisher');

exports.getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        res.json(careers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las carreras', error: error.message });
    }
};

exports.createCareer = async (req, res) => {
    try {
        const { name, code } = req.body;

        // Verificar que el código no exista ya
        const existingCareer = await Career.findOne({ code });
        if (existingCareer) {
            return res.status(400).json({ message: 'El código de la carrera ya existe' });
        }

        const newCareer = new Career({ name, code });
        await newCareer.save();

        res.status(201).json(newCareer);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la carrera', error });
    }
};

exports.publishEvent = async (req, res) => {
    try {
        await publishEvent('career_created', req.body);
        res.json({ message: 'Evento publicado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al publicar el evento', error });
    }
};