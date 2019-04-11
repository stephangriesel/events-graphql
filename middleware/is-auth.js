const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => { 
    const authHeader = req.get('Authorization'); // checks if there is authorization field in incoming request
    if(!authHeader) { // if not, no valid token
        req.isAuth = false; // block
        return next(); // continue, check
    }
    const token = authHeader.split(' ')[1]; // authorization  bearer tokennvalue, extract token from header, split on whitespace
    if(!token || token == '') { // if token token does not exist or is empty
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'supercalifragilisticexpialidocious'); 
    } catch (err) {
        req.isAuth = false; // if not set block
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
};