const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    googleId: {type: String, required: false},
    photo: {type: String, required: false},
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    programId: {
        ref: "Program",
        type: Schema.Types.ObjectId
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema);