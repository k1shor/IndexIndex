"use client"
import React, { useState } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Link from 'next/link';
import { getAllCategories } from '../api/categoryAPI';

export async function getStaticProps() {
    const services = await getAllCategories()
    console.log(services)

    return {props: {services}}
}

const Services = (props) => {
    // let [services, setServices] = useState([])
    // let [success, setSuccess] = useState(false)

    let { services } = props // destructuring of props is done in another line after first sending the props in Service function

    // useEffect(() => {
    //     Aos.init()
    //     getAllCategories()
    //         .then(data => {
    //             if (data?.error) {
    //                 console.log(data.error)
    //             }
    //             else {
    //                 console.log(data)
    //                 setServices(data)
    //             }
    //         })
    // }, [success])



    return (
        <div className='text-[#13294b] lfooter'>
            <div className='contact-img text-center p-16 text-white'>
                <div className='career lg:text-4xl text-2xl font-bold' data-aos="zoom-in" data-aos-duration="2000" >Our Services</div>
                <div className='flex justify-center p-3 text-[#13294b] bg-[#ffffff50]' data-aos="fade-up" data-aos-duration="2000">
                    <a href="/" className='pr-2 hover:text-white'>Home</a> /
                    <p className='pl-2'>Services</p>
                </div>
            </div>

            <div className=" py-10 ">
                <div className="">
                    <div className="flex flex-wrap w-full justify-evenly">
                        {
                            services?.length > 0 &&
                            services.map(service => {
                                return <div key={service._id} className="flex-col-3 justify-between lg:flex lg:justify-between">
                                    <div className="topfirst bg-white md:w-96 w-52 rounded-md px-2 py-6 flex flex-col justify-center hover:shadow-xl card-hover m-auto gap-5 mb-10 lg:m-10" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="flex justify-center">
                                        <h1 className="w-24 p-4" dangerouslySetInnerHTML={{ __html: service?.icon }}></h1>
                                    </div>
                                        <div className="h2div text-2xl font-bold flex justify-center capitalize">
                                            <h2 className="text-center">{service.category_title}</h2>
                                        </div>
                                        <div className="buttondiv flex justify-center">
                                            <Link href={`/service/${service?._id}`}>
                                                <button className="bg-[#007fae] h-9 text-lg rounded-md cursor-pointer m-4 w-28 hover:bg-[#13294b] text-white">Read more</button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            })
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Services