import mongoose from 'mongoose';

//This is the current schema for the user database. Only the username, email, and password are required for an entry.

const eventSchema = new mongoose.Schema({

  summary:{type:String, required:true},
  address: {type:String, required:true},

  coordinates: {    latitude: mongoose.Number,
                    longitude: mongoose.Number
                },

  date:{type:Date, required:true}, //yyyy-MM-DD
  description:{type:String, required:true}
});

export default mongoose.model('events', eventSchema);