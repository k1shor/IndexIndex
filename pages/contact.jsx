'use client';

import React from 'react'
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const contact = () => {
  useEffect(() => {
    Aos.init()
  }, [])
  return (
    <div className='text-[#13294b] lfooter'>
      <div className='contact-img text-center p-16'>
        <div className='career lg:text-4xl text-2xl font-bold text-[#13294b]' data-aos="zoom-in" data-aos-duration="2000" >Contact Us</div>
        <div className='flex justify-center p-3 text-[#13294b] bg-[#ffffff50]' data-aos="fade-up" data-aos-duration="2000">
          <a href="/" className='pr-2 hover:text-white'>Home</a>/
          <p className='pl-2'>Career</p>
        </div>
      </div>

      <div className=" px-5 md:px-32 py-24 mx-auto flex sm:flex-nowrap flex-wrap" >
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative" >
          <iframe width="100%" height="100%" className="absolute inset-0" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.662849528088!2d85.31829767514621!3d27.665901027318835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000a4f32cf%3A0x53f71813950137ff!2sEvolve%20IT%20Hub%20Nepal!5e0!3m2!1sen!2snp!4v1707120552707!5m2!1sen!2snp"></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md invisible md:visible " data-aos="fade-up" data-aos-duration="2000">
            <div className="lg:w-1/2 px-6" >
              <h2 className="title-font font-semibold tracking-widest text-xs ">ADDRESS</h2>
              <p className="mt-1">Lagankhel, Mahalaxmisthan Road, GM Complex, Lalitpur</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold tracking-widest text-xs">EMAIL</h2>
              <a className="leading-relaxed">info@indexithub.com</a>
              <h2 className="title-font font-semibold tracking-widest text-xs mt-4">PHONE</h2>
              <p className="leading-relaxed">977-9860113289</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded flex flex-col md:ml-auto w-full py-8  px-8 mt-8 md:mt-0" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="text-3xl mb-1 font-bold text-center">Contact Us</h2>
          <p className="leading-relaxed mb-5 text-center">Contact For Any Query</p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="message" className="leading-7 text-sm">Message</label>
            <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button className="text-white bg-[#007fae] border-0 py-2 px-6 focus:outline-none hover:bg-[#13294b] rounded text-lg">Send Message</button>
        </div>
      </div>
    </div>

  )
}

export default contact