const {Schema, model} = require('mongoose')

const teacherShema = new Schema({
    name: {
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
module.exports = model('Teacher', teacherShema);
