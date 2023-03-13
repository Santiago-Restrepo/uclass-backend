const Review = require("../models/Review.js");

class ReviewController {
    async create(review) {
        const newReview = new Review({
            ...review,
            parentReviewId: null
        });
        await newReview.save();
        return newReview;
    }
    
    async getAll() {
        const reviews = await Review.find();
        return reviews;
    }
    
    async getOne(id) {
        const review  = await Review.findById(id);
        if (!review) throw boom.notFound('Review not found');
        return review;
    }

    async getByUserId(userId) {
        const reviews = await Review.find({userId: userId, isEdited: false, isDeleted: false});
        return reviews;
    }

    async getBySubjectId(subjectId) {
        const reviews = await Review.find({subjectId: subjectId, isApproved: true, isEdited: false, isDeleted: false});
        return reviews;
    }

    async getByTeacherId(teacherId) {
        const reviews = await Review.find({teacherId: teacherId, isApproved: true, isEdited: false, isDeleted: false});
        return reviews;
    }

    async getEdits(id) {
        const reviews = await Review.find({parentReviewId: id});
        return reviews;
    }
    
    async update(id, body, user) {
        const {
            content,
            rating
        } = body;
        if(!content && !rating) throw boom.badRequest('You must provide content or rating');
        const review = await Review.findById(id);
        if (!review) throw boom.notFound('Review not found');
        if (review.userId == user.id) {
            const newReview = new Review({
                content: content ? content : review.content,
                rating: rating ? rating : review.rating,
                userId: review.userId,
                subjectId: review.subjectId,
                teacherId: review.teacherId,
                originalReviewId: review.originalReviewId ? review.originalReviewId : review._id,
                parentReviewId: id
            });
            await newReview.save();
            // await Review.findByIdAndUpdate(id, {
            //     isEdited: true
            // }, {new: true});
            return newReview;
        }else {
            throw boom.unauthorized('You are not authorized to update this review');
        }
    }

    async updateByAdmin(id, body) {
        if(!content && !rating) throw boom.badRequest('You must provide content or rating');
        const review = await Review.findById(id);
        if (!review) throw boom.notFound('Review not found');
        if(review.isEdited) throw boom.badRequest('You cannot edit an edited review');
        const newReview = new Review({
            ...body,
            userId: review.userId,
            subjectId: review.subjectId,
            teacherId: review.teacherId,
            parentReviewId: review.parentReviewId ? review.parentReviewId : review._id
        });
        await newReview.save();
        await Review.findByIdAndUpdate(id, {
            isEdited: true
        }, {new: true});
        return newReview;
    }

    async approve(id) {
        //Mark parent review as edited
        const review = await Review.findById(id);
        if (!review) throw boom.notFound('Review not found');
        if(review.parentReviewId){
            await Review.findByIdAndUpdate(review.parentReviewId, {
                isEdited: true
            }, {new: true});
        }
        const approvedReview = await Review.findByIdAndUpdate(id, {
            isApproved: true
        }, {new: true});
        return approvedReview;
    }
    
    async delete(id) {
        const deletedReview = await Review.findByIdAndUpdate(id, {
            isDeleted: true
        }, {new: true});
        return deletedReview;
    }
}

module.exports = new ReviewController();