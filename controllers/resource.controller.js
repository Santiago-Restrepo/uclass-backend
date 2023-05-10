const Resource = require('../models/Resource');
const Rating = require('../models/Rating');
const boom = require('@hapi/boom');
class ResourceController {
    constructor() {

    }
    
    async getAll() {
        const resources = await Resource.find();
        return resources;
    }
    async getOne(id) {
        const resource = await Resource.findById(id).populate('user').populate('subject');
        if(!resource) throw boom.notFound('Resource not found');
        return resource;
    }
    async getBySubjectId(subjectId) {
        const resources = await Resource.find({subject: subjectId}).populate('user');
        return resources;
    }
    async getBest() {
        const resources = await Resource.find({}).sort({rating: -1}).limit(3);
        return resources;
    }
    
    async getByUserId(userId) {
        const resources = await Resource.find({userId: userId}).populate('subject');
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
        if (resource.user == user.id) {
            const updatedResource = await Resource.findByIdAndUpdate(id, body, {new: true});
            return updatedResource;
        }else {
            throw boom.unauthorized('You are not authorized to update this resource');
        }
    }

    async rate(id, rating, userId) {
        const resource = await Resource.findById(id);
        if(!resource) throw boom.notFound('Resource not found');
        const newRating = new Rating({
            rating: rating,
            user: userId,
            resource: id
        });
        await newRating.save();
        const ratings = await Rating.find({resource: id});
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
            sum += ratings[i].rating;
        }
        const avg = sum / ratings.length;
        await Resource.findByIdAndUpdate(id, {rating: avg}, {new: true});
        return avg;
    }
    
    async delete(id, user) {
        const resource = await Resource.findById(id);
        if (resource.user == user.id) {
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