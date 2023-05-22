const Review = require("../models/Review.js");
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
}

module.exports = new AnalyticsController();