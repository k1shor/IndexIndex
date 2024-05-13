'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { alluser, deleteUser } from '../api/userApi'
import { useRouter } from 'next/navigation'

const API = "https://api.indexithub.com/api"

const AllUsers = () => {
    let [users, setUsers] = useState([])
    let [success, setSuccess] = useState(false)

    let [token,setToken] = useState('')
    let router = useRouter()


    useEffect(() => {
        getToken()
            .then(data =>
                setToken(data)
            )

        async function getToken() {
            token = await localStorage.getItem("token")  ? localStorage.getItem("token") : router.push('/login') 
    // localStorage.getItem('token') ? setToken(localStorage.getItem('token')) : router.push('/login')

            return token
        }
        alluser(token)
            .then(data => {
                if (data?.error) {
                    console.log(data.error)
                }
                else {  
                    console.log(data)
                    setUsers(data)
                }
            })
    }, [success])


    const handleDelete = id => (event) => {
        event.preventDefault()
        setSuccess(false)
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3138D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            width: "35%"
        }).then(result => {
            if (result.isConfirmed) {
                deleteUser(id, token)
                    .then(data => {
                        if (data.error) {
                            Swal.fire({
                                title: "Error!",
                                text: data.error,
                                icon: "error",
                                showConfirmButton: false,
                                timer: 3000
                            })
                        }
                        else {
                            Swal.fire({
                                title: "Success!",
                                text: data.msg,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 3000
                            })
                        }
                    })
                    .catch(
                        Swal.fire("Something went wrong!")
                    )
                setSuccess(true)
            }
        })

    }

    return (
        <>
            {
                token ?
                <>
                    <div className='ms-8 md:w-5/6 w-11/12' style={{ minHeight: "82.3vh" }} >
                    <div className='bg-white p-2 rounded-lg ms-5 lg:ms-0 '>
                            <div className='lg:flex lg:justify-between text-xs lg:text-lg lg:columns-2 columns-1'>
                                <h1>User Details</h1>
                                <ol className='flex'>
                                    <li>
                                        <Link href={'#'}>Dashboard</Link>
                                    </li>
                                    <li className='mr-2 ml-2'>/</li>
                                    <li>User Details</li>
                                </ol>
                            </div>
                        </div>  
                            <div className='p-4 '>
                                <table className='bg-white w-full rounded-lg divide-y divide-gray-200'>
                                    <thead className=' w-full'>
                                        <tr className='w-full bg-gray-100'>
                                            <th className='py-3 ps-4 text-left text-xs lg:text-xl font-medium w-1/12'>S.No.</th>
                                            <th className=' px-5 lg:px-6 py-3 text-left text-xs lg:text-xl font-medium uppercase w-1/2 lg:w-1/6'>Name</th>
                                            <th className='px-3 lg:px-6 py-3 text-left text-xs lg:text-xl font-medium uppercase w-1/12'>Age</th>
                                            <th className='px-3 lg:px-6 py-3 text-left text-xs lg:text-xl font-medium uppercase w-1/2 lg:w-1/6'>Address</th>
                                            <th className='px-3 lg:px-6 py-3 text-left text-xs lg:text-xl font-medium uppercase w-1/2 lg:w-1/6'>Position</th>
                                            <th className='px-3 lg:px-6 py-3 text-left text-xs lg:text-xl font-medium uppercase w-1/12'>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className='divide-y divide-gray-200'>
                                        {
                                            users && users.map((user, i) => {
                                                return <tr key={user._id}>
                                                    <td className='py-3 ps-6 w-1/12'>{i + 1}</td>
                                                    <td className='tracking-tight px-5 lg:px-6 py-3 w-1/2 lg:w-1/6 text-xs lg:text-lg capitalize'>
                                                        <img src={`${API}/${user.image}`} alt={user.image} className='user-image' />
                                                        {user.firstname} {user.lastname}</td>
                                                    <td className='tracking-tight px-3 lg:px-6 py-3 text-xs lg:text-lg w-1/2 lg:w-1/6'>{user.age}</td>
                                                    <td className='tracking-tight px-3 lg:px-6 py-3 text-xs lg:text-lg w-1/2 lg:w-1/6'>{user.address.tempAddress}</td>
                                                    <td className='tracking-tight px-3 lg:px-6 py-3 text-xs lg:text-lg capitalize w-1/2 lg:w-1/6'>{user.position}</td>
                                                    <td className='px-3 lg:px-6 py-3 text-xs lg:text-lg w-1/12'>
                                                        <button className='text-red-600' onClick={handleDelete(user._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                    </div>                
                </>
                :
                <>
                    LOADING...
                </>
                
            }
        </>
    )
}

export default AllUsers