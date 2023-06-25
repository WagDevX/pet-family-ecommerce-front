import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);
    res.json(
        await Order.find({userEmail: session.user.email})
    )
}