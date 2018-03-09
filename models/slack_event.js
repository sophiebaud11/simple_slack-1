var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SlackEventSchema = new Schema({
    token : String,
    team_id: String,
    api_app_id: String
}, {strict: false});

module.exports = mongoose.model('slack_event', SlackEventSchema );
