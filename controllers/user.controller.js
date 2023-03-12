const boom = require('@hapi/boom');
const User = require("../models/User");
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
        const roles = await this.roleModel.find();
        return roles;
    }
}

module.exports = new userController();