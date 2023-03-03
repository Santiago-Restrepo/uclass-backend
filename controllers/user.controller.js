const Role = require("../models/Role");
const User = require("../models/User");

class UserController {
    constructor() {
        this.userModel = User;
        this.roleModel = Role;
    }
    
    async getRoles() {
        const roles = await this.roleModel.find();
        return roles;
    }
}

module.exports = new UserController();