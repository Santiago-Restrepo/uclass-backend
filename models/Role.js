const {Schema, model} = require('mongoose')

const roleShema = new Schema({
    name: {
        type: String
    }
}, {
    versionKey: false,
});
module.exports = model('Role', roleShema);