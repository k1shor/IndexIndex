'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { getCareerDetails, view_career } from '../api/careerAPI';
import { applyCareer } from '../api/applyCareerAPI';
import career from '.';

export async function getStaticPaths(){
    let res = await view_career()
    // console.log("res:",res)

    let paths = res.map(careers => {
        return { params : {applycareer : careers._id} }
    })

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({params}){
    const {applycareer} = params
    const careers = await getCareerDetails(applycareer)
    // console.log('careers: ',careers)

    return { props: {careers}}
}

const ApplyCareer = ({careers}) => {
    // const [careers, setCareers] = useState({})
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        quaalification: "",
        experience: "",
        image: "",
        // curriculum_vitae:"",
        reference: "",
        formdata: new FormData
    })

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    // const params = useParams()
    // const id = params?.applycareer

    // useEffect(() => {
    //     getCareerDetails(id)
    //         .then(data => {
    //             if (data?.error) {
    //                 console.log(data.error)
    //             }
    //             else {
    //                 console.log(data)
    //                 setCareers(data)
    //             }
    //         })
    // }, [id])


    let file_ref = useRef()
    let { first_name, last_name, email, phone_number, qualification, experience, image, reference, formdata } = formData

    const handleChange = (event) => {
        let value
        if (event.target.name === 'image') {
            value = event.target.files[0]
        }
        else {
            value = event.target.value
            setFormData({
                ...formData,
                [event.target.name]: value
            })
        }
        console.log(value)
        formdata.set(event.target.name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        formdata.set('career', careers._id)
        applyCareer(formdata)
            .then(data => {
                if (data.error) {
                    setSuccess(false)
                    setError(data.error)
                }
                else {
                    setError('')
                    setSuccess(true)
                    setFormData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone_number: "",
                        qualification: "",
                        experience: "",
                        image: "",
                        // curriculum_vitae:"",
                        reference: "",
                        formdata: new FormData
                    })
                    file_ref.current.value = ""
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
                text: 'Your form is Submitted successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                color: "#64DD17"
            })
            setSuccess('')
            // return router.push("/career")
        }
    }

    return (
        <>
            {showError()}
            {showSuccess()}
            <div className='flex justify-center text-[#13294b] lfooter'>
                <form action="" className='my-10 rounded-3xl shadow-2xl md:w-6/12 sm:w-8/12 w-11/12 card-hover p-5' onSubmit={handleSubmit}>
                    <div className=' pb-8 mt-5 '>
                        <h1 className='text-2xl font-bold text-center capitalize'>Apply Here for "{careers?.career_title}"</h1>

                        <div className='mt-10 mx-5 place-items-center'>
                            <div className='sm:col-span-3'>
                                <label htmlFor="first_name" className='block text-md font-medium'>Firstname:</label>
                                <div className='mb-2 '>
                                    <input type="text" id='first_name' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="first_name" value={first_name} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="last_name" className='block text-md font-medium'>Lastname:</label>
                                <div className='mb-2'>
                                    <input type="text" id='last_name' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name="last_name" value={last_name} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="email" className='block text-md font-medium'>Email:</label>
                                <div className='mb-2'>
                                    <input type="email" id='email' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md outline-none px-2.5' name="email" value={email} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="phone_number" className='block text-md font-medium'>Phone Number:</label>
                                <div className='mb-2'>
                                    <input type="tel" id='phone_number' onChange={handleChange} className='w-full rounded-md border-0 py-1.5 sm:text-md outline-none px-2.5' name="phone_number" value={phone_number} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="qualification" className='block text-md font-medium'>Qualification:</label>
                                <div className='mb-2'>
                                    <textarea type="text" id='qualification' onChange={handleChange} className='border-0 py-1.5 md:text-lg rounded-md md:h-44 md:mb-3 h-32 w-full resize-none outline-none px-2.5' name="qualification" value={qualification} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="experience" className='block text-md font-medium'>Experience</label>
                                <div className='mb-2'>
                                    <textarea type="text" id='experience' onChange={handleChange} className='border-0 p-1 md:text-lg rounded-md md:h-44 md:mb-3 h-32 w-full resize-none outline-none px-2.5' name="experience" value={experience} />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="image" className='block text-md font-medium'>Image</label>
                                <div className='mb-2'>
                                    <input type="file" id='image' name='image' onChange={handleChange} className='border-2 bg-white p-1 md:text-lg rounded-md  w-full outline-none' ref={file_ref} />
                                </div>
                            </div>

                            {/* <div className='sm:col-span-3'>
                                <label htmlFor="curriculum_vitae" className='block text-md font-medium'>curriculum vitae(CV)</label>
                                <div className='mb-2'>
                                    <input type="file" id='curriculum_vitae' name='curriculum_vitae' onChange={handleChange} className='border-2 bg-white p-1 md:text-lg rounded-md  w-full' ref={file_ref} />
                                </div>
                            </div> */}

                            <div className='sm:col-span-3'>
                                <label htmlFor="reference" className='block text-md font-medium'>Reference</label>
                                <div className='mb-2'>
                                    <input type="text" id='reference' onChange={handleChange} className='block w-full rounded-md border-0 py-1.5 sm:text-md' name='reference' value={reference} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='text-center pb-10 text-md font-semibold'>
                        <button className='rounded-md bg-[#007fae] px-5 py-2 text-white hover:bg-[#13294b]'>Apply</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ApplyCareer