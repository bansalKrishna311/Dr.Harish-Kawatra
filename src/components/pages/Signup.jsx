import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log(formData);

    

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4000/api/v1/signup',
                formData
            );
            if (response.status === 200) {
                alert('Signup successful');
            }
        } catch (err) {
            console.error(err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(err.response.data.message || 'Signup failed');
            } else if (err.request) {
                // The request was made but no response was received
                toast.error('No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('Error in signup request');
            }
        }
    };

    return (
        <div
            className="h-[48.325rem]">
            <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Sign up
                    </h1>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 pb-4 pt-8 sm:rounded-lg bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-md sm:px-10 sm:pb-6 sm:shadow">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 placeholder-gray-400 shadow-sm sm:text-sm"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <FiEye className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <FiEyeOff className="h-5 w-5 text-gray-400" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300  dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2"
                                    />
                                    <label
                                        htmlFor="remember_me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a
                                        href="/"
                                        className="font-medium text-black-600 hover:text-black-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                      
                    
                    </div>
                    <div className="m-auto mt-6 w-fit md:mt-8">
                        <span className="m-auto text-gray-500">Already have an account? <Link to="/" className="font-bold text-black underline">Login</Link></span>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Signup;
