const { query, validationResult } = require('express-validator');

exports.validateCareerRequest = [
    query('name').optional().isString().withMessage('El nombre debe ser una cadena de texto'),
    query('code').optional().isString().withMessage('El código debe ser una cadena de texto'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
