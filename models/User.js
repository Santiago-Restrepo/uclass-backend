const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    googleId: {type: String, required: false},
    provider: {type: String, required: false},
    photo: {type: String, required: false},
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema);