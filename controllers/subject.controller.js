const Subject = require("../models/Subject");
const boom = require("@hapi/boom");

class SubjectController {
    constructor() {
        
    }
    
    async getAll() {
        const subjects = await Subject.find();
        return subjects;
    }
    
    async getOne(id) {
        const subject = await Subject.findById(id);
        if (!subject) throw boom.notFound("Subject not found");
        return subject;
    }

    async getByTeacherId(teacherId) {
        const subjects = await Subject.find({teacherId: teacherId});
        return subjects;
    }
    
    async create(body) {
        const subject = new Subject(body);
        await subject.save();
        return subject;
    }
    
    async update(id, body) {
        const {
            name,
            description,
            teacherId
        } = body;
        if (!name && !description && !teacherId) throw boom.badRequest("You must provide name, description or teacherId");
        const updatedSubject = await Subject.findByIdAndUpdate(id, body, {new: true});
        return updatedSubject;
    }
    
    async delete(id) {
        const deletedSubject = await Subject.findByIdAndDelete(id);
        return deletedSubject;
    }
}

module.exports = new SubjectController();