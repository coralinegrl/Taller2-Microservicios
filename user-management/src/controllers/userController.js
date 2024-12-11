const User = require('../models/User');
const grpc = require('@grpc/grpc-js');

exports.createUserGRPC = async (call, callback) => {
  try {
    const user = await User.create(call.request);
    callback(null, user);
  } catch (error) {
    callback(error, null);
  }
};

exports.getUserGRPC = async (call, callback) => {
  try {
    const user = await User.findByPk(call.request.id);
    if (!user) return callback({ code: grpc.status.NOT_FOUND, message: 'Usuario no encontrado' });
    callback(null, user);
  } catch (error) {
    callback(error, null);
  }
};

exports.updateUserGRPC = async (call, callback) => {
  try {
    const [updated] = await User.update(call.request, { where: { id: call.request.id } });
    if (!updated) return callback({ code: grpc.status.NOT_FOUND, message: 'Usuario no encontrado' });
    callback(null, call.request);
  } catch (error) {
    callback(error, null);
  }
};

exports.deleteUserGRPC = async (call, callback) => {
  try {
    const deleted = await User.destroy({ where: { id: call.request.id } });
    if (!deleted) return callback({ code: grpc.status.NOT_FOUND, message: 'Usuario no encontrado' });
    callback(null, {});
  } catch (error) {
    callback(error, null);
  }
};
