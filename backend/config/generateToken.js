const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id}, "bounse", {
        expiresIn: "30d",
    });
};

module.exports = generateToken;