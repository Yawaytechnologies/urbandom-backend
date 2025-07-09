import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    district:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'District',
        required:true
    }
    });

    const Location = mongoose.model('Location', locationSchema);
    export default Location;

