import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    userID: {type:String, required:true},
    emailToken: {type:String},
    passwordToken: {type:String}
});

export default mongoose.model('tokens', tokenSchema);