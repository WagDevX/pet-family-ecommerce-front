import { Schema, model, models } from "mongoose"

const WishedProductSchema = new Schema({
    userEmail: {type: String, required: true},
    product: {type: Schema.Types.ObjectId}
})

export const WishedProduct = models?.WishedProduct || model('WishedProduct', WishedProductSchema);