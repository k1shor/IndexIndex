'use client';
import { viewProject } from '@/pages/api/projectAPI';
import Link from 'next/link';
import Swal from 'sweetalert2';
const API = "https://api.indexithub.com/api"

const Projects = () => {
  let [projects, setProjects] = useState([])
  let [success, setSuccess] = useState(false)
  let router = useRouter()

  let [token,setToken] =useState('')
  useEffect(() => {
    getToken()
            .then(data =>
                setToken(data)
            )

        async function getToken() {
            // token = await localStorage.getItem("token")
            token = await localStorage.getItem("token")  ? localStorage.getItem("token") : router.push('/login') 

            return token
        }
    viewProject()
      .then(data => {
        if (data?.error) {
          console.log(data.error)
        }
        else {
          console.log(data)
          setProjects(data)
        }
      })
  }, [success])

  const handleDelete = id => (event) => {
    event.preventDefault()
    setSuccess(false)
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3138D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      width: "35%"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id, token)
          .then(data => {
            if (data.error) {
              Swal.fire({
                title: "Error!",
                text: data.error,
                icon: "error",
                showConfirmButton: false,
                timer: 3000
              })
            }
            else {
              Swal.fire({
                title: "Success!",
                text: data.msg,
                icon: "success",
                showConfirmButton: false,
                timer: 3000
              })
            }
          })
          .catch(
            Swal.fire("something went wrong!")
          )
        setSuccess(true)
      }
    });
  }

  return (
    <>
      {
        token ? 
        <> 
          <div className='ms-8 md:w-4/6 w-10/12'>
            <h1 className='font-bold text-3xl'>Projects</h1>
            <div className='text-black flex flex-col'>
              {
                projects && projects.map(project => {
                  return <div key={project?._id} className='p-5 border-2 bg-white rounded-md shadow-lg  my-3'>
                    <h1>Title: {project?.project_title}</h1>
                    <h1>category: {project?.category?.category_title}</h1>
                    <h1>language: {project?.language}</h1>
                    <h1>tools: {project?.tools}</h1>
                    <h1>
                      <img src={`${API}/${project?.project_image}`} alt={project?.project_image} style={{height:"100px"}}/>
                    </h1>
                    <h1>Status: </h1>
                    <div className='flex md:flex-row my-2'>
                    <Link href={`/admin/projects/${project?._id}`}>
                      <button className='border-2 border-none bg-yellow-500  hover:text-white h-8 w-20 text-center rounded-md mr-5 '>Update</button>
                    </Link>
                    <button className='border-2 border-none bg-red-500 hover:text-white w-20 h-8 rounded-md' onClick={handleDelete(project?._id)}> Delete </button>
                    </div>
                  </div>
                })
              }
            </div>

          </div>        
        </>
        :
        <>
          LOADING...
        </>
      }
    </>
  )
}

export default Projects