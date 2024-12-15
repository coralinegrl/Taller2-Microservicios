module.exports = (req, res, next) => {
    console.log(`Solicitud recibida en API Gateway: ${req.method} ${req.originalUrl}`);
    next();
};
