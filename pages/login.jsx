'use client'
import React, { useState } from 'react'
import { GiThreeLeaves } from 'react-icons/gi';
import { FaUnlockKeyhole } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { authenticate, userLogin } from './api/userApi';

const login = () => {
    const [formData, setFormData] = useState({})
    const [showPassword, setShowPassword] =useState(false)
    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)


    let router = useRouter()

    let { email, password } = formData

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        // console.log(formData)
        event.preventDefault()

        if (email == null || password == null) {
            setError("Please enter all required fields")
        }
        else {
            userLogin(formData)
                .then(data => {
                    if (data.error) {
                        setSuccess(false)
                        setError(data.error)
                    }
                    else {
                        setError('')
                        setSuccess(true)
                        setFormData({
                            email: "",
                            password: ""
                        })
                        authenticate(data)
                    }
                })
                .catch(error => console.log(error))

        }

    }


    const showError = () => {
        if (error) {
            Swal.fire({
                icon: "error",
                toast: true,
                title: "error",
                text: error,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                color: "#d33",
            })
            setError('')
        }
    }

    const showSuccess = () => {
        if (success) {
            Swal.fire({
                icon: "success",
                toast: true,
                title: "success",
                text: "Login Successfull",
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                color: "#64DD17"
            })
            setSuccess('')
            return router.push('/admin')
        }
    }

    return (
        <div>
            {showError()}
            {showSuccess()}

            <div className='log_in flex justify-center text-center items-center font-serif '>
                <div className='circle lg:border-8 border-4 bg-blue-200 opacity-80 md:p-20 p-10' >
                    <div className='flex justify-center md:text-3xl text-xl font-bold'>Log < GiThreeLeaves className='text-blue-700 ml-1 mr-1' /> In</div>
                    <div className='m-9 md:m-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='m-2 '>
                            <div className='flex p-1 font-3 md:text-lg test-sm '>
                                Email: <MdEmail className='mt-1 ml-2 ' />
                            </div>
                            <input type="text" name="email" id="email" placeholder="Enter your email.." onChange={handleChange} className=' rounded-md py-1.5 md:w-full w-72 placeholder:p-1 p-4 bg-white text-sm md:text-xl' required />
                        </label>
                        <label htmlFor="password" className='m-2'>
                            <div className='flex p-1 md:text-lg test-sm'>
                                Password: <FaUnlockKeyhole className='mt-1 ml-2' />
                            </div>
                            <div className='relative'>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter your password..." onChange={handleChange} className=' rounded-md py-1.5 md:w-full w-72 placeholder:p-1 p-4 bg-white text-sm md:text-xl absolute top-0 left-0' required />
                        
                                {showPassword ? <IoIosEye type="button"
                            aria-label={
                                showPassword ? "Password Visible" : "Password Invisible."
                            }
                            onClick={()=>{
                                setShowPassword((prev)=>!prev)
                            }}
                            className='absolute right-3 top-1/2 translate-y-1/2 text-xl' /> : <IoIosEyeOff type="button"
                            aria-label={
                                showPassword ? "Password Visible" : "Password Invisible."
                            }
                            onClick={()=>{
                                setShowPassword((prev)=>!prev)
                            }}
                            className='absolute right-3 top-1/2 translate-y-1/2 text-xl' />}
                            </div>
                        </label>
                    </div>
                    <div className='flex justify-around'>
                        <div className=''>
                        <input type="checkbox" name="remember" onChange={handleChange} id="remember" className='ml-1' />
                        <label htmlFor='remember' className='md:text-md test-xs ml-1' >REMEMBER</label>
                        </div>
                        <a href="/users/forgetpassword" className='md:text-md test-xs'>FORGET PASSWORDS</a>
                    </div>
                    <button onClick={handleSubmit} className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-indigo-500 mt-4 font-semibold text-sm md:text-lg"><a href="#" className='text-white hover:text-black '>Login</a></button>
                    <p>Don't have an account? <Link href={"/register"} className='text-blue-500 font-semibold text-sm md:text-md'>Register</Link></p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default login
