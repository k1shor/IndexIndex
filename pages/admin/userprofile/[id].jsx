'use client'
import { userDetail, userUpdate } from '@/pages/api/userApi'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

const API = "https://api.indexithub.com/api"

const Profile = () => {
    // let router = useRouter()

    const [activeSection, setActiveSection] = useState('overview')
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        age: '',
        position: '',
        phonenumber: '',
        tempAddress: '',
        permanentAddress: '',
        gender: '',
        image: '',
        about: '',
        formdata: new FormData
    })

    // let router = useRouter()
    let file_ref = useRef()

    // let id  = useParams()?.id ? useParams()?.id : router.push('/login')

    let id = useParams()?.id


    let [token,setToken] = useState('')

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    let {
        gender, formdata
    } = user

    useEffect(() => {
        getToken()
            .then(data =>
                setToken(data)
        
            )

        async function getToken() {
            token = await localStorage.getItem("token")
            return token
        }
        userDetail(id, token)
            .then(data => {
                if (data?.error) {
                    console.log(data.error)
                }
                else {
                    setUser({
                        ...user,
                        ...data,
                        formdata: new FormData
                    })
                    for (var key in data) {
                        formdata.set(key, data[key])
                    }
                }
            })
    }, [])

    const handleUpdateChange = (event) => {
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
        formdata.set(event.target.name, value)
    }

    const handleUpdateSubmit = (event) => {
        event.preventDefault()
        userUpdate(id, formdata, token)
            .then(data => {
                if (data?.error) {
                    setSuccess(false)
                    setError(data.error)
                }
                else {
                    setSuccess(true)
                    file_ref.current.value = ""
                    setActiveSection('overview')
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
                text: 'user updated successfully.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                color: "#64DD17"
            })
            setSuccess('')
        }
    }

    if (!user) {
        return <div>Loading user</div>
    }

    const handleSectionChange = (section) => {
        setActiveSection(section)
    }

    let sectionContent = null;

    switch (activeSection) {
        case 'overview':
            sectionContent = (
                <>
                    <div className='mt-6 ' >
                        <h1 className='font-bold '>General Information</h1>
                        <div className='mb-5 mx-1 lg:mx-16'> About:
                            <p className='rounded-md p-5 mt-2 bg-gray-100'>{user.about}</p>
                        </div>
                        <div className='lg:columns-3 mt-5 md:columns-2 columns-1 font-light mx-1 lg:mx-16'>
                            <div className='mb-5'>Full Name:
                                <h1 className='capitalize font-medium'>{user.firstname} {user.lastname}</h1>
                            </div>
                            <div className='mb-5'>Username:
                                <h1 className='font-medium'>{user.username}</h1>
                            </div>
                            <div className='mb-5'>Position:
                                <h1 className='capitalize font-medium'>{user.position}</h1>
                            </div>
                            <div className='mb-5'>Age:
                                <h1 className='font-medium'>{user.age}</h1>
                            </div>
                            <div className='mb-5'>Gender:
                                <h1 className='capitalize font-medium'>{user.gender}</h1>
                            </div>
                            <div className='mb-5'>Mobile:
                                <h1 className='font-medium'>{user.phonenumber}</h1>
                            </div>
                            <div className='mb-5'>Email:
                                <h1 className='font-medium'>{user.email}</h1>
                            </div>
                            <div className='mb-5'>Temporary Address:
                                <h1 className='capitalize font-medium'>{user.address?.tempAddress}</h1>
                            </div>
                            <div className='mb-5'>Permanent Address:
                                <h1 className='capitalize font-medium'>{user.address?.permanentAddress}</h1>
                            </div>
                        </div>
                    </div>
                </>
            )
            break;
        case 'editprofile':
            sectionContent = (
                <>
                    <div className='mt-6'>
                        {showError()}
                        {showSuccess()}
                        <form action="" className=' rounded-3xl'>
                            <div className=' pb-5 mt-5'>
                                <h1 className='font-bold'>Update Profile</h1>

                                <div className='mt-10 grid grid-cols-1 gap-y-5 sm:grid-cols-6 mx-1 lg:mx-16 place-items-start'>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="firstname" className='block text-md font-medium tracking-tighter '>Firstname:</label>
                                        <div className='mt-2'>
                                            <input type="text" id='firstname' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md tracking-tighter' name="firstname" value={user.firstname} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="lastname" className='block text-md font-medium'>Lastname:</label>
                                        <div className='mt-2'>
                                            <input type="text" id='lastname' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="lastname" value={user.lastname} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="username" className='block text-md font-medium'>Username:</label>
                                        <div className='mt-2'>
                                            <input type="text" id='username' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="username" value={user.username} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="email" className='block text-md font-medium'>Email:</label>
                                        <div className='mt-2'>
                                            <input type="email" id='email' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="email" value={user.email} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="age" className='block text-md font-medium'>Age:</label>
                                        <div className='mt-2'>
                                            <input type="number" id='age' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="age" value={user.age} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="position" className='block text-md font-medium'>Position:</label>
                                        <div className='mt-2'>
                                            <input type="text" id='position' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="position" value={user.position} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="phonenumber" className='block text-md font-medium'>Phone Number:</label>
                                        <div className='mt-2'>
                                            <input type="tel" id='phonenumber' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="phonenumber" value={user.phonenumber} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="tempAddress" className='block text-md font-medium'>Temporary Address:</label>
                                        <div className='mt-2'>
                                            <input type="text" id='tempAddress' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="tempAddress" value={user.address?.tempAddress} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="permanentAddress" className='block text-md font-medium'>Permanent Address:</label>
                                        <div className='mt-2'>
                                            <input type="text" id='permanentAddress' onChange={handleUpdateChange} className='block w-full font-light rounded-md border-0 py-1.5 sm:text-md' name="permanentAddress" value={user.address?.permanentAddress} />
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor='image' className='block text-md font-medium'>Profile Image:</label>
                                        <input type='file' id='image' name='image' className='hidden' onChange={handleUpdateChange} ref={file_ref} />
                                        <button
                                            type="button"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => file_ref.current.click()} // Trigger file input click when the button is clicked
                                        >
                                            Choose File
                                        </button>
                                    </div>

                                    <div className='sm:col-span-4'>
                                        <label htmlFor="gender" className='block text-md font-medium'>Gender:</label>
                                        <span className="flex flex-col md:flex-row rounded-md py-1.5 md:px-12 px-4 text-sm md:text-lg mt-2 bg-gray-100 text-black">
                                            <div className='flex flex-row'>
                                                <input type="radio" name="gender" id="male" value='male' className='mr-2 font-light' onChange={handleUpdateChange} checked={gender === 'male'} />
                                                <label htmlFor="male" className="mr-3">male</label>
                                            </div>
                                            <div className='flex flex-row'>
                                                <input type="radio" name="gender" id="female" value='female' className='mr-2 font-light' onChange={handleUpdateChange} checked={gender === 'female'} />
                                                <label htmlFor="female" className="mr-3">female</label>
                                            </div>
                                            <div className='flex flex-row'>
                                                <input type="radio" name="gender" id="others" value='others' className='mr-2 font-light' onChange={handleUpdateChange} checked={gender === 'others'} />
                                                <label htmlFor="others" className="mr-2">other</label>
                                            </div>
                                        </span>
                                    </div>

                                </div>

                                <div className='m-0 lg:m-14'>
                                    <label htmlFor="about" className='block text-md font-medium'>About:</label>
                                    <div className='mt-2 '>
                                        <textarea type="text" id='about' onChange={handleUpdateChange} className='bg-gray-100 block w-full font-light rounded-md border-0 text-justify sm:text-md md:h-32 md:mb-3 h-28 resize-none' name="about" value={user.about} />
                                    </div>
                                </div>

                            </div>

                            <div className='text-center pb-5 text-md font-semibold'>
                                <button onClick={handleUpdateSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><a href="#" className=' hover:text-white'>Update change</a></button>
                            </div>
                        </form>
                    </div>
                </>
            )
            break;
        default:
            sectionContent = null;
    }

    return (
        <>
            <div className='ms-8 md:w-5/6 w-11/12 mb-5' style={{ minHeight: "83.7vh" }}>
                <div className='bg-white p-2 rounded-lg lg:ms-0 '>
                    <div className='lg:flex lg:justify-between text-xs lg:text-lg lg:columns-2 columns-1'>
                        <h1>Profile</h1>
                        <ol className='flex'>
                            <li>
                                <Link href={'#'}>Dashboard</Link>
                            </li>
                            <li className='mr-2 ml-2'>/</li>
                            <li>User Profile</li>
                        </ol>
                    </div>
                </div>

                <div className='md:flex mt-5 '>
                    <div className='mb-2 '>
                        <div className='flex flex-col justify-center items-center p-5 ms-0 lg:ms-5 bg-white rounded-lg font-bold'>
                            <img src={`${API}/${user.image}`} alt={user.image} className='h-56 rounded-md' />
                            <h1 className='mb-1 mt-2 capitalize'>{user.firstname} {user.lastname}</h1>
                            <h1 className='capitalize'>{user.position}</h1>
                        </div>
                    </div>
                    <div className='bg-white ms-0 lg:ms-8 p-5 rounded-xl lg:w-9/12 text-xs md:text-md lg:text-lg'>
                        <div className='columns-1 lg:columns-2 border-b border-dashed border-b-gray-700 pb-2'>
                            <h1 className='hover:text-blue-600 hover:underline hover:underline-offset-2' onClick={() => handleSectionChange('overview')}>Overview</h1>
                            <h1 className='hover:text-blue-600 hover:underline hover:underline-offset-2' onClick={() => handleSectionChange('editprofile')}>Edit Profile</h1>
                        </div>
                        {sectionContent}
                    </div>
                </div>
            </div>



        </>
    )
}

export default Profile