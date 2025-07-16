import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success && data.orders) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-5 p-5 max-w-4xl rounded-md border border-gray-300">
            <div className="flex gap-5 max-w-80">
              <img className="w-12 h-12 object-cover opacity-60" src={assets.box_icon} alt="box" />
              <div className="flex flex-col gap-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60 flex-1">
              <p className='text-black/80'>
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>{order.address?.street}, {order.address?.city}</p>
              <p>{order.address?.state}, {order.address?.zipcode}, {order.address?.country}</p>
              <p>{order.address?.phone}</p>
            </div>

            <div className="flex flex-col items-end gap-4">
              <p className="font-medium text-base text-black/70">
                {currency}{order.amount}
              </p>
              
              <div className="flex flex-col text-sm text-right">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;