const mongoose = require('mongoose');

const pepoleSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password:{
        type: String,
        required: true,
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
    },

    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},

{
    timestamps: true
}

);


const Pepole = mongoose.model('Pepole', pepoleSchema);

module.exports = Pepole;
