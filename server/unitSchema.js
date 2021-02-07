var mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    unit_name: String,
    apartmentName: String,
    tower_id: String,
    floor_id: String,
    block_id: String,
    status: String,
    status_id: Number

});

module.exports.Unit = mongoose.model('Unit', UnitSchema);
module.exports.db = mongoose;