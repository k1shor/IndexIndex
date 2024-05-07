'use client'
import Aos from 'aos'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getProjectDetails } from '../api/projectAPI'
const API = "https://api.indexithub.com/api"

const projectDetail = () => {
    let [project, setProject] = useState({})
    const params = useParams()
    const id = params?.projectId

    useEffect(()=>{
        Aos.init()
        getProjectDetails(id)
        .then(data => {
            if(data?.error){
                console.log(data.error)
            }   
            else{
                setProject(data)
                console.log(data)
            }
        })
    },[id])
    

  return (
    <>
        <div className="flex justify-center p-10 text-[#13294b] lfooter">
            <div className="card-hover w-full sm:w-2/3 lg:w-5/12 rounded-md p-5 flex flex-col items-center shadow-xl " data-aos="zoom-in" data-aos-duration="000">
                <h1 className='text-center md:text-xl font-bold'>{project?.project_title}</h1>
                <h1 className='text-center md:text-lg md:my-2 my-1 text-sm'>Category: {project?.category?.category_title}</h1>
                <h1 className='text-center md:text-lg md:my-2 my-1 text-sm'>Language: {project?.language}</h1>
                <h1 className='text-center md:text-lg md:my-2 my-1 text-sm'>Tools: {project?.tools}</h1>
                <h1 className='flex justify-center w-full md:w-3/4'>
                    <img src={`${API}/${project?.project_image}`} alt={project?.project_title} className="w-full rounded-md" style={{height:"250px"}}/>
                </h1>
                <h1 className="text-center md:text:lg md:my-2 my-1 text-sm">Status: </h1>
            </div>
        </div>
    </>
  )
}

export default projectDetail
