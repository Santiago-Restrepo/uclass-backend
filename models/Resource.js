const {Schema, model} = require('mongoose')

const resourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject:  {
        ref: "Subject",
        type: Schema.Types.ObjectId,
        required: true
    },
    user:  {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resourceUrl:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
});
module.exports = model('Resource', resourceSchema);
