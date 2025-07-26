import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true
        },
    createAt :{
        type: Date,
        default: Date.now
    }    

    })


    const State = mongoose.model('State', stateSchema);
    export default State;