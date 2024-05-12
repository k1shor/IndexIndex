'use client';
import { CgPathTrim } from "react-icons/cg";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import Link from 'next/link';
import { getAllCategories } from "../api/categoryAPI";
import { viewProject } from "../api/projectAPI";

const API = "https://api.indexithub.com/api"

export async function getStaticProps(){
    const projects = await viewProject()
    // console.log("projects: ",projects)
    const categories = await getAllCategories()
    // console.log("categories: ",categories)

    return {props: {projects,categories}}
}

const project = ({projects, categories}) => {  //destructuring is done here only of props instead in abother line
    console.log(projects)
    console.log(categories)

    // let [cat, setCat] = useState([])
    // let [projects, setProjects] = useState([])

    let [filteredResult, setFilteredResult] = useState(projects)
    let [bgcolor, setBgColor] = useState('')
    // Aos.init()

    // useEffect(() => {
    //     Aos.init()
    //     getAllCategories()
    //         .then(data => setCat(data))
    //     viewProject()
    //         .then(data => {
    //             console.log(data)
    //             setFilteredResult(data)
    //             setProjects(data)})
    // }, [])

    const handleFilter = (id) => {
        console.log(id, filteredResult)
        // setFilter(id)
        if(id === 'all'){
            setFilteredResult(projects)
            setBgColor('all')
        }
        else{
            setFilteredResult(
                projects.filter(proj=>proj.category?._id === id)
            )
            setBgColor(id)
        }
    }
    return (
        <div className="text-[#13294b]">
            <div className='contact-img text-center p-16 text-white'>
                <div className='career lg:text-4xl text-2xl font-bold' data-aos="zoom-in" data-aos-duration="2000" >Our Project</div>
                <div className='flex justify-center p-3 text-[#13294b] bg-[#ffffff50]' data-aos="fade-up" data-aos-duration="2000">
                    <a href="/" className='pr-2 hover:text-white'>Home</a> /
                    <p className='pl-5'>Project</p>
                </div>
            </div>
            <div className='w-full py-5 bg-white' >
                <div className='w-full' data-aos="fade-up" data-aos-duration="2000">
                    <div className='relative text-center font-bold'>
                        <div className='flex justify-center'>
                            {/* <h1>Our Project</h1> */}
                            <CgPathTrim size={27} className='text-[#5ce1e6] pt-1' />
                            <h1 className='text-2xl'>Recently Launched Projects</h1>
                        </div>
                    </div>

                    <div className="m-10">
                        <ul className='flex md:flex-row flex-col justify-center text-sm'>
                            <li className={`py-2 px-4 rounded-l-full text-base ${bgcolor === 'all' || bgcolor === ''  ? 'bg-[#5ce1e6] text-white':'hover:bg-[#5ce1e6] hover:text-white'}`} onClick={()=>handleFilter('all')}>All</li>
                            {
                                categories?.length > 0 &&
                                categories.map(c => {
                                    return <li className= {`py-2 px-4 capitalize text-base ${bgcolor === c._id ? 'bg-[#5ce1e6] text-white': 'hover:bg-[#5ce1e6] hover:text-white  hover:cursor-pointer'} `}
                                        onClick={()=>handleFilter(c._id)}>
                                        {c.category_title}</li>
                                })
                            }
                        </ul>
                    </div>
                    
                    <div className="px-10">
                        <div className="flex flex-wrap w-full justify-evenly">
                            {
                                filteredResult?.map(project =>{
                                    return <div key={project._id} className="project-div py-5 px-2 hover:bg-[#aff4f6] rounded-md hover:shadow-lg my-7 card-hover " >
                                        <h1 className="text-center md:text-xl font-bold capitalize">
                                            {project.project_title}
                                        </h1>
                                        <div className="flex justify-center py-3 px-5">
                                            <img src= {`${API}/${project.project_image}`} alt={project.project_title} className="w-full rounded-md" style={{height:"250px"}}/>
                                        </div>
                                        <div className="project-btn flex justify-center pt-1">
                                            <Link href={`/project/${project?._id}`}>
                                                <button className="bg-[#007fae] h-9 text-lg rounded-md cursor-pointer w-28 hover:bg-[#13294b] text-white"> Preview
                                                </button>
                                            </Link>
                                        </div>
                                    
                                    </div>
    
                                })

                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default project