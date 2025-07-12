import React from 'react'
import { useAppContext } from '../context/AppContext';
import ReactDOM from 'react-dom';

const Login = () => {
    const { setShowUserLogin, setUser, axios } = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (state === "register") {
                // Call register endpoint
                const response = await axios.post('/api/user/register', { name, email, password });
                data = response.data;
            } else {
                // Call login endpoint
                const response = await axios.post('/api/user/login', { email, password });
                data = response.data;
            }
            if (data.success) {
                setUser(data.user);
                setShowUserLogin(false);
            } else {
                alert(data.message || (state === "register" ? "Signup failed" : "Login failed"));
            }
        } catch (err) {
            alert((state === "register" ? "Signup error: " : "Login error: ") + (err.response?.data?.message || err.message));
        }
    };

    return ReactDOM.createPortal(
        <div onClick={() => setShowUserLogin(false)} className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium text-center">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input 
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            placeholder="type here" 
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                            type="text" 
                            required 
                        />
                    </div>
                )}
                
                <div className="w-full">
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder="type here" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                        type="email" 
                        required 
                    />
                </div>
                
                <div className="w-full">
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder="type here" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                        type="password" 
                        required 
                    />
                </div>
                
                <div className="text-center">
                    {state === "register" ? (
                        <p>
                            Already have account?{' '}
                            <button
                                type="button"
                                onClick={() => setState("login")}
                                className="text-primary cursor-pointer hover:underline"
                            >
                                click here
                            </button>
                        </p>
                    ) : (
                        <p>
                            Create an account?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setState("register");
                                    setName("");
                                    setEmail("");
                                    setPassword("");
                                }}
                                className="text-primary cursor-pointer hover:underline"
                            >
                                click here
                            </button>
                        </p>
                    )}
                </div>
                
                <button 
                    type="submit"
                    className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
                >
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>,
        document.body
    );
}

export default Login;