'use client';
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";


if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from 'next/dynamic';
import { getAllCategories } from "./api/categoryAPI";
import { alluserclient } from "./api/userApi";
import { sendEmail } from "./api/normalUserAPI";
import Swal from "sweetalert2";
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const API = "https://api.indexithub.com/api"


export default function Home() {
  let [users, setUsers] = useState([])
  // let [services, setServices] = useState([])
  let [email, setEmail] = useState("")
  let [error, setError] = useState('')
  let [success, setSuccess] = useState(false)
  
  const services = [
    {
        title: "Expertise and Experience",
        image: <img src="./expertise.png" alt="Description of the image" className="h-96 rounded-md"/>,
        description: ` Our company boasts a cadre of seasoned professionals renowned for their mastery in the intricate realms of information technology. Through years of dedicated study and practical application, our team has cultivated a profound understanding of the nuances within the IT landscape, positioning us as unrivaled experts capable of navigating even the most complex technological challenges with finesse and precision.`
    },
    {
        title: "Innovative Solutions",
        image: <img src="/innovation.png" alt="Description of the image"  className="h-96 rounded-md"/>,
        description: ` At the forefront of our ethos lies an unwavering commitment to pioneering innovation. We fervently embrace the ever-evolving frontier of technology, ceaselessly seeking out novel methodologies and avant-garde solutions to propel our clients beyond the boundaries of convention. With an insatiable appetite for progress, we continuously strive to anticipate future trends and harness emerging technologies to deliver bespoke, forward-thinking solutions tailored to the unique needs of our clientele.`
    },
    {
        id: 5,
        title: "Customer-Centric Approach",
        image:<img src="/customer.png" alt="Description of the image"  className="h-96 rounded-md"/>,
        description: `Central to our operational philosophy is an unwavering dedication to the paramountcy of our clients' satisfaction. We steadfastly uphold the ethos that each client engagement is a bespoke endeavor, necessitating a tailored approach finely attuned to their distinct aspirations and exigencies. Through meticulous attention to detail and unwavering commitment to understanding our clients' unique objectives, we ensure that every interaction is imbued with the utmost professionalism, empathy, and a steadfast resolve to surpass expectations.`
    },
    {
        title: "Reliability and Trustworthiness",
        image:<img src="/trust.png" alt="Description of the image"  className="h-96 rounded-md"/>,
        description: `Our reputation as a paragon of reliability and dependability is forged upon the crucible of integrity, transparency, and an unwavering commitment to excellence. With a steadfast adherence to rigorous standards of quality and an unyielding dedication to upholding our promises, we inspire confidence in our clientele, assuring them that their endeavors are entrusted to an eminently capable steward. Time and again, we have demonstrated our mettle by delivering results that not only meet but exceed expectations, earning us the unwavering trust of those we serve.`
    }
]
  // console.log(services)

  const settings3 = {
    items: 1,
    nav: false,
    loop: true,
    dots: false,
    // autoHeight: true,
    autoplay: true,
    autoplayTimeout: 3000,
  }

  const settings2 = {
    loop: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3
      }
    }
  }


  useEffect(() => {
    Aos.init()
    alluserclient()
      .then(data => {
        if (data?.error) {
          console.log(data.error)
        }
        else {
          setUsers(data)
        }
      })
    // getAllCategories()
    //   .then(data => {
    //     if (data?.error) {
    //       console.log(data.error)
    //     }
    //     else {
    //       setServices(data)
    //     }
    //   })
  }, [])

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

    <div>
      {showSuccess()}
      {showError()}

      <div className="main  bg-white ">
        <div className="bg-white w-11/12 mx-auto flex flex-col lg:flex-row py-10 " >
          <div className="mx-auto lg:w-1/2 lg:text-xl  md:text-base md:w-5/6 p-3 w-full text-sm text-[#13294b]" data-aos="zoom-in" data-aos-duration="1000">
            <video autoPlay loop controls={false} className="w-full lg:h-full">
              <source src='/video.mp4' type="video/mp4" />
            </video>
            <div className="lg:py-0 py-3">
              <button className="bg-[#007fae] h-9 text-lg rounded-md cursor-pointer text-white hover:bg-[#13294b]" data-aos="fade-right" data-aos-duration="1000"><a href="/contact" className="p-3">Contact Us</a></button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-5  self-center ">
            <OwlCarousel {...settings3}>
              <div className="w-full h-full">
                <img src="/1.png" className="w-full h-full rounded-md" />

              </div>
              <div className="w-full h-full">
                <img src="/2.png" className="w-full h-full rounded-md" />

              </div>
              <div className="w-full h-full">
                <img src="/3.png" className="w-full h-full rounded-md" />

              </div>
            </OwlCarousel>
          </div>
        </div>

        {/*  first content end */}

        {/* second content start */}
        <div className="head body_mid h-auto bg-white w-full md:p-9  lg:flex lg:justify-between ">
          <div className="left lg:w-1/2 md:w-full sm:w-full" data-aos="fade-up" data-aos-duration="2000">
            <h1 className="lg:text-4xl text-3xl text-[#13294b] font-bold md:p-5 md:pb-0 p-3 pb-0">About Us</h1>
            <p className="lg:text-xl lg:w-full md:text-base md:w-5/6 md:px-10 p-3 lg:pt-12 pb-0 text-sm w-full text-[#13294b] text-justify">
            Index IT Hub pioneers innovative IT solutions for businesses worldwide. Our company specializes in a comprehensive array of services, including software development, web development, mobile application development, graphics design, digital marketing strategies, IT consultation services, and search engine optimization (SEO). With a focus on client success and technical excellence, we deliver tailored solutions to drive growth and efficiency in the digital age. Partner with Index IT Hub to elevate your business to new heights in technology and innovation.
              </p>

            <div className="text-right md:p-10 p-3 lg:p-12 pt-0 ">
              <button className="bg-[#007fae] h-9 text-lg rounded-md cursor-pointer text-white hover:bg-[#13294b] "><a href="/about" className="md:p-3 p-2">About Us</a></button>
            </div>
          </div>
          <div className="right m-5 lg:w-1/2">
            <img src={"/download1.png"} alt="" className="w-full h-full" data-aos="zoom-in" data-aos-duration="2000" />

          </div>
        </div>
        {/* second content end */}


        {/* third content start */}

        <div className="bg footer text-[#13294b] ">
          <div className="bg-[#00000088] text-white md:px-14 md:py-14 sm:px-9 py-9 px-3 ">

            <h1 className="md:text-4xl md:font-bold text-2xl font-semibold text-white">Ready to get started</h1>
            <p className="m-1">Enter you email address</p>
            <div className="flex pt-2 w-full ">
              <input type="email" id="email" name="email" value={email} placeholder="Enter your email..." className="text-[#13294b] lg:w-1/2 sm:w-3/5 w-4/5  h-5 font-2xl rounded-md p-5 bg-[#e1e1e1]" onChange={handleChange} />
              <div className="ps-1">
                <button className="bg-[#007fae] h-9 md:text-lg text-base rounded-md cursor-pointer  hover:bg-[#13294b] flex items-center justify-center py-5 px-3" onClick={handleSubmit}><a href="">Subscribe</a></button>
              </div>
            </div>
          </div>

        </div>

        {/* third content end */}

        {/* fourth content start */}


        <div className="rfooter md:py-10">

          <h1 className="lg:text-4xl text-3xl text-center font-bold p-10" data-aos="fade-up" data-aos-duration="2000">Why Index IT Hub?</h1>

          <div className="md:p-10">
            <div className="flex flex-wrap w-full justify-evenly">
              {
                services?.length > 0 &&
                services.map((service, i) => {
                  return <div className="flex justify-evenly items-center flex-col py-5 lg:flex-row" key={i} >
                    {i % 2 == 0 &&
                      <div data-aos="zoom-in" data-aos-duration="1000"  className="hidden lg:block" >{service.image}</div>
                    }
                    { 
                      <div data-aos="zoom-in" data-aos-duration="1000"  className="lg:hidden block px-5" >{service.image}</div>
                      
                    } 
                    <div className=' w-11/12 lg:w-1/2 py-5 lg:py-5 md:px-5 px-5' data-aos="zoom-in" data-aos-duration="1000">
                      <h2 className="text-3xl font-bold underline mb-3">{service.title}</h2>
                      <h2 className="text-justify">{service.description}</h2>
                    </div>
                    {(i + 1) % 2 == 0 &&
                      <div data-aos="zoom-in" data-aos-duration="1000" className="hidden lg:block"> {service.image} </div>
                    }
                  </div>

                })
              }

            </div>
          </div>
        </div>
        {/* fourth content end */}

        {/* carousel start  */}


        <div className="lfooter">
          <div className="text-center md:p-12 p-10" data-aos="fade-up" data-aos-duration="2000">
            <h3 className="lg:text-4xl text-3xl font-bold ">Our Clients</h3>
            <h4 className="md:text-2xl text-xl p-5 ">Some of our happy Clients</h4>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam nesciunt, ducimus
              praesentium placeat debitis? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}

            <OwlCarousel {...settings2} >
              <div className="owlcarousel_logo pt-10 pb-10">
                <div className="logo border border-solid shadow-2xl border-white h-48 w-48 mx-auto  rounded-xl">
                  <img src="./evolve.png" className="h-full rounded-xl" />
                </div>
              </div>
            </OwlCarousel >
          </div>
        </div>
      </div>
    </div>

  );
}
