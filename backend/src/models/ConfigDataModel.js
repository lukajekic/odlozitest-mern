const mongoose = require('mongoose')

const schema = mongoose.Schema({
    maintenance: {
        type: Boolean,
        required: true
    },

    enablemessage:{
        type: Boolean,
        required: true
    },

    message:{
        type: String,
        required: false
    }
})


const ConfigModel = mongoose.model("ConfigModel", schema, "config") 
module.exports = ConfigModel