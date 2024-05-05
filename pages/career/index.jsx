"use client"
import React, { useState } from 'react'
import { CgPathTrim } from "react-icons/cg";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { view_career } from '../api/careerAPI';
import Link from 'next/link';


const career = () => {
    let [careers, setCareers] = useState([])

    useEffect(() => {
        Aos.init()
        view_career()
            .then(data => setCareers(data))
    }, [])
    
    return (
        <div className='text-[#13294b] lfooter'>
            <div className='contact-img text-center p-16 text-white'>
                <div className='career lg:text-4xl text-2xl font-bold' data-aos="zoom-in" data-aos-duration="2000" >Career</div>
                <div className='flex justify-center p-5 text-[#13294b] bg-[#ffffff50]' data-aos="fade-up" data-aos-duration="2000">
                    <a href="/" className='pr-2 hover:text-white'>Home</a>/
                    <p className='pl-2'>Career</p>
                </div>
            </div>

            <div className='lg:flex lg:p-10 justify between w-full '>
                <div className='lg:w-1/2 lg:m-14 pt-10' data-aos="fade-up" data-aos-duration="2000">
                    <div className='lg:flex lg:justify-start flex  justify-center'>
                        <CgPathTrim className='m-1 text-[#5ce1e6] size-6' />
                        <p className='font-semibold'>BE PART OF OUR TEAM</p>
                    </div>
                    <p className='lg:text-3xl text-xl lg:text-left text-center font-bold pt-3'>Career and Culture at Index IT Hub</p>
                    <p className='lg:px-0 px-8 md:px-10 py-10'>
                    Discover the vibrant culture at Index IT Hub, where collaboration, innovation, and personal growth are paramount. Join our diverse team and unleash your creativity in an environment that not only values your contributions but also empowers your development. Enjoy competitive compensation, comprehensive benefits, and abundant opportunities for advancement in the dynamic field of IT. Here, we believe in the power of collective wisdom, where sharing knowledge, expertise, and creativity fuels the emergence of the best ideas. Our collaborative environment fosters not just professional growth, but also a sense of camaraderie and teamwork essential for success. 
                    <br/> <br/>
                    Join us at Index IT Hub, where collaboration, innovation, and excellence converge in project development. Together, we'll push the boundaries of technology and create impactful solutions that shape the future
                    </p>
                </div>
                <div className='lg:p-10 lg:w-1/2 p-5'>
                    <img src={"/career2.jpg"} alt="" className='h-full w-full rounded-2xl opacity-80' data-aos="zoom-in" data-aos-duration="2000" />
                </div>
            </div>

            <div className='rfooter p-10'>
                <div className='text-center' data-aos="fade-up" data-aos-duration="2000">
                    <div className='flex justify-center'>
                        <CgPathTrim className='m-1 text-[#5ce1e6] md:size-6' />
                        <p className='font-semibold'>Our Job vacancies</p>
                    </div>
                    <h2 className='md:text-3xl text-2xl font-bold pt-3'>Our Latest Job Vacancy</h2>
                </div>
                <div className='flex flex-wrap justify-evenly'>
                    {
                        careers?.length > 0 &&
                        careers.map(career => {
                            console.log(career)
                            return <div className='card-hover md:w-96 h-auto rounded-lg flex flex-col text-center p-12 mt-10 hover:shadow-xl lg:mb-12 mb-14 ' data-aos="fade-up" data-aos-duration="1000">
                            <h1 className='text-center md:text-2xl font-bold uppercase'>{career?.career_title}</h1>
                            <p className='md:text-lg md:m-2 m-1 text-sm'>No. of Vacancies:[{career?.vacancyNumber}]</p>
                            <p className='md:text-lg md:m-2 m-1 text-sm'>offered salary:<br/> Rs.{career?.offered_salary}</p>
                            <p className='md:text-lg md:m-2 m-1 text-sm'>Posted Date: <br/> {career?.posted_date}</p>
                            <p className='md:text-lg md:m-2 m-1 text-sm'>Apply Before(Deadline):<br/>{career?.deadline}</p>
                            <div className='flex justify-center'>
                                <Link href={`/career/${career?._id}`} >
                                    <button className="bg-[#007fae] h-9 text-lg rounded-md cursor-pointer mx-4 mt-4 w-28 hover:bg-[#13294b] text-white">Apply here</button>
                                </Link>
                            </div>
                        </div>
                        })
                    }
                </div>

            </div>
        </div>
    )
}


export default career