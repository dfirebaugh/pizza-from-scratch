'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
    id:String,
    index:Number,
    pos:String,
    url:String,
    originalName:String
})

const Cartoon = new Schema({
    id:String,
    toonId:String,
    title:String,
    publishingDate:String,
    storyArc:String,
    artistComments:String,
    panels:[PanelSchema]
});


module.exports = mongoose.model('Cartoon', Cartoon);
