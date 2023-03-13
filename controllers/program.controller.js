const Program = require('../models/Program.js');
const boom = require('@hapi/boom');

class ProgramController{
    constructor(){
    }

    async getAll(){
        const programs = await Program.find();
        return programs;
    }

    async getOne(id){
        const program = await Program.findById(id);
        if(!program) throw boom.notFound("Program not found");
        return program;
    }

    async create(programData){
        const newProgram = new Program(programData);
        return await newProgram.save();
    }

    async update(id, programData){
        const updatedProgram = Program.findByIdAndUpdate(id, programData, {new: true});
        if(!updatedProgram) throw boom.notFound("Program not found");
        return updatedProgram;
    }

    async delete(id){
        const deletedProgram = Program.findByIdAndDelete(id);
        if(!deletedProgram) throw boom.notFound("Program not found");
        return deletedProgram;
    }
}

module.exports = new ProgramController();