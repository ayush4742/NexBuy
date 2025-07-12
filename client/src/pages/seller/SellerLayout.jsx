import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const SellerLayout = () => {
    const { axios, navigate } = useAppContext();
    
    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const handleLogout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Logout failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white sticky top-0 z-10">
                <Link to="/">
                    <img src={assets.logo} alt="NexBuy Logo" className="cursor-pointer w-34 md:w-38" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button 
                        onClick={handleLogout}
                        className='border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition-colors'
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex">
                <div className="md:w-64 w-16 border-r border-gray-300 min-h-[calc(100vh-64px)] pt-4 flex flex-col bg-white">
                    {sidebarLinks.map((item) => (
                        <NavLink 
                            to={item.path} 
                            key={item.name} 
                            end={item.path === "/seller"}
                            className={({isActive}) => 
                                `flex items-center py-3 px-4 gap-3 transition-colors
                                ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            <img src={item.icon} alt={item.name} className="w-7 h-7" />
                            <span className="md:block hidden">{item.name}</span>
                        </NavLink>
                    ))}
                </div>
                <div className="flex-1 p-4 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;