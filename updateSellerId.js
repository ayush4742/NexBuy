import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://greatstack:greatstack123@cluster0.yvggjjm.mongodb.net/greencart";
const SELLER_ID = "6877f4ca4a38d90968290169"; // <-- Replace with your seller's ObjectId

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model("product", productSchema);

async function updateSellerId() {
  await mongoose.connect(MONGO_URI);

  // Update ALL products to have the correct sellerId
  const result = await Product.updateMany(
    {},
    { $set: { sellerId: new mongoose.Types.ObjectId(SELLER_ID) } }
  );

  console.log(`Updated ${result.modifiedCount} products.`);
  await mongoose.disconnect();
}

updateSellerId().catch(console.error); 