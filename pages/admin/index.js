"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { view_career } from "@/pages/api/careerAPI";
import { viewProject } from "@/pages/api/projectAPI";
import { getAppliedCareer } from "@/pages/api/applyCareerAPI";
import { useRouter } from "next/navigation";

const API = "https://api.indexithub.com/api"

export default function Home() {
  // const [limit, setLimit] = useState(2)
  const limit = 3;
  const [careers, setCareers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [id, setId] = useState(null)
  const [userImage, setUserImage] = useState(null);
  const [userfirstname, setUserFirstname] = useState(null);
  const [userlastname, setUserLastname] = useState(null);
  const [userposition, setUserPosition] = useState(null);


  let [token, setToken] = useState('')
  let router = useRouter()

  useEffect(() => {

    localStorage.getItem('token') ? setToken(localStorage.getItem('token')) : router.push('/login')
    
    // recent job posts
    view_career().then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setCareers(data);
      }
    });
    // view projects
    viewProject().then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setProjects(data);
      }
    });
    // view applied persons
    if(token){
      getAppliedCareer(token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setApplicants(data);
        }
      });

    }
    // view user profile
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setId(user._id)
      setUserImage(user.image)
      setUserFirstname(user.firstname)
      setUserLastname(user.lastname)
      setUserPosition(user.position)
    }
  }, []);

  
  return (
    <>
      {
        token ?
        <>
          {/* Recent Job Posts */}
          <div className="flex flex-col lg:flex-row justify-between w-11/12 mx-auto pb-8 px-5 md:px-0">

            <div className="recentjobs w-full lg:w-3/4 order-2 lg:order-1 pt-5 lg:pt-0">
              <h1 className="text-xl md:text-2xl font-bold py-1">Recent Job Posts</h1>
              {careers?.length > 0 && (
                careers
                  .sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date)) // Sorting (descending)
                  .slice(0, 2) // Got the latest first two entries 
                  .map((career) => (
                    <div key={career?._id} className="w-full lg:w-4/5 p-5 border-2 bg-white rounded-md shadow-lg my-2">
                      <h1 className="text-lg md:text-xl font-semibold capitalize py-1">
                        {career?.career_title}
                      </h1>
                      <h2 className="text-sm md:text-base font-medium py-1">
                        No. Of Positions: <span className="text-xs md:text-sm capitalize">{career?.vacancyNumber}</span>
                      </h2>
                      <h2 className="text-sm md:text-base font-medium py-1">
                        Posted Date: <span className="text-xs md:text-sm capitalize">{new Date(career?.posted_date).toLocaleString()}</span>
                      </h2>
                      <h2 className="text-sm md:text-base font-medium py-1">
                        Application Deadline: <span className="text-xs md:text-sm capitalize">{new Date(career?.deadline).toLocaleString()}</span>
                      </h2>
                    </div>
                  ))
              )}
              <Link href={`/admin/careers`} className="py-2">
                <button className="bg-blue-500 h-9 text-sm md:text-lg rounded-md cursor-pointer w-28 hover:bg-blue-700 text-white">
                  Read More
                </button>
              </Link>
            </div>
            {/*user profile */}
            <div className="profile w-full sm:w-3/4 lg:w-1/4 mx-auto order-1 lg:order-2 lg:mt-14">
              <div className="profile-pic font-semibold text-lg">
                <div className="flex flex-col justify-center items-center bg-white rounded-md py-5">
                  <h1 className="pt-5">
                    <img
                      src={`${API}/${userImage}`}
                      alt=""
                      className="h-36 w-36 border rounded-md"
                    />
                  </h1>
                  <h1 className="text-sm md:text-base capitalize mt-2 ">
                    {userfirstname} {userlastname}
                  </h1>
                  <h1 className="capitalize">{userposition}</h1>
                  <Link href={`/admin/userprofile/${id}`}>
                    <button className="bg-blue-600 rounded-md p-2 mt-2 text-sm md:text-base mb-3">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="projects w-11/12 mx-auto pb-8 px-5 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold py-1">Projects</h1>
            <div className="w-full flex flex-col items-center">
              {projects?.length > 0 &&
                projects.slice(1, limit).map((project) => {
                  return (
                    <div
                      key={project?._id}
                      className="sm:px-5 py-5 bg-white border-2 rounded-md shadow-lg my-2 flex flex-col sm:flex-row w-full items-center "
                    >
                      <h1 className="w-4/5 md:w-1/3 flex justify-center">
                        <img
                          src={`${API}/${project?.project_image}`}
                          alt={project?.project_title}
                          className="rounded-md w-full dashboard-projecimg"
                          style={{
                            height: "265px",
                          }}
                        />
                      </h1>
                      <div className="w-4/5 md:w-3/5 flex flex-col justify-center items-center sm:items-start sm:px-9">
                        <h1 className="text-lg lg:text-xl font-semibold capitalize py-1">
                          {project?.project_title}
                        </h1>
                        <h2 className="text-sm lg:text-base font-medium py-1">
                          Category:
                          <span className="text-xs md:text-sm capitalize">
                            {" "}
                            {project?.category?.category_name}{" "}
                          </span>{" "}
                        </h2>
                        <h2 className="text-sm lg:text-base font-medium py-1">
                          Language:
                          <span className="text-xs md:text-sm font-normal capitalize">
                            {" "}
                            {project?.language}{" "}
                          </span>
                        </h2>
                      </div>
                    </div>
                  );
                })}
              <Link href={`/admin/projects`} className="py-2">
                <button className="bg-blue-500 h-9 text-sm md:text-lg rounded-md cursor-pointer w-28 hover:bg-blue-700 text-white">
                  Read More
                </button>
              </Link>
            </div>
          </div>


          {/* Applicants */}
          <div className="applications w-11/12 mx-auto pb-8 px-5 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold py-1">Applicants</h1>
            <div className="w-full shadow-lg my-2">
              <div className="relative overflow-x-auto shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs md:text-sm text-white uppercase bg-blue-500">
                    <tr>
                      <th scope="col" className="px-6 md:px-2 py-3 md:py-1">
                        Applicant Name
                      </th>
                      <th scope="col" className="px-6 md:px-2 py-3 md:py-1">
                        Career Applied
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm overflow-y-auto max-h-[400px]">
                    {applicants?.length > 0 &&
                      applicants.map((applicant) => {
                        const appcareer = careers.find((career) => career?._id === applicant?.career)
                        const career_title = appcareer ? appcareer?.career_title : 'Unkown Career'
                        return (<tr
                          key={applicant?._id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <Link href={`/admin/careers/appliedCareer/${appcareer?._id}`} className="py-2">

                            <td className="px-6 md:px-2 py-3 md:py-1 font-medium text-gray-900 whitespace-nowrap capitalize">
                              {applicant?.first_name} {applicant?.last_name}
                            </td>
                          </Link>
                          <td className="px-6 md:px-2 py-3 md:py-1 capitalize">{career_title}</td>
                        </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
        :
        <>
        Loading
        </>
      }

    </>

  )

}
