import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_c90ba60f94e40c081fc3a7ba9830d07f5a495e8d1949ba5197647eef7f47426a";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
            paid:true,
        })
      }
      console.log(data);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('ok');
}

export const config = {
    api: {
        bodyParser: false,
    }
}

// vouch-joy-easy-gentle
// acct_1NIOYmGmcbLiCdBG