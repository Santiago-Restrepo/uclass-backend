const classModel = require('../models/Class');

class classController {
    constructor() {
    }

    async getAll() {
        const classes = await classModel.find();
        return classes;
    }
    
    async getOne(id) {
        const classFound = await classModel.findById(id);
        if (!classFound) {
            throw boom.notFound("Class not found");
        }
        return classFound;
    }

    async create(classData) {
        const newClass = new classModel(classData);
        return await newClass.save();
    }

    async findBySubjectId(subjectId) {
        const classFound = await classModel.find({
            subjectId: subjectId
        })

        if (!classFound) {
            throw boom.notFound("Class not found");
        }
        return classFound;
    }

    async findByTeacherId(teacherId) {
        const classFound = await classModel.find({
            teacherId: teacherId
        })

        if (!classFound) {
            throw boom.notFound("Class not found");
        }
        return classFound;
    }

    async update(id, classData) {
        const updatedClass = await classModel.findByIdAndUpdate(id, classData, {
            new: true
        });

        if (!updatedClass) {
            throw boom.notFound("Class not found");
        }
        return updatedClass;
    }

    async delete(id) {
        const deletedClass = await classModel.findByIdAndDelete(id);
        if (!deletedClass) {
            throw boom.notFound("Class not found");
        }
        return deletedClass;
    }
}


module.exports = new classController();