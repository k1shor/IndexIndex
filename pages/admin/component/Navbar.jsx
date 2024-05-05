'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

const API = "https://api.indexithub.com/api"

const NavbarAdmin = ({ isMenuOpen, setIsMenuOpen }) => {
  const [userImage, setUserImage] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.image) {
      setUserImage(user.image)
      setId(user._id)
    }
  }, [])

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className='sticky flex justify-between w-full py-4 top-0 bg-black z-10 text-gray-300 pt-3 pl-4'>
      <div className='flex gap-4 text-xl uppercase font-sans items-center'>
        <button className='p-1  rounded-lg' onClick={handleMenuToggle}>
          <AiOutlineMenu size={28} />
        </button>
        <Image alt='' src='/logo.png' width={50} height={50} className='' />
        {/* <span>Admin</span> */}
      </div>
      <div className='mr-12'>
        {
          userImage && (
            <Link href={`/admin/userprofile/${id}`} className=''>
              <img src={`${API}/${userImage}`} alt='' width={40} height={40} className='user-image' />
            </Link>
          )}
      </div>
    </nav>
  )
}

export default NavbarAdmin