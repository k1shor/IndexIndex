'use client'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { userRegister } from './api/userApi';

const Register = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        age: "",
        phone_number: "",
        temporary_address: "",
        permanent_address: "",
        gender: "",
        image: "",
        formdata: new FormData
    })
    let file_ref = useRef()

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    let { first_name, last_name, username, email, password, confirm_password, age, phone_number, temporary_address, permanent_address, gender, formdata } = user

    // let router = useRouter()

    const handleChange = (event) => {
        let value
        if (event.target.name === 'image') {
            value = event.target.files[0]
        }
        else {
            value = event.target.value
            setUser({
                ...user,
                [event.target.name]: value
            })
        }
        console.log(value)
        formdata.set(event.target.name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        userRegister(formdata)
            .then(data => {
                if (data.error) {
                    setSuccess(false)
                    setError(data.error)
                }
                else {
                    setSuccess(true)
                    setUser({
                        first_name: "",
                        last_name: "",
                        username: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                        age: "",
                        phone_number: "",
                        temporary_address: "",
                        permanent_address: "",
                        gender: "",
                    })
                    file_ref.current.value = ""
                    // router.push('/login')
                }
            })
            .catch(error => console.log(error))
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
                color: "#d33"
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
                text: 'User registered successfully. Please wait for email verification.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                color: "#64DD17"
            })
            setSuccess('')
        }
    }

    return (
        <>
            {showError()}
            {showSuccess()}
            <div className='register flex justify-center'>
                <form action="" className=' bg-blue-200 my-10 rounded-3xl opacity-80' onSubmit={handleSubmit}>
                    <div className=' pb-8 mt-5'>
                        <h1 className='text-2xl font-bold text-center'>Register Here</h1>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-16 place-items-center'>

                            <div className='sm:col-span-3'>
                                <label htmlFor="first_name" className='block text-md font-medium'>Firstname:</label>
                                <div className='mt-2'>
                                    <input type="text" id='first_name' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="first_name" value={first_name} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="lastname" className='block text-md font-medium'>Lastname:</label>
                                <div className='mt-2'>
                                    <input type="text" id='lastname' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="last_name" value={last_name} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="username" className='block text-md font-medium'>Username:</label>
                                <div className='mt-2'>
                                    <input type="text" id='username' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="username" value={username} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="email" className='block text-md font-medium'>Email:</label>
                                <div className='mt-2'>
                                    <input type="email" id='email' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="email" value={email} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="password" className='block text-md font-medium'>Password:</label>
                                <div className='mt-2'>
                                    <input type="password" id='password' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="password" value={password} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="confirmpassword" className='block text-md font-medium'>Confirm Password:</label>
                                <div className='mt-2'>
                                    <input type="password" id='confirmpassword' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="confirm_password" value={confirm_password} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="age" className='block text-md font-medium'>Age:</label>
                                <div className='mt-2'>
                                    <input type="number" id='age' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="age" value={age} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="phonenumber" className='block text-md font-medium'>Phone Number:</label>
                                <div className='mt-2'>
                                    <input type="tel" id='phonenumber' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="phone_number" value={phone_number} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="tempAddress" className='block text-md font-medium'>Temporary Address:</label>
                                <div className='mt-2'>
                                    <input type="text" id='tempAddress' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="temporary_address" value={temporary_address} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="permanentAddress" className='block text-md font-medium'>Permanent Address:</label>
                                <div className='mt-2'>
                                    <input type="text" id='permanentAddress' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="permanent_address" value={permanent_address} />
                                </div>
                            </div>

                            <div className='sm:col-span-4'>
                                <label htmlFor="gender" className='block text-md font-medium'>Gender:</label>
                                <span className="flex flex-col md:flex-row rounded-md py-1.5 md:px-8 px-4 text-sm md:text-lg mt-2 bg-white text-black">
                                    <div className='flex flex-row'>
                                        <input type="radio" name="gender" id="male" value='male' className='mr-2' onChange={handleChange} checked={gender === 'male'} />
                                        <label htmlFor="male" className="mr-3">male</label>
                                    </div>
                                    <div className='flex flex-row'>
                                        <input type="radio" name="gender" id="female" value='female' className='mr-2' onChange={handleChange} checked={gender === 'female'} />
                                        <label htmlFor="female" className="mr-3">female</label>
                                    </div>
                                    <div className='flex flex-row'>
                                        <input type="radio" name="gender" id="others" value='others' className='mr-2' onChange={handleChange} checked={gender === 'others'} />
                                        <label htmlFor="others" className="mr-2">other</label>
                                    </div>
                                </span>
                            </div>

                            <div className='sm:col-span-4'>
                                <label htmlFor="image" className='block text-md font-medium'>Profile Photo:</label>
                                <div className='mt-2'>
                                    <input type="file" id='image' onChange={handleChange} className='block w-full rounded-md bg-white border-0 py-1.5 text-sm md:text-lg' name="image" ref={file_ref} />
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className='text-center pb-10 text-md font-semibold'>
                        <button className='rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-500'>Register</button>
                        <p>Already have an Account? <Link href={"/login"} className='text-blue-500 '>Login</Link></p>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Register