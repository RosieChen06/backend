import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

const addDoctor = async (req, res) => {
    try{
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }

        if(!validator.isEmail(email)){
            res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a stronger password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassward = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email, 
            image:imageUrl,
            password: hashedPassward,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true, message:"Doctor Added"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const loginAdmin = async (req, res) => {
    try {

        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else {
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const allDoctors = async (req, res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const appointmentsAdmin = async(req, res) => {
    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin}