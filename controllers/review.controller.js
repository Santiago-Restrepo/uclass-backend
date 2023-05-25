const Review = require("../models/Review.js");
const Teacher = require("../models/Teacher.js");
const boom = require("@hapi/boom");
const mongoose = require("mongoose");
class ReviewController {
    async create(review) {
        const newReview = new Review({
            ...review,
            parentReviewId: null
        });
        await newReview.save();
        //Update teacher rating
        return newReview;
    }

    async updateTeacherRating(teacherId) {
        const reviews = await Review.aggregate([
            {
                $match: {
                    isApproved: true,
                    isDeleted: false,
                    isRejected: false,
                    teacherId: mongoose.Types.ObjectId(teacherId)
                }
            },
            {
                $group: {
                    _id: "$teacherId",
                    clarity: { $avg: "$rating.clarity" },
                    demanding: { $avg: "$rating.demanding" },
                    fairness: { $avg: "$rating.fairness" }
                }   
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "teacher"
                }
            },
            {
                $unwind: "$teacher"
            },
            {
                $project: {
                    _id: 0,
                    clarity: 1,
                    demanding: 1,
                    fairness: 1,
                    teacher: {
                        _id: 1,
                        name: 1
                    }
                }
            }
        ]);
        if(reviews.length > 0) {
            const ratings = reviews[0];
            const rating = Object.keys(ratings).reduce((acc, key) => {
                const value = ratings[key];
                if(!key || key === 'teacher') return acc;
                return acc + value;
            }, 0);
            const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, {
                rating: parseInt(rating / 3)
            });
            return updatedTeacher;
        }else{
            const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, {
                rating: 0
            });
            return updatedTeacher;
        }
        return null;
    }
    
    async getAll() {
        const reviews = await Review.find().populate('user');
        return reviews.filter(review => review.user);
    }

    async getPending() {
        const reviews = await Review.find({isApproved: false, isEdited: false, isDeleted: false, isRejected: false}).populate('user');
        return reviews.filter(review => review.user);
    }
    
    async getOne(id) {
        //Populate user and subject
        const review  = await Review.findById(id).populate('user').populate('subject');
        if (!review) throw boom.notFound('Review not found');
        return review.filter(review => review.user && review.subject);
    }

    async getByUserId(userId) {
        const reviews = await Review.find({user: userId, isEdited: false, isDeleted: false}).populate('user');
        return reviews.filter(review => review.user);
    }

    async getBySubjectId(subjectId) {
        const reviews = await Review.find({subject: subjectId, isApproved: true, isEdited: false, isDeleted: false});
        return reviews;
    }

    async getByTeacherId(teacherId) {
        
        const reviews = await Review.find({teacherId: teacherId, isApproved: true, isEdited: false, isDeleted: false}).populate('user');
        return reviews.filter(review => review.user);
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
        if (review.user == user.id) {
            const newReview = new Review({
                content: content ? content : review.content,
                rating: rating ? rating : review.rating,
                user: review.user,
                subject: review.subject,
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
            user: review.user,
            subject: review.subject,
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
        const teacherId = approvedReview.teacherId;
        await this.updateTeacherRating(teacherId);
        return approvedReview;
    }
    async reject(id, reason) {
        if(!reason) throw boom.badRequest('You must provide a reason for rejection');
        const review = await Review.findById(id);
        if (!review) throw boom.notFound('Review not found');
        if(review.parentReviewId){
            await Review.findByIdAndUpdate(review.parentReviewId, {
                isEdited: true
            }, {new: true});
        }
        const rejectedReview = await Review.findByIdAndUpdate(id, {
            isRejected: true,
            rejectedReason: reason
        }, {new: true});
        return rejectedReview;
    }
    
    async delete(id) {
        const deletedReview = await Review.findByIdAndUpdate(id, {
            isDeleted: true
        }, {new: true});
        const teacherId = deletedReview.teacherId;
        await this.updateTeacherRating(teacherId);
        return deletedReview;
    }
}

module.exports = new ReviewController();