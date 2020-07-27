import mongoose from 'mongoose';

//This is the current schema for the posts database.

const postSchema = new mongoose.Schema({

  poster:{type:String, required:true},
  icon:{type:String, required:true},
  title:{type:String, required:true},
  donationLink:{type:String},
  organizationLink:{type:String},
  description:{type:String, required:true},
  time:{type:Date, default: Date.now, required:true},
  location:{type:String, required:true}
  
});

export default mongoose.model('posts', postSchema);