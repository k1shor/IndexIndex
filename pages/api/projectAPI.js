const API = "https://api.indexithub.com/api"
// const API = "http://localhost:8000/api"

//to add project
export const addProject = (project, token) => {
    return fetch(`${API}/project/add_project`, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify(project)
        body: project
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


// to view project
export const viewProject = () => {
    return fetch(`${API}/project/view_project`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

// to get project details
export const getProjectDetails = id =>{
    return fetch(`${API}/project//view_projectdetailsbyid/${id}`)
    .then(res => res.json())
    .catch(err =>console.log(err))
}

//to update project
export const updateProject = (id, project, token) =>{
    return fetch(`${API}/project/update_project/${id}`,{
        method: "PUT",
        headers:{
            Authorization:`Bearer ${token}`
        },
        body: project
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
}

//to delete project
export const deleteProject = (id, token) =>{
    return fetch(`${API}/project/delete_project/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res =>res.json())
    .catch(err =>console.log(err))
}