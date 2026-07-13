import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({

    LocationID: String,
    LocationName: String,

}, { versionKey: false })
export default mongoose.model('Location', LocationSchema, 'location')