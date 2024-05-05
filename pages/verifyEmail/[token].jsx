'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { emailConfirmation } from '../api/userApi';

const VerifyEmail = () => {
  let [error, setError] = useState('')
  let [success, setSuccess] = useState('')

  //get token from url
  let params = useParams()
  let { token } = params?params: ""

  let router = useRouter()

  useEffect(() => {
    emailConfirmation(token)
      .then(data => {
        if (data.error) {
          setSuccess(false)
          setError(data.error)
        }
        else {
          setError('')
          setSuccess(data.msg)
        }
      })
  }, [])

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
      return router.push('/login')
    }
  }

  const showSuccess = () => {
    if (success) {
      Swal.fire({
        icon: "success",
        toast: true,
        title: "success",
        text: success,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: "#64DD17"
      })
      setSuccess('')
      return router.push('/login')
    }
  }


  return (
    <>
    {showError()}
    {showSuccess()}
    </>
  )
}

export default VerifyEmail