const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    content: {
        type: String
    },
    user: {
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
    rating: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Comment', commentSchema);