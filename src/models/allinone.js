import mongoose from "mongoose";
const allinoneSchema = new mongoose.Schema({

    AllID: String,
    SerialNumber: String,
    Brand: String,
    Model: String,
    LocationID: String,
    ContractID: String,
})
export default mongoose.model('Allinone', allinoneSchema, 'allinone')