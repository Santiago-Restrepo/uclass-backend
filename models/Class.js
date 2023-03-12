const {Schema, model} = require('mongoose')

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subjectId:  {
        ref: "Subject",
        required: true,
        type: Schema.Types.ObjectId,
    },
    teacherId: {
        ref: "Teacher",
        required: true,
        type: Schema.Types.ObjectId
    },
    userCreatedId: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    userUpdatedId: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
});
module.exports = model('Class', classSchema);