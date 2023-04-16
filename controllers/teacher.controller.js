const Teacher = require("../models/Teacher");
const boom = require('@hapi/boom');
class TeacherController {
    constructor() {
        
    }
    
    async getAll() {
        const teachers = await Teacher.find({});
        return teachers;
    }
    
    async getOne(id) {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            throw boom.notFound("Teacher not found");
        }
        return teacher;
    }

    async getBest() {
        const teachers = await Teacher.find({}).sort({rating: -1}).limit(3);
        return teachers;
    }

    async search(query){
        const teachers = await Teacher.find({
            name: {
                $regex: query,
                $options: "i"
            }
        });
        return teachers;
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
        if (!teacher) throw boom.notFound("Teacher not found");
        return teacher;
    }
    
    async delete(id) {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) throw boom.notFound("Teacher not found");
        return teacher;
    }
}

module.exports = new TeacherController();