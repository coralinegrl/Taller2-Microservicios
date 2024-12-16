const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { publishEvent } = require('../eventPublisher');
const BlacklistedToken = require('../models/BlacklistedToken');


// Registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(`Datos recibidos: name=${name}, email=${email}`);

        const userExists = await User.findOne({ email });
        console.log(`¿Usuario existente?: ${userExists}`);

        if (userExists) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Contraseña hasheada: ${hashedPassword}`);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        console.log(`Usuario guardado en la base de datos: ${newUser}`);

        await publishEvent('user_registered', { email });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error registrando usuario', error });
    }
};


// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Actualizar contraseña
exports.updatePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error });
    }
};


// Cerrar sesión (revocar token)
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();
        res.json({ message: 'Token revocado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al revocar el token', error });
    }
};