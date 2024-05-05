'use client'
import Aos from 'aos'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getCategoryDetails } from '../api/categoryAPI'


const serviceDetail = () => {
  const [service, setService] = useState({})

  const params = useParams()
  const id = params?.serviceId

  useEffect(() => {
    Aos.init()
    // setService(Services.find(item => item.id == id))
    getCategoryDetails(id)
      .then(data => {
        if (data?.error) {
          console.log(data.error)
        }
        else {
          console.log(data)
          setService(data)
        }
      })
  }, [id])

  return (
    <>
      <div className='flex justify-center lfooter'>
        <div className="card-hover md:w-2/3 w-11/12 rounded-md p-5 flex flex-col shadow-xl gap-5 my-10" data-aos="zoom-in" data-aos-duration="000">
          <div className="flex justify-center">
            <h1 className="w-24 p-4" dangerouslySetInnerHTML={{ __html: service?.icon }}></h1>
          </div>
          <div className="text-2xl font-bold flex justify-center capitalize">
            <h2>{service?.category_title}</h2>
          </div>
          <div className="text-justify px-5">
            <p>{service?.description} </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default serviceDetail


