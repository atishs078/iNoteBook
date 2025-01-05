var jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    //Get the user from the token
    const token = req.header("auth-token");
    const JWT_SECRETE = "Abcdefghii&kndnf"
    if (!token) {

        res.status(401).send('Please use valid token');
    }
    try {
        const string = jwt.verify(token, JWT_SECRETE);
        req.user = string.user;
        next();
    }
    catch (error) {
        res.send(401).send('Access denied');
    }
}


module.exports = fetchuser;
