const boom = require('@hapi/boom');
const User = require("../models/User");
const Role = require("../models/Role");
const authController = require("../controllers/auth.controller");
const bcrypt = require("bcryptjs");
const {config} = require("dotenv");
class userController {
    constructor() {
    }
    
    async getAll() {
        const users = await User.find();
        users.map(user => {
            user.password = undefined;
            return user;
        });
        return users;
    }
    
    async getOne(id) {
        const user = await User.findById(id);

        if (!user) {
            throw boom.notFound("User not found");
        }

        user.password = undefined;

        return user;
    }
    
    async update(id, user) {
        const updatedUser = await User.findByIdAndUpdate(id, user, {
            new: true
        });
        updatedUser.password = undefined;
        return updatedUser;
    }

    async changePassword(body) {
        const {
            userId, currentPassword, newPassword
        } = body;
        if(!currentPassword || !userId || !newPassword) {
            throw boom.badRequest("Missing parameters");
        }
        const userFound = await User.findById(userId);
        if(!userFound) {
            throw boom.notFound("User not found");
        }
        const isMatch = await authController.compareAsync(currentPassword, userFound.password);
        if(!isMatch) {
            throw boom.badRequest("Old password is incorrect");
        }
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        const updatedUser = await User.findByIdAndUpdate(userId, {password: hash}, {
            new: true
        });
        updatedUser.password = undefined;
        return updatedUser;
    }
    async delete(id) {
        if(!id) {
            throw boom.badRequest("Id is required");
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw boom.notFound("User not found");
        }
        deletedUser.password = undefined;
        return deletedUser;
    }

    async getRoles() {
        const roles = await Role.find();
        return roles;
    }
}

module.exports = new userController();