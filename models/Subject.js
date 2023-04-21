const {Schema, model} = require('mongoose')

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        ref: "Teacher",
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    versionKey: false,
});
module.exports = model('Subject', subjectSchema);
