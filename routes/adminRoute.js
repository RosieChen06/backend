import express from 'express';
import upload from '../middlewares/multer.js';
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin} from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter  = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.post('/appointments', authAdmin, appointmentsAdmin)

export default adminRouter