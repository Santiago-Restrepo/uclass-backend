const {Schema, model} = require('mongoose')

const classSchema = new Schema({
    name: {
        type: String
    },
    subjectId:  {
        ref: "Subject",
        type: Schema.Types.ObjectId
    },
    teacherId: {
        ref: "Teacher",
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
});
module.exports = model('Class', classSchema);