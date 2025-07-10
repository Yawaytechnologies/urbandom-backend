import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required:true
        },
    createAt:{
        type:Date,
        default:Date.now
    }    
})

const District = mongoose.model('District', districtSchema);
export default District;
