const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    comment: {
        type: String
    },
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    resourceId: {
        ref: "Resource",
        type: Schema.Types.ObjectId,
    },
    reviewId: {
        ref: "Review",
        type: Schema.Types.ObjectId
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
});
module.exports = model('Comment', commentSchema);