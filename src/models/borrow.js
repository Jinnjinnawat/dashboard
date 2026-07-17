import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    BorrowID: String,
    NotebookID: String,
    DepartmentID: String,
    Status: String
})
export default mongoose.model('Borrow', borrowSchema, 'borrow')