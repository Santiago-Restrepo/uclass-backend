const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
    name: {
        type: String
    }
}, {
    versionKey: false,
});
module.exports = model('Role', roleSchema);