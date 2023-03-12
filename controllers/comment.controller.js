const boom = require('@hapi/boom');
const Comment = require('../models/Comment');

class CommentController {
    async create(body) {
        const comment = new Comment(body);
        await comment.save();
        return comment;
        
    }
    
    async getAll() {
        const comments = await Comment.find();
        return comments;
    }

    async getByResourceId(resourceId) {
        const comments = await Comment.find({resourceId: resourceId});
        return comments;
    }

    async getByReviewId(reviewId) {
        const comments = await Comment.find({reviewId: reviewId});
        return comments;
    }

    async getByUserId(userId) {
        const comments = await Comment.find({userId: userId});
        return comments;
    }
    
    async delete(id) {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            throw boom.notFound('Comment not found');
        }
        return comment;
    }
}

module.exports = new CommentController();