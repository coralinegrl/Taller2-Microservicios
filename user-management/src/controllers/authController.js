const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { correo_electronico, contraseña } = req.body;

    // 1️⃣ Verifica que el usuario exista
    const user = await User.findOne({ where: { correo_electronico } });
    if (!user) {
      return res.status(401).json({ message: 'Correo o contraseña incorrecta' });
    }

    // 2️⃣ Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Correo o contraseña incorrecta' });
    }

    // 3️⃣ Genera el token JWT
    const token = jwt.sign(
      { id: user.id, correo_electronico: user.correo_electronico },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
