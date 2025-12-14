import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            await api.post("/api/auth/register", data);
            toast.success("Registration Successful! Please login.");
            reset();
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || "Registration Failed!");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 py-8'>
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] bg-white shadow-2xl py-10 sm:px-10 px-6 rounded-2xl">
                <div className="text-center mb-6">
                    <span className="text-5xl">🍭</span>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mt-3">
                        Join Sweet Shop!
                    </h1>
                    <p className="text-gray-500 mt-2">Create your account to get started</p>
                </div>

                <hr className='mb-6 border-gray-200' />

                <div className="flex flex-col gap-4">
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Choose a username"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required (min 6 characters)"
                        placeholder="Choose a password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='bg-gradient-to-r from-pink-500 to-purple-500 font-semibold text-white w-full py-3 hover:from-pink-600 hover:to-purple-600 transition-all rounded-xl my-6 shadow-lg hover:shadow-xl disabled:opacity-50'>
                    {loader ? "Creating Account..." : "Create Account"}
                </button>

                <p className='text-center text-gray-600'>
                    Already have an account?{' '}
                    <Link
                        className='font-semibold text-pink-600 hover:text-purple-600 transition-colors'
                        to="/login">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage;