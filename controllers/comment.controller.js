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
        const comments = await Comment.find({resourceId: resourceId, isDeleted: false});
        return comments;
    }

    async getByReviewId(reviewId) {
        const comments = await Comment.find({reviewId: reviewId, isDeleted: false});
        return comments;
    }

    async getByUserId(userId) {
        const comments = await Comment.find({userId: userId, isDeleted: false});
        return comments;
    }
    
    async delete(id) {
        const deletedComment = await Comment.findByIdAndUpdate(id, {isDeleted: true});
        if (!deletedComment) throw boom.notFound('Comment not found');
        return deletedComment;
    }
}

module.exports = new CommentController();