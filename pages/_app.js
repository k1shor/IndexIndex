'use client'

import "@/styles/globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { isAuthenticated } from "./api/userApi";
import { useEffect, useState } from "react";
// import Sidebar from "./admin/component/Sidebar";
import NavbarAdmin from "./admin/component/Navbar";
import Sidebar from "./admin/component/Sidebar";

export default function App({ Component, pageProps }) {
  let [isAdmin, setIsAdmin] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    localStorage.getItem('token') ? setIsAdmin(true) : setIsAdmin(false)
  }, [])

  
  return <>
    {
      !isAdmin && <Navbar />
    }
    {
      isAdmin &&
      <div className="flex flex-col ">
        <NavbarAdmin isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex bg-blue-200" >
          <Sidebar isMenuOpen={isMenuOpen} />
          <div className={`transition-all duration-300 ease-in-out me-14 mt-14 ${isMenuOpen ? `md:w-5/6 w-10/12 md:ms-44 ms-16 ` : `md:w-11/12 w-10/12 md:ms-32 ms-16`}`}>
            <Component {...pageProps} />;
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
