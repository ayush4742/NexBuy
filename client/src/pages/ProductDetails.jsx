import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";  // Fixed import path

const ProductDetails = () => {
    const { products, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const product = products.find((item) => item._id === id);

    // ... rest of your component code

    useEffect(() => {
        if (products.length > 0 && product) {
            const productsCopy = products
                .filter((item) => 
                    product.category === item.category && 
                    item._id !== product._id &&
                    item.inStock
                )
                .slice(0, 5);
            setRelatedProducts(productsCopy);
        }
    }, [products, product]);

    useEffect(() => {
        if (product?.image?.[0]) {
            setThumbnail(product.image[0]);
        }
    }, [product]);

    if (!product) {
        return <div className="text-center py-12">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8">
                <ol className="flex items-center gap-1 text-sm text-gray-600">
                    <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
                    <li>/</li>
                    <li><Link to="/products" className="hover:text-indigo-600">Products</Link></li>
                    <li>/</li>
                    <li><Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-indigo-600">
                        {product.category}
                    </Link></li>
                    <li>/</li>
                    <li className="text-indigo-600 font-medium">{product.name}</li>
                </ol>
            </nav>

            {/* Product Main Section */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Image Gallery */}
                <div className="lg:w-1/2">
                    <div className="sticky top-4">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                            <img
                                src={thumbnail || product.image[0]}
                                alt={product.name}
                                className="w-full h-full object-contain p-6"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto py-2">
                            {product.image.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setThumbnail(image)}
                                    className={`flex-shrink-0 w-16 h-16 border rounded-lg overflow-hidden transition-all ${
                                        thumbnail === image 
                                            ? 'border-indigo-500 ring-2 ring-indigo-200' 
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center mt-3">
                        <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                                    alt={i < product.rating ? "Filled star" : "Empty star"}
                                    className="w-5 h-5"
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            {product.rating} ({product.reviewCount || 0} reviews)
                        </span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold text-gray-900">
                                {currency}{product.offerPrice}
                            </p>
                            {product.price > product.offerPrice && (
                                <>
                                    <span className="text-lg text-gray-500 line-through">
                                        {currency}{product.price}
                                    </span>
                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                        Save {Math.round((1 - product.offerPrice/product.price) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                    </div>

                    {/* Description */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
                        <ul className="space-y-3">
                            {product.description.map((item, index) => (
                                <li key={index} className="flex">
                                    <span className="text-indigo-500 mr-2">•</span>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => addToCart(product._id)}
                            className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {
                                addToCart(product._id);
                                navigate('/cart');
                            }}
                            className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-16">
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-2xl font-bold">Related Products</h2>
                        <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <button 
                        onClick={() => {
                            navigate('/products');
                            window.scrollTo(0, 0);
                        }}
                        className="mx-auto block mt-12 px-12 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                    >
                        View All Products
                    </button>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;