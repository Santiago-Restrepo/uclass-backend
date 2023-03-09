const {Schema, model} = require('mongoose')

const programShema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
});
module.exports = model('Program', programShema);
