const { check, validationResult } = require('express-validator');

// Middleware para validar las solicitudes relacionadas con Subjects
exports.validateSubjectRequest = [
    // Ejemplo de validación para parámetros de consulta
    check('department')
        .optional()
        .isString()
        .withMessage('El departamento debe ser una cadena de texto'),

    check('semester')
        .optional()
        .isInt({ min: 1, max: 12 })
        .withMessage('El semestre debe ser un número entre 1 y 12'),

    // Manejo de errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
