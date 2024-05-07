'use client'

import "@/styles/globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { isAuthenticated } from "./api/userApi";
import { useEffect, useState } from "react";
// import Sidebar from "./admin/component/Sidebar";
import NavbarAdmin from "./admin/component/Navbar";
// import Sidebar from "./admin/component/Sidebar";
import { useParams } from "next/navigation";
import AdminSidebar from "./admin/component/AdminSidebar";

export default function App({ Component, pageProps }) {
  let [isAdmin, setIsAdmin] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    getUser()
    .then(user => {
      if(user.role === 0){
        setIsAdmin(true)
      }
      else{
        setIsAdmin(false)
      }
    })
    console.log(isAdmin)
    async function getUser(){
      return localStorage.getItem("user") ?
        await JSON.parse(localStorage.getItem("user")) : false
    }
    // localStorage.getItem('token') ? setIsAdmin(true) : setIsAdmin(false)
  }, [useParams()])

  
  return <>
    {
      !isAdmin && <Navbar />
    }
    {
      isAdmin &&
      <div className="flex flex-col w-full">
        <NavbarAdmin isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex bg-blue-200" >
          <div className="w-1/4">
            {/* <AdminSidebar isMenuOpen={isMenuOpen} /> */}
            <AdminSidebar isMenuOpen={isMenuOpen} />
          </div>
          <div className={`transition-all duration-300 ease-in-out me-14 mt-14 ${isMenuOpen ? `md:w-5/6 w-10/12  ` : `md:w-11/12 w-10/12 `}`}>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    }

    {
      !isAdmin &&
      <>
        <Component {...pageProps} />
        <Footer />
      </>
    }


  </>
}
