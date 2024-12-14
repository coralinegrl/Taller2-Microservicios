const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de importar el modelo User
const Progress = require('../models/Progress');

// Función para crear un nuevo usuario
exports.createUserGRPC = async (call, callback) => {
  const data = call.request;
  console.log("Datos recibidos en createUserGRPC:", data);  // Esto debería mostrar todos los datos

  try {
    const { correo_electronico, nombre, primer_apellido, segundo_apellido, contrasena } = data;
    console.log("Destructured data:", { correo_electronico, nombre, primer_apellido, segundo_apellido, contrasena });

    if (!correo_electronico) {
      throw new Error('El correo electrónico es obligatorio');
    }

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await User.findOne({ where: { correo_electronico } });
    if (existingUser) {
      throw new Error('El correo electrónico ya está en uso');
    }

    // Generar el salt para la contraseña
    const salt = await bcrypt.genSalt(10);

    // Hashear la contraseña con el salt generado
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Crear el nuevo usuario en la base de datos
    const newUser = await User.create({
      nombre,
      primer_apellido,
      segundo_apellido,
      correo_electronico,
      contraseña: hashedPassword
    });

    callback(null, { message: 'Usuario creado exitosamente', user_id: newUser.id });  // Retornar el nuevo usuario creado
  } catch (error) {
    console.error("Error en CreateUser:", error);
    callback(error);
  }
};
// ✅ GetUser: Obtiene un usuario por ID
exports.getUserGRPC = async (call, callback) => {
  try {
    const { user_id } = call.request;

    if (!user_id) {
      throw new Error('El user_id es obligatorio');
    }

    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    callback(null, { message: 'Usuario encontrado', user });
  } catch (error) {
    console.error('Error en GetUser:', error);
    callback(error);
  }
};

//  UpdateUser: Verifica si el usuario existe antes de actualizarlo
exports.updateUserGRPC = async (call, callback) => {
  try {
    const { user_id, nombre, primer_apellido, segundo_apellido, correo_electronico, contrasena } = call.request;

    if (!user_id) {
      throw new Error('El user_id es obligatorio');
    }

    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (correo_electronico) {
      const existingEmail = await User.findOne({ where: { correo_electronico } });
      if (existingEmail && existingEmail.id !== user_id) {
        throw new Error('El correo electrónico ya está en uso');
      }
    }

    // Actualizar los campos
    user.nombre = nombre || user.nombre;
    user.primer_apellido = primer_apellido || user.primer_apellido;
    user.segundo_apellido = segundo_apellido || user.segundo_apellido;
    user.correo_electronico = correo_electronico || user.correo_electronico;
    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      user.contraseña = await bcrypt.hash(contrasena, salt);
    }

    await user.save();

    callback(null, { message: 'Usuario actualizado exitosamente', user_id: user.id });
  } catch (error) {
    console.error('Error en UpdateUser:', error);
    callback(error);
  }
};



exports.deleteUserGRPC = async (call, callback) => {
  try {
    const { user_id } = call.request;

    if (!user_id) {
      throw new Error('El user_id es obligatorio');
    }

    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await user.destroy();

    callback(null, { message: 'Usuario eliminado exitosamente', user_id: user.id });
  } catch (error) {
    console.error('Error en DeleteUser:', error);
    callback(error);
  }
};

exports.listUsersGRPC = async (call, callback) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      throw new Error('No se encontraron usuarios');
    }

    callback(null, { message: 'Usuarios encontrados', users });
  } catch (error) {
    console.error('Error en ListUsers:', error);
    callback(error);
  }
};

exports.getProfileGRPC = async (call, callback) => {
  try {
    const { user_id } = call.request;

    if (!user_id) {
      throw new Error('El ID del usuario es obligatorio');
    }

    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const progress = await Progress.findAll({
      where: { user_id },
      attributes: ['id', 'codigo', 'estado', 'fecha_actualizacion']
    });

    const userProfile = {
      id: user.id,
      nombre: user.nombre,
      primer_apellido: user.primer_apellido,
      segundo_apellido: user.segundo_apellido,
      rut: '12345678-9', // 🔥 Personaliza esto si tienes RUT en la base de datos
      correo_electronico: user.correo_electronico,
      carrera: 'Ingeniería en Sistemas', // 🔥 Ajusta esto si tienes una relación con la carrera
      id_carrera: 1, // 🔥 Esto se debe obtener de la tabla carrera si es necesario
      progreso: progress // Incluimos el progreso aquí
    };

    callback(null, { message: 'Perfil obtenido exitosamente', profile: userProfile });
  } catch (error) {
    console.error("Error en getProfileGRPC:", error);
    callback(error);
  }
};
exports.getMyProgressGRPC = async (call, callback) => {
  try {
    const { user_id } = call.request;

    if (!user_id) {
      throw new Error('El ID del usuario es obligatorio');
    }

    // Obtener el progreso del usuario
    const progress = await Progress.findAll({
      where: { user_id },
      attributes: ['id', 'codigo', 'estado', 'fecha_actualizacion']
    });

    callback(null, { message: 'Progreso obtenido exitosamente', progress });
  } catch (error) {
    console.error("Error en getMyProgressGRPC:", error);
    callback(error);
  }
};


exports.updateMyProgressGRPC = async (call, callback) => {
  try {
    const { user_id, cursos_aprobados, cursos_eliminados } = call.request;

    if (!user_id) {
      throw new Error('El ID del usuario es obligatorio');
    }


    if (cursos_aprobados && cursos_aprobados.length > 0) {
      const progressToAdd = cursos_aprobados.map(codigo => ({
        user_id,
        codigo
      }));
      await Progress.bulkCreate(progressToAdd, { ignoreDuplicates: true });
    }

    if (cursos_eliminados && cursos_eliminados.length > 0) {
      await Progress.destroy({
        where: {
          user_id,
          codigo: cursos_eliminados
        }
      });
    }

    callback(null, { message: 'Progreso actualizado exitosamente' });
  } catch (error) {
    console.error("Error en updateMyProgressGRPC:", error);
    callback(error);
  }
};


exports.updateProfileGRPC = async (call, callback) => {
  try {
    const { user_id, nombre, primer_apellido, segundo_apellido } = call.request;

    if (!user_id) {
      throw new Error('El ID del usuario es obligatorio');
    }

    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Actualizar los datos del usuario
    await user.update({
      nombre,
      primer_apellido,
      segundo_apellido
    });

    callback(null, { message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error("Error en updateProfileGRPC:", error);
    callback(error);
  }
};

