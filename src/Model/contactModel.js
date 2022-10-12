const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        requried: true,
        unique: true,
    },
    phoneNumber:{
        type:Number,
        requried: true,
        unique: true
    },
    email:{
        type:String,
        requried: true,
        unique: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('contact', contactSchema );