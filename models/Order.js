const { Schema } = require("mongoose");
import { models, model } from "mongoose";

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    zipCode: String,
    state: String,
    district: String,
    streetAddress: String,
    complement: String,
    paid:Boolean,
}, {
    timestamps: true,
}
);

export const Order = models?.Order || model('Order', OrderSchema);