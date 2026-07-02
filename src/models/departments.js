import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
    DepartmentID: String,
    DepartmentName: String
})
export default mongoose.model('departments', departmentsSchema)