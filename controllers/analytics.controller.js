const Review = require("../models/Review.js");
const Comment = require("../models/Comment.js");
const boom = require("@hapi/boom");
class AnalyticsController {
    async getTeachersReviewsCount() {
        const reviews = await Review.aggregate([
            {
                $match: {
                    isApproved: true,
                    // isEdited: false,
                    isDeleted: false,
                    isRejected: false
                }
            },
            {
                $group: {
                    _id: "$teacherId",
                    count: { $sum: 1 }
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
                    count: 1,
                    teacher: {
                        _id: 1,
                        name: 1
                    }
                }
            } 
        ]);
        return reviews;
    }
    async getTeachersReviewsCountByRatings() {
        const reviews = await Review.aggregate([
            {
                $match: {
                    isApproved: true,
                    // isEdited: false,
                    isDeleted: false,
                    isRejected: false
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
        const fakeReviews = [
            ...reviews,
            ...Array.from({length: 10}, () => {
                return {
                    clarity: Math.floor(Math.random() * 5),
                    demanding: Math.floor(Math.random() * 5),
                    fairness: Math.floor(Math.random() * 5),
                    teacher: {
                        _id: String(Math.random() * 100),
                        name: "Fake Teacher" + Math.random() * 100
                    }
                }
            })
        ];

        return reviews;
    }
    async getTeachersReviewCommentsCount() {
        //TeacherId is inside review, reviewId is inside comment
        const comments = await Comment.aggregate([
            {
                $lookup: {
                    from: "reviews",
                    localField: "reviewId",
                    foreignField: "_id",
                    as: "review"
                }
            },
            {
                $unwind: "$review"
            },
            {
                $match: {
                    "review.isApproved": true,
                    // "review.isEdited": false,
                    "review.isDeleted": false,
                    "review.isRejected": false
                }
            },
            {
                $group: {
                    _id: "$review.teacherId",
                    count: { $sum: 1 }
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
                    count: 1,
                    teacher: {
                        _id: 1,
                        name: 1
                    }
                }
            }
        ]);
        return comments;
    }
}

module.exports = new AnalyticsController();