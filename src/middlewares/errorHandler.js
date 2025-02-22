
const errorHandler = (err, req, res, next) => {
    return res.status(200).json({error: err.message})
    next()
};

module.exports={errorHandler}
