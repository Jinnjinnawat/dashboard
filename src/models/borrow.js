import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    BorrowID: String,
    NotebookID: String,
    BorrowDate: String,
    DueDate: String,
    ReturnDate: String,
    Status: String
})
export default mongoose.model('Borrow', departmentsSchema, 'borrow')