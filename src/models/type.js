import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({

    Type: String,
    Typename: String

}, { versionKey: false })
export default mongoose.model("Type", TypeSchema, 'type')