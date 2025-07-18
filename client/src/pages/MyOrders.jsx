import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currency, axios } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/order/user');
            if (data.success && data.orders) {
                setMyOrders(data.orders);
            } else {
                setMyOrders([]);
            }
        } catch (error) {
            setMyOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    if (loading) {
        return <div className="mt-16 text-center">Loading your orders...</div>;
    }

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {myOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
                    <div className="mb-4 text-lg">You haven’t placed any orders yet.</div>
                    <button
                        onClick={() => window.location.href = '/products'}
                        className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition"
                    >
                        Shop Now
                    </button>
                </div>
            )}
            {myOrders.map((order, index) => (
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>Total Amount : {currency}{order.amount}</span>
                    </p>
                    {order.items.map((item, itemIndex) => (
                        <div 
                            key={itemIndex}
                            className={`relative bg-white text-gray-500/70 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl ${
                                order.items.length !== itemIndex + 1 ? "border-b border-gray-300" : ""
                            }`}
                        >
                            <div className='flex items-center mb-4 md:mb-0'>
                                <div className='bg-primary/10 p-4 rounded-lg'>
                                    <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                                </div>
                                <div className='ml-4'>
                                    <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                    <p>Category: {item.product.category}</p>
                                </div>
                            </div>

                            <div className='text-primary text-lg font-medium'>
                                <p>Quantity: {item.quantity || "1"}</p>
                                <p>Status: {order.status}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className='text-primary text-lg font-medium'>
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MyOrders;