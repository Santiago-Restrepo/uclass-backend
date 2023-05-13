const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const validateToken = async (req, res, next) => {
    try {
        //Get token from cookie
        const cookies = req.cookies;
        const token = cookies.token;
        if (!token) throw boom.unauthorized('Unauthorized');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) throw boom.unauthorized('Unauthorized');
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next();
                return;
            }
        }
        throw boom.unauthorized('Unauthorized');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateToken,
    isAdmin
}