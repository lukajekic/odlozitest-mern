const mongoose = require('mongoose')

const schema  = mongoose.Schema({

    title: {
        type: String,
        required: true,

    },

    subject: {
        type: String,
        required: true
    },


    date: {
        type: Date,
        required: false
    },

    votes: {
        type: Number,
        required: true
    },

    closed: {
        type: Boolean,
        required: false
    }


}, {timestamps: true})


const ApiModel = mongoose.model('ApiModel', schema)
module.exports = ApiModel