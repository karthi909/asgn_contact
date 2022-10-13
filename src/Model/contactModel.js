const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type:Number,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('contact', contactSchema );