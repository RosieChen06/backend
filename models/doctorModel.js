import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type:String, required: true, unique: false},
    password: {type: String, required: false},
    image: {type: String, required: false},
    speciality: {type: String, required: false},
    degree: {type: String, required: false},
    experience: {type: String, required: false},
    about: {type: String, required: false},
    available: {type: Boolean, default: false},
    fees: {type: Number, required: false},
    address: {type: Object, required: false},
    date: {type: Number, required: false},
    slots_booked: {type: Object, default:{}}
},{minimize:false})

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel