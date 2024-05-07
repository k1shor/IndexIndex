"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { userlogout } from '../api/userApi'

const Logout = () => {

    let router = useRouter()

    const handleLogout = () =>{
        userlogout()
        .then(()=>{
            router.push('/login')
        })
    }

    useEffect(() => {
        handleLogout();
      }, []);
      
  return null;
}

export default Logout