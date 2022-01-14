const mongoose = require('mongoose');
const { Schema } = mongoose;

const InfoSchema = new Schema({
    photo: {type: String, required: true},
    nickname: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Info', InfoSchema);