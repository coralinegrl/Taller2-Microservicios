const Career = require('../models/Career');
const { publishEvent } = require('../eventPublisher');

exports.getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las carreras', error });
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