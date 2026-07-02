import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({

    LocationID: String,
    LocationName: String
})
export default mongoose.model('Location', LocationSchema, 'location')