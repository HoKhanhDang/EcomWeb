const notFound = (req, res, next) => {

    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    return res.status(statusCode).json({
        success: false,
        message: err.message,
    });
    
}

module.exports = {errHandler,notFound};