import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { 
                    resource_type: 'image' 
                });
                return result.secure_url
            })
        )

        // Get sellerId from req.seller (set by authSeller middleware)
        const sellerId = req.seller.id;
        console.log('Adding product with sellerId:', sellerId); // Debug log

        await Product.create({ ...productData, image: imagesUrl, sellerId });
        res.json({success: true, message: 'Product Added'})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get Product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Product by ID : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await Product.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => { 
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Stock Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};