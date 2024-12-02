const Career = require('../models/Career');

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
        const newCareer = new Career(req.body);
        const savedCareer = await newCareer.save();
        res.status(201).json(savedCareer);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la carrera', error });
    }
};
