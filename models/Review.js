const {Schema, model} = require('mongoose')

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    subject:  {
        ref: "Subject",
        type: Schema.Types.ObjectId,
        required: true
    },
    teacherId: {
        ref: "Teacher",
        type: Schema.Types.ObjectId,
        required: true
    },
    user:  {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    rating: {
        clarity: {
            type: Number,
            required: true
        },
        demanding: {
            type: Number,
            required: true
        },
        fairness: {
            type: Number,
            required: true
        }
    },
    parentReviewId: {
        ref: "Review",
        type: Schema.Types.ObjectId,
        required: false,
        nullable: true
    },
    originalReviewId: {
        ref: "Review",
        type: Schema.Types.ObjectId,
        required: false,
        nullable: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model('Review', reviewSchema);