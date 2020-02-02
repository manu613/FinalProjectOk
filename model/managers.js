const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    name: String,
    password: String,
    lName: String,
    email: String,
    tz: Number,
    nameSocity: String,
    tel: Number
});

module.exports = mongoose.model('managers', managerSchema)