const Teacher = require("../models/Teacher");
class TeacherController {
    constructor() {
        
    }
    
    async getAll() {
        const teachers = await Teacher.find({});
        return teachers;
    }
    
    async getOne(id) {
        if(!id) throw new Error("Id not found");
        const teacher = await Teacher.findById(id);
        return teacher;
    }
    
    async create(body) {
        const {name, rating} = body;
        const teacher = new Teacher({
            name,
            rating
        });
        await teacher.save();
        return teacher;
    }
    
    async update(id, body) {
        const {
            name,
            rating
        } = body;
        const teacher = await Teacher.findByIdAndUpdate(id, {
            name,
            rating
        }, {
            new: true
        });
        return teacher;
    }
    
    async delete(id) {
        const teacher = await Teacher.findByIdAndDelete(id);
        return teacher;
    }
}

module.exports = new TeacherController();