const {Schema, model} = require('mongoose')

const resourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subjectId:  {
        ref: "Subject",
        type: Schema.Types.ObjectId
    },
    userId:  {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    content:{
        type: String
    }
}, {
    versionKey: false,
});
module.exports = model('Resource', resourceSchema);
