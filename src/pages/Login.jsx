import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (email && password) {
            try {
                const response = await axios.post(
                    "http://localhost:4000/api/v1/login",
                    { email, password }
                );
                if (response.status === 200) {
                    handleLogin(response.data); 
                    toast.success("Login successful");
                    window.location = "/"; 
                }
            } catch (err) {
                console.error(err);
                toast.error("Login failed");
            }
        } else {
            toast.error("Email and password are required");
        }
    };


    return (
        <div className='h-[48.325rem]'>
            <div>
                <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                        <h1 className="text-3xl font-extrabold text-gray-900">Login</h1>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white px-4 pb-4 pt-8 sm:rounded-lg bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-md sm:px-10 sm:pb-6 sm:shadow">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            type="text"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 rounded border-gray-300 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2" />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="/" className="font-medium text-black-600 hover:text-black-500">Forgot your password?</a>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                        Login
                                    </button>
                                </div>
                            </form>
                     
                            <div className="m-auto mt-6 w-fit md:mt-8">
                                <span className="m-auto text-gray-500">Don't have an account?
                                    <Link to="/Signup" className="font-bold text-black underline">Create Account</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
};

export default Login;
