const Resource = require('../models/Resource');
const User = require('../models/User');
const boom = require('@hapi/boom');
class ResourceController {
    constructor() {

    }
    
    async getAll() {
        const resources = await Resource.find();
        return resources;

    }

    async getBySubjectId(subjectId) {
        const resources = await Resource.find({subjectId: subjectId});
        return resources;
    }
    
    async getByUserId(userId) {
        const resources = await Resource.find({userId: userId});
        return resources;
    }
    
    async create(body) {
        const resource = new Resource(body);
        await resource.save();
        return resource;
    }
    
    async update(id, body, user) {
        const resource = await Resource.findById(id);
        if(!resource) throw boom.notFound('Resource not found');
        if (resource.userId == user.id) {
            const updatedResource = await Resource.findByIdAndUpdate(id, body, {new: true});
            return updatedResource;
        }else {
            throw boom.unauthorized('You are not authorized to update this resource');
        }
    }
    
    async delete(id, user) {
        const resource = await Resource.findById(id);
        if (resource.userId == user.id) {
            const deletedResource = await Resource.findByIdAndDelete(id);
            return deletedResource;
        }else {
            throw boom.unauthorized('You are not authorized to delete this resource');
        }
    }

    async deleteByAdmin(id) {
        const resource = await Resource.findByIdAndDelete(id);
        return resource;
    }
}

module.exports = new ResourceController();