"use client"

import React, { useState } from 'react'
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from 'next/dynamic';
import { alluserclient } from './api/userApi';
// import { alluserclient } from '../api/userApi';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}
const API = "https://api.indexithub.com/api"

export async function getStaticProps(){

  const users = await alluserclient()

  // const res = await alluserclient()
  // const users = JSON.stringify(res);
  return {props: { users } }

}

const about = (props) => {
  // let [users, setUsers] = useState([])
console.log(props)
  let {users} = props



  const settings = {
    loop: true,
    margin: 10,
    items: 4,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4
      }
    }
  }

  // useEffect(() => {
  //   Aos.init()
  //   alluserclient()
  //     .then(data => {
  //       if (data?.error) {
  //         console.log(data.error)
  //       }
  //       else {
  //         setUsers(data)
  //       }
  //     })
  // }, [])

  return (
    <div className='lfooter'>
      <div className='contact-img text-center p-16 '>
        <div className='career lg:text-4xl text-2xl font-bold text-[#13294b]' data-aos="zoom-in" data-aos-duration="2000" >About Us</div>
        <div className='flex justify-center p-3 text-[#13294b] bg-[#ffffff50]' data-aos="fade-up" data-aos-duration="2000">
          <a href="/" className='pr-2 hover:text-white'>Home</a> /
          <p className='pl-2'>About</p>
        </div>
      </div>

      <div className="body_mid h-auto w-full md:p-9 lg:flex lg:justify-between">
        <div className="left lg:w-1/2 md:w-full sm:w-full lg:p-12 p-8 md:p-10" data-aos="zoom-in" data-aos-duration="2000">
          {/* <h1 className="lg:text-4xl text-3xl text-[#13294b] font-bold ">Learn</h1> */}
          <p className=" lg:text-xl lg:w-full md:text-base md:w-5/6 py-5  text-sm w-full text-justify ">
          Index IT Hub pioneers innovative IT solutions for businesses worldwide. Our company specializes in a comprehensive array of services, including software development, web development, mobile application development, graphics design, digital marketing strategies, IT consultation services, and search engine optimization (SEO). With a focus on client success and technical excellence, we deliver tailored solutions to drive growth and efficiency in the digital age. Partner with Index IT Hub to elevate your business to new heights in technology and innovation.
            <br/> <br/>
            Partner with Index IT Hub today and discover how our commitment to technology and innovation can elevate your business to new heights of success. Let us be your trusted partner in navigating the complexities of the digital age, and together, we'll pave the way for a brighter future.
            </p>

          {/* <div className="cn">
              <button className="bg-blue-500 text-white h-9 text-lg rounded-md cursor-pointer m-4 hover:bg-blue-700"><a href="" className="md:p-3 p-2">Read more</a></button>
            </div> */}
        </div>
        <div className="right m-5 lg:w-1/2">
          <img src={"/download1.png"} alt="" className="w-full h-full" data-aos="fade-up" data-aos-duration="2000" />
        </div>
      </div>

      <div className='rfooter p-16'>
        <h1 className="md:text-5xl text-3xl text-center font-bold text-[#13294b]  " data-aos="fade-up" data-aos-duration="2000">Our Team Members</h1>

        <OwlCarousel {...settings}>
          {
            users?.length > 0 &&
            users.map(user => {
              return <div key={user._id} className="border border-solid border-l-white shadow-2xl text-center p-5 m-10 rounded-xl bg-white" data-aos="fade-up" data-aos-duration="2000">
                <div className="imgprofile w-20 mx-auto">
                  <img src={`${API}/${user.image}`} alt={user.username} className="rounded-circle w-20 h-20" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{user.firstname} {user.lastname} </h3>
                  <h4 className="font-bold">{user.position}</h4>
                </div>

              </div>
            })
          }
        </OwlCarousel >
      </div>
    </div>
  )
}

export default about