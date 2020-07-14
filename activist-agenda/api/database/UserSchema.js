import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, required:true},
  firstName:{type:String},
  lastName:{type:String}
});

export default mongoose.model('users', userSchema);