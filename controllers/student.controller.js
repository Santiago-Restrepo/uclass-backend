const boom = require('@hapi/boom');
const User = require("../models/User");
class StudentController {
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

    
    async update(id, student) {
        const updatedStudent = await User.findByIdAndUpdate(id, student, {
            new: true
        });
        return updatedStudent;
    }
    
    async delete(id) {
        const deletedStudent = await User.findByIdAndDelete(id);
        return deletedStudent;
    }
}

module.exports = new StudentController();