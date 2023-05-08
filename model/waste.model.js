const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    age:Number
}, {
    versionKey:false
})

const WasteModel = mongoose.model('waste', schema);
module.exports = {WasteModel}