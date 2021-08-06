const jwt = require('jsonwebtoken');


exports.generateToken = (role, id) => {

    const accessToken = jwt.sign({
        role: role,
        id: id
    }, process.env.JWT_SECRET,
        { expiresIn: '7days' },
        { algorithm: 'HS256' }
    );


    return { accessToken };
};