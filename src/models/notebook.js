import mongoose from "mongoose";
const notebookSchema = new mongoose.Schema({
    AssetID: String,
    SerialNumber: String,
    Brand: String,
    Model: String,
    LocationID: String,
    ContractID: String,
})
export default mongoose.model('Notebook', notebookSchema, 'asste')