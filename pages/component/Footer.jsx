import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaChevronRight, FaMapMarkerAlt, FaPhoneAlt} from 'react-icons/fa'
import { IoIosMail, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";
import { sendEmail } from '../api/normalUserAPI';
import Swal from 'sweetalert2';

const Footer = () => {
  let [email, setEmail] = useState("")
  let [error, setError] = useState('')
  let [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    setEmail(
      event.target.value
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendEmail(email)
      .then(data => {
        if (data.error) {
          setSuccess(false)
          setError(data.error)
        }
        else {
          setError('')
          setSuccess(true)
          setEmail("")
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
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            color: "#d33"
        })
        setError('')
        return <div>{error}</div>
    }
}
const showSuccess = () => {
    if (success) {
        Swal.fire({
            icon: "success",
            toast: true,
            title: "success",
            text: 'Thank you for your Interest',
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            color: "#64DD17"
        })
        setSuccess('')
        return <div>{success}</div>
    }
}
  return (
    <footer>
      {showSuccess()}
      {showError()}
      <div className='bg-[#5ce1e6] text-white'>
        <div className='max-w-7xl mx-auto p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            <div className=' p-4' >
            <Link href="/">
                        <Image src={'/logo.png '} alt='Logo' width={150} height={50} className='cursor-pointer' priority />
                        {/* <h1>Index It Hub</h1> */}
                    </Link>
              <div className=' pt-2'>
                <h1><span className='font-bold'>IN</span>novate</h1>
                <h1><span className='font-bold'>D</span>evelop</h1>
                <h1><span className='font-bold'>EX</span>plore</h1>
              </div>
            </div>
            <div className=' p-4'>
              <h1 className='uppercase mb-3 text-xl'>Quick link</h1>
              <ul >
                <li className='flex pb-2 hover:text-[#13294b]'>
                  <FaChevronRight size={15} className='m-1' />
                  <a href="/about" className='ml-1'>About</a>

                </li>
                <li className='flex pb-2 hover:text-[#13294b]'>
                  <FaChevronRight size={15} className='m-1' />
                  <a href="/contact" className='ml-1'>Contact</a>
                </li>
                <li className='flex pb-2 hover:text-[#13294b]'>
                  <FaChevronRight size={15} className='m-1' />
                  <a href="/career" className='ml-1'>Career</a>
                </li>
              </ul>
            </div>
            <div className=' p-4'>
              <h1 className='uppercase mb-3 text-xl'>Contact</h1>
              <ul className='flex flex-col'>
                <li className='flex pb-2'>
                  <FaMapMarkerAlt size={15} className='m-1' />
                  <span className='ml-1'>Kathmandu, Nepal</span>
                </li>
                <li className='flex pb-2'>
                  <IoIosMail size={17} className='m-1' />
                  <span className='ml-1'>info@indexithub.com</span>
                </li>
                <li className='flex pb-2'>
                  <FaPhoneAlt size={15} className='m-1' />
                  <span className='ml-1'>977-9860113289</span>
                </li>
              </ul>
            </div>
            <div className='p-4'>
              <h1 className='mb-3 text-xl'>Subscribe to our newsletter</h1>
              <p className='mb-2'>Monthly digest of what's new and exciting from us.</p>
              <form className='flex flex-wrap gap-1'>
                <input type="text" placeholder='Email address' value={email} className='text-white w-3/5 text-center mb-0 ' onChange={handleChange}/>
                <button className='rounded-md hover:text-white bg-[#007fae] hover:bg-[#13294b] px-2 py-2' onClick={handleSubmit}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className='flex flex-col border-t'>
          <ul className='flex justify-end space-x-2 m-4'>
            <li className='hover:text-blue-500'>
              <IoLogoInstagram size={30} />
            </li>
            <li className='hover:text-blue-500'>
              <IoLogoFacebook size={30} />
            </li>
            <li className='hover:text-blue-500'>
              <IoLogoTwitter size={30} />
            </li>
            <li className='hover:text-blue-500'>
              <IoLogoLinkedin size={30} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer