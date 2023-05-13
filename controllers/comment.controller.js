const boom = require('@hapi/boom');
const Comment = require('../models/Comment');
const Resource = require('../models/Resource');
class CommentController {
    async create(body) {
        if(body.resourceId) {
            return await this.createResourceComment(body);   
        }
        const comment = new Comment(body);
        await comment.save();
        return comment;
        
    }

    async createResourceComment(body) {
        const {
            resourceId,
            content,
            user,
            rating
        } = body;
        const resource = await Resource.findById(resourceId);
        if(!resource) throw boom.notFound('Resource not found');
        const newComment = new Comment({
            rating,
            user,
            resourceId,
            content
        });
        const createdComment = await newComment.save();
        const comments = await Comment.find({resourceId});
        let sum = 0;
        for (let i = 0; i < comments.length; i++) {
            sum += comments[i].rating ? comments[i].rating : 0;
        }
        const avg = sum / comments.length;
        await Resource.findByIdAndUpdate(resourceId, {rating: avg, ratingCount: comments.length}, {new: true});
        return createdComment;
    }
    
    async getAll() {
        const comments = await Comment.find();
        return comments;
    }

    async getByResourceId(resourceId) {
        const comments = await Comment.find({resourceId: resourceId, isDeleted: false}).populate('user');
        return comments;
    }

    async getByReviewId(reviewId) {
        const comments = await Comment.find({reviewId: reviewId, isDeleted: false}).populate('user');
        return comments;
    }

    async getByUserId(userId) {
        const comments = await Comment.find({user: userId, isDeleted: false});
        return comments;
    }
    
    async delete(id) {
        const deletedComment = await Comment.findByIdAndUpdate(id, {isDeleted: true});
        if (!deletedComment) throw boom.notFound('Comment not found');
        return deletedComment;
    }
}

module.exports = new CommentController();