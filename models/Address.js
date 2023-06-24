import mongoose, { model, Schema, models } from "mongoose"

const AddressSchema = new Schema({
    userEmail: {type:String, unique:true, required:true},
    name: String,
    email: String,
    city: String,
    zipCode: String,
    state: String,
    district: String,
    streetAddress: String,
    complement: String,
})

export const Address = models?.Address || model('Address', AddressSchema)