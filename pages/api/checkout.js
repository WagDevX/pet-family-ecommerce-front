import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Setting } from "@/models/Setting";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler (req, res) {
   if (req.method !== 'POST') {
    res.json('should be a POST request')
    return;
   }
   const {name, email, city, 
    zipCode, state, district, 
    streetAddress, complement, cartProducts} 
    = req.body;
    await mongooseConnect();
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});

    let line_items = [];

    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'BRL',
                    product_data: {name:productInfo.title},
                    unit_amount: productInfo.price * 100,
                },
            });
        }
        
        
    }

    const session = await getServerSession(req, res, authOptions);

    const orderDoc = await Order.create({
        line_items, name, email, city, 
        zipCode, state, district, streetAddress, complement, paid:false,
        userEmail:session?.user?.email
    });

    const shippingFeeSetting = await Setting.findOne({name: 'shippingFee'})
    const shippingFee = parseInt(shippingFeeSetting.value || '0') * 100;

    const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
        metadata: {orderId:orderDoc._id.toString()},
        allow_promotion_codes: true,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Frete',
                    type: 'fixed_amount',
                    fixed_amount: {amount: shippingFee, currency: 'BRL'}
                }
            }
        ]

    })

    res.json({
        url:stripeSession.url,
    })

}

