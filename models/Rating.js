const {Schema, model} = require('mongoose')

const ratingSchema = new Schema({
    resource: {
        ref: "Resource",
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
});