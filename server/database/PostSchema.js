import mongoose from 'mongoose';

//This is the current schema for the posts database.

const postSchema = new mongoose.Schema({

  poster:{type:String, required:true},
  posterID:{type:String, required:true},
  icon:{type:String},
  title:{type:String, required:true},
  donationLink:{type:String},
  organizationLink:{type:String},
  description:{type:String, required:true},
  time:{type:String},

  address: {type:String},

  coordinates: {    latitude: mongoose.Number,
                    longitude: mongoose.Number
                },

  date:{type:Date}, //yyyy-MM-DD

  supporters: [String],

  isEvent: {type:Boolean}
  
});

export default mongoose.model('posts', postSchema);