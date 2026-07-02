import mongoose from "mongoose";

const notebookContractSchema = new mongoose.Schema({
    ContractID: String,
    ContractNo: String,
    Vendor: String,
    StartDate: String,
    EndDate: String,
})
export default mongoose.model('notebookContract', notebookContractSchema)