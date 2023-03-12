const {Schema, model} = require('mongoose')

const subjectSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    userCreatedId: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    userUpdatedId: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    classes: [{
        ref: "Class",
        type: Schema.Types.ObjectId
    }]
}, {
    versionKey: false,
});
module.exports = model('Subject', subjectSchema);
