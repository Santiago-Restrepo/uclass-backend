const {Schema, model} = require('mongoose')

const resourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subjectId:  {
        ref: "Subject",
        type: Schema.Types.ObjectId,
        required: true
    },
    userId:  {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    resourceUrl:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
});
module.exports = model('Resource', resourceSchema);
