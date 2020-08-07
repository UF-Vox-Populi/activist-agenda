import mongoose from 'mongoose';

//This is the current schema for the user database. Only the username, email, and password are required for an entry.

const userSchema = new mongoose.Schema({

  username:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, required:true},
  firstName:{type:String},
  lastName:{type:String},
  bio:{type:String},
  location:{type:String},
  zip:{type:mongoose.Number},
  authLevel:{type:mongoose.Number}
});

export default mongoose.model('users', userSchema);